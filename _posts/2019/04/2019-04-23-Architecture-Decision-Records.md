---
categories: ["meetups/gdg-bdx"]
title: "Architecture Decision Records"
---

## Google News

* During the Google Next 2019 event, new projects have been announced: [Anthos](https://cloud.google.com/anthos/){:rel="nofollow"},
  [Cloud Run](https://cloud.google.com/run/){:rel="nofollow"} and [Cloud SQL](https://cloud.google.com/sql/){:rel="nofollow"}.
    * Anthos is basically the new Google Cloud Platform. It can manage private, hybrid and multi-cloud solutions,
      meaning that it can manage solutions hosted on Azure or AWS. In addition, Anthos Migrate can help companies
      bringing their applications to the Cloud.
    * Cloud Run allows deploying containers that will be managed automatically like serverless applications.
    * Cloud SQL is the managed database service that was missing from Google Cloud Platform's offering. It currently
      supports MySQL, PostgreSQL and SQL Server.
* Devfest: no Devfest for Bordeaux yet but do not miss out on the [Devfest Lille](https://devfest.gdglille.org/){:rel="nofollow"}
  on June 14th, [Devfest Toulouse](https://2019.devfesttoulouse.fr/){:rel="nofollow"} on October 3rd and [Devfest Nantes](https://devfest.gdgnantes.com/){:rel="nofollow"}
  on October 21st and 22nd;
* GDG Bordeaux now has a website: [https://gdgbordeaux.fr/](https://gdgbordeaux.fr/){:rel="nofollow"}.

## Architecture Decision Records: A documentation that evolves with you

By [Olivier Revial](https://twitter.com/pommeDouze){:rel="nofollow"}, Lead developer @ Stack Labs  
[Video \[FR\]](https://www.youtube.com/watch?v=0CkihCLf_4A){:rel="nofollow"}

### Different shades of documentation

Different types of documentations can be organized by context from study to work and level of practice from theoretical
to practical. The following diagram gives an example for each category:

```
                                ▲
                                |
                            Practical
                                |
            Tutorial            |            How-to
   Teaching approach, basics    |   Practical, step-by-step
                                |
                                |
◄-- Study --------------------- + --------------------- Work --►
                                |                           Context
                                |
          Explanations          |           Reference
      Answers to the Whys       |   Exhaustive documentation
                                |
                           Theoretical
                                |
                                ▼
                            Approach
```

On this scale, Architecture Decision Records would be close to explanations. They document the technical choices, their
context and their reasons.

In a Waterfall project, the functional and technical documentations are decided and written before starting the
development phase. Choices and decisions being already documented, ADRs would not be useful in those cases. Thus, ADRs
are more fit to Agile projects.

Not only that but the evolution from monolithic to micro-services architectures induce an increase in the number and
complexity of the decisions to make on a regular basis and the importance of contextualizing and backing every decision.

One of the most common forms of documentation is to have a Wiki, an architecture diagram for your project and explain
the choices and evolutions made to reach the diagram. This approach works but forces the application to always be
aligned with the documentation. An alignment issue can cause the loss of part of the project history, which can lead to
the ossification to a part of the project. This, in turn, can either lead to increased debt if the development team is
afraid to break things or actual breakeage in case they should not have removed code that looked unused.

What if, instead of documenting the whole application at every instant, we focused on a history that has the power to
render part of an application obsolete and safely detacheable? That is where ADRs come into play.

### Architecture Decision Records

#### Rules and composition

There are many formats of ADRs and the best one fits to your team and systems. Nevertheless, an Architect Decision
Record will always contain the following set of information:
- ID: Like an RFC ID. ADR-001, for instance;
- Title: As relevant as possible;
- Date: Locates the decision on the project timeline;
- Status: The current status of the decision;
- Deciders: The people that participated in the decisions and that can give context in the future;
- Context: An explanation that led to the decision, the issue to solve;
- Decision: A description of the reached consensus, the choice, the reasons, the alternatives that have been analyzed
  and why they have not been chosen instead;
- Consequences: What the ADR caused on many perspectives. Maintenance, development, human, economic, etc. Anticipation
  of the decision byproduct.

#### Lifecycle

Much like a decision, an ADR can deprecate and replace other ADRs. A replaced ADR must indicate that it has been
replaced in its status and the newer ADR must also mention it in its context.

An ADR can only have the following statuses:
- Proposal: The only state during which the ADR can be discussed and its contents can change;
- Accepted: The decision reached consensus and is goind to be put into practice. No change is allowed in the content of
  the ADR except for additions in the status field;
- Rejected: The decision has not been accepted and is recorded as such.

In addition, the "(Replaced)" mention can be appended to the status field when a newer decision obsoletes the one the
mention is appended to.

The lifecycle of an ADR would look like this:

```
Writing ------- Decision ------------------------ End of Life

Proposal ---------------- Accepted ------ Accepted (Replaced)
    ▲       |     |
     -------       ------ Rejected 
```

#### Tools

Any tool can do the job. ADRs are just tables containing data. A Wiki, a repository or even a set of spreadsheets. The
tool you will choose depends on the needs of your team. In any case, keep it simple.

#### Consequences

Working with ADRs will enable you to keep a history of the choices made in a project. These choices can be shared within
the teams and discussed. Maintaining this solution requires processes so its integration in your daily Agile must be
clarified and agreed upon from the start, as well as the format you want to respect.

It is very important to stick to the process of redacting these documents for the future of the product you are
developing!

### Questions and Answers session

#### Is it possible to add ADRs to existing projects?

It is even desirable to do so! Still, this may be rendered difficult by the fact that context might be lost and you
might spend a lot of time digging to find the exact information you need. ADRs can be added at any given moment to any
project!

#### If ADRs are used before development, what happens after?

ADRs are considered during the design phase of a task. They may also incur during spikes or moments when you need to try
solutions before deciding. As such, the deciders may not be the ones involved with the development.

#### What happens when an ADR does not lead to positive results?

This situation is unfortunately not prevented. In the end, the process allows the development team to analyze a solution
from different perspectives. Reaching the consensus means that the whole development team is persuaded that the solution
responds positively to the given problem, knowing the involved context and agrees on the choices and its specificities.