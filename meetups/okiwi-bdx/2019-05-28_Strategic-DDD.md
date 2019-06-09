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