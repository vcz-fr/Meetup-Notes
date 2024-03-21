---
categories: ["meetups/bdx-io"]
title: "From microservices to Event Sourcing"
---

{% include time.md %}

By Meidi Airouche, Software & Cloud Architect @ OnePoint  

{% include toc.md %}

## A story of many features

This story begins in a start-up that chose to develop feature over feature to exist in a crowded market, hiring people
without ever wondering how their systems would behave. In this chaos, there was a glimmer of hope, a team that chose
different: event-driven architecture. Just to be clear, a start-up becomes a scale-up whenever it reaches a certain hire
threshold and then a unicorn when it has the means to finance itself. Unicorns are not necessary profitable; they're a
combination of a vision and human and financial means to realize it.

The specific team develops a low-code platform that is then configured by less technical personnel. The organization is
defined in business domains with specialized teams working on their components and little cross-talk. This leads to
friction when multiple businesses need to be integrated together and customers are researching a deep level of
integration and cohesiveness. At scale, this leads to lots of backends, API contracts and data sources. Teams must
distribute their contracts, improve them, communicate, interface, test. Everything becomes more difficult at scale,
monoliths become distributed, leading to the infamous [SAGA pattern](https://microservices.io/patterns/data/saga.html){:rel="nofollow"}
where one service orchestrate lower-level ones in a transactional fashion.

Specializing development leads to more difficulties when dealing with cross-functional features. How do we avoid this
issue? We could use events to inform other services that something happened and let them handle the processing. This is
a less synchronous way to deal with cross-functional features and Cloud service providers absorb most of the
infrastructure complexity by providing event queuing and streaming services, object storage and databases and many
compute services.

A new implementation of this low-code system had to happen. The service had to communicate with other teams, businesses
and systems and this led to many unending meetings. With events, every system must listen to event streams for
notifications that concerns it. This architecture is more efficient than blocking HTTP requests.

## Trying out architectures

Fan out is the first thing that comes to mind. This architecture is like a mailing list: a service sends a message to
the list, and it gets duplicated and spread out across multiple services. While the message gets technically across, how
can we guarantee it? And logging, responses, error handling, tracing? This is also not scalable with the number of
events. Fortunately, Cloud event services can provide more advanced ways to filter and deliver events to the right
services.

Enters Service buses. These are the intelligent form of a mailing list that handles more of the delivery logic and
avoids duplicating messages left and right. While it solves the scalability issue somewhat, it does not affect the other
issues such as distributed transactions. The user must be informed of the end of their processing without having to
incessantly poll the server! The other side of the coin: programming such applications is different. It requires
paradigm shift is called "Reactive Programming", where events and data streams dictate the behavior and state of the
application. Reactive Programming requires dealing with data transmission challenges: how to guarantee data consistency
at scale? This is difficult even for skilled teams with proven technologies and practices.

Any transactional system must offer compensation transactions otherwise known as "failure" or "rollback" transactions.
Things are different with Event Sourcing: some events must not be compensated and how errors are handled must be
specified and dealt with. In other words: do not just focus on the happy path!

It is established that the center of attention of this architecture are events. What if they were generated by their
storage layer? This is the Outbox pattern. In this pattern, the database generates events whenever it gets updated.
These events are useful for data propagation, especially if each service owns their data source. You can quickly guess
how this becomes difficult to grasp at scale.

The Event Sourcing pattern is last on the list. In this pattern, events are stored like actual data. Each event and its
contents are stored. The event database can be queried to know the state of the transaction and this can be combined
with the Outbox pattern to automate compensation event handling. The resulting architecture is very complex:

- A service sends an event to the Event store;
- The Event store propagates the event to a Service bus;
- The Service bus propagates the event to services that wish handle that specific event;
- The services handle the event and update the Event store;
- As a result, the Event store generates new events, whether of success or compensation type.

The obvious bottleneck is the Event store: it must aggregate data generated by many subsystems to satisfy all the
dependent subsystems! Centralizing, journaling and aggregating data does not make things simpler. In fact, the
recommended way to deal with these issues is to create special-purpose tables that can be read but never updated
directly. These tables are also known as "views". Without a doubt, the composite of the Outbox and Event sourcing
pattern is hardly tenable even though the results can be surprising. This is not a recommended architecture unless the
need really justifies it. It is suitable for complex transactional systems of the likes we find in banking institutions.

## Questions and Answers

### In a context where budget is limited, how can this approach be proposed?

If it is not the best approach for your need, do not even attempt proposing it. You must have competent development
teams, the right organization and the right tooling in place before attempting it. If you did your due diligence, then
present the approach, explain if it solves the need and how, plan resources accordingly and do not forget to say no if
something is off! This change can require a multi-year effort and focus.

### What are good and bad reasons to invest in Event Sourcing?

The good ones first: specific business cases, complex transactional systems like banking or taxi. The bad ones: the
rest. Avoid at all costs unless there is a strong unavoidable need for distributed transactions.