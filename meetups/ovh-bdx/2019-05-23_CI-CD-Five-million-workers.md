# CI/CD & HPC
🕑 *Estimated reading time:* **11mn**

## Table of Contents

  * [CI/CD: Five million workers](#cicd-five-million-workers)
    + [History](#history)
    + [Needs](#needs)
    + [Continuous Delivery Service](#continuous-delivery-service)
  * [Speed up your application delivery workflow](#speed-up-your-application-delivery-workflow)
    + [DevOps](#devops)
  * [The Pikcio way](#the-pikcio-way)
    + [Results](#results)
  * [Is HPC cloudable?](#is-hpc-cloudable)
    + [Presentation](#presentation)
    + [Cloudability](#cloudability)
      - [Frequent use, high load](#frequent-use-high-load)
      - [Infrequent use, low load](#infrequent-use-low-load)
    + [Offers](#offers)
    + [Questions and Answers session](#questions-and-answers-session)
      - [What about FPGAs? Are they relevant today?](#what-about-fpgas-are-they-relevant-today)
      - [How do you handle vulnerabilities that affect the CPU?](#how-do-you-handle-vulnerabilities-that-affect-the-cpu)

## CI/CD: Five million workers
By [Benjamin Coenen](https://twitter.com/BnJ25), Software developer @ OVH  
By [Richard Le Terrier](https://twitter.com/richardlte), Software engineer @ OVH - [Personal website](https://richardlt.github.io/)  
By [Steven Guiheux](https://twitter.com/sguiheux), Software developer @ OVH

### History

By the end of 2014, OVH, which was fifteen at the time, rocked large monorepos, monoliths and had increasing needs for CI/CD performance. Its solution at the time was to divide the monoliths into micro-services.

Each team is responsible for the applications it develops and the ecosystem it uses. To build and deploy their applications for instance, some teams were using GitLab while others were using Jenkins, deploying via shell scripts or with `git pull`. An effort has been maid to standardize the CI/CD process.

By March of 2015, the first results are in: PRs are requested by email, the integration with Atlassian creates it in Stash, starts a CI/CD with Bamboo. This set of tools being integration into the Atlassian Suite, this allowed for a fast integration with tight access controls. This setup was good, with separate environments and automated changelogs but it was limited in terms of scalability, team autonomy, API completeness, had no CLI and no isolation between environments!

Even though the current process was good, it was not relevant for OVH current systems and projects. Therefore, a dedicated cross-functional CD team has been created. This team builds the tools, trains technicians and broadcasts best practices. Its first major project was to solve the CI/CD issue.

### Needs

Years of development brought many languages and technologies into the stack: Go, Python, Java, Rust, OpenStack, Ansible, etc. A new CI/CD solution should be capable to handle all of these and the ones to come. The new solution would also need to account for more diverse needs such as:
- Flexibility in the delivery process. How the pipelines, stages and jobs are executed and in which order, conditional execution, permissions, notifications and templating;
- Extensibility by integrating with an existing ecosystem and additional plugins;
- Scalability by reserving the right resources at the right time. The solution has to aim for minimal wait, minimal waste and customazibility of the environment from the OS to the technology;
- Autonomy; the teams should be able to create and manage projects, related resources and permissions within the new tool;
- High Availability, a REST API, a CLI, self-hostability, reusability, etc.

No tool available at the time could match all of these needs. OVH chose to develop its own. Enters **CDS**.

### Continuous Delivery Service

[100% open source](https://github.com/ovh/cds), developed in Go and Angular. Derives from the needs of OVH and CI/CD's litterature. It reached the point where CDS currently deploys CDS!

**Flexibility:** Workflows are a set of conditional pipelines that can be executed algorithmically and connected by hooks with Git, Bitbucket, Webhooks, Kafka and more. The conditions can also be applied to stages and jobs. You can execute stages for specific environments, for instance.

All environment variables can be utilized to create conditions, from jobs to entire workflows. You could prevent production deployments if it is the last day of the week or the last hour of the day.

**Scalability:** A "hatchery" has been developed in Go. This component, which needs an API token and access to the API, listens for events and responds by generating workers and environments from the jobs prequisites. Hatcheries are compatible with numerous execution environments: Kubernetes, Local, OpenStack, VSphere and many more.

CDS handled a total of 5.7 million workers in 2018. This represented 12k containers per day or 3k VMs. Currently, it is running more than 3k workflows in approximately 250 projects and has gathered more than 700 users. The project also reached 2k stars on GitHub!

**Autonomy:** You can represent your workflow as a YAML and execute that workflow differently depending on environment variables. The YAML specification keeps a strict compatibility with the options exposed in the interface and vice-versa so that all teams are on the same level, feature-wise.

**Reusability:** In a classic CI/CD solution, jobs and stages can be reused but not entire workflows. With CDS, this is not the case thanks to the workflow templates. A template change can be globally applied its related children workflows!

## Speed up your application delivery workflow
By Thomas Boni, Solutions Architect @ Pikcio

### DevOps

What is DevOps? It is a philosophy that aims to update solutions more frequently. This is crucial, especially in startup environments, where fast iterations and ideas are key. There are several kinds of optimizations we can achieve by working with DevOps: deployment speed, meaningful feedback, operational optimization and uptime.

As such, a classic CI/CD workflow should resemble the following: Code compilation > Unit testing > Packaging > Integration and High-level testing > Deployment. The deployment may or may not be automated, depending on the team preference.

## The Pikcio way

Pikcio being a privacy-conscious company, they went with GitLab because it is open source, can be self-hosted and is works towards privacy. On top of that, it eases organization, DevOps workflows, documentation and publication.

Some guidelines have been set while using the tool: achieve fast productivity and autonomy, define a development and production workflow early on, publish more than just code on your repositories. Write tests, infrastructure as code, documentation.

Code-level tests avoid regressions and bugs. Packaging induce portability, reproducibility, quick deployment. Integration and High-level testing reproduces use cases, API calls, CLI commands. You can automate all of this and more with tools like [Newman](https://github.com/postmanlabs/newman) and [Venom](https://github.com/ovh/venom). Write documentation, build and publish it from GitLab with [Slate](https://github.com/lord/slate) or [Sphinx](http://www.sphinx-doc.org/en/stable/).

For your deployments, orchestrrate your applications and the infrastructure running them. Always think about managed solutions, they are often more cost-efficient, scalable and resilient than running everything by yourself. Also use templates for your deployments: with [Helm](https://helm.sh/), you can redeploy services on Kubernetes without reinventing the wheel every time. You can also learn how to use hooks to automate database migrations and pre-post deployment tasks.

Always deploy specific versions, immutably, with automated solutions. Your repositories should contain everything needed for the application to work, build, be deployed and properly configured.

### Results

This work made it possible to increase the autonomy of the developers. Today, zero-downtime deployments are a possibility and new recruits can start being productive on day 2! Among the challenges to come: bring more tests in, solve runner scalability issues and work on a canary release system.

## Is HPC cloudable?
By [Benjamin Barthe](https://twitter.com/b4mb0u), HPC expert @ Atos

### Presentation

HPC, which stands for High Performance Computing, aims to solve problems requiring large amounts of computational resources like meteorology, materials science, finances, nuclear science, etc.

Even though computations on a cluster went from one microprocessor to thousands of nodes over the years, the code running on these units never knows that its computations are scattered across multiple machines thanks to technologies like low-latency networks and protocols (InfiniBand, Omni-Path Architecture, Bull eXascale Interconnect, which can reach microsecond latencies!). Similarly, to spend more time computing, it necessary to sometimes store billions of files, at times reaching an Exabyte (1000 Petabytes or 1M Terabytes) and operate on them at speeds ranging from 100GBps to 1TBps.

Currently, the most powerful supercomputer on Earth listed on [Top500](https://www.top500.org/), the reference in the domain, is Summit, which totals 143PFlops, consumes just shy of 10MW, stores 250PB of files which transit at speeds of 2.5TBps!

### Cloudability

We will concentrate on two situations: a demanding system, high load and frequently used and a non-demanding system with moderate to low load, infrequently used.

#### Frequent use, high load

The cloud would give you an edge on scalability and hardware evolution. Having your system on premise, on the other hand, would help with networking, storage, hardware lifecycle and keeping costs down.

#### Infrequent use, low load

In case your system is used infrequently, having an on premise solution would not bring much if not additional overhead for the administration of the jobs you wish to execute and maintenance. Here, the cloud could appear to be a better solution. Do not take this for granted since each computing need has its own solution. Plus, you could mix cloud **and** on premise!

For instance, you can have an on premise cluster, prioritize your jobs based on a queuing system and send high priority jobs to the cloud if the queue does not allow them to run soon enough. You could use the cloud as a burst solution.

### Offers

Offers for HPC workloads are plentiful today even though each cloud vendor has not joined yet.

**Azure:** A convincing solution with 1k+ nodes, multi PB storage, InfiniBand and partenered with Cray since May 17th of 2019.  
**AWS:** You can run HPC workloads with their EC2s loaded with their custom EFA kernel. The latency is way more acceptable than Ethernet at around 15 microseconds but still far from the State of the Art.  
**OVH:** There is a chassis dedicated to Big Data and currently, it is very expensive. You do get free hardware upgrades and administration but it still does not justify the cost.  
**Bull:** The solution can be on premise or on demand, offers an online interface with preinstalled applications and remote 3D model visualization. Bull is a Google Cloud partner and of DDN.

### Questions and Answers session

#### What about FPGAs? Are they relevant today?

Short answer: it depends. For very specialized tasks, they might be relevant. For others, you could be porting your computations to GPUs with CUDA and the most out of them first. This is also how the main supercomputers in Top500 work today: they mostly rely on GPUs.

#### How do you handle vulnerabilities that affect the CPU?

You start by assessing if it impacts your datacenter. Depending on the context, applying a patch will not change anything as the vulnerability cannot be exploited. This is the case if your datacenter is offline or does not rely on code that may expose the vulnerability. In the opposite case, you will need to accept that the execution of jobs will be slower and hope for the best.