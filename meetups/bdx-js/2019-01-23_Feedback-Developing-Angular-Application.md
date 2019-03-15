# Feedback: Developing an application with Angular
Frédéric Hémery, Lead Developer Angular Expert Team @ Betclic  
[Thomas Marcelin](https://twitter.com/ThomasMarcelin), Developer @ Betclic  
[Slides](https://www.slideshare.net/secret/4VGmpAjjnDoIVq) - [Video \[FR\]](https://www.youtube.com/watch?v=eMDGNNy77Y8)

## A bit of context
The Betclic application is a multi-regulation one. The Betclic group operates on four separate domains: Sports, Casino, Poker and Turf. It supports 1 million users, of which 80% are coming from mobile platforms with a peak load of 4500 concurrent users. Their market is strongly regulated and the group has six different brands to deploy with country-specific regulations.

Why would their platform need a rewrite? Because it was not mobile-first. Their mobile platform was slow and not adapted for mobile usage. Nearing the approach of the 2018 Soccer World cup, the team has decided to re-engineer their platforms with Angular and native applications.

At the same time, BetClic was in the process of moving some of their technical teams from Paris to Bordeaux. This would also mark the beginning of their new team organization, which will be mentioned later.

## The architecture
Their current architecture exposes three applications: the webapp for desktop and mobile platforms and the iOS and Android native applications. The webapp is an MVC application that directly feeds off the database. The iOS and Android applications rely on the same APIs. The new infrastructure would allow the use of the APIs by both the webapp and the native applications.

From the technological standpoint, the new web application is written in Angular 7.1 with a planned migration to 7.2. The APIs are developed in .Net Core 2.0 with an integration of Angular Universal. The front-end contains 600 components, 300 services, 450 modules for a total of 200k lines of code in 14k commits.

Why Angular? Because the front is an SPA, allows for robust architectures and because there was internal knowledge about this technology, just like .Net Core.

For each request, the server will prepare some data, call the Server-Side Rendering and enrich the results with tracking or metadata depending on the user type. Anonymous requests are cached and served from the edge. The architecture does not allow some browser primitives to be called, such as cookies, window or relative URLs. Thus, all the modules are platform-agnostic; they are designed in such a way that platform-specific features are implemented under the form of an implementable interface with the aim to reuse as much code as possible.

## Quality Assurance

When working on such a massive architecture, ground rules need to be enforced. Each piece of code that is sent to the remotes must verify the following points: passing the tests, showing the intention through peer reviews, having no duplication, minimalism through mutation tests and be fast through regression tests. Speaking of tests, the company targets 90 to 95% of unit test coverage with tests that are as relevant as possible. To enforce that rule, hooks prevent developers from sending code that is not tested or covered enough.

The test process is the following: a large base of unit tests, then integration / SSR tests, then functional / end-to-end tests and finally human and business tests with dedicated QA teams. The QA teams automate their tests with the [Cucumber](https://cucumber.io/) framework. They make sure to cover critical features and keep the test scenarios up to date.

Their Git flow is classic: they have a development branch which developers branch out from to develop their features. After a successful review tunnel, developers rebase their changes on the latest version of the development branch and publish them. The review tunnel must receive two validations based on the following checks: code expressiveness, tests, best practices, build checks. Reviews are also used as an opportunity to spark discussion and train new developers on the technologies and the architecture of their respective projects.

Some recommendations from the team:
- Keep your builds small, always keep tab of their size during your CI;
- Stay up to date with your technologies, especially Angular: Angular 8 promises to speed up rendering with its new engine;
- Use performance tools at every step: [WebPageTest](https://www.webpagetest.org/), [LightHouse](https://developers.google.com/web/tools/lighthouse/), [YellowLab](https://yellowlab.tools/), etc.

## Organization

Before their transition, Betclic used to have technology-oriented teams. This approach led to vast differences in terms of engineering practices, implementation consistency across platforms and release dates. They moved to feature teams with developers from all horizons that can share their way of implementing their features consistently since their Product Owner will be the same. An Expert Team backs up the feature teams, work on architecture and design and serve as the entry point for newcomers.

From time to time, the developers of a same technology meet to discuss about their feature team progression. These meetings are open to the developers of other technologies to guarantee a more coherent experience across all platforms and add technical openness to the mix.

## The future

Currently, the build times are intense and can last up to an hour! There are projects and ideas to reduce it, though: parallelize, cache, finetune environments, nightly builds. The development experience becomes more difficult because of that: as more developers are added in the teams, the build queue grows. A solution for that would be to slice the product in relevant micro-services with an adapted experience. Finally, to reach a better global product quality, the tests will be operated by different teams. A feature developed by Team A may be tested by Team B, or C, etc.
