---
categories: ["meetups/bdx-io"]
title: "On Cloud sustainability"
---

By Mickaël Gaultier, CTO @ Magellan  
By Marie-Lucie Anfray, Manager @ Daveo  

## The Situation

Environmental topics are usually misrepresented or quick to be classified as greenwashing, yet our planet is still
sinking into a climate crisis. The climate events get worse over time: it is time to act above and beyond what is
suggested by regulation to avoid resource starvation. The IT sector must change its habits too. How can efficiently we
reduce the emissions of our Cloud projects?

Enters the notion of Sustainable Cloud. It's not difficult finding studies supporting that using the public Cloud can
result in a **more than 90% reduction** of Greenhouse Gas Emissions! The causes are better workload density and
efficiency, operational improvements, rearchitecting and making use of the heat byproducts. Cloud vendors are
incentivized to reduce their operational spend to optimize costs.

French companies are subject to Environmental and Social Responsibility guidelines —an equivalent of ESG—, but these
facilitate what can be easily seen. Digital is the exact opposite of that and is often hidden from view even though
there are servers, storage, infrastructure, operators and a logistical chain behind our applications! Digital accounts
for 4% of global emissions worldwide and 2% in France. This share is set to increase by 60% by 2040 and electrical
consumption will increase from 3 to 13% by 2030.

Historically, from 2010 to 2018 the Internet has seen its user base grow twofold and its storage needs 25x while
electrical consumption rose 6%. What gives? This is due to massive Cloud migrations, better competition and better
technology overall. Unfortunately the situation will not last as storage needs are still growing and more data implies
more data transfers.

Who is concerned by these guidelines? In a way everyone: investors, employees, customers and regulatory bodies.
Regulation always gets more stringent over time:

- Grenelle 2 required Greenhouse gas emissions self-estimates;
- DEEE added audits and an action plan;
- DE CSRD requires measuring the emissions and setting objectives.

## How do we proceed?

Cloud service providers have sustainability tools and programs. Most ship a calculator and recommendation services. It
is estimated that 77% of compute resources are over-provisioned. Leaving aside the ecological impact, there are massive
money savings to be made there. And Cloud service providers innovate to better use their resources and pack more
workloads into their datacenters. By 2025, sustainability may become the first decision pillar for IT purchases.

Keep in mind that Cloud calculators are not perfect: they usually take scope 1 and 2 emissions into account, never scope
3 emissions. As a reminder:

- Scope 1: Direct emissions;
- Scope 2: Indirect emissions such as heating and cooling;
- Scope 3: End-to-end emissions of the value chain, from extracting resources to decommissioning. This is by far the
  most complex to calculate.

Results are spotty due to how wildly different the methods are. And each service comes with very specific needs making
Cloud service providers difficult to compare between themselves. Comparing AWS, Azure and GCP is like comparing apples,
oranges and bananas!

## Method

There are many axes to the method, each deserving a deep dive:

- Audit: analyze the workloads using one tool. This tool will always be the same during the project, from start to
  finish. And then planning for the future;
- Migration: Defining what is to be migrated and what will be decommissioned, always selecting the most effective
  regions for the workloads. And optimizations: right-sizing, horizontal scaling, automatic shutdown and Container and
  Function as a Service;
- Mastery: Continuous measurements, app transformations, data lifecycle policies and shifting left notions of ecological
  design. These notions include shipping less features and developing with efficiency in mind;
- Measuring: Improving on the previous element, creating tooling and reacting sooner will anchor good practices. This is
  much like FinOps: the objectives and results tend to converge;
- Awareness: from the very top to the very bottom of the organization, everyone must be involved! Especially the CFO and
  business people.
