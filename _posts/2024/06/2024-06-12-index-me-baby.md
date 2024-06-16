---
categories: ["meetups/afup-bdx"]
title: "Index me baby!"
---

{% include time.md %}

By Nerea Enrique, PHP Engineer @ ekino  
[Slides repository](https://github.com/Curryed/search){:rel="nofollow"}

{% include toc.md %}

## Search engines

Let's postulate the following: we wish to index text information organized into documents, much like a library.
Indexation refers to a tokenization process where contents are split into fragments called "tokens" usually the size of
a word, sometimes less. These tokens are then used to generate reverse indexes. A good example of these reverse indexes
can be found in recipe books: when one wishes to find recipes needing a given ingredient, they will search for that
ingredient on the reverse index and find the recipes it is used in.

Search queries are expressed with some language that is then translated by the engine to compute and return search
results. This is akin to a librarian which will find and fetch books based on a discussion with a person.

## Some Maths

Indexing and retrieval is based on scoring documents. There are many ranking functions designed to optimize the speed
and accuracy of the search such as [BM25](https://en.wikipedia.org/wiki/Okapi_BM25){:rel="nofollow"} —Best Matching 25—,
but here we will focus on a simple yet functional one. We will need to define the following indicators:

- **Inverse Document Frequency** is the relevance of a term compared to a document base which is basically the inverse of
  its rarity. It is computed by dividing the total number of documents by the number of documents containing the search
  term, then applying a log function;
- **Term Frequency** measures the frequency of a term _within_ a document. It is a ratio between this count and the
  total number of terms in a document;
- **Coordination Factor** is the number of terms from the query that could be found in the document. If a query contains
  two search terms and only one matched then the Coordination Factor is `0.5`.

Here is the simplified ranking algorithm: `sum[i from 0 to n](IDF_i * TF_i) * CF, n = count(search terms)`. The sum is
computed for each search term and the CF serves as a compounding factor that will favor results that best fit the query.
More complex ranking functions will add elements to influence the score: user input, boosters and more. There is another
way to influence how the score is computed: analyzers.

## Analyzers

Analyzers apply rules and filters to a query such as lowercasing its terms, eliminating filler words and ngram. An ngram
is a set of subtokens created by applying a sliding substring to each search term which max size is defined by a
variable `n`. Its opposite is an edgegram which applies a sliding substring which **min** size is `n`. stemmer extract
word roots to avoid conjugated words in queries and stop removes words such as "the" or "of" which may match lots of
documents.

These analyzers are destructive, and their placement order can strongly affect the performance of the ranking algorithm
both in speed and relevance. This choice depends on the data and the culture as, for instance, the root of a word cannot
be extracted the same in English and in French.

## Questions and Answers
### Is it possible to estimate the disk size for a given index and dataset?

No idea, though this looks achievable somehow.

### Is the reverse index precomputed? How can a different weight be applied to a document title vs its description?

The reverse index is precomputed, and the index developer chooses the weight assigned to each document field.

### How is semantic similarity encoded in the index?

It's either precomputed in the index or done as a filter, although a filter would probably be inefficient. Semantic
similarity is a complex feature for indexes.

### What are some alternatives to ElasticSearch?

Alternatives to [ElasticSearch](https://www.elastic.co/elasticsearch){:rel="nofollow"} include [OpenSearch](https://opensearch.org/){:rel="nofollow"},
[Meilisearch](https://www.meilisearch.com/){:rel="nofollow"}, [Apache Solr](https://solr.apache.org/){:rel="nofollow"}, [Apache Lucene](https://lucene.apache.org/){:rel="nofollow"}
and [Fuse.js](https://www.fusejs.io/){:rel="nofollow"}.

### Is it possible to create custom analyzers?

Absolutely, though the field is mature with many filters already implemented that implementing a custom one should not
be necessary nor performant.
