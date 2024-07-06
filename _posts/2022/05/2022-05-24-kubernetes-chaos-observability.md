---
categories: ["meetups/sre-france"]
title: "Kubernetes, Chaos and Observability"
---

[Official blog post \[FR\]](https://sre-france.github.io/post/2022-05-24-live-from-bordeaux/){:rel="nofollow"} - [Video \[FR\]](https://www.youtube.com/watch?v=rrnCVoiALj0){:rel="nofollow"}

## Kubernetes and Chaos Engineering equals Love

By [Henrik Rexed](https://twitter.com/hrexed){:rel="nofollow"}, Cloud Native Advocate @ Dynatrace  
[Slides](https://github.com/sre-france/meetups/raw/main/meetups/2022-05-24/ne-laissez-pas-vos-mauvaises-habitudes-k8s-devenir-le-cauchemar-de-vos-administrateurs-k8s.pptx){:rel="nofollow"}
\- [Description](https://github.com/sre-france/meetups/blob/main/meetups/2022-05-24/ne-laissez-pas-vos-mauvaises-habitudes-k8s-devenir-le-cauchemar-de-vos-administrateurs-k8s.md){:rel="nofollow"}

### On Kubernetes

Kubernetes is an orchestration framework hosted on nodes, which are themselves hosted on physical or virtual instances.
These appliances come with their own set of limitations. The Kubernetes control plane is usually managed by Cloud
providers while the data plane which execute loads is managed by customers.

On start, new nodes are marked as _pending_. When they are fully provisioned they are _creating_ and when the ecosystem
is alive and well they become _running_. To complete this startup behavior, you can rely on readiness probes.

If the cluster is misconfigured, Kubernetes may transparently move pods to healthy nodes. What happens when all nodes
are saturated, though? Downtime. When this happens, you use eviction policies and base them of the concept of Quality of
Service:

- Guaranteed: Capacity needs to be guaranteed for this workload;
- Burstable: Remaining capacity is distributed to this workload;
- Best Effort: If there still is capacity left, it is distributed to this workload.

You can also rely on Requests and Limits to plan for resource allocations, especially memory. If you have common classes
of workload, you can also implement predefined classes to simplify configurations.

Kubernetes works like Tetris: it receives requests and optimizes their placement in the cluster. A request is defined on
two axes: the amount of CPU expressed in millicores and the amount of RAM in MB. Do define both, stay within limits of
the reality. Under and overprovisioning are both bad.

Requests are capacities that are somewhat guaranteed when placing your pod somewhere in the cluster. Limits are
enforced. They place a maximum on the amount of CPU and RAM your workload can consume. The CPU limit is based on
function time which is a heritage from Docker, based on cgroups itself based on quotas. When a pod breaks its CPU limit
it is artificially slowed down to a crawl. When a pod breaks its RAM limit it receives an OoMKill (Out of Memory) event
and must terminate soon.

Beware: misconfigured limits can impact production. Requests and limits must be refined over time.

### Chaos Engineering

Chaos Engineering is a process that aims at discovering vulnerabilities and failure modes by injecting all sorts of
issues in a system.

It starts by defining hypotheses that relate to the application failure modes. We posit hat can fail and how. The next
step is estimating the result of every failure mode and looking for the Key Performance Indicators that correlate the
most with each failure mode. After which we define a fallback policy and create the systems needed to collect the
metrict that back the KPI.

For instance, we expect that changing settings, upgrading or evicting services from a Kubernetes cluster should not
alter the stability nor performance of the cluster, have user impacts or cause downtime. If we need to build KPIs to
validate these facts, we would need to rely on one of the Observability pillars:

- Logs;
- Events;
- Metrics;
- Traces.

Let's talk abstractions and observability. Kubernetes exposes multiple layers of abstractions. In no particular order:

- Application: we expect to calculate _end to end response times_ and _error rates_;
- Node: _CPU usage_, _RAM consumption_, _number of pods_ and _Node pressure_ events;
- Pod: _requests_, _limits_, _usage_ metrics, _evictions_, _failed schedulings_, _OoMKills_ and _unhealthy reporting_ events;
- Container: no particular metric or event at this layer.

To simulate a maintenance evnt or an eviction, we could initiate a node drain. The effect of a node drain is similar to
that of an upgrade or a service eviction when it comes to node pressure. It is possible to trigger a node drain manually
or to cause an unusual situation by stressing a particular node until it becomes unhealthy.

To validate cluster configurations you could use a known load that you execute before and after the configuration
change. Compare the end to end response time, the error rate and any other metric that correlates with your hypotheses.

### Tooling

It goes without saying: before trying out any of these practices, make sure you have observability tools installed and
well configured. Some communities recommend running those tests on production systems: this is risky and should only be
attempted if you took all the precautions possible. Configuring your observability tools well also means isolating them
from your actual workloads so that they will not go dark if a node fails. To do so, you could rely on node labels.

[Litmus Chaos](https://litmuschaos.io/){:rel="nofollow"} is a Chaos Engineering platform that exposes three components:

- Chaos Center, a web interface for controlling chaos engineering experiments;
- Chaos Hub stores Chaos Experiments, which are experiment execution information or templates for chaos engineering
  experiments, some common and predefined, some private and custom;
- Exporters and probes, including Kubernetes agents.

[K6](https://k6.io/){:rel="nofollow"} by Grafana Labs is a load testing tool that integrates well with Prometheus thanks
to an [extension](https://github.com/grafana/xk6-output-prometheus-remote){:rel="nofollow"}.

[Prometheus](https://prometheus.io/){:rel="nofollow"} should not need any introduction, as the prime example for open
source monitoring and alerting platforms. There is an [operator](https://prometheus-operator.dev/){:rel="nofollow"} to
easily deploy Prometheus on a Kubernetes cluster.

If monitoring takes a toll on your cluster, Dynatrace can help lighten the load thanks to a component that exports
cluster metrics directly to your Dynatrace installation.

### Automation

SonarQube is famous for its Quality Gates which, when configured and applied correctly, can effectively prevent
development teams from shipping code that is not up to standards. Of course there are ways to cheat around those
limitations but having some kind of neutral tool which can fairly assess the state of a contribution and advise against
its release is a time saver, especially when you start trusting it enough to be the last bastion before an actual
release!

You can do that in Kubernetes too with [Keptn](https://keptn.sh/){:rel="nofollow"}! This tool will observe every piece
of data made available and avoids copy-pasting practices left and right by shipping its own analyses. You can implement
quality gates in Keptn too! And if production gets broken, you can implement remediations within Keptn. Everything can
be configured with Yaml.

You can implement Service Level Indicators and Service Level Objectives in Keptn too and these become the foundation of
your interactions with this tool. In practice when CI/CD finishes running tests, it asks Keptn to evaluate the quality
gates. Keptn proceeds to retrieve the related application profile, its SLIs, SLOs and metrics and uses all that data to
evaluate the state of the quality gate. The evaluation is score-based, each SLO having a configurable impact on the
score. This means that it is possible to allow some SLOs to fail and still have a score high enough that the quality
gate is green.

SLOs that relate to performance and long taim response latency can get lower scores while those relating to application
errors must not get worse as that would imply that the shipped code or configuration contains regressions. This is all
configuration through Keptn, too!

### Questions and Answers

#### How does Litmus Chaos compare to Gremlin?

[Gremlin Chaos Engineering](https://www.gremlin.com/chaos-engineering/){:rel="nofollow"} can inject errors inside the
application code. Litmus Chaos cannot do that yet but should be able to starting with their next version releasing
during Summer 2022. Other than that, Litmus Chaos's syntax may be more familiar as it is closer to [Argo Workflows](https://argoproj.github.io/workflows/){:rel="nofollow"}.

#### How does Litmus Chaos compare to Chaos Mesh?

While [Chaos Mesh](https://chaos-mesh.org/){:rel="nofollow"} has more weight in the community while _possibly_ being
lighter itself and feature-equivalent, Litmus Chaos is on track to become the new favorite platform for chaos
engineering in Kubernetes.

#### Are Argo Events supported in Litmus Chaos?

Considering how close Litmus Chaos syntax is to Argo Workflows support is likely but should be experimented just in
case.

#### Is Litmus Chaos used in production?

No! Litmus Chaos could very well run on a cluster loaded with probes to secure its environment. Running it on production
still requires solid practices with regards to observability and testing.

## Why only measuring uptime isn't enough to meet user-expectations

By [Pablo Seminario](https://twitter.com/pabluk){:rel="nofollow"}, SRE @ Resilience  
[Slides](https://raw.githubusercontent.com/sre-france/meetups/main/meetups/2022-05-24/why-only-measuring-uptime-isnt-enough-to-meet-user-expectations.pdf){:rel="nofollow"}
\- [Description](https://github.com/sre-france/meetups/blob/main/meetups/2022-05-24/why-only-measuring-uptime-isnt-enough-to-meet-user-expectations.md){:rel="nofollow"}

### Uptime robots

Uptime is today still used as a handy measure for user experience even though it is not really representative of the
actual experience with a solution. A solution can be slow or even down when nobody is looking. How do we go from there
to metrics that correlate with the actual experience of the service?

Let's define uptime:

```
Uptime = MTTF / (MTTF + MTTR)

MTTF => Mean Time to Failure
MTTR => Mean Time to Repair
```

Indeed, the time it takes for a service to fail then get back up is a complete up-down-up cycle. Averaged over a longer
period of time, this translates to an availability rate.

Why do we rely on uptime if it is such a lousy measure then? First and foremost for contractual reasons: Service Level
**Agreements**, compliance, reporting. Each 9 of availability, that is the division by 10 of the allowed downtime for a
service, is exponentially more expensive than the last.

Usually, external probes such as those from [Pingdom](https://www.pingdom.com/){:rel="nofollow"}, [Atlassian StatusPage](https://www.atlassian.com/software/statuspage){:rel="nofollow"}
and [UptimeRobot](https://uptimerobot.com/){:rel="nofollow"} call externally facing fixed URLs expecting some kind of
HTTP success code in the likes of 200 - OK or 204 - No Content.

There comes the question: what happens if no real user is offline and the service is down?

### Measuring what matters

> If a tree falls in a forest and no one is around to hear it, does it make a sound?

Is a downtime when noone is here to see it still a downtime? What happens when an application is responding slowly or
when one of many load-balanced hosts is down or when some requests are failing but not others? What qualifies as an
outage? On the subject of experience, how do you take tail latencies, response times and timeouts into account?

Given these questions, what metrics should be measured then? To answer that question, we could rely on the [Four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals){:rel="nofollow"}:

- Latency
- Errors: number of errors over number of requests
- Traffic: number of requests over time
- Saturation: memory, network, CPU, I/O, etc. usage

These four metrics correlate better with user experience. Uptime is still useful as an end to end measurement rather
than as a service quality measurement. Uptime is time based while some other metrics are count based. Counting the
number of requests per status, or those exceeding thresholds does not require running external probes; observability
systems and SRE teams see what users actually experience!

These metrics can also be evaluated from the user side too using user-side probes like [Sentry](https://sentry.io/){:rel="nofollow"}
and [Datadog Real User Monitoring](https://www.datadoghq.com/product/real-user-monitoring/){:rel="nofollow"} and their
JavaScript integrations! Make sure you know what you are doing as these solutions are intrusive and could be in
violation of privacy acts such as GDPR. They can also generate consequential amounts of data so you may have to finetune
the sampling rate.

Alternatives that do not mobilize final users exist such as [WebPageTest](https://www.webpagetest.org/){:rel="nofollow"}
and [sitespeed.io](https://www.sitespeed.io/){:rel="nofollow"}.

From there, you can configure Service Level Objectives on your favorite observability platform. Most of them support the
metrics required to implement the Four Golden Signals. You can then define error budgets and track their state.
Finetuning SLOs is the next logical step and the longest one as it requires a shift in the way teams own the service.
Demonstrating the interest, implementing measures, refining alerts, etc. will take time but it will be worth it.

### Further references

[Notes: Meaningful Availability](https://squidarth.com/systems/2021/01/08/meaningful-availability.html){:rel="nofollow"}  
[Available... or not? That is the question](https://cloud.google.com/blog/products/gcp/available-or-not-that-is-the-question-cre-life-lessons){:rel="nofollow"}  
[The Four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals){:rel="nofollow"}  
[Implementing SLOs](https://sre.google/workbook/implementing-slos/){:rel="nofollow"}  
[SLO — From Nothing to... Production](https://geototti21.medium.com/slo-from-nothing-to-production-91b8d4270bd5){:rel="nofollow"}
