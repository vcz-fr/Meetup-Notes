---
categories: ["meetups/aws-bdx"]
title: "Observability pillars applied to serverless"
---

By [Steve Houël](https://twitter.com/SteveHouel){:rel="nofollow"}, Cloud architect & Global Tech Leader @ Ippon
Technologies - [Personal website](https://www.steve-houel.com/){:rel="nofollow"}  
By [Pierre Baillet](https://twitter.com/octplane){:rel="nofollow"} SRE, R&D engineer @ Datadog - [Personal website](https://oct.zoy.org/){:rel="nofollow"}  
[Slides](https://www.slideshare.net/SteveHouel/observability-pillars-applied-to-serverless){:rel="nofollow"}

## A history of Observability

In 1945, World War 2 was still ongoing and planes were still crashing. The Army commanded scientists and statisticians
to help them determine how they should reinforce their planes to reduce the number of casualties. Scientists asked for a
map of the bullet impacts on planes that flew back to the base.

Initially, the Army reinforced the parts that were most hit by the bullets which did not improve survivability much.
Abraham Wald, statistician, suggested the Army to consider the opposite, that is reinforcing the parts that received no
impact as that would imply that those planes could not return.

This technique was not only very effective but also economical as it only required the most sensitive parts to be
reinforced.

Skip forward to 2005 with the LAMP stack. LAMP stands for Linux - Apache - MySQL - PHP. This stack was very, very
popular and not very effective to the point the community complained about not being able to serve assets with it!
Serving assets could indeed require drastic and unrelated solutions such as increasing the supporting instance capacity
or the resources allocated to the database!

Rather than looking for the issue, we should monitor the metrics and alert if they go over some defined thresholds.

The year is 2016 and micro-services are gaining interest. The complexity of infrastructures has become increasingly
exponential. Monitoring becomes difficult as metrics sprout all over the place. Rather than watching hundreds of graphs
for irregularities, we start to **observe**. From the output of a system we deduce its internal state.

There are four categories of states a system can be in:
* OK: HTTP 2xx, nothing wrong;
* Known error: HTTP 5xx, to investigate;
* Unknown knowns: A kind of errors that happen seemingly randomly;
* Unknown unknowns: The worst kind. Errors that happen but have not been detected at all.

Monitoring watches for known errors but cannot do anything against unknown unknowns! Like Abraham Wald, rather than
alerting when errors happen, we can alert when successes are oddly missing.

## Pillars and challenges

Observability operates on the belief that to find unknowns about a system there must be knowledge and understanding of
its three pillars: events log, traces and metrics. There are tools to achieve that and much more like Datadog, the ELK
suite and Splunk.

Serverless allows companies to run services with less consideration for infrastructure provisioning, scalability,
availability or power and service consumption. Since the system itself is event-based, it only runs when it needs to and
takes care of the rest.

With the advent of serverless new challenges appeared; with less control over the runtime and the infrastructure,
optimizing the environment code runs in has become unattainable. Limited maximum execution time, cold start latency,
lack of tests, versioning and canary release tools are still preventing its widespread adoption.

In addition, no access to the OS means not being able to run an agent side by side with the application or as a
background task, the scalability comes with an increase in log throughput and the number of services and interactions
may render tracing challenging. In other words, it could be preferable to hand over the processing of this data to
specialized third party tools.

## Datadog with AWS

[Datadog](https://www.datadoghq.com/){:rel="nofollow"} is a SaaS product that provides services such as infrastructure
monitoring, application and business metrics, distributed tracing, log management and search, dashboards and alerts. It
provides many integrations, contributes to [open source](https://github.com/datadog){:rel="nofollow"} and claims to be
infinitely scalable!

To integrate it agent-less in AWS, you will need to create a role and cross-account actions to read data and a function
that will stream your logs.

Cloud functions are natively handled by Datadog in a provider agnostic way. With flame graphs, you can get a
cross-service stack trace! With no serverless Datadog agent, you will have to rely on [AWS X-Ray](https://aws.amazon.com/xray/){:rel="nofollow"}
to integrate with your setup.

The log explorer parses, formats and completely indexes your logs in full text allowing you to formulate complex
searches and get results back fast. Having indexed logs is good but complex queries might not get you far when you need
to analyze behaviors. Using machine learning, Datadog can detect patterns from your logs and allow you to take action if
necessary.

When tools do not exist you can emulate them. For instance, to follow a request you could rely on a "correlation ID". By
adding an HTTP header with a random value and passing it through your stack you can trace a request end-to-end. You can
replicate this concept to sessions by asking the user to keep some session information between two requests. Similarly,
you can debug your AWS Lambda functions or determine their behavior by playing with HTTP headers!

Finally, Live tail is a feature that is an equivalent of a `tail -f` on your logs, with a few seconds of lag so that you
know what happens on your platform.

## Questions and Answers session

### How to effectively version endpoints in serverless?

[Amazon API Gateway](https://aws.amazon.com/api-gateway/){:rel="nofollow"} ships a canary release system. AWS Lambda
proposes alias shifting pre-packaged with [Amazon CodeDeploy](https://aws.amazon.com/codedeploy/){:rel="nofollow"}.

The origin of "canary": coal miners explored mines with a canary acting as a scout. Canaries are very sensitive
creatures that scream in case on instability of the section they were in, thus alerting the other miners not to join.

### How to implement new connectors with Datadog?

You can use the Datadog wrapper and service for the StatsD protocol, [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/){:rel="nofollow"}
and the agent most suited for your technology.

### How is Datadog monitoring its services?

Funnily enough, Datadog is dogfooding their own service. Indeed, Datadog uses Datadog to observe their production
environment. They also rely on serverless for its security aspect and non-core features.

When the platform experiences major outages there is no way to know what happened since the monitoring tool is down.
Fortunately, the team of SREs work hard on making the infrastructure extra-resilient, which is positive for everyone.

### How to anonymize the logs sent by AWS Lambda?

Unfortunately, there are no serious solutions in that space. The agent can use regexes to anonymize content, which is a
hit-or-miss approach or a CRC, which is more aggressive and might cause data loss.

### How to trace AWS Lambda invocations?

Today, you must use AWS X-Ray as a replacement for an official Datadog agent for AWS Lambda functions. The added value
of Datadog resides in the correlations between the logs and the traces.