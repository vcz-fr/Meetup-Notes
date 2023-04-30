---
categories: ["meetups/ippevents"]
title: "Understanding DevOps to implement it"
---

{% include time.md %}

By Mehdi El Kouhen, Cloud & DevOps Architect @ Ippon Technologies  
{% include toc.md %}

## What is DevOps

The DevOps movement has been founded in 2009 by Patrick Dubois after he noticed that operations teams were having
trouble moving to Agile, a transition which posed no trouble to development teams. He considered that both teams should
collaborate more and to that extent that the concept of Agile should be pushed further.

He developed the following pillars for DevOps:

- Automation: Improving velocity, simplicity, security. Less humans in the loop means that systems can be brought up and
  down faster, thus shortening feedback time and accelerating the business even more;
- Measurements: You cannot control what you cannot measure. This pillar is about measuring what matter to have a sense
  on what improvements to prioritize, understanding their impact across the board and identifying potential issues by
  correlating them with captured metrics;
- Culture: Sharing common ideas, vocabulary and vision to efficiently focus on novel matters;
- Sharing: Documenting and sharing knowledge to ensure everybody is on the same page and raise the technical bar.

## Exploring the pillars

### Culture

> A way to think, feel, act in plurality.

Thinking and feeling will refer to collaboration and sharing. Plurality is the team. This saying implies that culture is
a communication tool that relays knowledge onto a community.

Ron Westrum studied the field in the medical sector. In his view, culture is a natural response to organizational
issues. And there are three kinds of organizations:

- Pathological: There is a head and they make the decisions;
- Bureaucratic: Everything is traced and siloed;
- Generative: Teams hold creative freedom; they can express their craft.

The Generative culture introduced by Westrum resembles the closest to the common DevOps philosophy. This culture element is a strong organizational predictor for performance.

### Automation

The stated objective is to automate every part of the Software Development Lifecycle or _SDLC_ for short. This includes
first setup of a developer environment, CI/CD and testing.

Speaking of CI/CD, "Continuous Integration" or _CI_ should fail fast and present relevant, actionable feedback. CI
facilitates cooperation as it builds, tests, assesses and prepares applications for deployment. Tests are an integral
part of the development cycle. They accelerate development as they provide a shorter feedback loop, right from the
developer's environment. The quality of the final product is consequently improved by tests as long as teams know what
is supposed to be developed and tested. As a developer, engaging with the product and the testing teams may be the best
way to bridge this gap.

_CD_ means two things depending on the context: it's either "Continuous Delivery" or "Continuous Deployment". The former
is about being able to deploy some package issued by the CI part of a pipeline. Not automatically though as automated
deployments necessitate advanced capabilities in terms of deployment strategies and observability. An example of
deployment strategies is Canary deployments, which limits a new version of a software to a set of the user base that
grows to 100% over a period of time. If you wish to use this method, be especially careful about retrocompatibility: you
may host multiple versions of your software backed by the same data layer, migrations can cause the old version to break
or the new version to be fed inconsistend data. Similarly, session preservation is a common issue for canary
deployments. Having to reconnect because the backend changed is uncomfortable at the very least.

Configuration management is about designing and managing the state of deployment environments so that they reach
reproducibility and traceability. Infrastructure as Code belongs to this domain. Given stable versions of an
Infrastructure as Code tool and providers and given a versioned configuration, deployment should result in similar
infrastructure in spirit. Differences can be due to external factors.

Security is under-appreciated until the unavoidable incident happens. Securing systems is hard as the security of any
system is as strong as its weakest link. Development teams must be trained at least to the [OWASP Top Ten](https://owasp.org/www-project-top-ten/){:rel="nofollow"},
security frameworks, Static Application Security Testing or _SAST_ and Least Privilege Access must be taken into account
as early as design phases of development activities and Defense in Depth and Security Monitoring must be part of any
operations toolbox. Security is not the matter of the Information Security team: these practices are an integral part of
the day to day of development teams.

Finally, compliance are company rules to integrate within software development. Development is the packaging of business
components into software. Compliance is the feedback to that: with compliance rules, the organization can run their
application portfolio more efficiently. An example is using tags to identify Cloud resources associated with a
department or an application, identify constraints between systems and automatically resolve configuration issues.
Scanning resources after the fact is a common practice as resources can be changed at any moment.

### Measurements

Two terms are swung around when it comes to measuring the state of an application: supervision and observability.
Considering that software runs as a black box in production, observability aims at determining the internal state of a
system based on what it outputs: logs, metrics and traces. Analyzing health check endpoints and response times is not
enough as we want to correlate data.

Measuring is not just for systems: the efficiency of a development team can be measured thanks to DORA metrics. DORA
stands for "DevOps Research and Assessment". This research group, led by Google, has reported about DevOps practices
adoption across industries over the years. We recommend their [self-assessment](https://dora.dev/quickcheck/){:rel="nofollow"}
to any organization interested in developing their DevOps practices.

Service levels are a way to measure the real-world impact of software. There are three kinds:

- Service Level Indicators, _SLI_: Technical or business metric that is tracked over time;
- Service Level Objectives, _SLO_: Internal objective for a given SLI;
- Service Level Agreements, _SLA_: Binding agreement between a service provider and their customer over a given SLI.

### Sharing

Collecting knowledge, summarizing and spreading it to the organization is a healthy way or raising the bar over time.
Doing so requires properly documenting, expressing feedbacks about a capability, technology, tool or project and
training individuals and teams to achieve their objectives.

To anchor practices, they must appear frequently. Sharing them is good, putting them to the test through code reviews,
peer programming, mob programming and post-mortems is better. Sometimes, this will require development teams to learn
how to operate their software to understand how certain practices improve resilience. This is known as "You build it,
you own it".

Steering an organization is like steering a boat: everyone must be on the same page. This is why organizational
objectives must be shared across the organization, top-down. Organization aspects play a large role into the efficiency
of development teams, which is why [DevOps Topologies](https://web.devopstopologies.com/){:rel="nofollow"} shares common
anti-patterns and patterns of software organizations.

## Tooling

The following is a list of recommended tools that implement some of the elements presented here. These tools may not be
perfectly suited to your organization yet they can provide significant value where they lack.

Culture: [Backstage](https://backstage.io/){:rel="nofollow"}

Automation: [Terraform](https://www.terraform.io/){:rel="nofollow"}, [Trivy](https://trivy.dev/){:rel="nofollow"}, [Flux](https://fluxcd.io/){:rel="nofollow"},
[Argo CD](https://argoproj.github.io/cd/){:rel="nofollow"}, [Kyverno](https://kyverno.io/){:rel="nofollow"}, [Falco](https://falco.org/){:rel="nofollow"}

Measurement: [Grafana](https://grafana.com/){:rel="nofollow"} (with [Loki](https://grafana.com/oss/loki/){:rel="nofollow"},
[Tempo](https://grafana.com/oss/tempo/){:rel="nofollow"} and so on), [GitLab Value Stream Analytics](https://about.gitlab.com/stages-devops-lifecycle/value-stream-analytics/){:rel="nofollow"},
[Faros](https://www.faros.ai/){:rel="nofollow"}

To learn more, you may read [the Whitepaper](https://automation.ippon.tech/asset/74:livreblancdevops2022pdf){:rel="nofollow"} ([archive link](https://archive.is/3Ih8m){:rel="nofollow"}) about the topic of this meetup.
