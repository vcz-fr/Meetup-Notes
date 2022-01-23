---
categories: ["meetups/afup-bdx"]
title: "Defensive programming"
---

{% include time.md %}
{% include toc.md %}

## Good or Bad repository?

By [Arnaud Langlade](https://twitter.com/arnolanglade){:rel="nofollow"}, Developer @ Akeneo / Sylios  
[AFUP page](https://afup.org/talks/2822-quelle-difference-y-a-t-il-entre-le-bon-et-le-mauvais-repository){:rel="nofollow"}
- [Slides](https://arnolanglade.gitlab.io/bad-or-good-repository){:rel="nofollow"}

A repository must represent a collection of objects and not an entire project. The base contract of a repository should
only contain an "add", a "get", a "remove" and a "nextID" function. These functions may throw a `\LogicException`
whenever they reach an undesired situation such as when "get" returns nothing. Finally, always use UUIDs as identifiers
to hide the sequences of stored entities.

A proposed practice is to extract the reading capabilities of the repositories in a separate pattern: query functions.
This way, Repositories will only be used for writing purposes and Query functions will read data and hydrate custom
entities. Even though this does not suit the pure Repository pattern, it allows developers to create immutable data
structures.

Query functions allow developers to spend less time on ORMs and get more performance by directly querying the database
with SQL. This practice might introduce vulnerabilities under the form of SQL injections so it is necessary to be very
careful! Finally, whenever a query function becomes unmantainable, it is recommended to divide it in subfunctions and
helpers.

Tips and tricks:

- `$entityManager->flush($entity)` only flushes `$entity`. `$entityManager->flush()` flushed every pending dirty entity.
- You can use a middleware, under the form of CQRS for instance, to ask for a flush after multiple updates.

## Defensive programming

By [Nicolas Perussel](https://twitter.com/mamoot64){:rel="nofollow"}, PHP Architect @ ekino

Defensive programming can be seen as a collection of practices that will solidify your code in order to prevent future
breakage by other developers. It is mostly used when High Availability or security are top priorities but can be applied
any time and for any language.

- Never trust user input: check everything that enters your application. Verify the input types, existence, coherence;
- Never trust developers: even yourself. No developer can create bug-free code and some will find convoluted solutions
  to add features or fix them;
- Always write SOLID code: ask yourself the right questions whenever you develop;
  - Single Responsibility: each class should have one responsibility;
  - Open for extension: and closed for modification;
  - Liskov substitution: replaceability;
  - Interface segregation: Client-specific over General-purpose;
  - Dependency inversion: depend upon abstractions.
- Unit tests: a must have. Test your tests with [Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing){:rel="nofollow"}
- Inject dependencies via the constructor parameters, not via setters to guarantee the presence of the dependency in the
  subsequent code;
- Attributes should be private and provided with an initialization value;
- Use objects instead of scalar types to have more context;
- Avoid mixed returns and attributes when possible;
- Think immutable;
- Think about the accessibility of your attributes and methods;
- Classes should be final by default: if a modification is needed, use a decorator.
In other words, create a class that will wrap the former one.
- Avoid optional parameters;
- Create a NullObject to replace the `null` keyword. This will drive down your usage of null and further avoid using
  scalar types;
- Block magic methods whenever possible: In PHP, `__clone` can invalidate the singleton pattern and `__sleep` and
  `__wakeup` can become very costly;
- Avoid traits: they reduce the context and control over the code;
- KISS: Keep It Simple and Stupid
- In case of error, get out as fast as you can: to avoid propagating an unstable state in your system, exit whenever a
  non-recoverable error occurs.
