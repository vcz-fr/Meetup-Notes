---
categories: ["meetups/ippevents"]
title: "SOLIDify your React applications"
---

{% include time.md %}

By Marc Etourneau, Frontend Developer @ Ippon  

{% include toc.md %}

[SOLID](https://en.wikipedia.org/wiki/SOLID){:rel="nofollow"} was first and foremost designed with application
development and Object-Oriented Programming in mind. JavaScript does not perfectly fit that model and some liberties
have been taken. Also, we remind that functional React components is a component implemented as a function. It
implements state, state updates —also known as "effects"— and rendering.

## Principles

**Single Responsibility Principle**: one and only one reason to exist. A React component must not implement state
updates **and** rendering. There is no harm in separating business rules from view updates.

**Open-Closed Principle**: open to extension, closed to modification. React Compound Components are the best way to
create reusable wrapper components. The `{children}` tag indicates where child content should be inserted in the
wrapper. Interactions and reactivity can be added on top thanks to [React Context](https://react.dev/learn/passing-data-deeply-with-context).

**Liskov substitution Principle**: If a function accepts an instance of Y that inherits an interface X, then any X
should be accepted in place of Y. React has all the interfaces it needs to implement behavior on top of Web APIs without
having to reimplement every attribute as a property! Want to create a design system? Use native inputs!

**Interface segregation Principle**: A consumer should never implement part of an interface that is not needed. If a
component needs part of a large set of complex props then it's better only passing exactly what it needs. Reducing the
amount of data that is passed around reduces chances that simple updates extensively refresh the DOM and improve
performance and the architecture of the app.

**Dependency inversion**: Concretions depend on abstractions, never the opposite. Features is always declared using
interfaces and implemented via classes acting as adapters. If a class depends on a feature provided by a different
class, it uses the definition from its interface.
