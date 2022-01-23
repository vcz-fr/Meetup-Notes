---
categories: ["meetups/afup-bdx"]
title: "One monolith, multiple microservices"
---

{% include time.md %}

By [Julien Vitte](https://twitter.com/pitchart){:rel="nofollow"}, Tech Lead @ Inside Group  
[Slides](https://pitchart.github.io/modular-monolith-vs-microservices){:rel="nofollow"}

{% include toc.md %}

## Introduction

What is the best way to design a project in order to avoid it becoming a monolith or a microservice with communication
issues? An answer to that question should never neglect the needs that motivated the project in the first place nor the
ones related such as security or performance.

A multi-domain application which components have different needs can benefit from a microservice approach. Microservices
might not represent the perfect solution though; communication between components and dependencies are among the most
difficult elements to manage. Moreover, if we cannot design monolithic applications, can we expect to be able to design
microservices?

## Modular monolith

![The different classes of application architectures](/assets/global/2020-05-19_One-monolith-multiple-microservices/monolith-vs-microservices.jpg)  
The different classes of application architectures, credits: [Simon Brown](https://www.youtube.com/watch?v=5OjqD-ow8GE){:rel="nofollow"}

Any project can be classified in one of the following categories:

- Monolith: One solution with multiple interleaved components;
- Microservice: Multiple loosely coupled components;
- Monolithic microservice: Multiple strongly coupled components;
- Modular monolith.

The major issue with classic monoliths is their complexity. The larger the codebase, the more difficult it is to add new
code and features. Complexity can be divided into three categories:

- Essential: Related to the problem to solve, the need;
- Necessary: Related the solution to the problem;
- Accidental: Accumulated during the project.

Accidental complexity is the most concerning of all three, since it is due to shortcuts taken to produce features
faster, inexperience, a misinterpretation of the requirements, etc. Often dubbed "dark complexity" or "hidden
complexity", developers should be concerned about its quantity in a project.

Another element that goes hand in hand with complexity is the coupling between the different modules of an application,
which scales superlinearly -faster than linearly- with the number of components.

All of this led Simon Brown to define [The C4 model for visualizing software architecture](https://c4model.com/){:rel="nofollow"}.
This model proposes to divide a project into four levels of detail:

1. Context: the ecosystem surrounding the project;
1. Container: the ecosystem surrounding one deployment unit, one application of the project;
1. Component: the structural blocks contained in one application;
1. Code or Class: the implementation of one individual component.

This model opens choices such as read / write isolation, business domain isolation and software bundles. Business domain
isolation is especially important in contexts where the same notion can have different meanings depending on the
involved party. For instance, a product will not have the same meaning to a marketing employee, to a salesperson or to a
logistics manager.

## Symfony

In a standard application, Symfony would have to respond to a single Controller. Here, the situation is different due to
the units of deployment and concerns around the isolation. Fortunately, it is possible to isolate the configuration per
bundle and the dependency resolution. To do so, it is possible to extend the kernel to add the service name and the
configuration root path.

```php
abstract class MicroServiceKernel extends Kernel
{
    use MicroKernelTrait;

    const CONFIG_EXTS = '.{php,xml,yaml,yml}';

    protected $serviceName;

    public function __construct($environment, $debug, string $serviceName)
    {
        parent::__construct($environment, $debug);
        $this->serviceName = $serviceName;
    }

    public function getConfigurationPath()
    {
        return $this->getProjectDir() . \sprintf('/config/%s', $this->serviceName);
    }
}

// Code example extracted from the meetup slides
```

If you wish to make communication more efficient between your modular monolith components, you could use the [Symfony Messenger Component](https://symfony.com/doc/current/components/messenger.html){:rel="nofollow"}
and its message queues to specify which applications are allowed to send and receive messages to which application.

## DDD

To make things easier for everyone, it may be relevant to name concepts in the code like the domain specialists and to
clearly state the semantic and lifecycle limits of the definitions.

Semantic limits concern the meaning of the terms in multiple different domains. Lifecycle limits are linked to different
contexts. For instance, a postal address can be changed on a user profile or in an address book but not in an invoice.

## Tests

![A pipeline execution on a modular monolith PHP application](/assets/global/2020-05-19_One-monolith-multiple-microservices/pipeline.png)  
A pipeline execution on a modular monolith PHP application, credits: [Meetup slides](https://pitchart.github.io/modular-monolith-vs-microservices/#/6){:rel="nofollow"}

The modular monolith approach allows developers to scale their CI/CD chain: each Container -see paragraph on the C4 model
above- can be isolated, tested, built and deployed in parallel.

It is even possible to run Architecture tests with tools like [j6s/phparch](https://github.com/j6s/phparch){:rel="nofollow"}.
These tests define and validate a software architecture by enforcing design rules thanks to inclusive and exclusive
dependency definitions. In other words, it becomes possible to state which category of components should be called or
not called by which. The definition of the rules uses a [fluent API](https://en.wikipedia.org/wiki/Fluent_interface){:rel="nofollow"}
in j6s/phparch to make them easier to write and read back.

## Questions and Answers

### Is there a plan for long-lived workers in PHP?

Standard PHP would make such feature difficult to reach because of its behavior with fatal errors, its memory management
and execution timeout limits. There are hacks to make this work but it could be wise to work on the algorithm or to
question the technology involved.
