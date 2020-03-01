# Build the future with TypeScript and NestJS
🕑 *Estimated reading time:* **4mn**

By [Maxence Guyonvarho](https://twitter.com/mgv_dev), Fullstack developer @ AT Internet

## Table of Contents
  * [Introduction](#introduction)
  * [Tooling and Contents](#tooling-and-contents)
  * [Questions and Answers session](#questions-and-answers-session)
    + [Does NestJS comes packaged with a logger?](#does-nestjs-comes-packaged-with-a-logger)
    + [What uses can NestJS have?](#what-uses-can-nestjs-have)
    + [What can the user validation provide?](#what-can-the-user-validation-provide)
    + [Can NestJS and Angular work together?](#can-nestjs-and-angular-work-together)

## Introduction

[TypeScript](https://www.typescriptlang.org/) dates back to 2012 and has been created by Microsoft. This technology is
mature and production-ready today. [NestJS](https://nestjs.com/) actually predates TypeScript since its first version
has been released in 2007.

NestJS is a web application framework supporting [Express](https://expressjs.com/) and [Fastify](https://www.fastify.io/)
out of the box. Monorepo and micro-service ready and with an active community, new packages enhance the experience
regularly by opening new possibilities without increasing the size of the core thanks to an expressive module system!

NestJS is the backend framework that grew the most in 2019. Its [GitHub project](https://github.com/nestjs/nest) has
been awarded about 25k stars and counting and its [core dependency](https://www.npmjs.com/package/@nestjs/core) is
downloaded more than 210k times per week!

## Tooling and Contents

Most of the ideas that you will find in NestJS are derived from other technologies and especially from Angular. For
instance, dependency injection, the CLI and the request lifecycle. The [documentation](https://docs.nestjs.com) is
simply one of the most exhaustive there is, which supercharges developer experience.

The [request lifecycle](https://docs.nestjs.com/faq/request-lifecycle) of NestJS is the following:
- Middlewares;
- Guards;
- Pre-controller interceptors;
- Pipes;
- Handlers (actual request);
- Post-controller interceptors;
- Exception filters.

The NestJS CLI displays its documentation if used without any argument. To create a new project named "project", you
would use the command `nest new project`. To start it immediately, `nest start`.

The core of the framework is very light as it is modular. For instance, [`@nestjs/config`](https://www.npmjs.com/package/@nestjs/config)
can help manage `.env` configurations in your project. Some features such as hot reload are natively provided thanks to
Webpack. From a performance standpoint, NestJS does not add significant overhead to the requests. The overhead is
estimated at 10% of the total request throughput, which is far from what the rest of the request handling should cost.

Pipes and Guards are implemented and function similarly: they can both be placed at the application, controller or route
level. Pipes can additionally be added to individual parameters.

Application cache is not a problem for NestJS thanks to its implementation of [`cache-manager`](https://www.npmjs.com/package/cache-manager)!
This works with in-memory, files, Redis, Memcached and many other options, is simple to integrate thanks to a dedicated
decorator.

As for other features, it packs GZip compression thanks to Express, supports WebSockets, [Bull](https://github.com/OptimalBits/bull)
queues, scheduled tasks / cronjobs and [Compodoc](https://compodoc.app/).

If you are interested by NestJS, the [Enterprise website](https://enterprise.nestjs.com/) mentions an official support
team. It is also possible to ask questions on the official [Discord server](https://discordapp.com/invite/G7Qnnhy), [GitHub project](https://github.com/nestjs/nest)
or on [StackOverflow](https://stackoverflow.com/questions/tagged/nestjs).

## Questions and Answers session

### Does NestJS comes packaged with a logger?

Absolutely! It comes with its own logger but it can be replaced with the more popular [Winston](https://github.com/winstonjs/winston).

### What uses can NestJS have?

This framework is a good fit for the following uses:
- An API that collects and processes data retrieved from Youtube and sends them to [Amazon Aurora](https://aws.amazon.com/fr/rds/aurora/);
- Single Sign-On;
- Video broadcast and scheduling backend.

### What can the user validation provide?

The user validation can prevent classic cases of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors), [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).
It can provide rate-limiting and reject submissions based on validators and it is possible to implement additional
modules to further enhance features.

### Can NestJS and Angular work together?

Perhaps `libs` and pure validation functions would be compatible. Even though NestJS's creator is close to Google,
NestJS and Angular are not exactly meant to be used together at the same time. But it is possible to share some parts of
the code and to send messages back and forth.