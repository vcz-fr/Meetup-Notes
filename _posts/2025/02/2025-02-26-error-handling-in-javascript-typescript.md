---
categories: ["meetups/bdx-js"]
title: "Error management in JavaScript and TypeScript"
---

By Clément Ollivier, Frontend Staff Engineer @ HelloAsso  
[Slides](https://gestion-erreurs-js.clem.codes/){:rel="nofollow"}

## Anatomy of an error

Everything starts with a _happy path_: what we expect the user to do in the app. Everything goes well and according to
plan. Though, if there is a happy path, there surely must exist plenty of branches that lead to _sad paths_, to subpar
user experiences. This common definition works well but comes with limitations:

- A transaction that completes successfully: clear happy path;
- A JavaScript syntax error that leaves a trace in the Console: sad path, but does it really impact the user?
- An expired basket: neither one of them, but it leaves a bad taste;
- The product is out of stock: a happy path, but the user may not be happy about it.

The intepretation of what constitutes a happy or a sad path is very personal and context-dependent, outside of
universally clear cut scenarios. In these scenarios, the user has no agency to counter undesirable effects: the sad path
is necessarily non-actionable.

To put it in a formal way, let's chart errors by two components: the ability for users to continue using the app and the
amount of knowledge gathered around the error.


```
                            ▲
                            |
                      Non-blocking
                            |
          Golden path       |     Non-critical
                            |
                            |
◄-- Fully known ----------- + ------------- Uncharted --►
                            |                      Information about
                            |                      the error
         Awaiting fix       |      Critical!
                            |
                         Blocking
                            |
                            ▼ Ability to proceed
                              with using the app
```

Non-critical errors usually occur in secondary systems such as telemetry or analytics. These systems being off cause
inconvenience but not at the user level.  
Errors awaiting fix have been handled and are going through the validation or deployment process. There is no good
reason to hold onto a fix.

We can stipulate that an error can be classified depending on its context, its expressiveness, its type and its
predictability. The criticality of an error is context-dependent as the same error does not always bear the same
consequences depending on where it triggered. The more an error is predictable, the easier it is to study and fix.

## Technical side of things

```typescript
const error = new Error(message, options);
```

If you have ever seen this code, this is the classical way to instanciate a throwable error. This Error object can
encapsulate the error and its context. Using it bare is however not recommended: you should `extend` Error to create
custom error classes for your apps. This enables you to implement side effects within those classes. Proceed with
caution though, as implementing side effects within error-handling code can also cause errors which will invoke
error-handling code, creating a self-sustaining loop. For this situation, there are three general recommendations:

- Implement non-critical side effects such as telemetry with dead simple code;
- Use `try {} catch {}` blocks with empty `catch` statements to prevent the looping behavior;
- Implement an asynchronous version of the side effect to reduce any impact on the main process of the app and handle
  errors. This can be a valid use case for [Web Beacons](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API){:rel="nofollow"}.

Error handling in your code is as important as business logic; there is a balance to strike to allow the user to
continue using the app while handling the error on the background. This requires implementing solid exception handling
and a good data architecture within the code that enables "degraded" scenarios. Well architected code will implement
responsibility segregation in a way that most errors can be handled locally and only those can must not will be passed
up with added context. Note that if the top context cannot handle the error, the program automatically stops.

A `try {} catch {}` block can execute multiple statements but will stop at the first one. This can be useful in the
context of complex procedures that require proper client-side cleanup if one instruction fails. [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin){:rel="nofollow"}
recommends implementing proper exception mechanisms, to avoid `null` and to implement exception handling before business
logic. Unfortunately for JavaScript and TypeScript developers, it is not possible at the time to indicate in a function
signature that it may throw an exception. This issue has been identified and discussed at length within the community
and it cannot be implemented because of a limitation with the language. We are thus stuck with JSDoc to document
exceptions for the foreseeable future.

Exceptions are standard within JavaScript and interrupt the program flow as expected. Hovewer, they cannot have a type
and are not suited for non-collectable errors such as form validation issues. This makes them suited for critical errors
and code consumed by third parties.

Rust has two options for proper error handling as described [here](https://doc.rust-lang.org/std/macro.panic.html){:rel="nofollow"}:

- The `panic!()` macro;
- The `Result<T,E>` type ([documentation](https://doc.rust-lang.org/std/result/){:rel="nofollow"}), which is a template
Enum that can contain either a value or an error depending on the execution of a function.

The `Result` type in Rust is interesting, because it implements a recoverable error mechanism for functions. It could be
somewhat implemented in TypeScript with a compound type of the sort:

```typescript
Result<T> = Success <T> | Fail
Success<T> = { ok: true, value: T }
Fail = { ok: false, error: Error }
```

This pattern can be incrementing by adding functions to convert any function return to a `Result` instance. Such a
function would implement a `try {} catch {}` block with basic error handling. While more errors become collectable,
throwing exceptions does not interrupt flow anymore. If this pattern looks interesting, check out [NeverThrow](https://github.com/supermacro/neverthrow){:rel="nofollow"}.

Let's conclude with a slight mention of functional programming, which is based on principles of predictability and
immutability. Functional programming is a mind-bending field that may be unsuited for Junior Software Engineers, but it
does have implementations in JavaScript such as [fp-ts](https://gcanti.github.io/fp-ts/){:rel="nofollow"}, [ramda](https://ramdajs.com){:rel="nofollow"}
and [Sanctuary](https://sanctuary.js.org){:rel="nofollow"}. This pattern yields a differnt error handling implementation
based on chained calls and return matching.

Functional programming has a steep learning curve but supports interrupting the flow **and** handling collectable
errors. In JavaScript, implementing it requires external libraries and solid error handling code. This is a decision
that must not be taken lightly as it will affect the team and the app long-term.

There is no one pattern that is perfectly suited for every situation in JavaScript and has no downside.

## Questions and Answers

### How do you feel about handling typing within the catch clause?

Indeed, the `catch` clause does not support natively matching on the exception type, which would require the developer
to implement this if they were to handle multiple exceptions types within the same block. While ESLint can constrain the
`throw` clause to throw an instance of `Error`, this does not solve the issue.

### Why can't TypeScript implement a throws keyword in function signatures?

This would further set TypeScript apart from JavaScript. The concepts of errors and exceptions are so complex that
enshrining parts of the implementation within the language would not result in a net positive. Leaving error handling to
the programmers is the best course of action, especially when it comes to deciding whether error handling should be
centralized or what to do with unhandled exceptions.
