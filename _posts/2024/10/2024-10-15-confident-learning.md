---
categories: ["meetups/bdx-ml"]
title: "Confident Learning & RAG"
---

## Learning with Noisy Labels
By Mouran Inan, Senior Data Scientist @ Betclic

The most important concept in Data Science is "Garbage in, garbage out". The quality of the output **cannot** be better
than the quality of input. Why are inputs not always as qualitative? Human error, ambiguity, data corruption and so on.

### Confident Learning

There are solutions to noisy data. According to [this survey](https://github.com/songhwanjun/Awesome-Noisy-Labels){:rel="nofollow"},
there are two main approaches:

- Cleaning the data, applying rank pruning;
- Tuning the model robustness.

These two approaches can be combined into one: Confident Learning. The result does not use hyperparameters, works with
multi-class datasets, detect outliers, is not iterative —therefore way faster—, assumes localized errors instead of
uniform errors and does not require identified labels! While this seems too good to be true, Confident Learning
implements techniques like pruning via the confusion matrix, counting to remove or penalize untrustworthy data from
every class and ranking.

> In Python, use [cleanlab](https://pypi.org/project/cleanlab/){:rel="nofollow"} to test dataset cleaning techniques.

Datalab can find duplicates, non-independent or identically distributed data (iid) and duplicates between the training
and test sets. If an error is reported, immediately check the test set in priority. Training sets outliers will not pass
the evaluations. Also use the confusion matrix to identify if data is correctly labeled.

### Questions and Answers
#### What is light GBM?

GBM stands for Gradient-Boosting Machine. LightGBM or LGBM is a machine leaning framework mostly used for ranking and
classification tasks. It has been finetuned for Kaggle competitions, is performant and works on sets. Its performance
makes it well-suited for quick prototyping and also production workloads.

#### How to identify mislabeled data in a biased dataset?

This touches on the limitations of the tool. Fringe data points are considered noise whether they are truthy or not.
Mind your data quality and biases! Similarly, you can use a dataset even though it is unbalanced as is often the case in
fraud detection, but you will need additional techniques like weights to balance classes. If you don't have enough data,
its quality is highly likely to be variable and noise potentially high to the point where the dataset is unfit. Small
data is a topic on its own.


## Advanced RAG
By Vincent Van Steenbergen, Senior R&D engineer and Founder @ ThinkDeep

RAG stands for Retrieval Augmented Generation. By extension of this reasoning line, a RAG pipeline can be split up into
two parts: the retrieval and the generation. In this context, "retrieval" means fetching knowledge which is located in a
knowledge base consisting of CSV, vector data and so on. Data gets usually indexed in a vector DB from which vectors get
retrieved depending on what the user requests before being sent to the LLM. What follow are some techniques to improve
RAG pipelines.

In terms of approaches, we distinguish three classes:

- Naive: putting inputs and related chunks in an LLM and seeing what comes out;
- Modular, where retrieval and generation are two steps developed independently;
- Advanced, that stems from the modular class and uses techniques like reranking, auto-merging and advanced filtering.

We also distinguish four steps in a modular pipeline: pre-retrieval / indexation, retrieval, post-retrieval and
generation. We will explore techniques for each of these steps.

Before that, we posit that Graph RAG is a way to combine Graph data to vector data where the graph part represents a
knowledge graph and the vector part are embeddings. The LLM could generate [Text2Cypher](https://github.com/neo4j-labs/text2cypher/){:rel="nofollow"}
to query the knowledge graph and semantic search for the embeddings. In this sense, Graph RAG is a good way to add
context to a prompt from its constituting elements.

### Techniques
#### Pre-retrieval and indexation

- Preparing the data using an LLM or other techniques: summary, fact extraction, cleaning or labeling;
- Deduplicate chunks by merging similar information;
- Pre-generate frequent queries and pre-match them with relevant chunks.

#### Retrieval

- Rewrite queries to a "more efficient" natural language, one more suitable to LLMs;
- Create hierarchical chunks and search through the hierarchy when querying from large chunks to finer ones as needed;
- Pre-generate responses and find their related chunks with techniques such as Hypothetical Document Embeddings (HyDE);
- Query routing and caching. You can also retrieve chunks or response fragments;
- Add query metadata to the prompt such as the author or the expected dates for search intervals;
- Implement hybrid searches going from sparse to dense vectors;
- Implement graph search wherein a prompt is translated into a cypher query and chunks then somehow mixed together.

#### Post-retrieval

- Rerank chunks based on a relevance score based on similarity for instance;
- Compress chunks to just keep the information they contain and no more. The result is passed to the prediction. Good
  for small context windows;
- Score and filter chunks based on given criteria;
- Enrich the prompt based on the chunks.

#### Generation

- Chain of Thought with agents executing each step;
- Auto-reflexion, which is based on the similarity with a vector db;
- Fine-tuning with or without an adapter;
- Validating the relevance of a response using a verification LLM. Store non-relevant response to improve the model in
  the future.

### Conclusion

Frameworks already offer most of these techniques therefore the problem is not so technological but rather what is the
data like, how much do you have and how qualitative it is. It is about semantics and truthful knowledge. With graph
databases, knowledge becomes a living organism and outputs can be validated. Vector databases allow for source citations
while graph databases store the reasoning!

Last but not least, how can these complex pipelines be tested? If they are indeed modular, each section can be tested
independently. To play with the approach, try [Kotaemon](https://github.com/Cinnamon/kotaemon){:rel="nofollow"}.

### Questions and Answers
#### Are there others ways to benchmark these pipelines? Are there limits?

End-to-end tests are the next best thing. Limits are actually hard to identify: where are hallucinations coming from?
From bad configuration, bad chunk retrieval or, most frequently, bad data? In the latter case, no part will particularly
misbehave but if the user submits obsolete or wrong data, the system is poisoned.

#### What are some techniques to make sure data originate from the context?

Do some prompt engineering with a system prompt like: "you can only reply with context data, not from your own
knowledge".

#### Why would anyone build this compared to deploying Copilot, Claude or Coral?

Managed solutions are great, especially when the data is not sensitive or cost scaling is within acceptable bounds. For
other use cases, building its own RAG may be relevant.

#### Is it better to use off-the-shelf chunking libraries or custom-made ones?

Your strategy will depend on what you wish to achieve. In most cases, [LlamaIndex](https://docs.llamaindex.ai/en/stable/){:rel="nofollow"}
is good enough. Furthermore, the chunking strategy for embeddings and knowledge graphs is tightly coupled to the
prediction model.

#### Is there some standard approach to RAG pipelines?

It depends on the expected data, query and precision. Basic RAG pipelines will do fine but won't work for specific data
or when more context or details is needed. Start simple then grow as needed and keep benchmarking with a series of
questions.

#### Some tips to limit cost?

Cache everything and self-host an open-source model once you reach critical mass.

#### Does hierarchical Index Retrieval keep parent relations?

Yes, though you will rarely use them.

#### How to evaluate an LLM-as-a-judge?

Develop a loss score or evaluate judge models yourself to pick the right one.

#### Is there a performance difference when changing the embeddings model?

Yes, especially for multilingual contexts. However, differences are less perceptible between an S, M and L model within
the same language.

#### What is the ideal chunk size?

It depends on the context size of the prediction model. Ideally, opt for smaller chunks even though you risk splitting
the data between multiple chunks hence the interest for hierarchical chunking. A recent approach is about adding more
context depending on where the chunk is located and what it is about like a book name or author.
