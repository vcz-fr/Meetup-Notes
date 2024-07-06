---
categories: ["meetups/aws-bdx"]
title: "Building a resilient and secure web application on AWS"
---

By [Guillaume Lannebere](https://twitter.com/guillan40){:rel="nofollow"}, IT Technical Architect @ Betclic Group

## Example

The example chosen for this presentation is a tipster website. A tipster is a person that delivers hints on winning
bets.

This application is based on a simple REST CRUD API with an administration back-office. With thousands of monthly active
users, the site starts to show its limits in terms of scalability. While rehosting and refactoring this application, a
premium subscription could be added to help balance out its new costs.

Currently, all the components of the applications are hosted on the same server, including its database, hence the
scalability and resilience issues that will become central to this presentation. Indeed, the lack of backups, the fact
that everything is publicly accessible, strong coupling between infrastructure elements and the absence of scalability
hampers the growth of the service.

These components include two [Angular](https://angular.io/){:rel="nofollow"} front-ends, a Tomcat server hosting a [Kotlin](https://kotlinlang.org/){:rel="nofollow"}
API and a MySQL database. The new architecture will be cloud-native and based on classic AWS services.

## Migrating to AWS
### Some definitions

**Region**

: A separate and independent geographical zone hosting one or multiple Availability Zones distant from each other by
tens or hundreds of miles.

**Availability Zone**

: An _AZ_ is a physically isolated data center. It is connected to the other AZs of the same Region with a low-latency
connection, possesses its own independent power supply and resilience mechanisms.

**Virtual Private Cloud**

: A _VPC_ is a virtual datacenter providing isolation from other VPCs of the same and other AWS accounts. AWS users can
manage network and routing in their VPCs.

### Resilience considerations

AZs are not perfectly resilient as some services may fail from time to time, even for short timespans. For instance, on
August 31st of 2019, a datacenter in North Virginia experienced a power failure that ultimately caused the failure of a
significant share of the instances and volumes attached with no means of recovery! To be resilient, it is imperative to
host services on at least two Availability Zones.

An empty VPC being an isolation component, it has no access to the Internet by default. To add this feature, an Internet
Gateway must be attached to it. In addition, adding subnets and routing tables will enable hosted resources to access
the network in the right conditions:
- For public subnets, make sure that there is an Internet Gateway attached to the VPC and that the routing table of the
  subnets forwards network to it;
- Resources hosted in private subnets may not receive requests from the Internet though they may be able to request
  content if private subnets contain a NAT Gateway which is the equivalent of a home router appliance. This pattern may
  be used for downloading updates, for instance.

By default, AWS creates a VPC with public subnets. When there is a need for a more secure cloud architecture, this VPC
should be deprovisioned and replaced. A VPC requires the association of a CIDR, a range of IP addresses that it covers.
If you wish to create and visualize CIDR ranges, you may use [this application](https://cidr.xyz/){:rel="nofollow"}. In
VPCs, CIDR for IPv4 may not exceed `/16`. This means that you will have at most 2^(32-16) = 2^16 addresses at your
disposal. Note that creating a VPC will not create any Subnet or Internet Gateway. It does create a Route table, a
Network Access Control List and a Security Group, however.

A newly created Internet Gateway will not be assigned to any VPC by default. This requires an additional action that
will make it available to all subnets but not connected. To do that, you will need to make sure to create a Route table
that redirects non-internal traffic to your Internet Gateway and associate it to public Subnets only.

Moving back to resilience. It will require creating a Subnet on at least two Availability Zones. It is recommended
starting with two public and two private Subnets. AWS will reserve five addresses on each Subnet: Network (first @), VPC
router (second @), DNS server (third @), Reserved for future use (fourth @) and Broadcast (last @). A Subnet may have a
CIDR between `/16` and `/28`, meaning it will contain at least 16 addresses of which five will be reserved. Do not
forget to enable automatic assignation of IPv4 addresses on your public Subnets.

From there on, it is possible to start creating components, starting with an off-the-shelf database. [Amazon Relational Database Service](https://aws.amazon.com/rds/){:rel="nofollow"}
or _Amazon RDS_ is among the slowest to provision so it is recommended starting with this one when hosting classic web
applications on AWS. For demonstrations and small projects, there is a Free Tier that cancels most of the charges
incurred with the usage of the service. In every case, a database should never be publicly accessible. It is to be only
assigned to private subnets and covered by a dedicated Security Group.

Availability and durability on Amazon RDS are active-passive concepts that rely on Standby Replicas, which receive
updates from the Master database but will only be accessible when it fails. To not be confused with Read Replicas, which
are meant to enhance the read performance of your database.

## Starting instances

[Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html){:rel="nofollow"} are an
essential security feature that may be understood like stateful firewalls which deny traffic by default. Security groups
can be associated with most resources within VPCs including Amazon Elastic Compute Cloud instances, or _Amazon EC2_
instances, which are basically rented computing capacity. Security Groups rules may allow inbound and outbound requests
from specific IPv4 and IPv6 CIDRs, other Security Groups or even itself. For instance, it is possible to require the
database Security Group to allow connections on its default port from the instance Security Group. That would cause only
these instances to be able to connect to the database, only to the authorized port.

An [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html){:rel="nofollow"} or _AMI_
generally contains the OS that would boot on an EC2. It is possible to pre-package additional software and application
code in an AMI so that the instance would setup way faster, which will help with scaling. For elements that require
configuration such as retrieving the latest version of a service or code, it possible to pass scripts that would execute
during the instance setup steps. This script is referred to as User-data.

An EC2 may also use AWS services on its own. For instance, it could listen on a queue provided by [Amazon Simple Queue
Service](https://aws.amazon.com/sqs/){:rel="nofollow"} or _Amazon SQS_. By default, this is impossible unless the
instance is authorized to do so using an Identity and Access Management Role or _IAM Role_. IAM Roles are the way to go
to allow services to use AWS features like humans would do. Human users can also assume those roles in very specific
cases, however IAM users may do the trick on simpler accounts.

## New architecture

### Load Balancers

In order to be truly resilient, each resource must be made available in at least two AZs so that if one fails, the
application is still up and running. It is thus required to have a system that will detect outages and redirect the
traffic to solve availability and elasticity issues.

On AWS, there are three types of [Load Balancers](https://aws.amazon.com/elasticloadbalancing/){:rel="nofollow"}:

- Classic, now deprecated but very basic and simple to use;
- Network, a very performant low level (Layer 3) load balancer;
- Application, a new generation, performant load balancer that comes with lots of added features.

Load Balancers require endpoints to load balance traffic onto. Those may be instances that may be created manually or
with the help of a properly configured collection of instances. Load balancers are attached to Target groups, which
represent traffic targets. Each target of a defined Target group receives, under normal circumstances, the same kind of
traffic. It is possible to define those normal circumstances using custom health checks adapted to your service.

A load balancer can be internal or publicly accessible. In any case, it must be connected to at least two different
Availability Zones. An Application Load Balancer can contain one or more listeners with one or more rules defining the
way traffic is routed to a defined Target group. Do not forget to add the instances to be covered in the Target Group of
your load balancer.

Additional AWS services may interact with your load balancer such as a [Web Application Firewall](https://aws.amazon.com/waf/){:rel="nofollow"}
or a [request accelerator](https://aws.amazon.com/global-accelerator/){:rel="nofollow"} using the global AWS Content
Delivery Network. Load balancer rules can also be configured to routed based on the request data, use weights, etc.

Load balancers also ping the applications to remove instances whenever they become unhealthy. This health check can be
configured but not disabled.

### On scaling

On AWS, autoscaling is as simple as creating Launch Configurations or blueprints for the instances to automatically
provision. The blueprint creation is nearly identical to starting EC2 instances. Autoscaling Groups can then use a
Launch Configuration and scaling-related information to provide autoscaling capabilities to an application.

## Final result

After applying these steps, the tipster application mentioned earlier is now highly available, has backups, its
components are decoupled and only the frontend is publicly available. Plus, it can now scale out and in when required,
which makes it more resilient and cost-efficient.

## Conclusion

An architecture of the sort is never perfect but it is possible, through means and time, to avoid classic issues and
make services more resilient and secure. For instance, it could be interesting to allow backend instances to connect to
the Internet to download updates and packages, then to make outbound Internet access more resilient, restrict requests
and responses through stringent Network Access Control Lists, etc.

The key takeaway is to always plan for failure and have the five pillars of the Well-Architected Framework in mind when
designing architectures: Reliability, Security, Cost Optimization, Performance Efficiency and Operational Excellence.
