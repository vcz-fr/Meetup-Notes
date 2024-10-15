---
categories: ["meetups/deezertech"]
title: "From container to image, practices and anti-patterns"
---

By Jérôme Petazzoni, Kubernetes trainer  
[Slides](https://docs.google.com/presentation/d/1Qj5DktkKhk0Me7WVP121ZwJpiaBgbJGkBsbMV5quCo4/edit#slide=id.gd3759f6f86_0_0){:rel="nofollow"}

## Disclaimers

Don't work with containers for the sake of working with containers: this technology has been transforming the industry
for the last ten years.

There is no best or bad practice as practices are situational. By solely working in best practices and anti-patterns,
one may find contradictory statements. This is because advice has to be considered within context; the context grounds
the practice. As much as best practices lead to compounding benefits, anti-patterns do too.

## Practices
### Fat images

What is the best size for a container image? It depends! You may use a version of a smell test that is best suited for
your company. For instance: 100MB for a microservice, 1GB for a monolith and datascience can get away with multi-GB
images. A 10GB microservice should raise some flags.

Reducing the size of container images is a topic that has been hashed over and over again but here are some ways to
achieve that:

- Multi-stage builds;
- Exploring image layers with `docker history ${image}`;
- Avoid adding build environments to production images;
- Examples: [jpetazzo/minimage](https://github.com/jpetazzo/minimage){:rel="nofollow"}
- Careful about putting entire datasets in images. They make everything more difficult: pushes, pulls, storage, disk
  usage in the registry, Kubernetes nodes, backups, build and layer optimizations, and so on;
    - To optimize this, expose the dataset via a volume. On Kubernetes, you may use an [Init Container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/){:rel="nofollow"} to set up your service.
    - Images like `nixery.dev/curl` can simplify your setup
    - Apply the principles of [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns){:rel="nofollow"}
      to minimize images and tooling.

If your dataset is to be shared between multiple containers, this makes it a reason to share it. In Kubernetes, you may
do this with [hostPath volumes](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath){:rel="nofollow"}. On
startup, verify if the data exist and is valid: free for corruption, fully downloaded, fully verified with a checksum
when possible. If concurrent downloads can happen, implement a basic check such as a file that indicates that a download
is in progress and let each download write to a different path that you will swap with the correct one after validating
the results.

If your datasets are needed in whole groups of nodes, set up [DeamonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/){:rel="nofollow"}
to ensure an "init" pod is getting started in every node.

Finally, be careful about the all-in-one image. It simplifies CI/CD pipelines and other processes at the cost of
requiring frequent upgrades as their component count increases. Not every execution will need all these tools, there are
alternatives:

- Start with a small image and download the tools you need every time. [Alpine Linux](https://alpinelinux.org/){:rel="nofollow"}
  is a good option;
- Use [nixery.dev](https://nixery.dev/){:rel="nofollow"}. It's a dynamic container registry based on Nix that will build
  layer-optimized images with just the requested tools and their dependencies.
    - For instance, `nixery.dev/shell/ffmpeg/jq` contains just these binaries.
    - `shell` is a meta-package, just like `arm64`. This implies that the images are not multi-architecture!

### Light images

> Wait what? Users complain about images that are too small? Isn't this a desirable trait?!

[Distroless](https://github.com/GoogleContainerTools/distroless){:rel="nofollow"}, [DockerSlim](https://github.com/dockerce/docker-slim){:rel="nofollow"}
and [scratch](https://hub.docker.com/_/scratch/){:rel="nofollow"} can lead to very small images that will be hard to
debug because they will be missing critical tools. Do we need those tools in the first place?

We can get logs with `docker logs`, `kubectl logs` and with an agent. We can get some stats with `docker top`,
`docker stats`, `kubectl top pods`, etc. For simple tasks, keeping the door open to additional tools won't do anything.
But there are issues that cannot be debugged from outside like analyzing networking or permission issues. Here are some
options:

1. Start with an Alpine Linux base. It's only 5MB and has a package manager;
1. Use `kubectl debug` to start ephemeral containers within a given pod or node ([docs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_debug/){:rel="nofollow"})
1. Use [BusyBox](https://www.busybox.net/){:rel="nofollow"} or Nixery to inject tools in a container copied from your
   computer with `docker cp` or `kubectl cp`. Careful: `kubectl cp` needs `tar` to be present in the target container.
   There is a way around it: add a volume with the tools you need. Create an Init Container from a Nixery image and
   copies `/nix/copy` and `/bin` to the volume.

The promise of compressing layers with [UPX](https://upx.github.io/){:rel="nofollow"} may look enticing, but it is
advised not to do it! This considerably increases the time it takes to start up images and retrieve tools and does not
save much space in the end since the image will need to be decompressed anyway. Each time you start a container from a
compressed image, you incur this decompression cost. Keep away and keep your images uncompressed, even!

### Long builds

Are you building on top of custom images? Store them in a private registry and pull them whenever you need them. This
will shorten your build time significantly by reusing prebuilt bases.

You don't need to optimize the build context in recent Docker versions thanks to [BuildKit](https://docs.docker.com/build/buildkit/){:rel="nofollow"}.
If BuildKit is not available in your installation, try setting `DOCKER_BUILDKIT=1`. BuildKit optimizes builds by
transferring required files when needed, parallelizing build steps skipping unused steps and stages.

For frequent rebuilds during developments, there are multiple solutions:

- For interpreted languages such as Python or JavaScript, mount your code as a volume;
- For compiled languages, mount your code in a volume exposed to a "compiler" container which provides the build to a
  "run" container.

In some cases, running commands when files change can be sufficient. Tools like [entr](https://github.com/eradman/entr){:rel="nofollow"}
provide this feature. For faster Kubernetes development, use [Tilt](https://tilt.dev/){:rel="nofollow"} to shorten the
feedback loop to your cluster.

### Complex builds

If your Dockerfile is getting too complex, is it preferable to put its steps in a Shell script and invoking it or
leaving them in the Dockerfile? The answer may be surprising, but the latter is best for performance. Leaving the
Dockerfile as-is enables the engine to better use the caching abilities. Invoking the script may be better if the script
is already versioned and relatively complex so that it would be a shame to duplicate it.

Should the Dockerfile repeats, the story would be different. In the chance you need to build an image with the same
steps repeated many times, you may create a script that you load in a helper stage, then you may copy the results from
this stage in your final image. This is better explained by a demonstration such as [this Dockerfile](https://github.com/jpetazzo/shpod/blob/main/Dockerfile){:rel="nofollow"}.

Sometimes, builds are complex because they build multiple artifacts. If you created a script that invokes `docker build`
multiple times, use a compose file. Similarly, invoking `docker compose exec` only works in a running container. Prefer
running one-offs with `docker compose run`. If the container depends on other containers, use `depends_on` to let
Compose schedule them efficiently.

### Tips and tricks

- The Docker compose specification supports passing a build and an image for a service! This way the user can
  selectively pull or build the image depending on the situation;
- Docker-compose files can be run together with `COMPOSE_FILE=$file1:$file2` or `-f $file1 -f $file2`;
- Use .env files! They are supported natively. Be careful about the precedence if you use multiple configuration sources ([documentation](https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/){:rel="nofollow"});
- Use profiles to selectively start or stop collections of services ([documentation](https://docs.docker.com/compose/how-tos/profiles/){:rel="nofollow"});
- Ideally, software builds must run on any compatible environment, unconstrained by containers. If containers are
  necessary for software to run then you are doing it wrong!
- Be careful around tooling that you don't know how to use like [Bazel](https://bazel.build/){:rel="nofollow"}. Even the
  development team of Kubernetes got rid of it;
- Dockerfiles are not the only option: for Go apps, there is [ko](https://ko.build/){:rel="nofollow"}, for Java apps
  there is [jib](https://github.com/GoogleContainerTools/jib){:rel="nofollow"}. These tools might require some code
  adaptations but can build optimal images. [Buildpacks](https://buildpacks.io/){:rel="nofollow"} are yet another
  alternative, though you might want to assess whether they are the right packaging format for you.

## Conclusion

These practices are only suggestions. Some anti-patterns are not that problematic. Always choose a solution that works
for you, your team and your present needs.

## Questions and Answers
### What are some interesting container tools?

See [shpod](https://github.com/jpetazzo/shpod) for inspiration.

- [crane](https://github.com/google/go-containerregistry/tree/main/cmd/crane){:rel="nofollow"} for interacting with
  Docker images and registries;
- [jid](https://github.com/simeji/jid){:rel="nofollow"} to explore JSON payloads;
- [regctl](https://github.com/regclient/regclient){:rel="nofollow"} and [skopeo](https://github.com/containers/skopeo){:rel="nofollow"}
  to interface with registries;
- [gron](https://github.com/tomnomnom/gron){:rel="nofollow"} to turn JSON into properties;
- [cntr](https://github.com/Mic92/cntr){:rel="nofollow"} to dynamically add binaries to a container.
