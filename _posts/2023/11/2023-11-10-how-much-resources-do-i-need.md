---
categories: ["meetups/bdx-io"]
title: "How much resources do I need?"
---

By Roman Mazur, Team Lead @ Ubisoft  

## Setting the plot

In Ukraine, political life is broadcasted on TV. During these shows, it can be seen that the live audience is asked for
feedback about their agreement with the topic at hand through a voting system integrated in a console in front of them.
This helps politicians and speakers adapt their speech. This is the application that will be demonstrated. It is a
simple system with few request/response interactions:

- A participant casts a vote to a server;
- The presenter annotates their presentation;
- The presenter visualizes the aggregated data.

These interactions open up use cases: how can the presenter annotate their presentation? They would probably define the
expected user count and a vote timeout to guesstimate the load the system should expect. Since this is a client-server
application, how can we ensure the data format is being followed?

## Cue CUE

[CUE](https://cuelang.org/){:rel="nofollow"} is a constraints definition and data language. Our use cases can be
described in terms of schema and constraints. What can we do with such a language? We could model the expected load of
the service and the system capabilities to provide! Let's try.

Estimating storage needs begins with understanding data structures and their footprint. Each use case store data in data
structures. These data structures can be imported in CUE and documented with examples. Estimating the storage capacity
can be achieved by serializing the data to JSON and computing its length. This is a good estimate of the memory
requirements and would inform infrastructure decisions. It is meant to be within an acceptable margin of the actual
answer, not correct. This is easy for back-of-the-napkin calculations.

To deploy the application on Kubernetes, we would automate setting limits and resources to reserve and use just enough
capacity. Need a firewall? Rate limits can be set by this system too. Need the right compute instance? Request APIs with
your constraints and resource estimates to determine the best instance. Data and constraints-driven everything is
awesome though CPU has not been mentioned yet, how so? Can we get away with the cheapest offering?

UI apps are expected to generate sixty images per second for smooth operation. We could apply this principle for server
components. The model constrains the data, its validation and the infrastructure. This paradigm where the data model
shapes development is called "Model Driven Development". Here, the application exposes data and metrics to monitoring
endpoints which informs the initial model in a virtuous model. Fine-tuning takes longer, but the resources at play are
higher-level too. This is facilitated by the Cloud providers, which often expose metrics through their services. Using
their feeds can underline errors with the estimates like the face that the OS, common services and pre-installed agents
and software also need a certain amount of compute and memory! This information can be incorporated back into the model.

This approach is not exclusive to CUE; any general language will do.

## Questions and Answers

### Are this approach and technology production-ready?

This is a toy program designed to spark conversation, so that the idea is out there. Game development deals with these
topics every day and this approach has been successfully implemented into bigger projects.

### How is the model revised? Can it be fine-tuned automatically?

This is up to the developers. Today, CUE is manually updated because there was no use case for automation, but this
could happen at some point, given the right circumstances.
