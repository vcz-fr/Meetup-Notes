---
categories: ["meetups/afup-bdx"]
title: "DDD, CQ(R)S and Clean Architecture in an MVC framework"
---

{% include time.md %}

By [Julien Vitte](https://twitter.com/pitchart){:rel="nofollow"}, Lead Web Developer @ Inside Group  
[Slides](https://pitchart.github.io/ddd-cqrs-mvc/){:rel="nofollow"}

{% include toc.md %}

## Context

The desired end product is an Enterprise Resource Planning solution for an agency, tailor-made that enables business
collaboration, protected with a layer of configurable access policies. Guarantees the control and unicity of the company
data, eases access to information, availability, data coherence. The solution must be able to evolve long term and allow
the frequent and fast delivery of high-value features.

## The theory
### Clean Architecture

Interesting read: [*The Clean Architecture* from *The Clean Code Blog*](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html){:rel="nofollow"}

Applied to this project, the Clean Architecture would simplify testing and reduce the development feedback loop to speed
up feature development and future changes and migrations. In a domain where change is in every mind, reducing the impact
of evolutions by making the code independent is a necessary step.

Some ground rules apply to create a Clean code: The external layers can only exchange with the internal ones and all the
data formats must be normalized at every step before ever reaching the business logic. Your domain code must be
pristine, isolated enough so that it can be reused and only include that domain entities and rules.

Your application must become a list of use cases and orchestrate data from and to your domains. Infrastructure-wise,
each layer must know the data formats it manipulates at every step. You might have to create your own persistence layer
based on a query builder at most or plain SQL. The organization of the source directory is semantic; the subdirectory
names are no longer those offered by your framework or language of choice. You can introduce sense and sanity in your
code without actually writing a single line of it!

Note that you must stay as far away as possible from framework additions. For instance, in PHP, you should not use
annotations since they are not supported by the language and lock your code with the technology that enables them. Be
similarly cautious with libraries and frameworks.

### Domain-Driven Design

[Good read](http://dddcommunity.org/learning-ddd/what_is_ddd/){:rel="nofollow"}

Semantically speaking, CRUD can limit your team. CRUD is an acronym for "Create, Read, Update, Delete" and represents a
normalised way to consume and update resources. While this way might work for generic resources such as orders and
users, it falls apart when dealing with complex entities such as Employees. In the real world, employees retire, change
position, leave. Sometimes, CRUD does not suffice to represent the complexity of your domain and might even introduce
issues when designing your business logic. Maintenance and evolutions will not profit from CRUD either; you might need
to update a large chunk of your application if your domain entities are designed like generic resources.

If the need arises, you can adapt your data storage solution to your application. This might come in handy if you know
that it can be difficult to make your application work with any database or file storage type. Moreover, databases are
among the most difficult third parties to abstract away.

### CQ\[R\]S: Command Query \[Responsibility\] Separation

A Query generates a Read-only, immutable result, like a `SELECT` in SQL. A Command is a mutator, it is Write-only, like
`INSERT`, `UPDATE` and `DELETE` statements in SQL. Commands never return data! The R in CQRS implies a distinct
separation between your queries and your commands. The separation is subject to debate. Nevertheless, the CQRS approach
is particularly fitting complex domains and out of control business rules.

Rather than using an ORM, it is possible to rely on a Query to use your database better. Doctrine tends to send
unoptimlized SQL queries by default and can induce bad habits such as fetching unused fields to suit multiple business
rules at once. You can also rely on Views and the power of NoSQL for search queries. The Clean Architecture and DDD
should not make your solution more difficult to maintain.

Since commands must not return a result, how would you know if an entity has successfully been updated? You can query it
after your Command has completed and check for yourself.

How would you validate errors in such an architecture?
- Validate your entities as soon as possible. If you can, validate them before they even enter the outermost layer of
  your application. Client side is your best option whenever it is possible;
- Create domain exceptions and use them at your advantage with web forms and events;
- Use HTTP verbs and status codes! Always return user-friendly messages;
- Return a common result object to handle errors. If your errors are normalized, they become a breeze to log and present
  to your users.

Never let your data storage solution handle identifiers. Generate your own unique IDs to avoid surprises such as
scraping and people who will update the URLs manually. If you store data from an external service, generate an internal
ID to hide your implementation. A Command Bus can help your application centralizing writes for performance or logging
reasons. In Computer Science, it is commonly accepted that a component should prepare its data as soon as possible but
write at the last minute.

## How to proceed?

If you never worked with Clean Architecture, DDD and CQRS, you might feel lost at the sight of the amount of notions to
integrate to your habits. In any case, start simple: design your domains and think about your tests as soon as possible.
Spend time with your clients to fully understand their needs and get as many examples as you can, you will need them
later.

Thanks to the work done with the client, you should be able to define the boundaries of the business logic and the
domain entities. You also have enough material to write some tests! Thanks to the examples provided by your client, you
should be able to implement tests that validate your features and avoid regressions, thus providing a quick feedback
loop to the developers.

As for your entities, avoid tricks that are not provided by the language you are using such as annotations for PHP.
Contextualize errors and throw exceptions whenever they happen and avoid digging too deep into persistence as each
entity might not need its own database table. You also might not need some getters and setters so you might as well not
generate them.

DDD and ORMs are not really compatible. That is even more true with CQRS. For your database to be interchangeable, you
might have to abandon using an ORM at all and use the Command and Query patterns. Commands allow you to represent more
complex business logic through the means of Command Handlers. A Command Handler is an object that will handle a command
if and only if it supports it. You can send commands to a Command Bus, which will choose the right Command Handler for
your Command. As for Queries, they should only be used for searches and counts. Searches should be done by the mean of
filters and specifications.

The Specification Pattern can be seen as a way to represent business rules in a generic and reusable fashion. The usual
strategy is to use a DSL that acts as an SQL replacement. For PHP, [K-Phoen/rulerz](https://github.com/K-Phoen/rulerz){:rel="nofollow"}
is a good candidate.

## Closing words

Use Dependency injection whenever you can to ease the testing process. Also, the relevance of configuration being
declarable outside of your code is debatable.

Even with DDD in, the end of CRUD is not near at all. CRUD is good for very simple resources and could be connected to
simple administration interfaces or APIs.

Aggregates are collections of entities of the same type. When designing RESTful APIs, you can use Aggregates to validate
the query at every step and navigate through the resources. You could fetch the address from a specific user with a
query like `GET /users/123/addresses`.
