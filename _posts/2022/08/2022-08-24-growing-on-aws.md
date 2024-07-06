---
categories: ["meetups/aws-vie"]
title: "Growing organizations on AWS"
---

## Getting started with cost optimizing on AWS

By Matthias Allitsch-Wutte, Senior Startup Solution Architect @ AWS

### How a startup starts

The story is all too common: a cool startup idea emerges and builds its MVP. It is simple yet delivers value and seduces
early adopters. The startup scales and with it its technical requirements as in compute, storage, network, etc.

To curb the sharp increase in costs that come with the growth and with the new cost-ineffective features to keep up the
adoption rate, cost-saving measures are taken such as commitments but that is never enough: the CFO will soon look at
the bill.

### Cost optimization

The correct way to proceed is to optimize costs, but what does that mean in this context? We agree on this definition:
delivering value at the _lowest_ price point. The [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/){:rel="nofollow"}
gives some hints as to what to look for in a cost-optimized architecture:

- Practice Cloud Financial Management: ensure that your organization gets the most out of its services;
- Adopt a consumption model adapted to the running services;
- Measure everything;
- Choose the right services for the job: one size never fits all;
- Trace down, analyze and attribute expenditure.

Proceeding into Cloud optimization requires a portfolio of supporting services. Organizations usually look into the
following:

- Plan: expectations, budget, baseline;
- Run: experiments, setup;
- See: monitoring, tracking, reporting;
- Save: opportunities.

For each of these elements, the AWS catalog of services proposes solutions that are waiting to be discovered by the
organizations.

### Scenarios and common improvements

#### Cost organization

An AWS Account is a resource container, the highest level resource and security boundary. Your organization should not
host all its workloads in just one. Plus quotas are account-based therefore you may hit rate-limiting because of bah
behaving applications hosted on the same account. Better billing separation can be achieved by hosting applications into
different accounts as data transfer costs can only be tracked at the Account level.

#### Account structure

AWS Organizations is an extremely powerful tool that should not be neglected. Start early with a clean and sensible AWS
Organizations structure. A common way to organize your accounts is simply to follow your company structure. Once done,
use resource tags to track each project at different levels.

Recommendation: In the Billing Console, enable "Cost Allocation Tagging" and choose the resource tags to track and save.

#### Cost visibility

If you wish to track the cost of your services, don't do it in absolute value. Instead, correlate your costs to KPIs
that demonstrate your service value. For instance, if you are hosting a microservice that takes orders from customers,
track the number of processed orders and correlate the service cost with it.

In any case, define meaningful KPIs:

- Cost-based: Compute hours used by the service, Reservation (or equivalent) coverage, Underutilization;
- Value-based: Searches, Processed orders, Visits.

#### Cost optimization

Usually, companies notice that their Cloud Total Cost of Ownership is smaller than on-premise after a Lift and Shift.
Right-sizing, elasticity, storage optimizations and such are quick wins to save significantly. Using managed services
and transforming your portfolio will elevate your architecture and open doors for innovation with serverless. Cloud
costs are not just driven by your technical assets: your procurement and operations teams, the licenses and general
efficiency losses should be accounted for in the decision process.

#### Right-sizing EC2s

Start by analyzing the performance characteristics of your workload: CPU, storage, network, IO and memory. Also analyze
usage patterns for all environments you are running your workloads on, even pre-release.

After your analysis, you should be able to comfortably shut down idle instances and select the best instance families
for the job. When possible, choose instances from the latest generation that are optimized for your workloads.
Reservations should be the last element on the list.

Recommendation: For applicable workloads, Graviton 3 translates to great cost improvements. Graviton instances offer
better performance for a reduced cost. Still, do your research and benchmarks.

#### Purchasing options

Compute resources can be purchased in four different ways on AWS:

- On-demand: the default option, inefficient in most circumstances. Avoid unless maximum infrastructure flexibility is a
  requirement;
- Reserved: significant discounts in exchange for usage commitments. This translates into capacity planning for
  your Cloud provider;
- Spot: the most significant discounts for preemptible workloads. Uses spare capacity behind the scenes;
- Savings Plan: a flexible option available for a wider variety of workloads including Serverless. Significant discounts
  in exchange for a spending commitment.

While Reserved and Savings Plans are based on commitments, their dynamics are different. When you commit to usage, your
Cloud provider reserves actual capacity for your workloads in their data center. When you commit based on spend, your
Cloud providers can make better financial projections. The second option does not reserve compute capacity! With
Reserved instances, you are encouraged to use your computing capacity to the fullest. With Savings Plan, you are
encouraged to spend your commitment, as unused spend commitment will not be refunded or transferred to the next month!

#### Elasticity

Always use Auto Scaling! Architect your applications so that they can grow and shrink in capacity without impacting user
experience. Also note that EC2 Auto Scaling and AWS AutoScaling are two different services for different uses, so choose
wisely your architecture before going in.

If your workloads are predictable in capacity, you may use [Instance Scheduler on AWS](https://aws.amazon.com/solutions/implementations/instance-scheduler-on-aws/){:rel="nofollow"},
which is a solution built by AWS to create start and stop schedules for your EC2 instances.

#### Lambda functions

Lambda is priced on multiple dimensions:

- Number of invocations;
- GB of RAM per millisecond of execution time;
- Data transfer.

To optimize your Lambda function, optimize your memory allocation setting, as the amount of allocated CPUs depends on
the amount of allocated RAM. Choose the appropriate runtime language and architecture (x86 or ARM).

On the code side, trim your dependencies and optimize static allocations to reduce cold starts and execution duration.
Lambda Runtimes may contain more than just the bare standard libraries. For instance, if your runtime contains a version
of the AWS SDK, you may use this version during development and avoid packaging this dependency in your production
builds.

Finally, you can validate your hypotheses with [AWS Lambda Power Tuning](https://docs.aws.amazon.com/lambda/latest/operatorguide/profile-functions.html){:rel="nofollow"},
which is a solution built by AWS to optimize Lambda function configurations.

#### Automated advisors

[AWS Compute Optimizer](https://aws.amazon.com/compute-optimizer/){:rel="nofollow"} analyses compute resource
consumption to recommend cost optimization actions. Its insights are gathered from workloads running on AWS based on a
Machine Learning model trained and managed by AWS.

[AWS Trusted Advisor](https://aws.amazon.com/premiumsupport/technology/trusted-advisor/){:rel="nofollow"} on the other
end has a broader analysis scope, recommending actions improving your stance on Cost optimization, Security, Fault
tolerance, etc. The amount of insights you will get out of this service depends on the AWS Support level for your
account.

#### Self-managed vs provider-managed

Most cloud providers propose services allowing their users to achieve the same goals with different levels of care and
operations. The more a service is provider-managed, the more its cost model is usage-based rather than purely
capacity-based.

At the same time, provider-managed services mean your teams won't spend as much time fine-tuning the service but will
suffer vendor lock-in; your service will be as flexible as the provider lets it be.

#### Storage

Not every application needs maximum storage performance and availability. In certain cases, storage can even be the main
cost driver! When it comes to Amazon S3 check out storage classes other than Standard, this may result in significant
cost savings for your workloads.

When such a thing is possible, compress any content you wish to store on storage space billed on stored capacity like S3
and EFS. This may result in another layer of significant savings for compatible assets. For images and videos, you may
store compressed versions while keeping the original in deeper storage while for text contents you may compress them
using standard compression algorithms to achieve up to 90% compression rates.

For capacity-priced storage services, the same line of reasoning is applicable, albeit less relevant. However, choosing
the storage class or type depending on the need still applies.

#### Forecasting

[AWS Pricing Calculator](https://calculator.aws/){:rel="nofollow"} is ideal for the planning phase of a Cloud project,
where it will give rough estimates of the cost of operation.

[AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/){:rel="nofollow"} is the Swiss knife
of cost reporting and dashboarding and it supports forecasting too. Use this to dive into your costs and optimize your spending.

[AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets/){:rel="nofollow"} is for setting budgets and
getting notified on spend anomalies before they reach critical levels.

### Next steps

Once the recommendations presented here are applied, you are sufficiently mature to try your hand at refining your AWS
Account architecture, tagging strategy, Cost Explorer usage, budgets and alerts. Use the notions you have learned to
their fullest and regularly self-assess using [Well-Architected Tool](https://aws.amazon.com/well-architected-tool/){:rel="nofollow"}
to ensure you are always ahead of things.

When you are truly out of recommendations to apply to your Cloud, contact AWS for further guidance.

### Questions and Answers
#### Is there a plan for an ARM to x86 translation layer similar to what Apple does with Apple Silicon?

No, there isn't any official plan for a translation layer between x86 and ARM. Perhaps an initiative could be announced
at re:Invent 2022.

_Edit:_ No announcement has been made in that regard during re:Invent 2022.

## Design your scaling-ready AWS multi account setup

By Daniel Linhart, Cloud Security Expert & Co-Founder @ Auvaria  
[Slides](https://media.auvaria.com/5gtnlbpipgod8fwyjmgq3mqxgojcfw5y/2022/08/24/aws-user-group-vienna-auvaria-scalable-aws-multi-account-setup.pdf)

Scaling is important for AWS Accounts: you don't want anything in your way when you need to grow. At the same time, you
want to use AWS to its fullest as soon as possible! There are many challenges to a decent structure for an AWS
Organization: Time to Market, Security, Networking, Separation of concerns, Automation, Maintenance and so on. This is
all a matter of striking the right balance.

### When one account is not enough

Each workload is different. Some have different data retention policies, isolation requirements, and application
capabilities. If business processes and teams necessitate separation, billing and quotas should benefit from this as
well.

Enter Landing Zones, which are the best practice when it comes to multi-account environments. Keep in mind that they're
a starting point, though! A Landing Zone is tailored to its company and its objectives, therefore before designing one
some key elements need to be clear:

- The organization units and how they would translate into a Cloud organization;
- Security and networking requirements;
- Shared services.

### The elements of a Landing Zone

In terms of Account management, [AWS Control Tower](https://aws.amazon.com/controltower/){:rel="nofollow"} is the
recommendation. It is not sufficient by itself but it will get their users far enough while following best practices.
Note that it is advisable to get networking right and extendable as early as possible as it is painful to migrate going
forward.

Workloads spanning multiple departments or entities will pose issues. A common way to organize accounts seems to revolve
around the pace of change: things that change less often should be traversed first like the application environment.
Your mileage may vary.

Access management is a solved issue as long as you possess an up-to-date company directory: [AWS IAM Identity Center (Successor to AWS Single Sign-On)](https://aws.amazon.com/iam/identity-center/){:rel="nofollow"}
can manage Account and application access and integrates with your current identity provider.

Security is a key element that stays under the radar until too late. Here, there are multiple levels to address:

- [AWS Config](https://aws.amazon.com/config/){:rel="nofollow"} for compliance and remediations, which should be
  configured with AWS Control Tower;
- [Amazon GuardDuty](https://aws.amazon.com/guardduty/){:rel="nofollow"} which analyses threats, DNS logs, AWS API calls
  and so on for suspicious activity;
- [AWS Security Hub](https://aws.amazon.com/security-hub/){:rel="nofollow"} which is the turnkey solution to enable
  and consolidate security service findings, compliance, etc. AWS Config and Amazon GuardDuty are two of those services;
- [IAM Access Analyzer](https://aws.amazon.com/iam/features/analyze-access/){:rel="nofollow"} and the others can help an
  organization customize or improve its baseline over time.

Another complex point not to get wrong is networking. Depending on the number of VPCs and appliances to connect, you may
lean toward Peerings if your architecture is simple or Transit Gateway after it reaches critical mass.

With change comes uncertainty. This part will take time to refine and many mistakes will be made: governance. That is
policy enforcement to enable or disable features, prevent insecure configurations, centralize backup management, and
tagging policies. Note that AWS uses usage data to improve their AI services and that you may opt-out at the individual
Account or Organization level via [AI services opt-out policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out.html){:rel="nofollow"}.
If you tend to provision similar services, don't forget [AWS Service Catalog](https://aws.amazon.com/servicecatalog/){:rel="nofollow"}.
And [Services Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html){:rel="nofollow"}, to
centrally manage your Account quotas.

A final note will be made on integration: stick to your favorite tech stack! Organizing your Cloud is an epic journey
that may last for months or even years. Manageability is paramount.

### Questions and Answers
#### What would be the generic components of a standard Landing Zone?

- Logs are worth centralizing and replicating, including VPC flow logs and AWS API Logs;
- Security services;
- Networking and DNS, for large organizations;
- SSO;
- IP access management through [Amazon VPC IPAM](https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html){:rel="nofollow"}
  which is expensive or a compatible third party option.

#### When would AWS Control Tower not be recommended?

GovCloud, which gets features later and therefore is late on new best practices. AWS Control Tower may not be for you if
you have requirements conflicting with the use of the service.

Again, AWS Control Tower is a great candidate to get started with Landing Zones. Once this capability is sufficiently
developed and your organization wants to dive deeper that what the service offers, it may be time to roll your own rules
or system.

#### What is the best way to get started with AWS Control Tower?

[Customizations for AWS Control Tower](https://aws.amazon.com/solutions/implementations/customizations-for-aws-control-tower/){:rel="nofollow"}.
It takes the effort teams would otherwise spend rolling their Infrastructure as Code for Landing Zones.
