---
categories: ["meetups/cncf-bdx"]
title: "Crossplane and Kubernetes incidents"
---

## Crossplane: Deploy Cloud resources fron Kubernetes with no drift
By Vivien Ramahandry, Lead SRE @ Jump

### Context

Software engineering is an ever-evolving topic that grows in complexity over time by the amount and systems,
specialization and business knowledge it touches on. The last decade has seen data, AI and the Cloud taking shape and
growing in adoption. Kubernetes has become the _de facto_ platform for hosting apps, from the point of view of
developers in larger organizations. Outside of the situations where it may be less desirable, development teams have
started to contribute and request features that further enable Kubernetes to become the universal app platform.

One of these feature requests is for the Kubernetes reconciliation loop to apply to resources external to Kubernetes
like Cloud provider resources. This would allow DevOps teams to package Cloud resources in Helm Charts just like
anything else. This leads to less enquiries from software development teams to write and maintain infrastructure as code
and more time spent on meaningful tasks. On the technical side, Kubernetes ensures the drift will be minimal, which
avoids the common trap with infrastructure as code when mixed with manual operations.

Infrastructure as Code is awesome and should be the standard in every organization, but it is far from perfect:

- Practitioners sometimes forget to update their code after manually testing changes;
- The source of truth will wipe out any manual change to tracked resources;
- Untracked resources created outside of the provisioning loop may lead to undesirable side effects like differences
  between stages.

Kubernetes-based Infrastructure as Code solutions such as [Crossplane](https://www.crossplane.io){:rel="nofollow"}
are designed to reduce the prevalence of these issues.

### Crossplane

Created by Upbound and CNCF Graduated since November 2025, Crossplane is technologically mature and used in production
is large organizations. It is designed to extend the orchestration and provisioning capabilities of Kubernetes to
external resources, especially Cloud. Like with most Kubernetes-based solution, it is configured with YAML manifests.

#### A refresher about Kubernetes

Understanding how Kubernetes works can give a sense of how Crossplane will do its job. Kubernetes manages a set of
resources configured through manifests. These resources are actually managed by controllers which are in charge of
implementing actions to fetch the managed resource, create, update or delete it. The controllers also ensure the
resource is present and healthy and must be able to fix drifts swiftly.

Therefore, Crossplane adds controllers to extend the catalog of manifests the Kubernetes cluster can manage. Once
Crossplane is provisioned, software development teams are immediately able to submit Crossplane manifests to provision
resources on their favorite Cloud provider along with manifests to provision their apps. If anyone manually changes one
of the managed resources, Crossplane will reset the resource configuration to its manifest.

#### Deeper under the hood

Crossplane creates a set of [CustomResourceDefinitions (CRDs)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/){:rel="nofollow"}
once installed. It won't immediately be able to provision Cloud resources, as this requires authorization from the Cloud
provider. However, it's possible to replicate what would happen in a real AWS Account by additionally setting up
[Minikube](https://minikube.sigs.k8s.io){:rel="nofollow"} and [Localstack](https://www.localstack.cloud){:rel="nofollow"}.
For real environments, we would create a Crossplane [ProviderConfig](https://docs.crossplane.io/latest/packages/providers/#provider-configuration){:rel="nofollow"}
to configure the connection to the Cloud provider.

Crossplane is not limited to adding infrastructure, it can also import existing resources by "Observing" them through
[managementPolicies](https://docs.crossplane.io/latest/managed-resources/managed-resources/#managementpolicies){:rel="nofollow"}.
Once the resource has been properly configured, the managementPolicy can be adapted so that Crossplane can act on the
resource.

Crossplane is not particularly hard to master and can be relevant for development teams familiar with Kubernetes and
Cloud services. It is best used for resources which lifecycle is tied with the app they serve, less so for foundational
resources such as network components, shared infrastructure or complex configurations.

### Questions and Answers

#### How do you delete resources with Crossplane?

By default, when the manifest covering the resource is deleted, the resource is detached from Crossplane and deleted
from the Cloud provider. It is possible to prevent deletion by setting the right `managementPolicies` on the resource
manifest.

#### Is every Cloud resource type available?

Hard to say, however it is possible to invoke Terraform providers in the CustomResourceDefinition but not without
infrastructure drift because of how Terraform works. As with Pulumi; if an official provider is available, the resource
can be provisioned. Non-official providers would work too with some quirks.

#### Does Crossplane simplify Cloud onboarding for development teams?

For development teams already familiar with Kubernetes, Helm and their Cloud provider, the ability to template and
provision common Cloud resources with their app does help. Organizations developing apps following similar topologies
could go as far as implemting them as Helm Charts capturing Cloud resources as well.

#### How can one follow Crossplane changes to resources?

Crossplane emits Kubernetes events.

## Kubernetes: 5 creative ways to destroy your production environment
By Denis Germain, Platform Engineer & Engineering Manager @ Lucca

The following stories are based on true events derived from past Kubernetes clusters administered the "hard way".

As an obligatory reminder, Kubernetes is a containerized workload orchestrator that contributes to solving a problem
created with Docker: empowering devs to extend their scope to the underlying infrastructure. Kubernetes connects apps
with underlying hardware and adds features thanks to this integration and its ecosystem maturity.

#### Healthchecks, Liveness, Readiness

In any base resource, Kubernetes has mechanisms for apps to report their health under different angles:

- The liveness probe indicates that the app is healthy;
- The readiness probe informs the the app is ready to receive traffic;
- The startup probe is rare to be seen. This is for slow-starting apps to report when they are ready to handle traffic
  for the first time.

In this story, developers were massively onboarding on Kubernetes. Microservices were decoupled using a message broker
that distributed messages between services. Thanks to this separation, each service health was independent from other
services. Because the message broker was a critical component, the Kubernetes cluster that supported it was designed to
be extra resilient.

In fact, the message broker was so resilient that the assumption that it was unbreakable seeped in the health check
code; if the broker is unreachable, some microservices considered that their dependents were not healthy. This caused a
chain reaction:

- The message broker is down;
- App A sees that the message broker is down and reports it is unhealthy through its liveness probe. Kubernetes kills it
  in a loop;
- App B sees that the App A is down and reports it is unhealthy through its liveness probe, and so on.

This happens when development teams do not understand what probes are for and implement them naively. Fixing the issue
with the message broker was not enough because the apps were still crash looping. The chosen solution was to edit the
probes in all the manifests, to request for liveness and readiness probes to be implemented the proper way, to formally
prohibit external dependencies in probe code and for a non-native endpoint to be added for apps that really wish to
expose the srtates of their dependencies.

There was an alternate solution: restarting all kubelets then all the pods at once to solve app dependency issues.

#### helm.sh/release.v1

Helm is a Kubernetes package manager, a templating tool and an app lifecycle management service.

In this story, a migration from Helm v2 to v3 was in progress. Before concluding the migration, some cleanup was in
order and it turns out the cleanup may have caught resources that it shouldn't have because their API version was
"helm.sh/release.v1"! 

> \- "v1"? That's so old that it should have been deleted ages ago!  
> \- Not too fast! These resources were critical for Helm!

Indeed, some of these resources were storing the state of Helm and of the apps it managed. Simply recreating thoses
resources manually doesn't cut it because Helm only manages resources created by Helm. You cannot re-install Helm from
scratch either in a production environment. So is all hope lost?

Not really, but only because the etcd database was backed up. Restoring the service required extracting the right data
and manually applying the missing resources with a Shell script. Solutions such as [Velero](https://velero.io){:rel="nofollow"}
can protect against these kinds on incidents, in only they are installed before they happen.

There are alternate solutions: if the deployments were automated through [ArgoCD](https://argo-cd.readthedocs.io/en/stable/){:rel="nofollow"}
or [FluxCD](https://fluxcd.io){:rel="nofollow"}, the source of truth would have moved from Kubernetes-managed resources
to Git. By the way ArgoCD is compatible with Helm boes does not use Helm under the hood while FluxCD does! FluxCD is
thus exposed to some Helm issues. In any case, GitOps prevents certain classes of issues but are not effective against
all of them.

One last theory that could be worth experimenting would be to deploy a fake secret that would fool Helm into believing
that a realease happened.

#### Two VirtualServices, one URL

An Ingress is a Kubernetes resource that enables connectivity from the outside world to services within the cluster.
This is like a reverse proxy but for Kubernetes. A VirtualService is basically the same thing specific to [Istio](https://istio.io){:rel="nofollow"}.

This story is about a microservice developed specifically for an iteration of a yearly event. Each year, a new one is
developed and hosted in Kubernetes. In these situations, developers tend to copy-paste code to avoid having to redo
work. This caused the VirtualService resources to listen for the same URLs, which might not seem much but caused all
apps to somehow become unreachable even though they were all up.

Helf of the network calls to the service responded with 4xx and the rest with 5xx, which made debugging way harder then
it should have been. This was caused by a load balancing mechanism similar to a round robin from the Ingress controller
to the two VirtualServices. There is no definitive fix, however there are solutions to validate manifests before
applying them: ValidatingAdmissionControllers and MutatingAdmissionControllers
([documentation](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/){:rel="nofollow"}).

While they are not very ops-friendly today, solutions like [OpenPolicyAgent](https://www.openpolicyagent.org){:rel="nofollow"}
and [Kyverno](https://kyverno.io){:rel="nofollow"} implement the specification well enough that such issues can be
prevented with custom rules.

#### Certificate Authority expiry

In Kubernetes, all system communication is encrypted. Managed Kubernetes offerings hide this from administrators, but in
clusters deployed manually with tools such as [kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/){:rel="nofollow"}
cluster administrators must monitor certificate renewal even though it is automated by default.

In this story, certificates were _manually_ managed, which must be avoided when possible. Certificates were about to
expired though thankfully didn't. In the scenario where they did expire, what would have happened?

- Kubernetes clients cannot talk with the API server;
- Nodes cannot talk with the API server;
- Neither can the scheduler or the Controller manager (manages reconciliation loops);
- the Container Network Interface would need informations from the API server, which it can't get;
- When API server can't talk with etcd, it automatically restarts after two minutes;
- If an etcd instance can't synchronize with the others, it will terminate itself;
- On top of all this, Kubernetes can't report any event, metric or log to anywhere rendering administrators blind to
  what is happening!

Renewing certificates manually is far from simple as it requires following a sequence of tasks without fail:

- Renewing the topmost certificates of the chain, then all signed certificates;
- Restarting etcd with the new certificates and observing the cluster state;
- Restarting the cluster components such as api-server, controller-manager, scheduler and so on;
- Updating Service Account tokens which are also signed with the cluster certificates, then anything that talks with api-server;
- Checking that everything runs, restarting everything that does not.

Don't manage certificates manually unless you **really** have a good reason to. Monitor your certificates regardless of
if their renewal is automated or not, put calendar events if you need to. If you are developing an app that talks with
Kubernetes components using a ServiceAccount, don't use the long-lived token issued with the Service Account and
generate time-bound tokens using the [TokenRequest API](https://kubernetes.io/docs/reference/kubernetes-api/authentication-resources/token-request-v1/){:rel="nofollow"}.
Finally, you may use [enix/x509-certificate-exporter](https://github.com/enix/x509-certificate-exporter){:rel="nofollow"}
to back up your certificates.

#### systemd, where are you?

In this story, a manually deployed cluster was being migrated to a kubeadm one. The intentions were commendable: ubuntu
22.04 (latest stable at the time), [Cilium CNI](https://cilium.io/use-cases/cni/){:rel="nofollow"}, baremetal nodes,
immutable infrastructure (cattle, rather than pets) and GitOps-managed apps.

During the migrations, nodes only became responsive on their management IP and the other network interfaces were down.
All containers became unreachable, probes were failing and control plane components were crash-looping. Reinstalling the
nodes did not solve anything.

It turns out that on this version of Ubuntu systemd introduced a subcomponent called `systemd-networkd` which resets
network routing rules on startup. All is fine since the infrastructure is immutable. Well the infrastructure sure was
but not the OS: nodes had a component that would trigger OS updates whenever a vulnerability was found. Such a
vulnerability happened, which triggered updates, a node restart, then `systemd-networkd` reset the route table and
everything became unresponsive. And because all nodes were setup with the same OS, the same vulnerability triggered
updates on every node of the cluster.

Whether you like it or not, you cannot delete systemd and should not stop updating your nodes. However, you could set up
your systems differently: creating a secure base image, testing it and deploying it in a rolling update. Ideally, you
might prefer minimalistic OSes like [Talos Linux](https://www.talos.dev){:rel="nofollow"} or [Flatcar Container Linux](https://www.flatcar.org){:rel="nofollow"},
which only contain the absolute minimum to run containers and cannot be updated.

### Takeaways

Observability and automation are key to running a good Kubernetes platform. To that effect, restrict capabilities to the
strict necessary to avoid bothering devs with too many minute details and prefer GitOps deployments when possible. Don't
do anything the hard way and make everything immutable to simplify management tasks.

### Questions and Answers

#### Was there a situation where things went wrong?

None where production was broken and beyond repair but situations where neighboring systems where! Kubernetes just works
and prevents a lot of incidents when used correctly, which is the hard part.
