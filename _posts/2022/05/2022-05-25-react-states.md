---
categories: ["meetups/bdx-js"]
title: "React in all of its states"
---

{% include time.md %}

By [Amélie Benoit](https://twitter.com/ameliebenoit33){:rel="nofollow"}, Senior Software Engineer @ Busbud  
[Slides](https://raw.githubusercontent.com/abenoit/react-states/main/React%20dans%20tous%20ses%20e%CC%81tats%20-%20Devoxx%202022.pdf){:rel="nofollow"}

{% include toc.md %}

## State of the Art

States in React are application or component memory behaviors. They are defined in categories like:

- UI state: the user interface state, errors, loading, etc.;
- Data cache: the responses from an HTTP request or complex calculations.

Every React component holds their own state. When two components wish to share their state with each other, they must
communicate up to their closest common ancestor then back to each other. While this approach or passing state from one
component to its parent or child works, it is inefficient and does not scale. That's where [Redux](https://redux.js.org/){:rel="nofollow"}
comes in.

Redux has been created in 2015, two years after React itself. Redux is predictable as it is based on pure functions
called reducers. For reference, a pure function has no side effect and always outputs the same value when provided with
a given input. This property is what eventually came to become the foundation of time travel debugging. However, Redux
is verbose and boilerplaty. However, it's a necessary evil to get state management out of the way of the components.
While Redux and React go well together, Redux works with other JavaScript frameworks as well.

## Searching for alternatives

For some demos, check out this [GitHub project](https://github.com/abenoit/react-states){:rel="nofollow"}.

Over the years, the community has created practices around Redux, ones that shaped [Redux Toolkit](https://redux-toolkit.js.org/){:rel="nofollow"}.
This solution is opinionated, which makes it ideal when needs in terms of state management are basic. Does it make a
difference compared to native React though? Well yes considering you still have to pass state as props in native React.
Unless...

Unless you start using contemporary practices such as component composition. What if shared state was in a component
that gets shared in a component tree? Other components would all refer to that one. That is the approach chosen by
Bootstrap.

A second, more elegant alternative would be [React Context](https://reactjs.org/docs/context.html){:rel="nofollow"}.
Context presents itself as a component tree wrapper containing state that any deep child can retrieve, thus
shortcircuiting the whole parent-child prop passing. However, the immutability of state often causes undesired component
rerendering which is avoidable but worsens development experience.

Enters [Recoil](https://recoiljs.org/){:rel="nofollow"}, which has been developed by Facebook specifically for React,
which lowers the barrier of entry for new users. Recoil uses two main concepts:

- Atoms, which are state fragments with a default value. You can update and subscribe to Atoms;
- Selectors, which are pure functions that can take Atoms and other Selectors as arguments. Selectors trigger updates
  when Atom values change;
- Hooks implement asynchronous requests.

Recoil natively support React constructs such as [React.Suspense](https://reactjs.org/docs/react-api.html#reactsuspense){:rel="nofollow"},
which again greatly simplifies the code: no more effects, loading or state management. UI state finally manages UI. Even
getting to the same point as native React or Redux is easier, that is how productive one can get when using Recoil.

## What to choose

What to choose depends on the problem you are trying to solve:

- For fairly simple, React-only matters, use React Context. Lightweight, no dependency given some optimizations like
  indicating when a component needs a refresh with `shouldComponentUpdate`;
- Redux Toolkit for serious works, especially if not being tied to React is important. The community and the developer
  tools are great, so is boilerplate;
- Recoil is simple and easy to get productive with. Its integrations with React are both amazing for the developer
  experience and bad because of the implied lock-in. Selectors are the main pain point of Recoil, though;
- Many other solutions exist. State management is definitely not a solved problem today. The solution really depends on
  the problem you are trying to solve.

To increase the signal to noise ratio when it comes to UI state and data cache, you could use [React Query](https://react-query.tanstack.com/){:rel="nofollow"}
and [React Toolkit Query](https://redux-toolkit.js.org/tutorials/rtk-query){:rel="nofollow"}. When it comes to UI state,
do not be afraid of drilldown. React's own state is often sufficient for these simple states.

## Questions and Answers
### What happens whn a Recoil Selector malfunctions?

You can use [Error Boundaries](https://reactjs.org/docs/error-boundaries.html){:rel="nofollow"} to contain errors within
a given component tree. Selectors should detect async errors by themselves nevertheless we still recommend testing these
claims.

### What is the relationship between Recoil and React?

Recoil depends on React and cannot be used without it. This is a deliberate choice meant to smoothen the learning curve.