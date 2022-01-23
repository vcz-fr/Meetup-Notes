---
categories: ["meetups/bdx-io"]
title: "Hexagonal architecture: how to write solid tests?"
---

{% include time.md %}

By [Jordan Nourry](https://twitter.com/jknourry){:rel="nofollow"}, Senior developer @ Shodo  
By [Julien Topçu](https://twitter.com/julientopcu){:rel="nofollow"}, Tech Lead @ Société Générale  
[Video \[FR\]](https://www.youtube.com/watch?v=v--zkIEciq4){:rel="nofollow"}

Recommended read: [5 levels of tests](https://martinfowler.com/articles/microservice-testing/#conclusion-summary){:rel="nofollow"}

{% include toc.md %}

## Tests and beyond

[Gherkin](https://cucumber.io/docs/gherkin/){:rel="nofollow"} is a tool that uses natural language to define tests later
executed by [Cucumber](https://cucumber.io/){:rel="nofollow"}.

When working with Hexagonal Architecture, the business domain must not contain technical code or implementation. Thus,
tests for the business domain must lean on stubs, that is naive implementations. As a matter of fact, a hashmap could
model a simple database.

Rather that creating complex scenarios making test implementation impractical, it is possible to encapsulate domain
behaviors and acceptance criteria in reusable abstractions of [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html){:rel="nofollow"}.
In addition, reading tests can be made easier if they are written with Fluent assertions. Factories could as well
represent a way to avoid incoherent business objects.

Following a line of reasoning making tests more comprehensive, it could be interesting to include documentation in the
scope by generating it from the tests or even better by failing tests if some element of documentation is missing. This
is a crucial step to living documentation.

Contracts could also generate tests on their own. Doing so using [Groovy](https://www.groovy-lang.org/){:rel="nofollow"}
has the same effect as writing the same tests manually with Cucumber and will also generate stubs that could be used for
other tests!

## Abstract and compose

When the abstraction capacity of Cucumber is exhausted, it is possible to go further with [Karate](https://intuit.github.io/karate/){:rel="nofollow"},
a test automation tool that employs the same traits as Cucumber while allowing developers to go beyond step definitions,
composing multi-step test scenarios. A scenario here represents an action that would be verified by multiple step
definitions, under multiple angles.

If composing scenarios is still not enough, it is also possible to go a step further again with workflows. A workflow
would be a composition of action, such as a e-commerce tunnel. While scenarios are stateless, their composition is
stateful. Fortunately, Karate understands that and makes it easier to create both scenarios and workflows. Still, it is
inadvisable to create low-level assertions at these steps; because of the high level of abstraction, low-level
assertions would necessitate higher than average maintenance. High-level assertions are better suited for what can be
considered server-side end-to-end tests.

End-to-end tests are slow and must be macro and on the surface or else they could get flaky. Low-level tests are fast
and must be micro and exhaustive.
