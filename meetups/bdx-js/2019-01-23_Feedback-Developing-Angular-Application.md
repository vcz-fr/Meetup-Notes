# Feedback: Developing an application with Angular
Frédéric Hémery, Lead Developer Angular Expert Team @ Betclic  
[Thomas Marcelin](https://twitter.com/ThomasMarcelin), Developer @ Betclic  
[Slides](https://www.slideshare.net/secret/4VGmpAjjnDoIVq) - [Video \[FR\]](https://www.youtube.com/watch?v=eMDGNNy77Y8)

## A bit of context
The Betclic application is a multi-regulation one. The Betclic group operates on four separate domains: Sports, Casino, Poker and Turf. It sipports 1 million users, of which 80% are coming from mobile platforms with a peak load of 4500 concurrent users. Their market is strongly regulated and the group has six different brancds to deploy with country-specific regulations.

Why would their platform need a rewrite? Because it was not mobile-first. Their mobile platform was slow and not adapted for mobile usage. Nearing the approach of the 2018 Soccer World cup, the team has decided to reengineer their platforms with Angular and native applications.

At the same time, BetClic was in the process of moving some of their technical teams from Paris to Bordeaux. This would also mark the beginning of their new team organization, which will be mentioned later.

## The architecture
Their current architecture exposes three applications: the webapp for desktop and mobile platforms and the iOS and Android native applications. The webapp is an MVC application that directly feeds off the database. The iOS and Android applications both use the same APIs. The new infractructure would allow the use of the APIs by both the webapp and the native applications.

From the technological standpoint, the new web application is written in Angular 7.1 with a planned migration to 7.2. The APIs are developed in .Net Core 2.0 with an integration of Angular Universal. The front-end contains 600 components, 300 services, 450 modules for a total of 200k lines of code in 14k commits.

Why Angular? Because the front is an SPA, allows for robust architectures and because there was internal knowledge for this technology, just like .Net Core.

For each request, the server will prepare some data, call the Server-Side Rendering and enrich the results with tracking or metadata depending on the user type. Anonymous requests are cached and served from the edge. The architecture does not allow some browser primitives to be called, such as cookies, window or relative URLs. All the modules are platform-agnostic. They are thought in such a way that platform-specific features are implemented under the form of an implementable interface with the aim to reuse as much code as possible.
