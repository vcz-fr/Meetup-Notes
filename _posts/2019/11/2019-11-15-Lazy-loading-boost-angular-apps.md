---
categories: ["meetups/bdx-io"]
title: "Lazy Loading: Boost your Angular applications"
---

{% include time.md %}

By [Damien Riccio](https://twitter.com/damienriccio){:rel="nofollow"}, Developer @ 4SH  
By [Elian Oriou](https://twitter.com/eoriou){:rel="nofollow"}, Tech Lead @ 4SH  
[Video \[FR\]](https://www.youtube.com/watch?v=DWZWWeJDwCw){:rel="nofollow"}

{% include toc.md %}

## A scenario

The time a web application takes to load is part of the user experience and acceptance criteria of the application. A
slow experience may prevent a user from using your application ever again. Moreover, a faster loading time puts less
strain on network equipment.

Here is an example Angular 8 application:

```
[Root]
|
 -> [AuthService] <R> (2)<-
|
 -> [MainApp] <R>
    |
     -> [HomeApp] <R> (1)->
    |
     -> [AdminApp] <R> (1)->
    |
     -> [CommonHelper] (1)<- (2)->

<R>: Routable, meaning this component represents a page that may be accessed from an identifiable URL
(n)->: Dependency to another module
(n)<-: Dependency from another module
```

## Lazy Loading

There are prerequisites to make an Angular application lazy loadable: your application modules must be isolated and
downloaded on demand. Only Routable modules, that is modules that have one or multiple URLs assigned may be
lazy-loadable as Angular's Lazy Loading is tied with the Router component.

To make an application lazy-loadable, it is necessary to centralize route declarations to a parent module that would
take the responsibility of declaring all the routes and downloading the right components. In this case, you would move
your routes declared in the HomeApp and the AdminApp to the MainApp. That way, lazy-loadable routes are loaded. Be
careful though as this does not work if your lazily imported modules are also imported statically by your application.
For instance, our AuthService here is a Component that manages sign in screens and authentication for both the HomeApp
and the AdminApp. Unfortunately, this module is required to check whether the user is connected at startup by the
CommonHelper and is thus imported statically. This implies that the AuthService cannot be lazy-loaded.

In reality, lazy-loading a statically imported module causes weird behaviors due to the way dependencies are handled.
Auto-injected startup dependencies are managed by the root Angular dependency injector while lazy-loaded dependencies
are managed by the lazy-loaded module. In such an architecture, the same component may exist multiple times in an
application, which becomes problematic as soon as one of your components is not stateless, such as one that manages
authentication, for instance. You could solve this issue by making your statically imported components actually static.
That way, you can guarantee that calls are directed to the same function. Nevertheless, that does not completely solve
the issue; indeed, our services do not respond to the definition of singletons!

On a side note, without Lazy Loading, the root Angular dependency injector manages all the injectable components of an
app. As soon as there are Lazy Loaded components, each one is packed with an independent local injector containing the
required dependencies for the component. That is why the same dependency may appear multiple times in the same
application.

Fortunately, Angular offers a syntax allowing to fine-tune the loading behavior of a module: the static functions [forRoot](https://angular.io/api/router/RouterModule#forRoot){:rel="nofollow"}
and [forChild](https://angular.io/api/router/RouterModule#forChild){:rel="nofollow"}, which both return [ModuleWithProviders](https://angular.io/api/core/ModuleWithProviders){:rel="nofollow"}.

## Better practices

Modules loaded lazily are great for performance but what if we could go further by not loading unnecessary modules at
all or loading them just before they are needed? Both of these are actually possible.

To avoid loading an unnecessary module, you could use the concept of Guards, which would execute a predicate determining
if a module ought to be loaded or not in an application. Typically, we use the [CanActivate](https://angular.io/api/router/CanActivate){:rel="nofollow"}
guard when an application is statically loaded to decide whether a component should be loaded in memory or not. Here, we
want to prevent the component from being loaded at all, which can be accomplished with the usage of the [CanLoad](https://angular.io/api/router/CanLoad){:rel="nofollow"}
guard instead. The implementation only slightly differs but the result is much more convincing.

Now, if your modules are heavy, even in case they are lazily loaded, this can cause a bad user experience. By default,
Angular does not interfere with loading strategies; it does not define any. This behavior can be altered to preload
modules that are not subjected to load guards, described in the previous paragraph. The result is transparent for the
final user, as unused network and computational capacity will be employed to download modules in the background. In
other words, the experience should not be altered significantly and the application will feel snappier. To make this
change, in the [ExtraOptions](https://angular.io/api/router/ExtraOptions#preloadingStrategy){:rel="nofollow"} of the
forRoot static function, you must set the preloading strategy to [PreloadAllModules](https://angular.io/api/router/PreloadAllModules){:rel="nofollow"}
instead of [NoPreload](https://angular.io/api/router/NoPreloading){:rel="nofollow"}, which is the default.

```js
RouteModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
```

## Going further

The `forRoot` and `forChild` syntax can get very verbose and make tree shaking less efficient and bloat your
applications. To avoid this, it is possible to indicate to injectable services, right from the `@Injectable` decorator,
in which other components it will be injected by using the [providedIn](https://angular.io/api/core/Injectable#providedIn){:rel="nofollow"}
parameter.

Tree shaking can now safely remove the injectable from the injector as it is now provided to a defined set of modules.

## Questions and Answers

### With PreloadAllModules, won't interfaces be loaded slower?

No, only necessary modules will be loaded in a blocking fashion. As for the others, their loading is deferred.