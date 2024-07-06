---
categories: ["meetups/ippevents"]
title: "Rethinking app development with DDD and event storming"
---

By Merlin Boyer, Fullstack Developer @ Ippon  

Why do we rethink applications? There are so many reasons: gaining in flexibility, reacting to change, better map
business with tech, improve Developer eXperience and so on.

## DDD

DDD is often presented to demonstrate the adverse effects of silos in organizations. Each business implements their own
definitions of excellence to eventually fail the integration part. Needs are very context-bound and the context must be
defined. This is called the "domain" in DDD, and it's a representation of the real world.

In DDD, there are two terms: strategy and tactic. Strategy is about the aim:

- Shared vocabulary, common language: used in written and oral communication and present throughout the code!
- Autonomous scopes: each domain must have minimal dependencies with other domains and must be highly internally
  cohesive. A domain can group multiple bounded contexts. Keep an eye on code duplication and infinitely flexible
  interface; they may be a sign that your domains are ill-defined.

Tactic is about how you get there and is rich in concepts:

- Entities are objects defined by their identity. Two entities can share the same attributes without representing the
  same real world notion. They implement a continuity across the different layers of the software;
- Value objects are objects **not** defined by their identity. It represents a "what" rather than a "who". Value objects
  are very domain-bound: an address does not hold the same value for postal services and for taxis. In addition, value
  objects are immutable;
- Aggregates are groups of objects forming a unity. Only one aggregate known as the _root aggregate_ is exposed
  externally, and it becomes the entry point. Objects within the same aggregate can reference each other. Each bounded
  context possesses its root aggregate which defines its collections of entities, value objects and sub-aggregates.

Service classes and repositories are acceptable if they can prevent polluting value objects and entities. Possibilities
are endless and there are many notions left to explore in DDD. This is only scratching the surface!

## Event storming

One of the workshop reuniting stakeholders from all sides enabling everyone to explore the business and come out with a
better understand of it, while emerging an explicit and shared vision. Teams engage in event storming when there is a
need for agreement, to map real world knowledge or to define business domains. How does one session go?

It starts with a timeline traced on a board on which the team places a sequence of events leading to an objective. Each
person will build their version of this sequence of events on their side for a few minutes then every vision gets
shared, filtered and synthesized. The same happens with actions, which trigger the events placed on the timeline, then
actors triggering actions and finally the conditions for triggering actions. All along the way, questions concerning
previous elements can be put on the board. These questions are important to improve the level of shared understanding.
Each of these groups becomes its own bounded context. Dependencies with external systems can also be identified during
this workshop.

Today, IT is extremely complex notably because of the sheer amount of business practices it connects. So much that one
must not hesitate equipping themselves to go further, faster. This also applies to organizations: following the Spotify
model, squads take responsibility of an item in a given value chain, chapters take a specialty such as frontend, backend
or operations and all of them join tribes that could be attached to a business unit. Sometimes, guilds cross-pollinate
tribes to share knowledge and practices.

## Questions and Answers

### How to proceed when Bounded Contexts are dependent on each other like in legacy applications?

There are practices to integrate legacy code into DDD. Trying these could lead to interesting discussions. After all
DDD's value comes from the business. In the end, it is a thinking tool to guide and bind product development and
technology. The technical notions of DDD are only ways to transcribe the analysis into code.

Bounded Contexts are never set in stone: they can grow, merge, shrink. Like code, they can be refactored.

### How does Event Storming work out for applications that implement multiple objectives?

Event Storming is designed for **one** objective per session.

### Are there apps that persist Event Storming sessions?

Technically yes, mostly visual thinking apps such as Miro and Klaxoon, but they don't help when it comes to creating
continuity and following up. DDD literature recommends throwing away the board after the completion of the session as
this ceremony is meant for everyone to align. Once that's done, deliverables lose all value.

### What's the recommended literature to get started with DDD?

- _Domain-Driven Design: Tackling Complexity in the Heart of Software_, by Eric Evans;
- _Learning Domain-Driven Design_, by Vlad Khononov;
- _Domain Driven Design Quickly_, by Abel Avram and Floyd Marinescu;
- Conference replays from Devoxx FR, DDD Europe.
