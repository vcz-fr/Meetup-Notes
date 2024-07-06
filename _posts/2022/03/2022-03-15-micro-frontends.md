---
categories: ["meetups/bdx-js"]
title: "Micro-frontends investigations"
---

By Sébastien Oddo, Full stack developer and Technical manager @ Ippon  

## Teams don't scale

Products scale, teams less so. Micro-frontends are the response to growing frontends that cannot be maintained by a
single team anymore. A frontend that grows large also implies applying the same technology to a larger set of needs,
longer compilation times and more maintenance involved. All scaling issues.

A great strategy to beat scaling issues is to divide the application in independent modules reassembled together in the
same interface. Each module can rely on its own set of technologies.

Let's take a step back: an application rarely represents just a single domain. It encompasses a vision of the value
chain. The sub-components of an application implement each domain using business logic and whatnot. By this token,
libraries should not contain business logic: they should accelerate development by implementing common patterns or
algorithms. Libraries are imported statically or dynamically inside an application component.

Going back to the micro-frontends, this decoupling allows teams to develop their own _components_ that would be managed
by a _shell application_. A key difference between _applications_ and _components_ is the notion of routing;
_applications_ have the ability to route requests to a set of _components_ whereas _components_ are isolated chunks of
code that hold responsibility for a business domain.

## Underlying technologies

Micro-frontends is a pattern. How would we build an application that dynamically identifes and downloads its modules?
There are a few options:

**iframes**: It feels wrong but it works! `<iframe>`s create a browsing context which can be manipulated through the
`target` attribute of `<a>`. The drawbacks: this isolation can make the user experience incoherent, the shell and the
components cannot easily communicate and the solution is heavy and unwieldy.

**Module Federation**: Released with [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/){:rel="nofollow"}.
This requires all the components to be packaged with Webpack. In return, the components can be dynamically loaded. This
option is recent and not yet mature but functional and well-maintained.

**Piral**: [Piral.io](https://www.piral.io/){:rel="nofollow"} chose a marketplace approach for their "pilets", their
components which you can retrieve at will. This solution did not reach general availability yet, the documentation is
lacking and developing applications wth Piral is not that simple.

**Web components**: This is a [standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components){:rel="nofollow"}
supported by all the major web browsers relying on [custom HTML elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements){:rel="nofollow"}
and the capabilities of [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM){:rel="nofollow"}.
You can expect no JS or CSS side effect and isolation from the rest of the Web context thanks to Shadow DOM in exchange
for a performance hit. Web components is a decent solution for small and simple components, though.

**Single-SPA**: [Single-SPA](https://single-spa.js.org/){:rel="nofollow"} is the most mature solution of the group,
which perfectly handles the sub-applications. The _shell application_ is written with it, it loads the sub-applications
JS bundles and routes requests to the correct sub-application. Single-SPA also handles mounting and unmounting. This
solution is very opinionated: framework support is ultimately decided by the maintainers, adapters are developed which
implies they are updated after their related framework release and it is not recommended using multiple versions of the
same framework or multiple frameworks.

## Common concerns

This section focuses on Single-SPA even though most of the explored ideas are as applicable to other micro-frontend
solutions.

**Authentication** is usually handled through [JWT](https://jwt.io/introduction){:rel="nofollow"} stored in HTTP-only
cookies or LocalStorage nowadays. There are two camps in this battle and both have their upsides and downsides.

**Global variables** like the ones created by libraries such as [jQuery](https://jquery.com/){:rel="nofollow"} should be
avoided! If they are necessary, refactor them with [Webpack Externals](https://webpack.js.org/configuration/externals/){:rel="nofollow"},
[single-spa-leaked-globals](https://single-spa.js.org/docs/ecosystem-leaked-globals/){:rel="nofollow"} or document them
thoroughly and be certain that your peers know about them.

**Passing state** from the shell application to sub-applications can be done directly. It is recommended to agree on a
common communication interface beforehand.

**Managing styles** is complex as styles are often scoped with frontend frameworks, making conflicts a possibility. This
issue is reminiscent of collisions when using the same design systems or foundations (Bootstrap, Material). While there
is no clear way out, you could prevent teams from shipping styles at all in their own components; limit them to the
shell application and rely on the Shadow DOM instead. This would require a complete design review whenever a style
breaking change is needed. You could also import and scope the same style sources in every component with the risk of
making the experience incoherent if not properly maintained.

## On Angular

Angular natively supports Module Federation thanks to [a schematic](https://www.npmjs.com/package/@angular-architects/module-federation){:rel="nofollow"}.
This solution is quite easy to setup and is officially supported.

[ng-dynamic-component](https://www.npmjs.com/package/ng-dynamic-component){:rel="nofollow"} adds synctatic sugar to
simplify dynamic component loading.

To note if you wish to use Module Federation with Angular:
- Use similar Angular versions. Even though breaking changes are infrequent nowadays, using similar versions reduces
  risks of breakage;
- Share singleton services across your components to save on loading, unloading and package size;
- [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER){:rel="nofollow"} cannot be used anymore. You have to
  implement your own module initializer if components need this feature. You could implement this by having the shell
  application call an initialization method exposed by the components;
- Passing state is difficult. You can circumvent this by using the module URL, add server-side logic, LocalStorage,
  etc.;
- Configuring thr router becomes more difficult, especially "/";
- Public assets can collide between components. Webpack exposes options to customize the assets path;
- Components URLs change between the dev server where they are served on "/" and the published version where they are
  served on "/component-name".

Having your own component registry grants the ability to implement new patterns: the server can determine which
components it needs to load from the registry, or you can orchestrate their delivery, disable failing components, etc.
However, it is unclear how this advantage would scale with the number of components in the registry.

## Justifications for micro-frontends

There is no silver bullet. Every technology comes with its trade-offs. That is why it is important to take your context
into account before blindly committing:
- Is your project well-divided in terms of business logic, UI, etc? If not, you should start there;
- Micro-frontends require coordination and increases delivery cost, is this acceptable? Teams, infrastructure,
  development experience when simpler alternatives exist;
- Will you need to support different frontend technologies? Frontend technologies evolve fast. Maintenance cost
  increases exponentially with the diversity of your frontend ecosystem. To contain that, use libs to accelerate
  development and "force" the usage of a given framework.

Everyone does not **need** micro-frontends. Companies who reached a sufficient level of mastery with their frontend
technologies might not even need them at all.

## Questions and Answers
### If a project uses the same version of the same technology, does it qualify as a micro-frontend?

Yes. What counts is the presence of a shell application that dynamically loads components.

### If a webpage is composed of multiple components using different technologies, does it qualify as a micro-frontend?

Yes, for the same reason.

### Is is really desirable for teams to independently deliver updates for their components?

This depends on organizational constraints. Some companies favor accelerating delivery while others want to ensure
everything works before committing to a release.

### Is there a team or bundle size after which micro-frontends are a sensible choice?

Having three or more teams or an international context can make micro-frontends justifiable. The idea would then be to
simplify the contributions of each team by reducing the risk of collisions.

### What about performance?

`<iframe>`s are the worst offenders: they are as inefficient as it can get. Module Federation is build-optimized and
development teams can help Webpack make better optimization decisions about common dependencies. Web-components should
be preferred for small, independent, native components. Single-SPA works for small applications but does not scale well
due to its component loading-unloading behavior.

### Is micro-frontends an equivalent of the Strangler Pattern for monolithic frontends?

It could be. The monolith would become the shell application. Teams would then scratch its surface to extract
components.

### What about Astro?

[Astro.build](https://astro.build/){:rel="nofollow"} is a fairly recent response to the trend that works as a static
site generator for JavaScript frameworks. Not quite a micro frontend, though.

There are other technologies that come packed with a CI/CD, a CDN, etc. Be careful: they may be a good choice for small
projects but you might soon get stuck with an unmaintainable mess ripe for a rewrite.

### This resembles backend micro-services. Is there an equivalent to event buses, separation of concerns, etc.?

Due to the way frontend technologies work, events buses cannot be easily replicated. `<iframe>`s possess [a rudimentary API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage){:rel="nofollow"}
to communicate with their parent process. When using Module Federation, you could refactor libraries such as RxJS and
reuse their instances across your components.

### How would you manage CORS and CSP?

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS){:rel="nofollow"} should not be
an issue if all files are served from the same domain. Otherwise add the required headers on the HTTP responses serving
your bundles.

However, [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP){:rel="nofollow"} will
require additional research to ensure the right contents are loaded from the given locations in the correct way.
