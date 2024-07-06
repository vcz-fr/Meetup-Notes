---
categories: ["meetups/afup-bdx"]
title: "A well-prepared Dependency Injection Container"
---

By [Nicolas Perussel](https://twitter.com/mamoot64){:rel="nofollow"}, PHP Architect @ ekino

## History

The Drupal community is not very invested into Dependency Injection Containers, even though they are a major Symfony
component.

**522**. This is the number of services available in the Drupal Dependency Injection Container. In Symfony 4 vanilla,
there are only just under 100. Initially, Drupal 8 was supposed to use the built-in Dependency Injection Container from
Symfony. Drupal being a CMS, the approach taken by Symfony's solution has deemed not the best suited for its needs.

Drupal relies on the file system a lot and tries to offload as much as it can to databases or other systems. That is why
it cannot allow Symfony to dynamically build the Dependency Injection Container and halt the production environment
while its large number of services are being compiled.

Symfony's Dependency Injection Container is static and compiled while Drupal's one needs to be modifiable at runtine
because of the module system. The developer community chose to follow the custom path.

## Dependency Injection Container

A Dependency Injection Container is a system that contains the services that the application can provide and matches
them automatically with the services requested by the application.

There are a few steps to follow to build the container:

```
Start                 Compilation passes
|_Loader______Container builder_/  \_Container_Dumper
\_Discovery_/                                    \__Finish
```

The container is the product of the process. The Dumper is here to avoid compiling the container at every request. It
persists the result so that it can be retrieved and recomposed. A compilation may take time depending on the number of
services there are to include and the number of compilation passes. Each compilation pass can alter the result of the
compilation.

The compiler is there to manipulate and optimize the resulting container and the loader and the service discovery find
and add the services to the to-be container.

In Drupal, a database access is considered much faster than a file system access since the database can be scaled much
easily than the file system. As such, the implementation chosen by the community will try to minimally stress the file
system and leverage the database. To do so, a majority of the classic components of a Dependency Injection Container
have been reimplemented.

Drupal's container builder is similar to Symfony's. Since environments are not a thing, it disables resource tracking
and changes the conventions to be more familiar for the community thus easing the migration to Drupal 8. The default
dumpers, `PHPArrayDumper` and `OptimizedPHPArrayDumper`, both create an array containing the container dependencies. The
optimized version serializes the result to speed up the subsequent reads.

## Altering the Dependency Injection Container

The options are few: you can implement the `ServiceProviderInterface` or the `ServiceModifierInterface` or extend
`ServiceProviderBase`, depending on your needs. The first one adds dependencies while the second alters them, which is
the equivalent of adding a compiler pass.

From the Kernel standpoint, Drupal allows modifying the Dependency Injection Container bootstrapping. They are consumers
of that feature since the Container is dumped in the database and must therefore be loaded from the database.

The rewrites also have some bad sides:
* There is no Expression Language;
* Symfony's console cannot be used at its full potential for debug. [Drush](https://www.drush.org/){:rel="nofollow"} and [Drupal console](https://drupalconsole.com/){:rel="nofollow"}
  are positioned as alternatives;
* Drupal's services are public! This decision has been made to maintain the ideas of Drupal within its Symfony
  implementation;
- Drupal's DI redefines Symfony's. Mechanically, it will always be late on the feature side and contains a lot of code
  duplication.

Drupal has not been developed _with_ Symfony. It is rather _compatible_ with it.

## Questions and Answers

### Are there other tools to make the developer experience better?

ekino created a tool called "[Drupal-debug](https://github.com/ekino/drupal-debug){:rel="nofollow"}" which extends the
Kernel to improve the developer experience with Drupal.

### What happens when two modules are registered for the same service?

A priority system is applied. By default, the module which name comes first alphabetically is loaded.