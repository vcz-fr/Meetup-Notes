---
categories: ["meetups/bdx-js"]
title: "Don't listen to Twitter: GraphQL is cool again!"
---

By [Jean-Yves Couët](https://twitter.com/jycouet){:rel="nofollow"}, Founder @ Dynamic Process  

## A little bit of history

A long time ago, communication betwween services used [SOAP](https://en.wikipedia.org/wiki/SOAP){:rel="nofollow"}
(Simple Object Access Protocol). [REST](https://en.wikipedia.org/wiki/Representational_state_transfer){:rel="nofollow"}
(Representational state transfer) came soon after, to better organize APIs and interactions. REST was closely followed
by [OData](https://en.wikipedia.org/wiki/Open_Data_Protocol){:rel="nofollow"} (Open Data Protocol) to simplify
interoperability and discoverability.

GraphQL was created in 2012 at Facebook and opensourced in 2015. Today, it freely lives on thanks to the [GraphQL Foundation](https://graphql.org/foundation/){:rel="nofollow"}.

Finally came [tRPC](https://trpc.io/){:rel="nofollow"} which for TypeScript backends and frontends allows types be
shared across the boundary! It is an excellent piece of technology and yet, as it does not cover the full spectrum of
what GraphQL can accomplish, GraphQL is still cool!

## Why GraphQL exists

GraphQL is first and foremost a specification rather than a set technology. Developers describe their data structure one
one and and query and mutate this data on the other. In GraphQL, you specifically retrieve data you have requested and
nothing more.

No matter the frontend or backend language, GraphQL will work identically. You will still use `query` and `mutation` to
respectively describe the data you want to fetch and mutate. "Mutating" is more appropriate for the datastore as a
mutation can create, update or delete data.

You can learn more about GraphQL by reading [this documentation](https://graphql.org/learn/){:rel="nofollow"}.

Historically, backends held the responsibility of hosting application code, data and views. Having everything close has
practicality as some frameworks strongly bind views to data and add checks to ensure the view does not display undefined
variables. This practice is typical for Server-Side Rendering in Multi-Page Applications. This changed when Angular,
React and Vue changed the way we develop frontend applications by delivering the code package expressing the structure,
style and behavior of the application and expose an API delivering backend features. The user browser is in charge of
rendering the content and as such we talk about Client-Side Rendering.

Search engines and crawlers aren't fans of Client-Side Rendering as they require an expensive JavaScript engine that is
difficult to fully secure and slows down crawling compared to plain static websites. Lower-end devices also struggle to
translate complex experiences as a result. Could a frontend be pre-rendered in a server first? That is where
meta-frameworks come in: SvelteKit, NextJS, NuxtJS handle Server-Side Rendering then bind the application state
client-side. This is the best of both worlds.

Enters [Houdini](https://houdinigraphql.com/){:rel="nofollow"}.

## Demos

The [Graph*i*QL Playground](https://github.com/graphql/graphiql){:rel="nofollow"} is a staple in GraphQL environments. It is an
equivalent of REST's Swagger interactive documentation page. GraphiQL Playground comes with auto-completion, interactive
querying and the ability to discover types and fields with keyboard shortcuts. Much like an IDE but with data.

The crux of this demo is not GraphiQL though, it's Houdini. As of April 2023, Houdini supports SvelteKit applications.

This demo starts with data binding, which is accomplishing by taking SvelteKit's convention `+page.svelte` and creating
a `+page.gql` page that dynamically loads data specified in the GraphQL queries. Thanks to TypeScript, these queries
automatically generate typed data to simplify the typical SvelteKit development experience! It is essential to remind
the reader that SvelteKit cleanly manages Server-Side Rendering, Client-Side Rendering and the transition between the
two!

Svelte components can define their own GraphQL fragments, so that developers can reuse them in multiple parts of their
frontends. This works like magic, yet it begs to ask how to update the data? Enter _mutations_.

A mutation is a type of GraphQL request which makes it as simple to support in Houdini. Yet, a key element is missing:
how do we ensure that an element that has just been inserted displays on the interface without reloading? Houdini added
GraphQL directives, the first of which is `@list` to solve this common use case. No need to update the data model and
the output!

Other directives exist, such as `@paginate`. This one takes arguments to facilitate the implementation of common pagination patterns:

- `@paginate (mode: SinglePage)` which exposes `loadPrevPage()` and `loadNextPage()` functions that can be triggered on
  interaction;
- `@paginate (mode: Infinite)` which works identically but keep data that has already been retrieved.

This is what's missing in tRPC: use cases. And if you want to know more about Houdini, go read [the documentation](https://houdinigraphql.com){:rel="nofollow"}!

## Questions and Answers
### Has it been difficult to keep up with Svelt's frequent changes?

Yes, it has. Knowing Svelte maintainers sure helps: they tell us about incoming changes and some of them were beneficial
for Houdini in the end.

### How did you become a contributor?

Jean-Yves got into SvelteKit soon after its inception and has been dabbling with GraphQL since 2016 or 2017. This was
the perfect occasion to integrate GraphQL to SvelteKit with [KitQL](https://www.kitql.dev/){:rel="nofollow"}.

Soon after, he has been introduced with Houdini's core maintainer, who had a totally different approach to the same use
cases. The relationship worked out and the ideas from both projects were consolidated into Houdini.

### What is wrong with tRPC?

The following three keys are holding tRPS back:

- Its setup is more complex;
- It is a one-to-one communication between a frontend and a backend;
- The language is imposed: TypeScript.
