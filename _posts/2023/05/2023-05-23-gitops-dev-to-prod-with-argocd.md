---
categories: ["meetups/ippevents"]
title: "GitOps: From dev to prod with ArgoCD"
---

By [Vivien Maleze](https://twitter.com/VMaleze){:rel="nofollow"}, Architect @ Ippon Technologies  

## X as Code

When one hears about code, the conversation often concerns services or applications yet countless are the things that
could be managed using code: infrastructure, configuration, network and so on. The notion of "X as Code" encourages
using code as the single source of truth, not procedures applied manually.

The dark side of this is automation. Managing access, auditing, testing. Tests are pretty rare outside of software. The
solution to that: leveraging versioning to create a development workflow inspired of Sofware development: Merge
Requests, code reviews and CI/CD.

## Delivery

The standard delivery model is the Push deployment where a CI/CD system listens for repository events and triggers
commands. This comes with issues: managing CI/CD agents, maintaining their tooling, configuring access and ensuring
security. Even with bootstrapped offerings this solution cannot by design offer the ability to track deployments in
real time. Current Push deployments can only go so far.

Alternatives exist and one of them is the Pull deployment: the code versioning system becomes the single source of truth
that is actively monitored by deployment agents. These agents synchronize infrastructure state with the code versioning
system and hold the access that they require to provision applications thus simplifying security and operations across
the board. [ArgoCD](https://argoproj.github.io/cd/){:rel="nofollow"} is one of such tools and natively works with [Helm](https://helm.sh/){:rel="nofollow"}
and [Kustomize](https://kustomize.io/){:rel="nofollow"}.

The Pull deployment model also simplifies responsibility sharing: developers are responsible for the service and its
packaging and operators are responsible for the deployment. Specific deployment tooling is now integrated with the
agent, which simplifies all CI/CDs and adds visibility into everything that's deployed!

## ArgoCD

Right from the install, ArgoCD adds new Custom Resources that can configure applications to deploy. By default, ArgoCD
agents synchronize their state every three minutes but this value can be changed and one can manually trigger
synchronizations at any time. Rollbacks are possible from the Web interface though they will lock the state to avoid
futher synchronizations until the user unlocks it manually. Finally, using Kustomize it's possible to create clean
deployments for each environment to target.

This new model opens new possibilities: installing tooling on the cluster like OpenTelemetry. Moreover, ArgoCD itself
can be managed by ArgoCD after it's fully in place.
