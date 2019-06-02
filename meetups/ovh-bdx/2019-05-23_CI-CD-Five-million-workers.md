# CI/CD & HPC
🕑 *Estimated reading time:* **?mn**

## Table of Contents

## CI/CD: Five million workers
By [Benjamin Coenen](https://twitter.com/BnJ25), Software developer @ OVH  
By [Richard Le Terrier](https://twitter.com/richardlte), Software engineer @ OVH - [Personal website](https://richardlt.github.io/)  
By [Steven Guiheux](https://twitter.com/sguiheux), Software developer @ OVH  

This is an experience feedback of the development and scaling of the CDS product at OVH.

### History

By the end of 2014, OVH, which was fifteen at the time, rocked large monorepos, monoliths and had increasing needs for CI/CD performance. Its solution at the time was to divide the monoliths into micro-services.

Each time is responsible for the applications it develops and the ecosystem it uses. To build and deploy their applications for instance, some teams were using GitLab while others were using Jenking, deploying via shell scripts or with `git pull`. An effort has been maid to standardize the CI/CD process.

By March of 2015, the first results are in: PRs are requested by email, the integration with Atlassian creates it in Stash, starts a CI/CD with Bamboo. This set of tools being integration into the Atlassian Suite, this allowed for a fast integration with tight access controls. This setup was good, with separate environments and automated changelogs but it was limited in terms of scalability, team autonomy, API completeness, had no CLI and no isolation between environments!

Even though the current process was good, it was not relevant for OVH current systems and projects. Therefore, a dedicated cross-functional CD team has been created. This team builds the tools, trains technicians and broadcasts best practices. Its first major project was to solve the CI/CD issue.

### Needs

Years of development brought many languages and technologies into the stack: Go, Python, Java, Rust, OpenStack, Ansible, etc. A new CI/CD solution should be capable to handle all of these and the ones to come. The new solution would also need to account for more diverse needs such as:
- Flexibility in the delivery process. How the pipelines, stages and jobs are executed and in which order, conditional execution, permissions, notifications and templating;
- Extensibility by integrating with an existing ecosystem and additional plugins;
- Scalability by reserving the right resources at the right time. The solution has to aim for minimal wait, minimal waste and customazibility of the environment from the OS to the technology;
- Autonomy; the teams should be able to create and manage projects, related resources and permissions within the new tool;
- High Availability, a REST API, a CLI, self-hostability, reusability, etc.

No tool available at the time could match all of these needs. OVH chose to develop its own. Enters **CDS**.

## Speed up your application delivery workflow
By Thomas Boni, Solutions Architect @ pikcio.com

## Is HPC cloudable?
By [Benjamin Barthe](https://twitter.com/b4mb0u), HPC expert @ Atos
