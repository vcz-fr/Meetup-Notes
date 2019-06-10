# Strategic DDD: The minimum to know about DDD
🕑 *Estimated reading time:* **?mn**

By [Jean-Baptiste Dusseaut](https://twitter.com/bodysplash), Principal Solution Architect @ LGO  
[Video \[FR\]](https://vimeo.com/340070507)

## Table of Contents

## Getting to know DDD

DDD, Domain Driven Design, gets application development to be driven by the domain.

Developpers generally move through the following steps during their carreers:
1. Specific technical development: Very straightforward but causes code duplication and does not give enough domain context;
2. Generic technical development: Causes less code duplication but does not give enough domain context;
3. Generic domain-oriented development: The software is bound to the context but its genericity may limit its flexibility and slow down development;
4. Specific domain-oriented development: The software follows its domain closer. Refactoring is used only when relevant.

In practice, domain experts and development teams work together to transform a domain in a system. To ease the process, it is possible to bridge domain and software by creating a selective abstraction, a domain model. To do so, we create a set of words and expressions, a vocabulary that will be understood the same way by everyone. This is called a "ubiquitous language". This implies that the development team must frequently ask questions to the domain expert with the aim of capturing the ideas in the software.

## Tactical and Strategic DDD

There are multiple approaches to DDD. The most common one relates to patterns that can be applied to get put the domain at the center of the application: aggregates, entities, Value Objects, Services and Repositories. This approach, called "Tactical DDD", may not be the best suited to the project you are building. It may sit too far from the domain you are modeling and feel anemic.

An alternative approach is Strategic DDD, that is orienting the architecture towards the domain. It was Martin Fowler that said that architecture is the set of decisions you wish you would have made successfully. You want to minimize the set of bad decisions and make them less permanent.

### Bounded context

An application may sit at the frontier between multiple domains and terms may have different meanings that may not benefit from being merged. In e-commerce, "order" is used to describe the set of items a customer wants as well as the package to send to them. These two definitions do not have everything in common: customers send orders with prices and coupons, delivery services receive instructions to locate items and plan the delivery. The customer is not interested by the path taken by each indivisual item and delivery services are not interested by the price paid by the customer.

A Bounded context is a subdomain within the larger domain of the problem to solve. Bounded contexts can be linked within a Bounded contexts map. In there, relations may have multiple meaning, including:
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
- The **Production** component generate tracks;
- The **Notification** component stores user preferences and handles notifications;
- The **Samples** component contains samples libraries and handles licenses and copyright.

Other components may be added to this map such as one which handles site maps, feeds, a CRM or statistics.

The relationships between these components also open options on different angles. From the business side, is it more relevant to create, externalize the development, use externally developped components or fake it? From an architectural standpoint, each component may be implemented with Tactical DDD, CRUD, CQRS or Event Sourcing, take requests through a REST API, a Message broker topic, gRPC or a custom protocol and be implemented in a Functional, Object, Dynamic or Static fashion. Any of these choices are correct as long as they are backed up. Here, an error will only impact the surrounding bounding context and not the whole application.