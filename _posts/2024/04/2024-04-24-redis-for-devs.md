---
categories: ["meetups/afup-bdx"]
title: "Redis, a developer's Swiss knife"
---

{% include time.md %}

By Jonathan Barbin, Senior PHP Engineer @ ekino  

{% include toc.md %}

## About Redis

[Redis](https://redis.io/){:rel="nofollow"} is the most popular in-memory data structure storage solution. It supports
many data structure types, simplifies disaster recovery, transactional workloads and even has a built-in Lua engine!
Relational database management systems implement similar features, but can they do it in-memory?

Memory is at least an order of magnitude faster than disk. To its detriment, memory is volatile and expensive. What also
differentiates Redis from relational databases is exactly that: Redis offers many data structures in a schema-less
fashion, pub-sub and good read-write performance. It is typically used for user sessions, message queues and as a cache
for expensive operations. These are resource-intensive, slow or incurring costs or fees.

Redis can persist data:

- Redis DB (RDB) does so periodically;
- Append On File (AOF) does so after each transaction (depending on the configured strategy).

RDB is faster and more compact but can lead to data loss between backups while AOF requires more work and storage. A
good strategy is somewhere in the middle: keep regular save points and the transaction log to calculate the delta on
restore.

This is all possible because Redis is synchronous and mono-threaded. Operations are thus executed atomically. Each
command consists of a verb and one or more arguments and transactions can contain multiple commands.

## Data structures

This is not an exhaustive list. There are lots of data structures in Redis. We encourage you to explore [its commands](https://redis.io/docs/latest/commands/){:rel="nofollow"}
in search of inspiration for your next big thing.

- Strings: The staple of key-value databases. It contains a string. You can store a serialized object smaller than 512MB
  in a String;
- Sets: Sets of unique strings that can store up to 4 billion of them (2^32);
- Hashes: Key-value pairs that belong to the same structure. This is useful for objects with multiple properties and
  supports up to 4 billion String key-value pairs (2^32);
- Sorted Sets: Identical to sets but additionally takes a score argument that is used to sort set members;
- Geospatial: Geospatial coordinates and search including perimeter. Useful when working with geospatial data;
- Lists: Ordered collection of non-unique strings. Can contain up to 4 billion members (2^32).

## Redis Streams

[Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/){:rel="nofollow"} is technically a queuing
service. Messages appended to a Stream can be consumed at other end. Streams are append-only and messages do not accept
updates once appended. Each message is given a unique identifier consisting of a timestamp and an internal counter. This
is useful for real-time workloads.

The unique identifier is customizable, although we do not advise doing so unless you have a very good reason to.
Messages are sorted lexicographically using this unique identifier. Each Streams message follows the Hash data type: it
contains a collection of key-value pairs.

Internally, Redis optimizes data storage using a variant of [Radix Trees](https://en.wikipedia.org/wiki/Radix_tree){:rel="nofollow"}.
It relies on the structure of key identifiers to best compress data. This makes index building much faster and lookups
benefit from better performance as well, all of which scales with the workload. Due to the implementation of Radix Trees
in Redis, shorter keys are queried faster because they can faster to find.

## Questions and Answers

### What happens when memory is full in Redis?

Redis is not well suited for critical data as it frees memory by deleting unaccessed data. This needs to be dealt with
when architecting your service: Redis is ultimately a fronting layer to an expensive operation, not a storage layer!

### What are the consequences of the license change on Redis's future?

The code is open core, but the license requires the service not to be repackaged and resold by a third party. This could
go the way of ElasticSearch which was forked to OpenSearch when its license changed. There are Redis competitors that
could claim this space, such as [Garnet](https://microsoft.github.io/garnet/){:rel="nofollow"}.
