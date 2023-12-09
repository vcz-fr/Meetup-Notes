---
categories: ["meetups/archilocus"]
title: "Welcome in the era of Composable Architectures"
---

{% include time.md %}

By Loic Carbonne, Head of e-commerce tribe @ Theodo  

{% include toc.md %}

Phoneblocks was a groundbreaking initiative that promised to create a mobile phone that would put an end to planned
obsolescence due to its modularity and upgradeability. If you wanted to improve your camera or replace your screen, this
project had you covered! However, after gathering sufficient interest and being adopted by companies like LG and Google
through Project ARA, physical limitations revealed that with current technology, this phone would be impractical. The
truth is, no one wants a 4 centimeter thick phone these days, even if it's modular. Additionally, making it performant
was simply not feasible.

## On Web users and connected devices

This notion has surfaced less than two years ago and has since become the current trend in e-commerce applications. This
domain is where new technologies are often adopted first.

If we break down the history of the web, technical trends followed the global amount of connected devices. First there
were monolithic apps where all the code was colocated, then in the aughts came Service Oriented Architecture with the
first Software as a Service, Open Source projects and _Build vs Buy_ strategies.

Everything changed in 2007. The iPhone caused Internet users and web traffic to blow up and ushered an era of mobile
browsing with fundamentally different constraints and needs. New architectures needed to happen: _MACH_ which stands for
Microservices, API-first, Cloud-native and Headless. SaaS companies embrace the trend and become API-first too.

Fast-forward to today. There are countless solutions and services that implement anything with various levels of control
from no-code / low-code to do it yourself. Internet-connected devices boomed in the early twenties, among others because
of the successive COVID lockdowns and the sudden spike in remote workers that required entire industries to shift
online. A fundamental architecture change needed to happen again: enter Composable Architectures.

## Composable Architectures

In this paradigm, we accept that not everything can be developed from scratch and that not everything should be
off-the-shelf. There must be a sweet spot where best-of-breed solutions can be integrated together in a way that makes
them replaceable. This can be done through _PBC_ or Packaged Business Capabilities where each of them represent one
domain with its interfaces, be them API, UI or event-based, its core business implemented by one or multiple services
and its data layers. Each PBC can choose to go bespoke or with off-the-shelf components.

These methods can bring new marketplaces live within weeks instead of months. They will be minimal but upgradeable with
marketing tooling and so much more. All of this without a single line of code unless critical components needs special
attention like UX or to put down issues with provider reliability, security, cost and so on.

There are immediate benefits to this approach. It is not just about raw speed but also about accelerating the pace of
change, innovation, reaction and adaptation in an ultra-competitive market. Composable Architectures also lead to unique
customer experiences that are original and advanced. Finally, all the advantages of microservices apply such as
reliability and modularity. Lego is one of such examples: their latest rework delivered an efficient, scalable and
reliable platform that could withstand prime product launch events and brand-new markets.

As for the drawbacks, when done improperly, Composable Architectures can lead to inescapable complexity and a slow but
steady degradation in all the advantages: customer experience, product quality, reliability, scalability and pace of
innovation.

## Prerequisites for a successful implementation

Before going this route, make sure that the functional coverage of every PBC is well known and understood. The first
iterations of Composable Architectures should not dive too deep or rush through decisions. Build vs Buy decisions should
be evaluated from a TCO perspective as each option comes with its own specifics: maintenance of integration vs the whole
solution and infrastructure, knowledge about the business domain, third-party solution risks. SaaS is great to be
started with but can quickly become expensive and untenable whereas custom-built works best when the business model is
validated as a fine-tuning solution.

Additional caution should be given about avoiding vendor lock-in by extensively comparing, reading API specifications,
documentation, events, webhooks and data. Who owns the data and how easy is it to migrate off the service? Is it
possible to only use and be charged for part of the platform? This is what the [Mach Alliance](https://machalliance.org/){:rel="nofollow"}
advocates for.

Next comes the technical quality of each component: its maintainability, its performances, its scalability, its rate
limits, its stability, its uptime statistics and its security. **Everything** must be regularly audited, every claim
validated over time and maintained up to date. SaaS are like black boxes; test and monitor everything.

Finally, do not forget that code and integrations must be maintained as well internally: you may have created the best
solution but if the team is not there to maintain it, it is as good as useless. Choose your solutions in accordance with
existing skills. Measure the knowledge of the teams beforehand and do compromise if need be. These errors can be very
costly and are sadly frequent.

## Composing great architectures

Common architecture practices are a necessary part of Composable Architectures and will make them more efficient.
Anti-Corruption Layers, DDD and hexagonal architecture just to name a few. Error-handling, collecting logs, metrics,
traces and events and SaaS telemetry ruggedize PBCs. Being aware of coupling and eliminating it also leads to that same
desirable outcome.

We are only at the beginning of Composable Architectures. We don't know if we are about to cross the chasm, if we are
nearing the productivity plateau or if we are early on the adoption curve. More and more companies create offerings and
integrations to make their way into this trend like Salesforce and Shopify. Frontends as a Service can directly
integrate with provider APIs and constantly gain capabilities. And finally DXCPs.

DXCPs, or Digital eXperience Composition Platforms are tools that enable composing customer experiences without
significant code experience! Using these platforms can create strong coupling with them, actually making them a SPoF;
when they fail, your website or app is taken offline! Competitors in this space include [Builder](https://www.builder.io/){:rel="nofollow"},
[Uniform](https://www.uniform.dev/){:rel="nofollow"} and [Plasmic](https://www.plasmic.app/){:rel="nofollow"}.

Content Management Systems have been taking the direction of DXCPs for a long time too, especially Cloud-based ones. To
this effect, Netlify launched their [Composable Web Platform](https://www.netlify.com/platform/){:rel="nofollow"}
initiative that integrates data sources with frontends and visual editing! Vercel too engaged in [Visual Editing](https://vercel.com/docs/workflow-collaboration/visual-editing){:rel="nofollow"}.

Web architecture is still an evolving science where Composable Architecture is only a trend. Today it accelerates
success stories but comes with costs that will only come down once competition abounds and the dust settles in.

## Questions and Answers

### There is a notion similar to Business Capabilities in TOGAF. Are PBCs a similar approach?

Actually yes: for each PBC we explore these architecture questions and as demonstrated this goes beyond just choosing
the right tech. Knowing the business is crucial when designing for modularity: for each feature you should evaluate its
urgency, its return on investment and if it can be done at a later date without any impact on business or growth.
Minimalism will be your best bet.
