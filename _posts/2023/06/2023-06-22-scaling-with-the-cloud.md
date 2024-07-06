---
categories: ["meetups/rock-n-cloud"]
title: "Scaling with the Cloud"
---

## How to adjust infra on GCP to keep up with the load?
By Jérémie Richardeau, JS Lead developer @ Wanteeed  
By Christophe Héral, VP of Engineering @ Wanteeed

### History

Wanteeed works with a press agency which wrote an article for _Le Monde_, a French journal. This article helped
popularize the platform so much that _TF1_, a French TV station, wanted to publish a story about them on the daily news.
This news segment would generate a spectacular need for IT infrastructure scaling. How can things be kept under control?

Fortunately, these events can be prepared and Wanteed would need to do the following before the news segment goes live:

1. Finding a user from Marseille that would agree to appearing in the segment;
2. Notifying partners to ensure they can withstand the exceptional load: [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"},
   [Mailjet](https://www.mailjet.com/){:rel="nofollow"}, [Unleash](https://www.getunleash.io/){:rel="nofollow"};
3. Anticipate as much as possible thanks to the community, analyze known weaknesses and components.

### Planning phase begins

Worst case scenario, the infrastructure catastrophically fails because of a overload of visitors. A temporary
redirection ([HTTP 302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302){:rel="nofollow"}) leading to a
static homepage dedicated to the event to optimize for conversion could mitigate this. And if this were to fail, a
static homepage deployed with Cloudflare and Infrastructure as Code with [Terraform](https://www.terraform.io/){:rel="nofollow"}
could do the trick. This page would display if the website starts returning server errors.

The database is a common source of bottlenecks. That one is not easy to solve: should vertical or horizontal scaling be
preferred? Horizontal is complex to reliably implement in a short timespan and vertical scaling is still acceptable when
your usual 4vCPU and 15GB RAM instance is priced $15/d. The exposure this event brings far outweighs the costs but the
database infrastructure would need to be upgraded for the event and no more to avoid incurring costs for no reason. A 4x
upgrade to 16vCPU and 104GB RAM would cost $65/d.

On the compute side, with Cloud Run and a NodeJS API, would it be preferable to consider horizontal or vertical scaling?
NodeJS runs tasks on one flow —which is often a source of confusion because NodeJS does not run in a single thread!—,
therefore horizontal scaling is preferable. Autoscaling is a great option if the containers can start fast and the
traffic increase is progressive. Unfortunately a sharp increase of traffic is expected here, which meant that
infrastructure had to be prepared.

Effectively preparing the service infrastructure requires a gross estimate of the traffic a single instance can take and
of the traffic to expect following the event to plan just right. Too many instances and money will be wasted, too little
and there's a chance new users won't get converted. The rest is preparing a script that adapts the autoscaling groups
min and max values.

### D-Day?

The infrastructure is up and ready to welcome large swathes of users, all the team is on deck. They'll execute scripts
on the two instances of the daily news just in case. Nothing on Saturday, nothing on Sunday. Oh well...

This gives one additional week to test out the infrastructure. During this week, the team would concentrate on testing
bottlenecks with a load testing tool. [Artillery](https://www.artillery.io/){:rel="nofollow"} was the tool of choice,
with its YAML configuration and its simple interface. And better scaling scripts would be written with [Terraform](https://www.terraform.io/){:rel="nofollow"}.
The result of 10 Virtual Users hammering production-like infrastructure for over five minutes: timeouts and 5xx HTTP
errors. The largest infra had fewer timeouts and some ID collisions with 60% CPU on the database. Good enough.

Only exception for Unleash, who noticed a scaling so dramatic that their own servers could not withstand the load. They
were not aware of the situation.

### D-Day, for real this time

On Sunday, during the 1pm news broadcast, there it was: a segment about Wanteeed! The infra kept going, tens of
thousands of accounts were created and the app ranked up in the stores! All day long, the traffic stayed at 60% over the
average, the infrastructure cost 2k€ and few errors were noticed.

All in all, readying up infrastructure is not that difficult. It requires preparation, the right kind of infrastructure,
good practices and application knowledge.

### Questions and Answers

#### Was the max database connection count taken into account?

Yes and in any case only backends could access the database.

#### Did you question the infrastructure in itself? Asynchronicity, Caching, Varnish?

This kind of load increase is rare but these elements were in the plan and will be anticipated in prevision for the
following times.

#### Did you adopt the practice of sudden load tests?

No, we did not since the event. It's mostly because of return on investment; you want to push your infrastructure to its
limits when it makes sense, not preventively.

#### Did you think about adding Replica instances to the database?

This could have reduced the load and allowed for better scaling indeed. It's still being reflected on. The database is
highly available and container instances start in 10 to 15 seconds.


## CDK to the rescue!
By Laurent Bouquin, Intégrateur d'application @ Daveo  
By Bastien Ceriani, DevOps Engineer @ ManoMano  
By Olivier Pillaud-Tirard, Cloud Architect @ ManoMano

Some time ago, developers and operations were completely working separately. [AWS CDK](https://aws.amazon.com/cdk/){:rel="nofollow"}
was a dream opportunity for developers to use their favorite programming language to develop their infrastructure. Well,
as soon as it truly embraces AWS.

### Infrastructure discomfort

This story starts in 2019 at ManoMano, with a lift-and-shift to AWS with load balancers and virtual machines and Site
Reliability Engineers —SRE— to manage this ordeal. Interactions were limited to tickets and latency could be observed in
all places. With all the monolith break up action going on, patterns started to emerge. Similar-looking applications
were being deployed, perhaps the time was ripe for some abstraction. And at the time, Terraform was all the rage and
modules were the go-to way of abstracting common infrastructure bits.

Then the applications started being deployed to [Amazon ECS](https://aws.amazon.com/ecs/){:rel="nofollow"} and [Amazon EKS](https://aws.amazon.com/eks/){:rel="nofollow"},
respectively AWS's managed container and Kubernetes services. This started changing the game and developers would
benefit from being autonomous with their deployments, possibly using [Helm](https://helm.sh/){:rel="nofollow"}.
Operations and SREs were close from the feature teams and some feedback was being exchanged but one thing appeared
clear: development teams aren't buying it. The tooling was designed by SREs for SREs. Outages happen to the best of us,
it's not a matter of _if_ but a matter of _when_ they happen and when they did, developers were not autonomous. SREs had
to scramble to find the root causes of the incidents. This even led to employees leaving the company.

Introspection time, what's wrong, why are developers not autonomous or confident, what's missing? How these
infrastructure components were managed was the biggest contributing factor. The ideas and the level of abstraction were
great but developers were not feeling it. So what's up?

### CDK, that unsung hero

CDK has been announced some time before re:Invent 2018 ([blog post](https://aws.amazon.com/blogs/developer/aws-cdk-developer-preview/){:rel="nofollow"})
and made generally available in July 2019 ([blog post](https://aws.amazon.com/about-aws/whats-new/2019/07/the-aws-cloud-development-kit-aws-cdk-is-now-generally-available1/){:rel="nofollow"}).
When interest in this technology was building up, [CDK8S](https://cdk8s.io/){:rel="nofollow"} and [CDKTF](https://developer.hashicorp.com/terraform/cdktf){:rel="nofollow"}
were reaching a sufficient level of maturity, with a glimpse of developer-friendly interfaces.

[CDK Constructs](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html){:rel="nofollow"} sealed the deal. By they
nature, they represent all the abstraction that is needed to engage with infrastructure. They can abstract a single
service very well or connecta collection of them by taking care of repetitive or complicated stuff. Higher level
Constructs would be opinionated in their security, cohesiveness and integration to simplify developer experience. This
enabled developers to deploy more easily, using TypeScript code. In just one year, adoption grew to 350 microservices!

### Then came Spinak

The key to this adoption was good initial design, introducing key developers, prototyping with them and standardising
the approach. As for the Constructs themselves, they adopted a product approach. If the product is good, it sells
itself. Changelog, support, announcements and branding are an integral part of the product. And as with any product, the
idea was to deliver fast and get feedbacks to iterate faster and faster. It started with the priority at that time, EKS
APIs and [Amazon S3 buckets](https://aws.amazon.com/s3/){:rel="nofollow"} then the project grew and grew with the needs
and migrations from the Old way of running infrastructure were progressively automated.

This product is not meant to cover 100% of the technical needs. Some services are not supported, some may never be. All
infrastructure cannot fit in the mold and this is not a bad thing! This product concentrates on the golden path without
being in the path to innovation. It becomes more extensible and integrates progresively more stuff: CDK8s, Helm
deployments, developer contributions and so on. Thanks to its surrounding code, this abstraction is agnostic enough
relative to what's deployed. So much that some components could transparently be replaced with others and their
migrations automatically handled.

This model enabled an organizational shift such that developement teams could autonomously deliver services end to end
and SREs could work on improving the platform reliability again. New developers would be onboarded by their team
members, with support and examples provided by them. Only complex issues and questions reached support after a while.

Oh and what's **Spinak** you ask? Well that's the internal name for this product. The idea for this name came from
Popeye, this fictional character that derives its incredible strength from eating spinach. This strength enables him to
boost his productivity and save Olivia, of course!
