---
categories: ["meetups/owasp-bdx"]
title: "Threat modeling for developers & Kubernetes"
---

## Threat modeling for developers
By Jonathan Marcil, Application Security Specialist  
[Slides](https://docs.google.com/presentation/d/1AMlkmPII6ZA9AYOOvUCcgRTwvJYItL4flrSijQX5VKQ/present){:rel="nofollow"}

Threat Modeling has a [Manifesto](https://www.threatmodelingmanifesto.org/){:rel="nofollow"} and a [Capabilities catalog](https://www.threatmodelingmanifesto.org/capabilities/){:rel="nofollow"}
written by 15 people with diverse backgrounds. Why did it deserve so much attention? What is it? As stated on the
Manifesto:

> Threat modeling is analyzing representations of a system to highlight concerns about security and privacy
> characteristics.

Note how security is not the sole concern here. We must create systems that protect people too. As for capabilities,
they are pieces one can assemble to build an effective Threat Modeling practice.

What would a developer under delivery and chaos pressure do? They would deliver, but they will probably ignore external
hints at their own detriment! What does an Application Security practitioner do? Understanding the context, the stakes
and implement Threat Modeling practices and capabilities as they see fit. The size of an organization is important as it
can influence which and how many capabilities are explored simultaneously and the depth of the exploration. An
interesting fact is that the size of a Security team is often similar whether the organization is small or big. What is
different is the level of engagement of the rest of the teams. As such, bigger organizations open new opportunities but
increase friction, processes and decisions.

As with any cross-functional task, the responsibility of Threat Modeling should not exclusively fall onto a single team,
but to the whole organization and its constituents. When time is not strictly committed to this activity, priorities
shift all the time and nothing gets done. Developers want to deliver value and may degrade the quality of Thread
Modeling activities.

Theory may not help here: training is most useful in the context of a Threat Modeling activity for a project of the same
development team. This way, knowledge about the practice gets spread, no context switching is possible and people get
practical with the newly acquired ideas. Everyone must work together and not sequentially: engagement about what
constitutes a threat and how systems work help build a shared understanding. After an initial buy-in of the method,
development teams will propagate their learnings in the organization and elsewhere if they believe in its effectiveness.

When Threat Modeling is a strategic objective on which an organization is aligned, development teams recognize its
value. However, when a company is subject to an actively exploited security threat, then is not the time for Threat
Modeling! Help solve the issue at hand, learn, prioritize and transform this failure into future success.

### Questions and Answers
#### Are there tools to help keeping track?

There are but none is truly exhaustive. Tooling is not magical even when it aligns with the philosophy as people must
ultimately implement and follow it. Moreover, any tool adds its biases and processes which may lead to conclusions
intended by the toolmaker, not those intended by the promoters of the method.

## Securing a Kubernetes cluster: challenges, scenarios, defense in depth
By Maxime Girardet, Pentester @ Advens

Kubernetes is a container orchestrator: it automates resource allocation, scaling, deployment automation and supports
infrastructure as code and GitOps capabilities. It is complex machinery, not suited for the lone app but for when its
capabilities are truly desired and beneficial.

Today, Kubernetes clusters are an active part of security research as they represent a growing attack vector. Chief among
them those hosted by Cloud providers which share some critical flaws as with Operation [Scarleteel](https://sysdig.com/blog/cloud-breach-terraform-data-theft/){:rel="nofollow"}
or the more than 80k attacks per month. Attacks on Kubernetes resource get more sophisticated over time, though defense
actions do not seem to progress at the same rate.

By default, a cluster is **not secure**. It does not filter network requests, encrypt communication, mutually
authenticate apps, filter app requests, restrict privileges, capabilities and so on. Each of these practices opens
avenues for attack vectors when just **one** app gets compromised. This is in response to a balance between security and
ease of use: Kubernetes leaned toward the latter.

From the outside, the Kubernetes API Server is publicly exposed, sometimes unauthenticated. Sometimes kubelets and
components are exposed as well. [Shodan](https://www.shodan.io/search?query=kubernetes){:rel="nofollow"} reveals those
clusters when it scans them. From the inside, the attack surface explodes: app vulnerabilities, server-side request
forgeries, command injection, finding anything to compromise an app is easy. As such, we want to reduce the potential
for a compromised app to damage the whole system after escalating and accessing critical Cloud services.

There are privilege escalation techniques for all three major Cloud providers and most involve the Instance MetaData
Service —_IMDS_— which provides information about a Cloud instance including Cloud credentials. This can be used by apps
to access Cloud services natively or by malware to escalate and break out of containers or worst case scenario into
privileges pods, also called "trampolines" and list secrets.

### Good practices

What can we do? Defense in depth is a defense method that applies protections at every layer traversed by an application:

- Keeping Kubernetes, OSes and nodes to date;
- Logging orchestrator events, metrics and logs and analyzing them for anomalies;
- Preferring allowlists to blacklists:
- Using stripped down distributions like [RKE2](https://docs.rke2.io/){:rel="nofollow"} by Ranger or applying CIS
  benchmarks for effective hardening;
- Keeping the OS, libraries and kernel up to date;
- Implementing [Pod Security Admissions](https://kubernetes.io/docs/concepts/security/pod-security-admission/){:rel="nofollow"};
- Use [Role Based Access Control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:rel="nofollow"}
  Authorization in Least Privilege: only set permissions that are going to be useful;
- Set up [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/){:rel="nofollow"},
  encryption, mTLS, a service mesh like [Linkerd](https://linkerd.io/){:rel="nofollow"} and [Istio](https://istio.io/){:rel="nofollow"};
- Set up network filtering;
- Run tests, not just synthetic ones;
- Secure apps, Helm Charts, Manifests and avoid ClusterRoles;
- Spread your learnings to administrators, developers, product owners and so on.

### Tooling

There are tools to help secure Kubernetes clusters and prevent threats to some degrees.

- [kube-bench](https://github.com/aquasecurity/kube-bench){:rel="nofollow"} by AquaSecurity for compliance and adherence
  to CIS benchmarks;
- [kubiscan](https://github.com/cyberark/KubiScan){:rel="nofollow"} by CyberArk and [kubectl-who-can](https://github.com/aquasecurity/kubectl-who-can){:rel="nofollow"}
  by AquaSecurity for RBAC auditing;
- [kubescape](https://kubescape.io/){:rel="nofollow"}, currently led by the CNCF, scans for security misconfigurations,
  known vulnerabilities, etc.;
- [Kyverno](https://kyverno.io/){:rel="nofollow"} is a policy engine for Kubernetes.

There are many layers to watch for in Kubernetes, which requires for a defense in depth approach, with audits, tooling,
security operations and knowledge about the API Server.

### Questions and Answers
#### What is a legitimate use case for `ClusterRole`'s `escalate` mode?

Much like `bind` and `impersonate`, no app should have a need for `escalate`. There are uses though, like Aggregation
controller.

#### Which of the three major Cloud Service Provider managed offerings for Kubernetes is the most secure?

Under the default configuration, Azure's is the most secure, though the default configuration is not secure enough.

#### Is mutual TLS mandatory? Are there no alternatives?

The largest service meshes handle mTLS by default, including certificates and rotation. Microservices can be configured
to indicate which ones they should talk to. Tooling can uncover what happens in a service mesh and identify unauthorized
requests.

#### Are the same vulnerabilities present in Azure Container Apps?

Because Azure Container Apps is Azure-managed and shares resources between many customers, Microsoft has an incentive to
apply better security practices than Azure Kubernetes Services.
