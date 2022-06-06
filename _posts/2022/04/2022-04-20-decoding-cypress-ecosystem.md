---
categories: ["meetups/bdx-js"]
title: "Decoding the Cypress ecosystem"
---

{% include time.md %}

By [Nicolas Augereau](https://twitter.com/nicolasaugereau){:rel="nofollow"}, QA Tester and Automation Specialist @
Younup

> **Notice**: I arrived a few minutes late to this meetup. My notes may not reflect the whole presentation.

{% include toc.md %}

## Writing tests

With [Cypress](https://www.cypress.io){:rel="nofollow"}, there are two major ways of thinking when it comes to writing
tests: Page Objects and App Actions.

Page Objects feel more natural and approachable. They work by simulating the steps and actions that a user would follow
to reach the application state to be tested. Autocompletion is fully supported in a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface){:rel="nofollow"}
design that makes the developer experience better. However, the fact that user steps and actions must be developed comes
with a flaw: this participates in the flakiness of the tests and is not scalable with the growth of the application and
of the test scopes. Additionally, you need to develop and execute the steps required to reach a given state which takes
time every time tests are run.

App Actions are ideal when applications are designed to be initialized in a given state. They apply the [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html){:rel="nofollow"}
approach by setting the application state to what it should be before an action, executing the action and observing the
results. By taking a more integrated approach, App Actions reduce test maintenance and significantly speeds up test
execution. However, writing App Actions requires more skill as this approach is less guided, hardly supports
autocompletion and implementation can vary from team to team as it depends on the application you are implementing it
on.

Cypress published [an article](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#application-actions){:rel="nofollow"}
that recommends App Actions in replacement for Page Objects. The choice should depend on the target of the application
at play. Another possibility would be to use [Cucumber / Gherkin](https://cucumber.io/docs/gherkin/){:rel="nofollow"} to
implement [Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development){:rel="nofollow"} and
create a common language inside the development team. This language could itself implement the Given-When-Then approach
discussed previously, backed by App Actions.

## Component testing

Component testing is [supported in alpha](https://docs.cypress.io/guides/component-testing/introduction){:rel="nofollow"}
at the time of writing. With component testing, Cypress can reach unit test granularity. Combined with major frontend
frameworks such as [React](https://reactjs.org/){:rel="nofollow"}, [Angular](https://angular.io/){:rel="nofollow"} or [Vue](https://vuejs.org/){:rel="nofollow"}
and after some configuration tweaks you could test all the components of your application as you would usually test the
whole application.

Note that Cypress displays a slightly different user interface during component testing.

## CI/CD

It is possible to automate Cypress runs and visualize them with [Squash](https://www.squashtest.com/){:rel="nofollow"},
which is a reputable testing suite that allows test engineers to design and organize testing campaigns. There are
modules that connect Squash with [Jenkins](https://www.jenkins.io/){:rel="nofollow"} and Squash with Cypress.

### Parallel run

Tests can be run in parallel with Squash and Cypress. In fact, they both learn how to balance the load to execute the
tests faster over type.

It is possible to get started even faster with [Cypress Test Runners and Dashboard](https://www.cypress.io/features){:rel="nofollow"},
however the free plan is barely sufficient for a small active development team. Alternatives include [Sorry Cypress](https://sorry-cypress.dev/){:rel="nofollow"}
which is Free, Open Source and can executed in a Docker environment or using [Azure](https://azure.microsoft.com){:rel="nofollow"},
Jenkins and [Orchestrator](https://www.npmjs.com/package/orchestrator){:rel="nofollow"} to reach similar results, not
without difficulty.

### Squash

With Squash, you can design and implement your test assets and cases and run your campaigns efficiently. The CI/CD is
there to configure Cypress and retrieve the Squash test plan to execute. Between the CI/CD and Squash, you can have an
orchestrator that runs tests efficiently and that is only supported on Docker today, perhaps in a SaaS very soon.
Alternatively, Squash can also call Cypress using an orchestrator.

## Demo bits

### Cypress

Cypress natively supports JavaScript and TypeScript tests. It creates its own directory structure on initialization. On
its web interface, Cypress displays a list of tests. When clicked, it opens a browser with the requested configuration
and executes the related test case. This browser has the ability to step by step execute the test actions to present how
the application behaves with each change. If the code is edited under the hood during the execution of a test case, the
session is automatically refreshed.

Cypress works on many major browsers such as Google Chome or Brave. To support Safari, you would need an additional
automation framework such as [PlayWright](https://playwright.dev/){:rel="nofollow"}.

Cypress supports mocks, stubs (data replacement using fixtures) and network issues simulation.

### Squash

Squash centralizes common requirements expressed in Jira, test plans and campaigns. As glossed over previously, test
campaigns can be run manually or automatically. A run can be scoped by feature, application domain, etc.

## Questions and Answers
### Does Squash captures videos and screenshots from test executions?

By default, it does take screenshots and videos when a test generates an error. This behavior can be configured with
some code.

### How would you add fake datasets to your tests?

It depends on the situation. If you are on a frontend-backend situation, you could contribute fixtures. Fixtures are
fixed contributed datasets. Otherwise if the situation calls for it you can generate your own data from a specification.

### What uncommon features does Cypress support?

Drag & drop and visual testing using screen captures are two of them. You may stumble upon more browsing the plugin
ecosystem. Note however that there is no way to generate Selenium-like tests.

### Are mobile browsers supported?

No, only deskop browsers are supported at the moment.

### Is it possible to run multiplatform tests without copy-pasting code?

It is. Usually we create additional files that describe different device configurations and their adaptations.
