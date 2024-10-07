---
categories: ["meetups/deezertech"]
title: "From container to image, practices and anti-patterns"
---

By Jérôme Petazzoni, Kubernetes trainer  
[Slides](https://docs.google.com/presentation/d/1Qj5DktkKhk0Me7WVP121ZwJpiaBgbJGkBsbMV5quCo4/edit#slide=id.gd3759f6f86_0_0){:rel="nofollow"}

## Disclaimers

We don't work with containers to work with containers: this belongs to a trend that transformed the web industry for the
last ten years.

There is no best or bad practice as practices are situational. By solely working with best practices and anti-patterns,
one may find contradictory statements. This is because advice has to be taken with the context that comes with it and
the context grounds the practice. As much as best practices lead to compounding benefits, anti-patterns do too.

## Practices
### Fat images

What is the best size for a container image? It depends! You may use a version of a smell test that is best suited for
your company. For instance: 100MB for a microservice, 1GB for a monolith and datascience can get away with multi-GB
images. A 10GB microservice should raise some flags.

Reducing the size of container images is a topic that has been hashed over and over again but here are some ways to achieve that:

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
1. Use [BusyBox](https://www.busybox.net/){:rel="nofollow"} or Nixery to inject tools in a container copied from your computer with
   `docker cp` or `kubectl cp`. Careful: `kubectl cp` needs `tar` to be present in the target container. There is a way
   around it: add a volume with the tools you need. Create an Init Container from a Nixery image and copies `/nix/copy`
   and `/bin` to the volume.

The promise of compressing layers with [UPX](https://upx.github.io/){:rel="nofollow"} may look enticing, but it is
advised not to do it! This considerably increases the time it takes to start up images and retrieve tools and does not
save much space in the end since the image will need to be decompressed anyway. Each time you start a container from a
compressed image, you incur this decompression cost. Keep away and keep your images uncompressed, even!

### Long builds

---

    Image custom? La stocker dans un registry puis pull build au besoin.

    Monorepo? Buildkit (activé par défaut) ou `DOCKER_BUILDKIT=1` Docker va envoyer les fichiers à la demande à Docker engine.

    Rebuild fréquent en dev? Pour les langages interprétés (js, python), monter etq. volume. Tous les compilés, compiler dans un conteneur à part ou en local, injecter dans un volume. Il existe des outils tels que `entr` pour lancer des commandes en réaction d'un fichier qui change. Pour Kubernetes, un outil appelé `Tilt` pour optimiser les déploiements.

Build trop complexe

    Dockerfile trop complexe: run.sh ou Dockerfile?
    Préférer Dockerfile pour le cache, sauf si script existant.

Répétitions, comme dl tarball + extract

    Utiliser un helper
    Script Shell qui enchaîne les `docker build` ? Préférer `docker compose build` au lieu de docker compose exec -> docker compose run
    `depends_on` pour les dépendances.

Tips & tricks:
    `docker compose` supporte build et une image simultanément
    on peut mixer plusieurs compose files avec `-f $file` ou bien `COMPOSE_FILE=$file`
    utiliser les dotenv.

Idéalement une build CI doit pouvoir tourner dans n'importe quel env. Les conteneurs ne doivent pas être incontournables !
Si un script force l'usage des conteneurs, on en devient dépendant, surtout quand Docker n'est pas disponible.

Attention aux outils qu'on ne maîtrise pas comme Bazel. Même l'équipe de Kubernetes s'en est débarrassé.

Dockerfile n'est pas la seule option. Pour Go, il existe ko, pour Java il existe jib, etc. Ces outils peuvent avoir des particularités concernant le code mais peuvent construire des images optimales.

Autre alternative = les buildpacks.

Conclusion

Ce ne sont que des suggestions.
Certains anti-patterns ne sont pas si graves.
Choisir une solution qui marche pour son équipe et ses besoins.

## Q&A

`Docker init` configs par défaut pertinentes?
    À tester, mais plugin à installer.

Outils intéressants ?

voir [shpod](https://github.com/jpetazzo/shpod), crane, [jid](https://github.com/simeji/jid), regctl, skopeo, [gron](https://github.com/tomnomnom/gron) (json to props), [cntr](https://github.com/Mic92/cntr) (ajout de binaires à la volée)