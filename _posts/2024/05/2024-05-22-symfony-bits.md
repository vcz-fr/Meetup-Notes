---
categories: ["meetups/afup-bdx"]
title: "Bits about Symfony"
---

## Unlock the Power of Time: Discover the Symfony Scheduler Component

By Kélian Bousquet, Developer @ SensioLabs  
[Slides](https://afup.symfony-scheduler.kelianbousquet.com/){:rel="nofollow"}

Before diving into the Component, let's mention that the idea is nothing new. In Windows, the Task Scheduler component
has been around since 1995. The universally famous "cron" utility in Unix/Linux systems dates back to the 70s, having
been designed at Bell Labs. These two options still see massive use to this day, especially cron. If you are not
familiar with the cron syntax, head to [Crontab Guru](https://crontab.guru/){:rel="nofollow"} to design your
five-component cron schedules.

### The Symfony Scheduler Component

While Symfony Components share their name with the PHP framework, they can actually be used in any other framework and
plain PHP code! The Symfony framework follows this release cycle:

- x.4 versions are LTS. Versions up to LTS add features and keep backwards-compatibility with the x.0 branch. Features
  can be marked as deprecated but will not be removed except in exceptional circumstances such as conflicts with
  features introduced in newer versions of PHP;
- x.0 versions remove deprecated features from the previous x.4. They are released at the same time and this is the only
  difference as the feature set is strictly identical;
- New releases come out every six months in May and November. This leads to one major version being released every two
  years.

There are 73 Symfony components today. [Scheduler](https://symfony.com/doc/current/scheduler.html){:rel="nofollow"} has
been introduced with Symfony 6.3, released in March 2023. Guillaume Loulier, a SensioLabs developer who is also the
first to pass the Symfony 7 certification, is the author of that component.

The goal of the Scheduler is to handle complex task planning and execution that requires implementing business logic. To
install it, run `composer require symfony/scheduler`. It depends on Symfony Messenger, which must be installed as well.
Symfony Messenger implements message processing primitives which the Scheduler uses. In fact Scheduler generates
messages that it then forwards to Messenger.

### Operation

To run the component, execute `php bin/console messenger:consume scheduler_schedulename`. Scheduler starts waiting for
messages. There are multiple ways to implement this component, including a more generic one. Here are some options:

- Periodic triggers with the [`#[AsPeriodicTask]`](https://symfony.com/doc/current/scheduler.html#asperiodictask-example){:rel="nofollow"}
  annotation. It supports a start, end and a jitter attribute to avoid load spikes during common task processing
  periods;
- Custom handlers require more work with the implementation of a class implementing `ScheduleProviderInterface` and
  annotated with `#[AsSchedule]` and a second class annotated with `#[AsMessageHandler]` which is in charge of
  processing the messages;
- To decide when a Task should be triggered, use [Custom Triggers](https://symfony.com/doc/current/scheduler.html#custom-triggers){:rel="nofollow"}.
  They require a class that implements `TriggerInterface` where the public method `getNextRunDate` determines the next
  trigger date after a given `DateTimeImmutable`. The class annotated with `#[AsSchedule]` must consume this trigger in
  its public `getSchedule` method.

Debugging time-based implementations requires special tooling. [faketime](https://github.com/wolfcw/libfaketime){:rel="nofollow"}
is a good option. `faketime 'someValidISODateTime' php bin/console debug:scheduler` will print a table listing
schedules, providers and their next run date. This command supports passing a custom date or specifying the schedule to
check for.

There are two kinds of triggers: periodical and cron. The former can be invoked with the function
`RecurringMessage::every` which accept relative formats, time zones and so on. The latter requires an additional
dependency `dragonmantank/cron-expression` and its function `RecurringMessage::cron` only supports five-segment cron
schedules and some special values for common expressions. cron does not support tasks planned down to the second. It's
possible however to add jitter by using `#` in place of `*`. In cron, `*` means "any possibility", here `#` generates
one pseudo-randomly.

The jitter issue can be dealt with from the annotations, natively from the components or with the `JitterTrigger`
decorator. The consensus is to avoid setting up too many recurring tasks at quarter-hour marks.

There are pros and cons to using the Symfony Scheduler component versus good old cron:

- cron is ubiquitous, has been used in billions of systems, is trustworthy and lightweight. It does its job well but
  does not natively support start and end dates, implementations differ, has a minimum resolution of one minute and only
  works in UNIX/Linux systems;
- On the other hand, Scheduler is PHP-based, has a minimum resolution of one second and supports custom logic for
  triggers and handlers. It is a very flexible solution even though it requires installing Symfony Messenger and is
  rather resource-heavy.

### Questions and Answers
#### How would this component be able to schedule events at a certain time from a different time zone?

This has to be handled manually in a custom Scheduler. The same applies to handle different cultures (bank holidays,
working days, etc.).

#### Does the component support concurrent transports?

It does, but it would be preferable to use one Transport and use locking to ensure only-once message processing. This
solution scales relatively well by backing it with a worker pool.

#### How would error handling work?
It can be configured thanks to the Messenger component. There, you can also set how metadata gets persisted.


## This is GotenbergBundle

By Adrien Roches, Developer @ SensioLabs  
[Slides](https://neirda24.github.io/meetup-gotenberg-bundle){:rel="nofollow"}

[Gotenberg](https://gotenberg.dev/) is a Docker-based API that generates PDFs from HTML, Markdown, Word, LibreOffice,
Excel documents and so on. It can merge files, capture screenshots, edit metadata and more! Its notable competitors are
fpdf (bad Developer eXperience), wkhtmltopdf (Critical vulnerabilities, don't use it!), DomPDF, Puppeteer and PrinceXML
(expensive).

### SDK

Gotenberg has a [PHP SDK](https://github.com/gotenberg/gotenberg-php){:rel="nofollow"} acting as an API client.
Developers must pay attention as assets have to be added to document generation invocations and must be included with a
relative link in the HTML. Moreover, the invocation must be completely static. There is no way to generate table rows
from an array, even the configuration is static. Fortunately the SDK is framework-agnostic, which is also unfortunate as
it makes integration with Symfony all the more challenging.

### Symfony Bundles

On any journey to master a craft there are steps and an advanced one is creative usage of the tools of the craft.
Symfony embraces these steps. As such, the following recommendations for Symfony Bundles are **not prescriptive** but
could act as guiding principles for less experienced engineers:

- They can live independently of their project;
- There must be a valid reason for their existence: business logic belongs to your app;
- Required and optional dependencies must be carefully managed. Each dependency significantly increases the maintenance
  burden;
- Maintain a high quality standard to ensure it will last: good documentation, developer experience;
- Add extensive tests, run static analysis. This avoids regressions and simplifies development and maintenance efforts.

The directory structure of a Bundle is similar to that of an app:

```
<your-bundle>/
├── assets/
├── config/
├── docs/
│   └─ index.md
├── public/
├── src/
│   ├── Controller/
│   ├── DependencyInjection/
│   └── YourBundle.php
├── templates/
├── tests/
├── translations/
├── LICENSE
└── README.md
```

Why would you develop a Bundle in the first place? For one, it's easy to configure using YAML. The configuration options
can be declared with a class that implements `ConfigurationInterface` where a method named `getConfigTreeBuilder`
returns a `TreeBuilder` instance. Be careful that this instance name uses snake_case and is named
"bundlenamespace_bundlename", otherwise it will fail. This class is not required, but it will greatly help developers
with configuration management and maintenance. Furthermore, it can validate user entry and is integrated with the
profiler in debug mode:

- `php bin/console config:dump namespace_name` prints the documentation for a given Bundle. It mentions optional values
  and validation hints;
- `php bin/console debug:config namespace_name` prints the resolved configuration for a given Bundle.

### GotenbergBundle

Going into this, the objectives were to enable a seamless integration between Gotenberg, Symfony and PHPStorm and enable
nice-to-haves such as templating with Twig and better asset management. Installing the Bundle requires a running
installation of Gotenberg. Developer eXperience has been central in the development of this Bundle: PHPStan level 8, an
integration with the Profiler in Debug mode and virtually all Gotenberg options are addressable through the Bundle.

To use Twig within the Bundle, you'll need to invoke
`$this->gotenberg->html()->content("myfile.twig")->fileName("my-file.pdf")->generate()`. Builder-like APIs make code
readable linearly and can be part of good DX. Autocompletion is the other part of a good experience and this is
accomplished using [PHPStorm Hashes](https://www.jetbrains.com/help/phpstorm/symfony-creating-helper-functions.html#hashes){:rel="nofollow"},
which, when added to code comments and with the addition of metadata file, guide PHPStorm's autocompletions. Constants
would go into a `.phpstorm.meta.php` file. Its syntax is terrible, the behavior is not guaranteed by the IDE and the
integration is far from complete.

TreeBuilder saves the day once again and enables simple configuration. In most cases, Gotenberg will need Chromium to
render HTML though a headless LibreOffice instance is included in the container to generate PDFs. The Twig builder
automatically fetches assets invoked with `gotenberg_asset`, removing this repetition from the invocation. Finally,
the Bundle itself is designed for extensibility, though it is not recommended extending it.

The configuration includes setting up the base URI of the Gotenberg API, the default assets directory, the HTTP client
if you wish to override it and default invocation options.

The Bundle is not quite finished yet but is almost there: it is missing a Symfony Flex recipe, more documentation and
tests, its Twig implementation could be improved and its integration with the recently released Gotenberg 8 could
receive some attention. However, stability will be reached by mid-June 2024.

### Questions and Answers
#### Can we use a Controller render as the markup source for the PDF?

Absolutely! Be careful though as render returns a `Response` object and Twig is an optional dependency. You can also
generate Headers, Footers and ContentFile this way. Finally, be careful about the impact of your deployment on how
components are addressed: your app may not be able to invoke Gotenberg if network policies prevent it to.

#### What is the minimum supported Symfony version?

It should be 6.4 or 7.0. You want to check this before using it.

#### Can it handle tables?

That is actually what it was build for initially! Invoices may sometimes span multiple pages that must feature repeating
headers and footers. It turns out this overflow can be nicely managed in pure CSS.

#### The TreeBuilder example in the presentation is badly formatted. Are there plans to maintain PSR-compatible indentations?

The TreeBuilder being a relatively hidden part of the Bundle, this has not been scoped however it is fair feedback.
There is a will to source TreeBuilder from a different standard format at a later stage.
