 # The XXIst century will be typed... or will it?
🕑 *Estimated reading time:* **?mn**

By [Arnaud Bailly](https://twitter.com/dr_c0d3), Developer @ Aleryo  
[Slides](https://abailly.github.io/slides/xxi-century-shall-be-typed-okiwi.html#/) - [Code](https://github.com/abailly/xxi-century-typed) - [Video \[FR\]](https://www.youtube.com/watch?v=WQYKQK3MB2g)

## Table of Contents

## Introduction
It has been a few years now that function programming started taking off, out of its theoretical scope. Combined with type oriented programming, it is possible to render incoherent states impossible to reach from the code. Such an approach could bring business and development closer.

## Motivation
Each project has a motivation. This one took the example of an accounting application. Even though accounting is not the most exciting field, what it lacks in interest it provides in terms of scope of work. For instance, rather than encoding entries as positive and negative sums, you could rely on the [Double-entry bookkeeping system](https://en.wikipedia.org/wiki/Double-entry_bookkeeping_system), i.e. use "credits" and "debits".

## Crux

To create a proper ledger, you would need solid rules to implement, such as the [Fundamental accounting equation](https://en.wikipedia.org/wiki/Accounting_equation), which is:
> Assets + Expenses + Dividends = Liabilities + Contributed Capital + Revenue

Each of the elements of this equation are types of *accounts*. Each account contains *entries*, which is the composition between an account and an *act*. A transaction contains a label, a date and at least two entries which must be balanced, that is their sum must be a credit of zero specifically. All of this could be represented and embedded in the type system of your program so that it would not even compile if it detects a transaction that is not balanced! Such a system comes handy when developing applications that ingest a list of transactions fed by a third party.