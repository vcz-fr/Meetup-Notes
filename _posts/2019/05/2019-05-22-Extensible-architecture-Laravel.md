---
categories: ["meetups/afup-bdx"]
title: "Extensible architecture with Laravel"
---

{% include time.md %}
{% include toc.md %}

## Extensible architecture with Laravel

By [Marty Lamoureux](https://twitter.com/martylamoureux){:rel="nofollow"}, CTO & Co-Founder @ DynamicScreen

### Extensibility

DynamicScreen is a company that created an application that allows companies to stream content on screens. Contents can
exist under different formats: plain text, images, videos, facebook posts, tweets, etc. The underlying code is always
pretty similar, which calls for a specific architecture.

To avoid maintaining different variants of the same product for each project or each client, the project has been
subdivided in a core and components. The main objectives of the architecture would be the following:

- Adding features without changing the Core;
- Addict features for specific projects or clients;
- Reuse common modules between multiple projects.

The approach of using extensions would allow the Core codebase to remain the same without needing hacks to add features.
In addition, the extensions code would be completely separated from the Core, which makes it possible to mix and match
extensions across environments, projects and customers! Nevertheless, with this advantage comes two important drawbacks:
compatibility between the extensions and the core and between the extensions themselves and, in Laravel, the exposition
of the Core to the extensions, meaning that any extension can potentially retrieve sensitive data using the framework
methods.

### How it works

The system contains four main components: the application core, the extensions, an extension support and an extension
kit. The extension support is responsible for handling and loading extensions while the extension kit contains common
code, interfaces and abstract classes to normalize their implementation and interactions.

### Implementation
#### Prequisites

You will need two elements to implement such a system:
- A dependency manager and an autoloader;
- A Service Provider or Service locator. Something that initializes your Dependency Injection Container.

#### How to

In the case of this particular extension system with Laravel, it has been decided to add an `extension` directory
containing the application extensions, its own `composer.json` file to resolve them and a `providers.json` file with the
extensions to load.

Each extension stems from the Extension Kit, which contains a `boot` and a `register` method and some useful functions.
The extensions do have access to the application core, though. The Extension Manager receives the extensions and handles
the rest.

This system is portable across multiple applications and even technologies, provided it can be rendered compatible.

### Questions and Answers

#### Are the extensions loaded for each request?

They are but the dependencies resolved by Composer and the autoloader are persisted on the disk and reused.

#### Why does the system needs two `composer.json`s?

The application and its extensions are handled separately. This makes the application as independent as possible from
its extensions, loaded as mere dependencies.

#### Could the extension system have been implemented like a bundle?

Multiple applications can exchange information and might not need the same extensions. The current implementation
provides minimal overhead by just loading required extensions. Moreover, some extensions are client-specific and should
not be exposed to other clients.

#### Conflicts resolution within the extensions

Even though extensions are very light and should never conflict between each other, the autoload `boot` method should
help solving conflicts.

#### Does every dev has access to every app and extension?

Yes. There are four developers on the solution and they have access to all the modules and each environment. Of course,
not everyone can publish changes to the production environment. Some of the trade-offs of the solution have been made to
accomodate the development environments.

#### How do you test the solution to avoid conflicts between the extensions?

All extensions are tested together in a special test environment. This means that client-specific extensions and general
extensions are present at the same time. This method helps avoiding regressions.

## Laradock: a full PHP development environment for Docker

By [Julien Vitte](https://twitter.com/pitchart){:rel="nofollow"}, Lead Web Developer @ InsideGroup

### Presentation

[Laradock](https://laradock.io/){:rel="nofollow"} is a set of preconfigured Docker containers using Docker and
Docker-compose, preferably with Linux.

The Quick start is very straight-forward:
```sh
# Clone the project
$ git clone https://github.com/Laradock/laradock.git

# Generate your .env file
$ cp env-example .env

# Run your containers
$ docker-compose up -d nginx mysql phpmyadmin redis workspace 
```

The main advantages of this solution is to easily setup your development environment, switch the versions of the
supporting infrastructure and dependencies, the separation of each component, trusted base images, full customizability,
etc.

The only thing you should know is that your code will be run in the `workspace` service. And that is it!

How can you make this better? By automating most of it using Makefiles or automation tools of your own choosing. You
could install the solution, manage your environment and configure it like a submodule to integrate it seamlessly with
your projects.

### Questions and Answers

#### Is there anything to do in the Docker-compose file?

Laradock only works with PHP and the services configuration is already done and homogeneous so you should never have to
edit the Docker-compose file yourself.

#### Why using submodules?

The submodule allows the code modifications to be propagated through your environment. This can make your Laradock
dependencies configurable across projects and independent updates still possible, while being able to use the
automations in every project.
