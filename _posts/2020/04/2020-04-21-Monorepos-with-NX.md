---
categories: ["meetups/bdx-js"]
title: "Monorepo and JavaScript: discovering Nx"
---

By [Frédéric Hémery](https://twitter.com/FredericHemery){:rel="nofollow"}, Front tech lead @ Betclic  
[Video \[FR\]](https://www.youtube.com/watch?v=mrlxUNlgJQU){:rel="nofollow"}

## Introduction

Out in the wilderness, code is often divided in frontend and backend partitions or in projects, components
and framework code. When done in multiple repositories, this partitioning poses issues:

- A feature that applies to multiple projects requires changes on multiple repos, causing more chances of conflict and
  requiring more actions to prepare branches, commits and pull requests;
- Respecting the specific rules of each repository gets difficult the more there are;
- Coordinating migrations across repositories is complex.

## Monorepos

Monorepos are a development strategy which consists in hosting the code of several projects inside the same repository.
This strategy brings notable advantages:

- Eases refactoring by removing the complexity of moving code between repositories;
- Allows non-retrocompatible modifications;
- Atomic commits than span across projects are possible;
- Dependencies and configuration management can be unified and centralized;
- The code for project libraries is available, waiting to be compiled;
- No necessity for code freezes when rolling out updates;
- Pull Requests open the collaboration with other projects;
- Best practices and standards can apply to all projects.

## Nx

[Nx](https://nx.dev/){:rel="nofollow"} is a collection of extensible tools for managing monorepos. It supports an ever
increasing list of projects and frameworks such as Angular, React, NodeJS, WebComponents, NestJS, NextJS as ExpressJS.
The integration of these projects is maintained by ex-Googlers from the Angular team, under the lead of [Nrwl](https://nrwl.io/){:rel="nofollow"}.

Based on [Angular Schematics](https://angular.io/guide/schematics){:rel="nofollow"}, which has been released with
Angular 6 -[Release announcement](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4){:rel="nofollow"}-,
Nx can perform complex instructions on a set of files.

This tool comes with two interfaces: a CLI and the Nx console. Both make it possible to consult the project dependency
graph, that is a representation of the relationships between the components in the project. This graph can be computer
for the whole project or for the components that would be affected by a changeset. This drastically reduces lint, build
and test times and is more effective the more the project is divided into components. The power of dependency graphs is
also key to the parallel execution of project-scoped commands.

To get even faster, Nx caches some computations to avoid re-executing large workloads. This concept has also been taken
to the Cloud with [Nx Cloud](https://nx.app/){:rel="nofollow"}. This solution made for teams and CI environments
increments on the idea of caching large computations: the output of a command should be deterministic based on the code
and the dependencies of a project. As such, NxCloud keeps a record of both so that is multiple developers or a CI system
execute the same command with the same inputs, the command is run only once.

Nx does not just stop at global structure and commands: it also provides tags for dependencies. These tags can help
enforcing rules related to the usage of components in other components to prevent bad interactions. The scaffolder
natively integrates tags and simplifies the generation of new components in an existing project.

## Questions and Answers session

### How to migrate an Angular / Nest project for Nx?

Migrating a project to Nx is as simple as respecting its file tree structure.

### Is it possible to execute commands at the file granularity?

No. To obtain a similar effect, it is possible to use [lint-staged](https://github.com/okonet/lint-staged){:rel="nofollow"}
or to divide libraries enough so that changes represent a larger part of their codebase.