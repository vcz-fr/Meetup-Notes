---
categories: ["meetups/bdx-js"]
title: "Backend for Frontend and Redux, explained from scratch"
---

{% include time.md %}
{% include toc.md %}

## Backend for Frontend: A tailor-made API
By Pierre Trollé, Core React developer @ ManoMano  
[Blog Post](https://blog.octo.com/les-indispensables-dun-projet-frontend-un-backend-for-frontend-une-api-sur-mesure/){:rel="nofollow"}

### Gist

Imagine an application used on many devices of different shapes, sizes and OSes. The core of this application exposes a
state-of-the-art RESTful API. The API delivers the exact same resources irrespective of the requesting device, user or
OS, even though all applications will not have the same needs since they do not have the same capabilities or abilities
at all. Moreover, APIs tend to increase in openness and genericity of purpose. Thus, they are optimized for the business
and their own constraints but no the end users'.

The Backend for Frontend approach, often seen as "BFF", proposes to proxy the API requests and responses to adapt them
to their specific use cases. This way, you could greatly reduce network calls, even compose them. Frontend teams are
often closer to the business need, which make them relevant at proposing and defining such approaches. Sometimes, it
will not bring you much more than a pass-through but this should not stop you. After all, a fairly common variant of
BFFs are self-service APIs under the form of GraphQL.

### Not a universal solution

BFFs are relevant if the number of aggregations can justify it and if the resources come out different. It is clear that
the approach causes non-negligible operational and maintenance costs. However, it defines a clear boundary in terms of
responsibilities between backend and frontend teams, for better or worse. Frontend teams can mock the backend using the
proxy while Backend teams develop the core. In addition, Frontend teams can optimize the experience by grouping calls
and only retrieving the absolute minimum from an environment that is close in terms of latency to the actual core.

All of this induces less client-side logic since the BFF absorbs a part of it. The core and the frontend are decoupled
thus independent from each other and this renders middlewares a possibility. Nevertheless it remains an abstraction
layer from a broader perspective.

### Questions and Answers session

1. How would you handle heavy tasks?  
If they are comprised of aggregations and very simple manipulations, BFF, otherwise in the most relevant location
between API and the frontend.

1. What about Serverless?  
The cost of Lambda is often hardly justifiable and the ecosystem is very tight in resources.

1. How does it behave with migrations?  
The BFF layer can regroup aggregations and simple tasks but will more often than not just pass-through requests and
responses.

## I never understood Redux; I'll rewrite it!
By [Florian Kauder](https://twitter.com/aamulumi){:rel="nofollow"}, Co-Founder @ KBDev  

### Redux

Redux has been initially released in 2015 by Dan Abramov. Its complete code contains just shy of 250 statement lines! It
is the spiritual successor of [Flux](https://facebook.github.io/flux/), by Facebook. The idea of it is natural: the
application produces Actions that are sent to a Dispatcher which triggers operations. The operations could very well
produce Actions, etc.

Dan Abramov has also been inspired by the idea of immutability, Reactive and Elm. Redux posesses Views which generate
Actions sending notifications to Reducers which trigger operations related to Stores. A Reducer is similar to a state
machine: from a state S, the action A shall lead you in the state S'. Of course, this only works if the implied
function, the Reducer, is idempotent and pure. That is, if an input always leads to the same instructions and if they
induce no side effect.

One simple advantage of this approach is that, provided the log of actions are conserved, bugs become naturally
reproducible. In other words, you can publish, retrieve and replay what happened. Your store stores the current state.
It combines and calls reducers and provides them with the latest version of the application state.

### Making it better

What if we want to do asynchronous calls? Well we can with the pattern "Loading - Success - Error"! Simply put, on
action, you start by dispatching a Loading event then start your asynchronous operation. On success, you dispatch a
Success event, on error or timeout, you dispatch an Error event. You may notice a caveat: a Store must present, at any
given point in time, a stable state of the application. Loading events are not stable states since they imply an
operation is in progress. To counter that, here are three options: only use actions that do not expose "in progress"
states, avoid potentially unstable actions or identify unstable states using their metadata.

Now, what if you need a simple Undo / Redo system? This can be accomplished with two arrays that store the previous and
next states. Much simpler, right?

### Philosophy

Redux has been created at a time when React was missing most of its critical APIs. Nowadays, with the Context and the
Suspense APIs and the Hooks, Redux could very well be absorbed. Most of its issues could be resolved by thinking
differently about your code. Though, the reducers are a neat trick that could benefit from being extracted and reused
elsewhere!
