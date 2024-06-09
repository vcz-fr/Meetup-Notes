---
categories: ["meetups/onepoint-bdx"]
title: "Improving the JavaScript ecosystem"
---

{% include time.md %}
{% include toc.md %}

## Biome, your new JS library
By Julien Fettinger, Frontend Tech Lead @ Onepoint  
[Slides](https://fjulien.github.io/conference-biome/){:rel="nofollow"}

### What is Biome?

[Biome](https://biomejs.dev/){:rel="nofollow"} is a tool that statically analyzes and formats code. Analyzing can detect
potential code issues and formatting means rewriting in a clearer and understandable way. Those two functions share the
same objective: making code more maintainable. Similar toolchains exist, some well integrated into Integrated
Development Environments or their extensions. In any case, the development team must make sure that everyone is sharing
the same configurations and tools and that code is analyzed and formatted before being versioned.

As for libraries, the most famous ones in the JavaScript ecosystem are [Prettier](https://prettier.io/){:rel="nofollow"}
and [ESLint](https://eslint.org/){:rel="nofollow"}. In fact this is where Biome got started: Prettier's creator started
a challenge where a piece of software had to cover 95% of Prettier's tests but be written in [Rust](https://www.rust-lang.org/){:rel="nofollow"}.
Not only was Biome first to pass the prerequisites, but it ran must faster and scaled with the size of the code base!

Since Biome won the challenge at the end of 2023, there has been an ambition to support more web languages including
multiple within the same file! Checking for dependencies across different technologies such as JS, NPM, HTML and so on
is also planned. Version 1.7 has been released in April 2024 and 1.8 is in the works.

### Commands

`biome init` is the first command to run in any Biome project. It initializes Biome and creates a basic configuration.

`biome migrate eslint` / `biome migrate prettier` would be the second command to run in a project after initializing it
if the development team is migrating from ESLint and / or Prettier. By default, Biome enables recommended rules. When
importing configuration it will match existing configurations as closely as it can and disable its rules.

`biome format --write .` formats files recursively, overwrites them.

`biome lint .` runs the linter recursively but does not overwrite files. Biome is verbose by default and will give the
offending code, propose a fix, explain it and indicate if the fix induces risk for the code behavior.

`biome check` is an equivalent to lint and format run together but does not overwrite any file. `biome check --apply`
would only apply safe changes and `biome check --apply-unsafe` would apply all changes.

## Are you sure you need JavaScript?
By Rémi Pachet, Frontend Lead @ Onepoint  
[Slides](https://so-day-2024.remi-pachet.fr/){:rel="nofollow"}

Today, it is infrequent to come across websites that take full advantage of the HTML and CSS specifications. JS
frameworks are currently the stars of the web, much to the detriment of CSS 3, which has evolved a lot since it was
first introduced in 2013. The World Wide Web Consortium —W3C— and its Working Groups regularly gathers with major
browser vendors to advance the state of the platform.

> A note: what follows may not be compatible with older browsers.

### Interface tricks

**Tooltips:**  
With JS, one would use a library or use mouseover, mouseout and some CSS to create and style tooltips.  
In native HTML/CSS, you can use `data-*` attributes that can be referred to in CSS using the [`attr()`](https://developer.mozilla.org/en-US/docs/Web/CSS/attr){:rel="nofollow"}
function in [`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after){:rel="nofollow"} and `:hover::after`
blocks.

**Accordions:**  
Native HTML/CSS can do that with [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details){:rel="nofollow"}
and [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary){:rel="nofollow"} tags. The marker
that toggles the accordion can be styled with the [`::marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker){:rel="nofollow"}
CSS pseudo-class. Note that the `<details>` tag, which acts as a container, is also animatable and that markers can be
styled in the open and closed state. When open, the browser sets an `open` attribute to the `<details>` tag, therefore
you can style contents with `details[open]`.

**Forms and validation:**  
Adding good validation is the frontend can guide your user but will not prevent mistakes from happening. You **must**
implement equal or stronger validation in your backend as well!

The [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern){:rel="nofollow"} is the most
complex to wield but also the most flexible. It implements regex validation without JavaScript involved and is case and
accent-sensitive.

Inputs can be styled with the [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid){:rel="nofollow"} and [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid){:rel="nofollow"}
pseud-classes, though they apply as soon as the input is loaded which may cause bad UX for required fields as the user
will be assailed with invalid fields. To style fields after registering user interaction, use [`:user-valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid){:rel="nofollow"}
and [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid){:rel="nofollow"} instead.

**CSS tricks:**  
Since the end of 2023, CSS supports nesting thanks to the [`&` operator](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting){:rel="nofollow"}!
While the operator is not required, it enables powerful new ideas: applying child styles depending on parent properties.
Indeed, the `&` can not only be positioned on the left of the child selector but also on its right!

In addition, the introduction of [`:has`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has){:rel="nofollow"} took
the world of CSS by surprise as it can apply CSS on parents. This has been a requested property that opens very powerful
ideas but which must be used with extreme caution.

**Switch:**  
This trick is very similar to the [Checkbox hack](https://css-tricks.com/the-checkbox-hack/){:rel="nofollow"} where a
checkbox is used to retain the state of an input or element and apply styles to it using the [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked){:rel="nofollow"}
pseudo-class and the [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before){:rel="nofollow"}
pseudo-element.

**Dark mode:**  
[`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/@container){:rel="nofollow"} CSS rules and [custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties){:rel="nofollow"}
make a great pair to implement themes, including a dark mode. Container style queries can apply conditionally when a
criterion is met, which could be the state of a checkbox or a switch. Such styles could set a variable which can in turn
apply style changes to the rest of the webpage.

**New APIs:**  
[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries){:rel="nofollow"}
can apply responsive styles depending on the size of a container. This is different from media queries which apply to
the viewport size.

[`color-contrast()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-contrast){:rel="nofollow"} is a
CSS function that selects the color from a given list that has the biggest contrast with a reference color. In complex
theming scenarios, this can give an edge to website designers to improve user experience.

### Questions and Answers
#### Does form validation support custom error messages natively?

It's not possible to customize error messages without using JavaScript, though you can use `:has` to capture `:required`
errors for instance. Use cases are limited, but some can be handled natively.

## StyleX: Is it the React of CSS?
By David Maurin, Software Architect @ Onepoint  
[Slides repository](https://github.com/imryck/stylex-prez){:rel="nofollow"}

### A need for a better solution for styling

[StyleX](https://stylexjs.com/){:rel="nofollow"} is a design system that powers Facebook and has been open source by its
parent company Meta. It has been designed to solve the growing issue of the amount of CSS served by their main app. Most
of the 10MB of CSS that were served impacted the performance of every component in the chain:

- Bigger assets need more time to get delivered;
- Bigger assets take more resources, memory and time to be decompressed locally;
- Larger CSS codebases mean more rules have to be stored and applied by web browsers, resulting in slower performance.

Furthermore, most of the selectors and rules were duplicated or unused, resulting on a lot of code that could be avoided
or refactored. However, when a codebase is this large, it is impossible to agree on rules regarding how and when CSS
should be written. Writing efficient CSS is near impossible, even with efforts such as [Tailwind](https://tailwindcss.com/){:rel="nofollow"}.

Let's look at the history of styling:

- In 1998, CSS2 has been introduced;
- 2006 sees the first effort to improve the state of CSS with [SASS](https://sass-lang.com/){:rel="nofollow"} (Ruby);
- 2010 introduced CSS3 to the world with media queries and responsive design;
- It has been closely followed by [Bootstrap](https://getbootstrap.com/){:rel="nofollow"} in 2011, which left a profound and
  lasting impact on web design. Components being its main attraction;
- In 2013, the notion of Atomic CSS has been coined by Thierry Koblentz in [this post](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/){:rel="nofollow"};
- Tailwind, an implementation of Atomic CSS, took the world by storm in 2019.

Today, Tailwind is the most famous Atomic CSS framework by far. Its goal is to make CSS composable rather than
component-specific. This makes CSS flexible but can make the resulting code verbose. StyleX's approach is JS-based and
uses annotations that define CSS styles and properties. The rest is handled by a compiler which gathers all the styles
and generates optimal CSS code with auto-generated classes.

### How StyleX works

JavaScript makes StyleX more flexible: users can define default styles, overrides, themes and user styles and more for
each component. Pseudo-classes, media queries and animations are all supported. Variables are an edge case though:
because StyleX is compiled statically, developers should prefer using its variables rather than those provided natively
by CSS.

StyleX is supported via plugins in [Webpack](https://webpack.js.org/){:rel="nofollow"}, [Babel](https://babeljs.io/){:rel="nofollow"}
[ESBuild](https://esbuild.github.io/){:rel="nofollow"}, [Rollup](https://rollupjs.org/){:rel="nofollow"} and more. If
you decide to use it, enable the development mode to get debug hints during development as they make finding root causes
easier like source maps.

Today, StyleX is not easy to integrate: support for Angular is not on target since the framework is heralded by Meta
which favors React. Moreover, this will make your apps harder to restyle and less usable to people that apply custom CSS
styles. Some JavaScript frameworks such as [Qwik](https://qwik.dev/){:rel="nofollow"} do integrate with StyleX though.

In terms of correctness, rest assured: Meta is migrating all their apps to StyleX. Its paradigm is very different from
conventional CSS, but the performance benefits are visible.

### Questions and Answers
#### How to react to bugs? Generated classes are unreadable!

The compiler guarantees generated classes and their contents. Bugs can only be caused by the source code because StyleX
nor its compiler cause side effects. The dev mode can help debugging issues by integrating the file name on the
generated class name using CSS hacks. Use it to simplify your debugging experience.

## RxJS and Angular: a tale of tubes
By Lucas Baste, Web Developer @ Onepoint  

### On Observables

JavaScript is fundamentally asynchronous and [RxJS](https://rxjs.dev/){:rel="nofollow"} implements a reactive approach
to event handling thanks to its [Observables](https://rxjs.dev/guide/observable){:rel="nofollow"} and surrounding types.
In that sense, JavaScript [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise){:rel="nofollow"}
are pull-based while Observables are push-based: Observables emit values when an observer subscribes to it. Observes can
retrieve values, completion events and error events from Observables.

[Angular](https://angular.dev/){:rel="nofollow"} is tightly coupled to Observables, sometimes too much as it won't
automatically destroy subscriptions when they are created during the lifecycle of an Angular Component. The
inconvenience of adding a `ngOnDestroy()` method that destroys subscriptions prompted the Angular team to implement an
async pipe that completely manages the subscription lifecycle for Observables, including their destruction.

### Operators

There are three major types of Observable operators in RxJS:

- Creation: they return new Observables;
- Composable: they apply an operation on an input Observable that output an Observable;
- Factory pipe: they can chain operations.

To design and visualize the effect of RxJS operators, we can use [Marble diagrams](https://rxmarbles.com/){:rel="nofollow"}.
They are not ideal in complex situations but can inform decisions just like the [Operator Decision Tree](https://rxjs.dev/operator-decision-tree){:rel="nofollow"},
designed to choose the most suitable Observable and operators for any given situation.

Here is a list of common and less common operators:

- [of](https://rxjs.dev/api/index/function/of){:rel="nofollow"} is a static Observable that emits values passed as
  input;
- [forkJoin](https://rxjs.dev/api/index/function/forkJoin){:rel="nofollow"} returns an Observable that waits for all
  input Observables to complete and returns an Array containing the completing values in the same order as the input
  Observables. It is basically a merge operation for Observables;
- [interval](https://rxjs.dev/api/index/function/interval){:rel="nofollow"} and [fromEvent](https://rxjs.dev/api/index/function/fromEvent){:rel="nofollow"}
  do not complete and do not necessarily emit either!
- [map](https://rxjs.dev/api/operators/map){:rel="nofollow"} and [filter](https://rxjs.dev/api/operators/filter){:rel="nofollow"}
  work like their native JavaScript counterparts; they respectively apply an operation on transiting values and filter
  those that fail a given predicate;
- [take](https://rxjs.dev/api/operators/take){:rel="nofollow"} emits the first `n` values of the Observable, with `n` an
  integer passed as input;
- [takeUntil](https://rxjs.dev/api/operators/takeUntil){:rel="nofollow"} behaves like `take` but will emit until a
  notifier —also an Observable— emits any value;
- [takeUntilDestroyed](https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed){:rel="nofollow"} is the response to
  the lifecycle issue mentioned earlier and introduced in Angular 16 that completes an Observable when its calling
  context is destroyed;
- [tap](https://rxjs.dev/api/operators/tap){:rel="nofollow"} returns the source Observable but allows peeking at its
  values. This can be used to trigger side-effects;
- [delay](https://rxjs.dev/api/operators/delay){:rel="nofollow"} adds artificial latency to the emission of the
  Observable items;
- [catchError](https://rxjs.dev/api/operators/catchError){:rel="nofollow"} can be use for error management. It will
  return an error or a new Observable whenever the source one errors;
- [retry](https://rxjs.dev/api/operators/retry){:rel="nofollow"} is most useful when the source is unstable. It will
  resubscribe when the source errors. Note that it is incompatible by design with `catchError`.

Here are some final tips:

- Create reusable factories that use [`pipe`](https://rxjs.dev/api/index/function/pipe){:rel="nofollow"} to implement
  common handling logic. This avoids a lot of code duplication, especially around error handling;
- Angular introduced [Signals](https://v17.angular.io/guide/signals){:rel="nofollow"} on its most recent versions and
  Observables are interoperable with them with [`toSignal`](https://angular.dev/api/core/rxjs-interop/toSignal){:rel="nofollow"}
  and [`toObservable`](https://angular.dev/api/core/rxjs-interop/toObservable){:rel="nofollow"}
