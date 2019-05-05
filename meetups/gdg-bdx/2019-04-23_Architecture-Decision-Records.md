# Architecture Decision Records
🕑 *Estimated reading time:* **?mn**

## Table of Contents

  * [Google News](#google-news)
  * [Architecture Decision Records: A documentation that evolves with you](#architecture-decision-records-a-documentation-that-evolves-with-you)
    + [Different shades of documentation](#different-shades-of-documentation)
    + [Architecture Decision Records](#architecture-decision-records-1)
      - [Rules and composition](#rules-and-composition)
      - [Lifecycle](#lifecycle)
      - [Tools](#tools)
      - [Consequences](#consequences)
    + [Questions and Answers session](#questions-and-answers-session)
      - [Is it possible to add ADRs to existing projects?](#is-it-possible-to-add-adrs-to-existing-projects)
      - [If ADRs are used before development, what happens after?](#if-adrs-are-used-before-development-what-happens-after)
      - [What happens when an ADR does not lead to positive results?](#what-happens-when-an-adr-does-not-lead-to-positive-results)

## Google News

* During the Google Next 2019 event, new projects have been announced: [Anthos](https://cloud.google.com/anthos/), [Cloud Run](https://cloud.google.com/run/) and [Cloud SQL](https://cloud.google.com/sql/).
    * Anthos is basically the new Google Cloud Platform. It can manage private, hybrid and multi-cloud solutions, meaning that it can manage solutions hosted on Azure or AWS. In addition, Anthos Migrate can help companies bringing their applications to the Cloud.
    * Cloud Run allows deploying containers that will be managed automatically like serverless applications.
    * Cloud SQL is the managed database service that was missing from Google Cloud Platform's offering. It currently supports MySQL, PostgreSQL and SQL Server.
* Devfest: no Devfest for Bordeaux yet but do not miss out on the [Devfest Lille](https://devfest.gdglille.org/) on June 14th, [Devfest Toulouse](https://2019.devfesttoulouse.fr/) on October 3rd and [Devfest Nantes](https://devfest.gdgnantes.com/) on October 21st and 22nd;
* GDG Bordeaux now have a website: [https://gdgbordeaux.fr/](https://gdgbordeaux.fr/)

## Architecture Decision Records: A documentation that evolves with you

By [Olivier Revial](https://twitter.com/pommeDouze), Lead developer @ Stack Labs  
[Video \[FR\]](https://www.youtube.com/watch?v=0CkihCLf_4A)

### Different shades of documentation

Different types of documentations can be organized by context from study to work and level of practice from theoretical to practical. The following diagram gives an example for each category:

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

On this scale, Architecture Decision Records would be close to explanations. They document the technical choices, their context and their reasons.

In a Waterfall project, the functional and technical documentations are decided and written before starting the development phase. Choices and decisions being already documented, ADRs would not be useful in those cases. Thus, ADRs are more fit to Agile projects.

Not only that but the evolution from monolithic to micro-services architectures induce an increase in the number and complexity of the decisions to make on a regular basis and the importance of contextualizing and backing every decision.

One of the most common forms of documentation is to have a Wiki, an architecture diagram for your project and explain the choices and evolutions made to reach the diagram. This approach works but forces the application to always be aligned with the documentation. An alignment issue can cause the loss of part of the project history, which can lead to the ossification to a part of the project. This, in turn, can either lead to increased debt if the development team is afraid to break things or actual breakeage in case they should not have removed code that looked unused.

What if, instead of documenting the whole application at every instant, we focused on a history that has the power to render part of an application obsolete and safely detacheable? That is where ADRs come into play.

### Architecture Decision Records

#### Rules and composition

There are many formats of ADRs and the best one fits to your team and systems. Nevertheless, an Architect Decision Record will always contain the following set of information:
- ID: Like an RFC ID. ADR-001, for instance;
- Title: As relevant as possible;
- Date: Locates the decision on the project timeline;
- Status: The current status of the decision;
- Deciders: The people that participated in the decisions and that can give context in the future;
- Context: An explanation that led to the decision, the issue to solve;
- Decision: A description of the reached consensus, the choice, the reasons, the alternatives that have been analyzed and why they have not been chosen instead;
- Consequences: What the ADR caused on many perspectives. Maintenance, development, human, economic, etc. Anticipation of the decision byproduct.

#### Lifecycle

[...]

#### Tools

[...]

#### Consequences

[...]

### Questions and Answers session

#### Is it possible to add ADRs to existing projects?

[...]

#### If ADRs are used before development, what happens after?

[...]

#### What happens when an ADR does not lead to positive results?

[...]