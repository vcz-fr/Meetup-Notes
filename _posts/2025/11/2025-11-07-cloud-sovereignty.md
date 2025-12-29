---
categories: ["meetups/bdx-io"]
title: "State of the Sovereign Cloud: from public to confidential"
---

By Seifeddin Mansri, Cloud CTO @ Sfeir  

## A delicate situation

The posture of certain governement officials exert a high amount of pressure onto neighboring and partner states. This
pressure translates into heightened geopolitical, regulatory and organizational stakes. Added to the requirements of
certain industries, this situation leads to legal, innovation and reputational risks. The best way to limit these risks
would be for organizations to take control over their destiny. When it comes to IT infrastructure, this translates into
Sovereign Cloud.

Sovereign Cloud is not the only solution to take control of one's own IT destiny; local-first processing and hosting the
physical infrastructure are equivalent solutions from the technical standpoint, nevertheless they do share additional
legal and operational implications and controls.

Before deciding on a solution, what data are we talking about? What do we wish to control and how much are we willing to
spend on infrastructure? Speaking of means, by 2030 it is estimated that the Sovereign Cloud global market would be
worth in the hundreds of billions of dollars.

## Cloud types

Let's explore the some of the types of Clouds. Each comes with its flavors of sovereignty, data protections,
capabilities and legal controls.

The **pioneers** such as OVHCloud, Scaleway and Outscale offer the best legal alignment and controls at the highest cost
for an equivalent solution. Indeed, these solutions may require IT practitioners to implement missing technical
requirements, leading to more resource usage and personnel to maintain the solution. These are all relatively small
actors in the grand scheme of things; their innovation and scaling capabilities are quite small.

A **private cloud** is dedicated exclusively to a single customer, providing enhanced security and control over data and
computing resources. It can be hosted on-premises or by a third-party provider, allowing organizations to benefit from
cloud computing while maintaining compliance and customization.

A **public cloud** is shared among multiple customers over the internet. It is offers better cost-efficiency,
scalability and flexibility, allowing users to pay only for the resources they use. This is the most famous type of
Cloud with names such as Amazon Web Services, Azure and Google Cloud Platform. These three are also known as
hyperscalers for their unfathomable amount of connected computing resources.

A **Platform as a Service** provider is a service model where users provision a managed bundled application such as a
database or container orchestration service. PaaS providers are designed for developers to reduce the complexity of
managing their application platform. [Upsun](https://upsun.com){:rel="nofollow"} (formerly platform.sh), [Scalingo](https://scalingo.com){:rel="nofollow"},
[Clever Cloud](https://www.clever.cloud){:rel="nofollow"}, [Heroku](https://www.heroku.com){:rel="nofollow"} and some of
the hyperscaler offers such as [Google App Engine](https://cloud.google.com/appengine){:rel="nofollow"} and [AWS Elastic
Beanstalk](https://aws.amazon.com/elasticbeanstalk/){:rel="nofollow"} are examples of PaaS providers.

## Complex constructs

Each organization may use one or assemble multiple Cloud solutions to host their services. The decision to use one
provider or service rather than the other may stem from the requirements or risks for each workload at play. There are
different ways to use Cloud services or assemble them.

**Hybrid Cloud** and **Multi Cloud** are similar and non mutually exclusive topologies. The former connects a private
Cloud to a public Cloud Service Provider, while the latter connects multiple public Cloud Service Providers. These
topologies can lead to more resilient infrastructure overall, with better guarantees if you leverage the best services
from each provider. Hybrid Cloud can help with controls, since critical applications can be hosted privately. Both
topologies adds a significant amount of infrastructure complexity; identity and access management, costs, skills, the
organization itself.

**Private in Public Cloud** is another option for regulatory reasons, even though they are quite rare. This is about
physical host separation between customers of the same app and requires renting bate-metal servers, putting
virtualization software or an OS onto them and installing software. Such VMs exist in all major public cloud offerings
and can also be used for scenarios of rapid datacenter exits.

**Air-gapped Cloud** is a specific flavor of Private Cloud where the control plane is built to not necessitate Internet
connectivity. For critical workloads, this ensures they or the control plane cannot phone home nor be access outside
their designated network area. Such installations usually respond to strict technical requirements. Air-gapped being a
flavor, all the different Cloud offerings are technically achievable; [_Clever Cloud
AirGap_](https://www.clever.cloud/clever-cloud-airgap/){:rel="nofollow"} provides a software-only solution, [_Google
Distributed Cloud air-gapped_](https://cloud.google.com/distributed-cloud-air-gapped){:rel="nofollow"} brings _Google
Cloud Platform_ anywhere and [Clarence](https://clarence-cloud.com){:rel="nofollow"} is a _Google Cloud Platform_
control plane operated by Proximus and Luxconnect, two IT actors from Luxembourg.

**Confidential Computing** is a relatively new offering which goal is to encrypt data not only at rest and during
transfer but also _while processing it_. This level of data protection may require code changes, may not be mature
enough today and significantly increase infrastructure costs. Users of this solution must be aware that there are two
variants with different properties: Confidential VMs and Secure Enclaves.

**Local Controls** is a new offering that addresses one of the most common issues with the public Cloud; providers
encrypt data with keys they possess. Local Controls is about separating the computing resources of the Cloud from the
source of trust —encryption primitives— into two separate administrative entities. [S3NS](https://www.s3ns.io/en/offers/local-controls-by-S3NS){:rel="nofollow"},
for instance, combines the _Google Cloud Platform_ control plane with the _Thales CipherTrust Data Security Platform_
source of trust.

**Trusted Cloud** is the newest offering that goes in the same direction as _Local Controls_ but one step further; the
governance of the solution is guaranteed to be local and it is certified to run regulated workloads following the
regulations of the same jurisdiction. Unfortunately, all is not perfect as the first solutions to have achieved this
certifications are derived from hyperscaler control planes:

- [Bleu](https://www.bleucloud.fr){:rel="nofollow"} is a collaboration between Capgemini and Orange offering Azure and
  other Microsoft services in a trusted environment;
- [PREMI3NS](https://www.s3ns.io/en/offres/premi3ns-trusted-cloud){:rel="nofollow"} is the _Trusted Cloud_ version of
  S3NS. It too runs the _Google Cloud Platform_ control plane.

This leads to legal complexities due to the provenance of the control plane, both technical and governance-related. To
alleviate these, _Trusted Cloud_ providers tend to implement stringent update procedures:

1. The control plane provider notifies the _Trusted Cloud_ provider of an update for their control plane;
2. The _Trusted Cloud_ provider create a Quarantine environment to host and test the new version of the control plane;
3. After an observation period that usually lasts two weeks, the production environment gets updated with the validated
   version of the control plane.

Because of this procedure, _Trusted Cloud_ customers are relatively ensured control plane updates will not affect their
services. At the same time, if they wish to leverage recently released technologies, they will at the very least observe
a two-week lag to a release in their environment. This lag is not specific to _Trusted Cloud_ though, as we can already
observe it in "Sovereign" or "Federal" installations managed by public Cloud Service Providers. What is new with
_Trusted Cloud_ is the control plane source code access from local actors!

There have been attempts to create **European Cloud** providers such as [Gaia-X](https://gaia-x.eu){:rel="nofollow"},
OVHCloud, [AWS European Sovereign Cloud](https://aws.eu){:rel="nofollow"} and SAP, but they do not fall under any
official classification. Gaia-X, for instance, does not aim to be a provider anymore but a "framework" while AWS
European Sovereign Cloud is a locally governed entity of _Amazon Web Services_ running the _Amazon Web Services_ control
plane in Ireland, which is not perfectly sovereign.

## SecNumCloud 3.2

Certain states created their regulatory frameworks and requirement specifications. In France, the government agency in
charge of information technology, [ANSSI](https://cyber.gouv.fr){:rel="nofollow"}, manages a [collection of regulatory
frameworks](https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/comprendre-levaluation-de-securite/qualification-de-produit-et-services/referentiels-qualification/){:rel="nofollow"}
related to information systems.

Regarding SecNumCloud 3.2, the approval process follows six major steps:

1. Qualification Request
2. Evaluation Strategy
3. Initial Audit
4. Validation
5. Qualification
6. Renewal: partially each year, complete requalification every three years

Not everything needs to get qualified for SecNumCloud, only IT products and services. The end-to-end qualification may
not even be necessary in certain cases. For instance, [Whaller](https://whaller.com/en/){:rel="nofollow"} has been
qualified "by composition" because the software passed the Qualification step and the underlying hosting provider is
qualified as well.

It happens for some platforms to be so complex that their validated scope grows over time. It would be relevant for a
sovereign hosting provider for Microsoft solutions to qualify the hosted collaboration platform Microsoft 365, the
identity platform Entra, the OSes and database software platforms, the Cloud control plane —and so on— separately.
Sometimes, the Cloud control planes require an identity and authorization backplane that they cannot provide, like
Google–Cloud-based hosting providers which expose the same Console but relies on the managed identity federation service
to connect users to their Cloud identities.

A critical question remains unanswered: is **Trusted Cloud** just a trend or will it last?
