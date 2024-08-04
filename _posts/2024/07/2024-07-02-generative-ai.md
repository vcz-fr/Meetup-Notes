---
categories: ["meetups/bdx-js"]
title: "Generative AI in action"
---

By Laurent Mangin, Test Automation Engineer @ Younup  

ChatGPT 3.5's release has been the point of non-return that led many innovators to apply generative AI to many
businesses. Discussions rapidly triggered proof of concepts which expanded beyond chat interfaces and integrated
customer data. How can these experiences be made more secure, trustworthy and relevant?

## Basics

A Large Language Model or "LLM" is a black box that takes a _prompt_ as its input and outputs a _completion_. The
_model_ is the black box and has been trained with a set of documents better described as a _dataset_. Prompts are
subdivided into _tokens_ where a token represents about one word. The model uses the tokens of the prompt to generate a
relevant completion.

Today, LLMs can be invoked in a programmatic way thanks to frameworks such as [LangChain](https://www.langchain.com/langchain){:rel="nofollow"}.
Initially targeted for Python developers, LangChain has been ported to other ecosystems including JavaScript. Its
generic interface to LLMs supports module chaining and more than 100 integrations. The ecosystem is relatively new and
unstable, but it grows fast like its community of more than 2000 contributors. The same goes for its documentation and
its vision and opinion on how software should interact with LLMs.

The major strength of LangChain is that development teams get to keep the same code while being able to change the model
running under the hood, plus being able to natively connect to vector databases and more. For complex cases, [LangChain Expression Language](https://python.langchain.com/v0.2/docs/concepts/#langchain-expression-language-lcel){:rel="nofollow"},
abbreviated as "_LCEL_", offers primitives that handle operation chaining.

LLMs are stateless by nature. When implementing conversations, the history must be passed to the model so that it can
reference parts from previous prompts or completions. Furthermore, models update over time and can return unexpected
outputs. The only reliable solution is to avoid online models and self-host a one such as those from [Mistral](https://mistral.ai/){:rel="nofollow"}.
For instance, GPT-4 required adding workarounds to prompts when it categorically refused following instructions. OpenAI
since added support for [Function calling](https://platform.openai.com/docs/guides/function-calling){:rel="nofollow"}
that enforce certain capabilities like generating completions in JSON format.

> Emerging companies such as [Dust](https://dust.tt/){:rel="nofollow"} provide services that could better be described
> as "additional teammates".

The major limitation of a chatbot is its medium: the chat window limited in input and output size. Consumption-based
Cloud AI services are charged per input and output token, and it's impossible to train a model real-time to react on new
data. The date of the latest element in the dataset is called "_knowledge cut-off date_" and the model cannot know
anything that happened beyond it.

Some issues can be somewhat alleviated with _fine-tuning_: a retraining of the model with specialized data. Fine-tuning
is expensive and requires infrastructure and Machine Learning skills. _Prompt engineering_ could also improve the output
by adding more knowledge and structuring the prompt to generate better completions. There is a third way that took the
previous two by storm, _RAG_.

## RAG

_RAG_ stands for "_Retrieval Augmented Generation_". A document database is indexed for later use by an LLM in the aim
of information retrieval. Contents from the database are divided into smaller workable units that can later be
"_embedded_". Embedding refers to the creation of a vector that represents the semantic information contained within the
unit. Vectors are then stored in a specialized database, a _vector database_. When the user prompts the LLM, the system
retrieves the most relevant units from the vector database and passes them to the LLM as context to improve the
relevance of the generated completion.

Vectors are created using a special model called "_embedding model_" that generates n-dimension vectors. Two
semantically close terms will receive semantically close vectors. Computing the similarity between two terms can be done
using a specialized distance function, however this is not enough to explain what an embedding model really does as its
discovery is serendipitous. As such, RAG is technically akin to dynamic prompt engineering: memory, context, history.

> The size of the "workable units" depends on the objectives of the generative AI being designed: small units lead to
> better generation performance, larger units to more data and context being extracted from each unit.

Complex systems can behave poorly with scale: somewhere, a system must logically isolate all requests to avoid one
retrieval to poison the concurrent others. Queuing retrieval and generation for multiple users can be a solution today.
Scale and sharding are both achievable with solutions such as [Qdrant](https://qdrant.tech/){:rel="nofollow"}. With such
solutions, the system is not limited by the amount of documents because the document base is adjusted to the current
user and each user works on their own copy of the base.

Shared models on Azure can have noisy neighbors issues. Latencies of the order of two to three seconds are acceptable
unless users used to get immediate responses.

## Agents, tooling

LLMs can invoke _agents_, which are small programs which can use tools to gather information or do actions outside the
realm of the LLM. These actions can be executing code, Web search, document retrieval, dynamic prompts and so on.

A recent development concerns knowledge graphs: an entity network that connects data points with relationships. Entities
and relation have properties attached. Knowledge graphs can be implemented in RAGs for better performance. [GPT Researcher](https://gptr.dev/){:rel="nofollow"}
is a good implementation of the concept and dynamically orchestrates a set of LLMs each coming with its own
capabilities.

## Conclusion

LLMs are on the path of becoming integral features of our applications, adding context and intelligence where it's
needed. Tomorrow's generative AI challenges will not be technical but ethical, social and environmental.
