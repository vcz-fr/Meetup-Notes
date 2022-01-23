---
categories: ["meetups/okiwi"]
title: "Strategic DDD: The minimum to know about DDD"
---

{% include time.md %}

By [Jean-Baptiste Dusseaut](https://twitter.com/bodysplash){:rel="nofollow"}, Principal Solution Architect @ LGO  
[Video \[FR\]](https://vimeo.com/340070507){:rel="nofollow"}

{% include toc.md %}

## Getting to know DDD

DDD, Domain Driven Design, gets application development to be driven by the domain.

Developpers generally move through the following steps during their careers:
1. Specific technical development: Very straightforward but causes code duplication and does not give enough domain
   context;
2. Generic technical development: Causes less code duplication but does not give enough domain context;
3. Generic domain-oriented development: The software is bound to the context but its genericity may limit its
   flexibility and slow down development;
4. Specific domain-oriented development: The software follows its domain closer. Refactoring is used only when relevant.

In practice, domain experts and development teams work together to transform a domain in a system. To ease the process,
it is possible to bridge domain and software by creating a selective abstraction, a domain model. To do so, we create a
set of words and expressions, vocabulary that will be understood the same way by everyone. This is called a "ubiquitous
language". This implies that the development team must frequently ask questions to the domain expert with the aim of
capturing the ideas in the software.

## Tactical and Strategic DDD

There are multiple approaches to DDD. The most common one relates to patterns that can be applied to get put the domain
at the center of the application: aggregates, entities, Value Objects, Services and Repositories. This approach, called
"Tactical DDD", may not be the best suited to the project you are building. It may sit too far from the domain you are
modeling and feel anemic.

An alternative approach is Strategic DDD, that is orienting the architecture towards the domain. It was Martin Fowler
that said that architecture is the set of decisions you wish you would have made successfully. You want to minimize the
set of bad decisions and make them less permanent.

### Bounded context

An application may sit at the frontier between multiple domains and terms may have different meanings that may not
benefit from being merged. In e-commerce, "order" is used to describe the set of items a customer wants as well as the
package to send to them. These two definitions do not have everything in common: customers send orders with prices and
coupons, delivery services receive instructions to locate items and plan the delivery. The customer is not interested by
the path taken by each individual item and delivery services are not interested by the price paid by the customer.

A Bounded context is a subdomain within the larger domain of the problem to solve. Bounded contexts can be linked within
a Bounded contexts map. In there, relations may have multiple meanings, including:
- Anti-corruption layer: Mistrust relationship, used with an external context;
- Shared kernel: Ideas are shared between multiple contexts;
- Customer Supplier: Second context waits for the output of the first context.

**Example:** Social network around music production  
Here is a possible Bounded contexts map for such an application:
```
Sequencer --------► Production
    ▲
    |
Social network ----► Identity ◄------- Discussion
                       ▲  ▲
                       |  |
Samples ---------------    ----------- Notifications
```

- The **Sequencer** component allows musicians to collaborate on the same music sheet;
- The **Production** component generates tracks;
- The **Notification** component stores user preferences and handles notifications;
- The **Samples** component contains samples libraries and handles licenses and copyright.

Other components may be added to this map such as one which handles site maps, feeds, a CRM or statistics.

The relationships between these components also open options on different angles. From the business side, is it more
relevant to create, externalize the development, use externally developed components or fake it? From an architectural
standpoint, each component may be implemented with Tactical DDD, CRUD, CQRS or Event Sourcing, take requests through a
REST API, a Message broker topic, gRPC or a custom protocol and be implemented in a Functional, Object, Dynamic or
Static fashion. Any of these choices are correct as long as they are backed up. Here, an error will only impact the
surrounding bounding context and not the whole application.

### Recommendations

In any case, always start small, that is with a microservice ready monolith. This way, relationships are preserved and well modeled and you can switch to microservices any time or not at all, if there is no need in the end.

The [Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law){:rel="nofollow"} states that design and communication
in a system usually mimic its containing organization structure. The [Inverse Conway Maneuver](http://betica.com/blog/2016/06/17/transform-your-organization-with-the-inverse-conway-maneuver/){:rel="nofollow"}
tries to turn this law on its head: by clearly organizing the software, it attempts to influence the company itself.

Even if one believes they may not need DDD, they still need to run a macro analysis to confirm that they do not need to
run further analyses, which is the point of Strategic DDD. This means that DDD is needed even when it is not needed.

## Questions and Answers session

### Communication between Bounded Contexts

If your Bounded Contextx are internal, you may use the technology that is the most relevant for your use cases. If it is
external, use standards such as REST APIs with JSON.

### Bounded contexts inside a monolith

Use interfaces and asynchronous communication if possible to design interactions.

### Consequences in case of errors in a BC

It is impossible to capture every detail the first time, even with a fully trained team. When errors cannot be
prevented, they may still be accepted.

### Common BCs

Identity is a very common BC. As such, it may be reused across many projects. This brings opportunities in terms of
architecture and business.

### No circular dependency between BC

There should be indeed no circular dependencies between BCs. If such a thing appears in your application, you may need
to reconsider your connections or split one of the BCs causing the issue. Using a monolith may even help you with this
issue as dependency management can detect cycles.

### Choosing the BC microservices candidates

Deciding whether a BC should be in a monolith or in a microservice is up to the team. This decision involves evaluating
the load of that particular service and its impact on the rest of the monolith, if it will be externalized, etc.

### Logs management

Logs can be considered a BC, albeit a common one, like authentication and authorization.

### Definition of the ubiquitous language

There is no strict obligation or recommended technology to create the ubiquitous language as long as the technology is
expressive. You could use [F#](https://fsharp.org){:rel="nofollow"} and its type system to design the interactions, for
instance.

### Applying DDD on legacy code

From the business point of view, a Legacy is an application on which feature development takes a lot of resources.
Applying DDD on a legacy software is like considering it as a black box and working around its limitations. Martin
Fowler mentioned it as the [Strangler pattern](https://martinfowler.com/bliki/StranglerFigApplication.html){:rel="nofollow"}.

### Spreading the culture in a team

You should start by teaching the notion of legacy suffering. Lead by example and if the company is not receptive, you
may decide to abandon and quit.