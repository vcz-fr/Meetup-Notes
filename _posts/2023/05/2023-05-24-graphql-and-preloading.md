---
categories: ["meetups/afup-bdx"]
title: "GraphQL and Preloading"
---

{% include time.md %}
{% include toc.md %}

## Native GraphQL in PHP: a journey
By Antoine Bousquet, Senior Software Engineer @ ManoMano  
[Slides](https://docs.google.com/presentation/d/1F4L6IhhAOVVeaSsh5PVjYm85OB072KcSoA8BcCbKYIQ/){:rel="nofollow"}

### GraphQL

Does this technology need further introduction? An interface, a request language that acts as an equivalent to SQL for
APIs, developed by Facebook in 2015. Returns the data that has been requested and multiple requests can be pooled
together in the same HTTP request.

Even though they are often presented as adversaries, REST and GraphQL are quite comparable in the end; none is truly
superior and using one over the other depends mainly on the situation at hand. Flexibility vs performance:

- REST is perfect when requests are inflexible, when they bear business value;
- GraphQL is better for presentation and self-service requesting.

In a microservice context, each service will expose its API. When the number of service grows, there needs to be a way
to make these APIs discoverable. With REST, one would use an API Gateway like [Kong Gateway](https://docs.konghq.com/gateway/latest/){:rel="nofollow"}.
GraphQL has a similar concept: [Apollo Federation](https://www.apollographql.com/docs/federation/){:rel="nofollow"}.
APIs automatically subscribe to the federation, clients request the federation server which then route the request to
the correct API.

Nothing is magical: federating a GraphQL API through Apollo Federation requires implementing a few directives, keys and
types.

### Adoption plan

Initially, the story starts with PHP microservices exposing private REST APIs through internal API Gateways to higher
level services which expose private REST APIs the same way until the last layer which exposes public REST API endpoints.

```
| [Frontend]
| [pub REST API]
| [µS]
| [priv REST API]
v [PHP µS]
  [Data]
```

To deliver the most value to development teams and customers, you may use an adapter at this point to expose a single
GraphQL API. Apollo delivers a set of libraries to achieve this and start federating APIs.


```
| [Frontend]
| [pub GraphQL API]
| [JS adapter µS]
| [priv REST API]
v [PHP µS]
  [Data]
```

The next step in this transformation is to replace this Javascript adapter with one in PHP to get rid of the
intermediate REST API. [Lighthouse](https://lighthouse-php.com/){:rel="nofollow"} is a Laravel-compatible framework that
can do that.

```
| [Frontend]
| [pub GraphQL API]
| [JS adapter µS]
v [PHP µS + adapter]
  [Data]
```

When the PHP microservice is ready, the JS adapter layer can be removed. This will free up valuable resources and
latency for the end user. This is the last step in the road to federated GraphQL APIs. [graphql-php](https://webonyx.github.io/graphql-php/){:rel="nofollow"}
is a thin layer aound data access that provides a native unopinionated GraphQL implementation.

```
| [Frontend]
| [pub GraphQL API]
v [PHP µS + GraphQL]
  [Data]
```

Unfortunately, at the time of writing, no solution natively supports v2 Apollo Federation, only v1.

### How it works

The library is extremely basic but implements GraphQL logic. Error handling and caching are manual. Don not forget to
declare your types and entities; declared entities will be automatically federated. To avoid performance issues, limit
the number of returned results and be wary of cases where one request in a batch fails: the library may return an error
for the whole batch!

### Caveats and advice

Apollo Federation v2 is not yet available but that may change in the future. Maintaining schemas is complex so it is
advisable to generate GraphQL schemas from the code. Also, renaming a graph causes downtime.

Again, do not forget to cache as much as tou can in the service and using HTTP headers. In a federation context, the
smallest TTL will be applied. Errors may propagate if one microservice does not return the cache headers. Rolling back
GraphQL schema changes is very challenging so review everything well and test every federated query!

GraphQL federation is possible in PHP and not that difficult. However, the ecosystem is not mature enough.

### Questions and Answers
#### Is it possible to return HTTP status codes other than 200 in GraphQL Federation?

You cannot, specifically because of how multi-request works. REST APIs can use HTTP status codes to represent resource
status, GraphQL APIs must implement their solution.

#### How can one use the HTTP caching abilities with GraphQL?

Because GraphQL APIs expose a POST endpoint to which queries are sent, the responses are not cached by default and
implementing such a cache may be overly complex. There is however a solution: implementing the cache at the federation
level using whatever technology you have at hand. If you go down that path, it is recommended monitoring the kind of
queries going through your system to find optimization potential.

#### What is the relative performance difference between REST and GraphQL APIs?

Even though this project is about the migration from REST to GraphQL, performance metrics have not been analyzed for the
most critical page of the website: the home page. However it is supposed that the latency increased during the migration
because of the adapter layer then decreased when the adapter was not necessary anymore and query payloads have been
simplified. REST on the other hand implements query parameters but requests can quickly become unwieldy and every team
must follow the same set of practices.

After this migration effort was complete, many intermediate services have been decommissioned, saving substantial
amounts of development time and infrastructure costs.

## Preloading: a Post-Scriptum
By [Grégoire Paris](https://twitter.com/greg0ire){:rel="nofollow"}, Staff Engineer @ ManoMano  
[Slides](https://www.slideshare.net/greg0ire/preloading-a-postscriptumpdf){:rel="nofollow"}

### PHP Preloading

Introduced with PHP 7.4 in 2019, preloading is a PHP engine feature that relates to opcodes, the intermediate
representation of result of actual PHP code interpretation. These opcodes are then interpreted by a virtual machine
which produces the expected results for the web app.

This intermediate representation makes PHP truly portable. If you wish to have a look at the opcode output for a given
PHP code, go to [3v4l.org](https://3v4l.org){:rel="nofollow"} or install [the Vulcan Logic Dumper/Disassembler extension](http://pecl.php.net/package/vld){:rel="nofollow"}
and run `php -d vld.active=1 script.php`. Recent versions of PHP can also run
`php -d opcache.opt_debug_level=0x10000 script.php` (PHP 7.1+) to get the opcache instructions before optimization or
`phpdbg -p* script.php` (PHP 5.6+).

When PHP code gets executed, at least one PHP file gets invoked. The language engine carefully runs the code through
multiple steps: lexing, parsing, building the Abstract Syntax Tree (AST), Generating opcodes and executing. PHP does not
cache opcodes by default: every request starts from a clean slate and opcodes are computed on every request. Once upon a
time, there were accelerators that cached these intermediate representations and served them instead. Of these, only
Zend's opcache survived to this day.

Thanks to opcache, before going through the lexing, parsing and transformation steps, we consult the opcache cache. If
the file is not present there we go through all the steps and save the result for future requests. opcodes are copied in
the memory of the running process. But with preloading... this logic disappears! The code is completely parsed and
present as opcodes in every process, ready to be executed! So why are we not hearing about this more, what gives?

### Compromises

Because of inheritance, generating opcodes can get tricky and require an additional slow linking step. This is not the
case with preloading where synctactically validating class signatures takes increasing amounts of time with each version
as PHP types get more expressive. Without preloading, these resolutions are done at runtime. If you preload, the
application crashes during the preloading process if a type issue is detected.

Preloading can be invoked by calling the opcache API through a function to which one can pass one file to preload, [`opcache_compile_file("/path/to/file.php");`](https://www.php.net/manual/en/function.opcache-compile-file.php){:rel="nofollow"}.
Opcache can be tested through the CLI but this is not recommended in a production setting!

Symfony and other frameworks can too handle preloading and can make these decisions, request guidance or defer
everything to the developer.

There are major caveats with preloading:

- Files need to exist before they are parsed for preloading. If you wish to preload on php-fpm initialization, make sure
  all your PHP files to preload are present before the process starts for the first time;
- Preloaded scripts are global, shared across all php-fpm pools and not specific to any of them.

You may check the preloading status of any file with [`opcache_get_status();`](https://www.php.net/manual/en/function.opcache-get-status.php){:rel="nofollow"}
and look for "opcache_statistics".

Preloading is risky. It is a set of trade-offs between memory usage and execution time that can easily be surpassed by
using newer versions of PHP. Notably PHP 8.1 includes an inheritance cache system that handles complex type checks
making preloading less interesting from a performance uplift standpoint and there is more to come as more actors turn
away from this configuration option.

Preloading should be carefully studies if it is considered an option: too much of it and you may degrade performance
because of memory bloat. It needs to be fine-tuned, maintained over time.

### Questions and Answers

#### Does the inheritance cache performance uplift scales with the size of the app?

Yes! Do your own benchmark anyway, your mileage may vary.

#### Are there caching rules? How does it decide which file should get ejected when memory is insufficient?

No idea. Many bugs have been discovered with the implementation and all of them have not been fixed. Mainteners wish to
get rid of preloading.

#### Should frequently invoked scripts be preloaded?

This could grant quick wins so it could be a good idea. On a side note use Objects rather than Arrays to improve
performance. This is too common a trap.
