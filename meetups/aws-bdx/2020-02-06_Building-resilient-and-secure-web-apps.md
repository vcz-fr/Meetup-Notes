# Building a resilient and secure web application on AWS
🕑 *Estimated reading time:* **?mn**

By [Guillaume Lannebere](https://twitter.com/guillan40), IT Technical Architect @ Betclic Group

## Table of Contents

## Example

The example chosen for this presentation is a tipster website. A tipset is a person that delivers hints on winning bets.

This application is based on a simple REST CRUD API with an administration back-office. With thousands of monthly active
users, the site starts to show its limits in terms of scalability. While rehosting and refactoring this application, a
premium subscription could be added to help balance out its new costs.

Currently, all the components of the applications are hosted on the same server, including its database, hence the
scalability and resilience issues that will become central to this presentation. Indeed, the lack of backups, the fact that everything is publicly accessible, strong coupling between infrastructure elements and the absence of scalability hampers the growth of the service.

These components include two [Angular](https://angular.io/) front-ends, a Tomcat server hosting a [Kotlin](https://kotlinlang.org/)
API and a MySQL database. The new architecture will be cloud-native and based on classic AWS services.

## Migrating to AWS
### Some definitions

A **Region** is a separate and independent geographical zone hosting one or multiple Availability Zones distant from
each other by tens or hundreds of miles.  
An **Availability Zone** or _AZ_ is a physical isolated data center. It is connected to the other AZs of the same Region
with a low-latency connection, possesses its own independent power supply and resilience mechanisms.  
A **Virtual Private Cloud** or _VPC_ is a virtual datacenter providing isolation from other VPCs of the same and other
AWS accounts. AWS users can manage network and routing in their VPCs.

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
If you wish to create ad visualize CIDR ranges, you may use [this application](https://cidr.xyz/). In VPCs, CIDR for
IPv4 may not exceed `/16`. This means that you will have at most 2^(32-16) = 2^16 addresses at your disposal. Note that
creating a VPC will not create any Subnet or Internet Gateway. It does create a Route table, a Network Access Control
List and a Security Group, however.

A newly created Internet Gateway will not be assigned to any VPC by default. This requires an additional action that
will make it available to all subnets but not connected. To do that, you will need to make sure to create a Route table
that redirects non-internal traffic to your Internet Gateway and associate it to public Subnets only.

Moving back to resilience. It will require to create a Subnet on at least two Availability Zones. It is recommended
starting with two public and two private Subnets. AWS will reserve five addresses on each Subnet: Network (first @), VPC
router (second @), DNS server (third @), Reserved for future use (fourth @) and Broadcast (last @). A Subnet may have a
CIDR between `/16` and `/28`, meaning it will contain at least 16 addresses of which five will be reserved. Do not
forget to enable automatic assignation of IPv4 addresses on your public Subnets.

From there on, it is possible to start creating components, starting with an off-the-shelf database. [Amazon Relational Database Service](https://aws.amazon.com/fr/rds/)
or _Amazon RDS_ is among the slowest to provision so it is recommended starting with this one when hosting classic web
applications on AWS. For demonstrations and small projects, there is a Free Tier that cancels most of the charges
incurred with the usage of the service. In every case, a database should never be publicly accessible. It is to be only
assigned to private subnets and covered by a dedicated Security Group.

Availability and durability on Amazon RDS is active-passive and uses a Standby Replica, which receives updates from the
Master database but will only be accessible when it fails. To not be confused with Read Replicas, which are meant to
enhance the read performance of your database.

## Starting instances

Security Groups are an essential security feature that may be understood like stateful firewalls which deny traffic by
default. Security groups can be associated with most resources within VPCs including Amazon Elastic Compute Cloud
instances, or _Amazon EC2_ instances, which are basically rented computing capacity. Security Groups rules may allow
inbound and outbound requests from specific IPv4 and IPv6 CIDRs, other Security Groups or even itself. For instance, it
is possible to require the database Security Group to allow connections on its default port from the instance Security
Group. That would cause only these instances to be able to connect to the database, only to the authorized port.

An Amazon Machine Image or _AMI_ generally contains the OS that would boot on an EC2. It is possible to pre-package
additional software and application code in an AMI so that the instance would setup way faster, which will help with
scaling. For elements that require configuration such as retrieving the latest version of a service or code, it possible
to pass scripts that would execute during the instance setup steps. This script is referred to as User-data.

An EC2 may also use AWS services on its own. For instance, it could listen on a queue provided by Amazon Simple Queue
Service or _Amazon SQS_. By default, this is impossible unless the instance is authorized to do so using an Identity and
Access Management Role or _IAM Role_. IAM Roles are the way to go to allow services to use AWS features like humans
would do. Human users can also assume those roles in very specific cases, however IAM users may do the trick on simpler
accounts.

## New architecture

### Load Balancers

### On scaling

## Final result

## Conclusion