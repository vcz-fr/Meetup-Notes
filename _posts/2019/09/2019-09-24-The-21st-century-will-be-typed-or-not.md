---
categories: ["meetups/okiwi"]
title: "The XXIst century will be typed... or will it?"
---

By [Arnaud Bailly](https://twitter.com/dr_c0d3){:rel="nofollow"}, Developer @ Aleryo  
[Slides](https://abailly.github.io/slides/xxi-century-shall-be-typed-okiwi.html#/){:rel="nofollow"} - [Code](https://github.com/abailly/xxi-century-typed){:rel="nofollow"} -
[Video \[FR\]](https://www.youtube.com/watch?v=WQYKQK3MB2g){:rel="nofollow"}

## Introduction
It has been a few years now that function programming started taking off, out of its theoretical scope. Combined with
type-oriented programming, it is possible to render incoherent states impossible to reach from the code. Such an
approach could bring business and development closer.

## Motivation
Each project has a motivation. This one took the example of an accounting application. Even though accounting is not the
most exciting field, what it lacks in interest it provides in terms of scope of work. For instance, rather than encoding
entries as positive and negative sums, you could rely on the [Double-entry bookkeeping system](https://en.wikipedia.org/wiki/Double-entry_bookkeeping_system){:rel="nofollow"},
i.e. use "credits" and "debits".

## Crux

To create a proper ledger, you would need solid rules to implement, such as the [Fundamental accounting equation](https://en.wikipedia.org/wiki/Accounting_equation){:rel="nofollow"},
which is:
> Assets + Expenses + Dividends = Liabilities + Contributed Capital + Revenue

Each of the elements of this equation are types of *accounts*. Each account contains *entries*, which is the composition
between an account and an *act*. A transaction contains a label, a date and at least two entries which must be balanced,
that is their sum must be a credit of zero specifically. All of this could be represented and embedded in the type
system of your program so that it would not even compile if it detects a transaction that is not balanced! This comes
handy when developing applications that ingest a list of transactions fed by a third party.

Such a system allows to explore business rules in a different fashion. For instance, by adding entries to each other
assuming a debit is the opposite of a credit holding the same value, you could end up with two representations of zero:
a debit of zero or a credit of zero. Without a canonical representation of a neutral element in your set of possible
values, you might end up with inefficiencies down the road. In this case, to solve this issue, it is necesary to
consider entries and acts as non trivial elements and a balance as a union between the neutral element and an entry.
This will include the neutral element for entries in the type system.

Why is the type system so important? The stricter it is, the faster errors will be detected. The faster you detect
errors, the easier it is to develop the application. Of course, including invariants in the type system does not replace
writing relevant tests. Both are complementary and help solidify your code base, your documentation and ease
maintenance.

However, note that you will need to ask questions to your domain expert or else your progress might get slowed down to a
crawl. Iteration and anticipation are still possible but an incorrect abstraction may lead you to confusing issues. In
other words, when anticipating, take measured steps and ask questions.

## Explanation

If you are interested by advanced type systems, you might be interested in digging the following foundational topics:
- Pure function: always return a result, even if the function reaches an error state;
- Recursive algebraic data types;
- Interfaces: expresses a contract to implement;
- Type families: it is possible to compute with types like you would with scalar types;
- Generalized algebraic data types (GADT): encodes functions;
- Hole-Driven Development: a very important notion. The type checker will guide the developer by inferring the type of
  the hole;
- Dependent types: types and values live in close-ish worlds but run under different lifecycles. Types can depend upon
  values, though, like when you need to check for the presence of a certain number of items in a collection;
- Equality type: crucial when testing, expresses an equilibrium, a strict relationship between two types to validate;
- Proposition as a type: a type the expression of which is a proposition that is proved by its code by virtue of the [Curry-Howard correspondence](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence){:rel="nofollow"}.

## Conclusion

Type systems are essential to software design. They model constraints that get increasingly closer to the business.
Stronger type systems lead to an increase in development comfort, ease of maintenance and general quality.
