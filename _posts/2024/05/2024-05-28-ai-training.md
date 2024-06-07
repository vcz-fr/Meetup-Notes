---
categories: ["meetups/ovh-bdx"]
title: "On AI Training"
---

{% include time.md %}
{% include toc.md %}

## High Performance Computing for LLM training
By Hugo Larcher, Machine Learning Infrastructure Engineer @ HuggingFace

### HuggingFace and Models

[HuggingFace](https://huggingface.co/){:rel="nofollow"} is more or less the GitHub of Machine Learning where code,
weights and datasets get uploaded. The idea is to train models to reproduce them as accurately as possible from their
research papers and available data to make them publicly available and progress the state of the art. This also requires
curating quality datasets and benchmarking performance to optimize training. Examples of the latest HuggingFace
creations include [StarCoder](https://huggingface.co/blog/starcoder){:rel="nofollow"}, [Zephyr](https://huggingface.co/HuggingFaceH4/zephyr-7b-beta){:rel="nofollow"}
and [FineWeb](https://huggingface.co/datasets/HuggingFaceFW/fineweb){:rel="nofollow"}.

But then what's a model exactly? Today most of them are trained based on the same Transformer architecture. These are
predictors based on a dataset that is diverse, large enough and qualitative. Training studies the dataset to extract
statistically significant correlations then used for predictions. This number of correlation is the model size (7B, 13B,
70B and so on). Optimizing the statistical convergence of a model reduces to optimizing gradient descent. Usually, model
developers choose when to stop the training. This is like curing wine to hit perfect taste while avoiding overfitting:
training too much can lead to the model predicting its source data.

Here is an example of generational scaling with the GPT model:

|Model|Dataset size|Est. parameters|
|GPT 1|1 to 2 billion tokens*|0.11B|
|GPT 2|10 to 20 billion tokens*|1.4B|
|GPT 3|1 to 2 billion tokens*|175B|
|GPT 4|1 to 2 billion tokens*|1.8T|

*One token is about one word

Training and predicting from a model with more parameters require more RAM. Let's assume you want to run inference on a
1B model which uses 32 bits per parameter. 32 bits is 4 bytes, which means this model requires 4GB RAM to run. But this
is just for fitting the model in RAM! Prediction requires storing initial states and neuron activations, which usually
requires 20x the RAM or 80GB per billion parameters!!

Training and inference require an astronomical quantity of interconnected GPUs usually sourced from NVidia that must be
addressed and coordinated in software. In High Performance Computing, the speed of a system is bottlenecked by its
slowest components: compute, network and storage. Outages and contention must be avoided at all costs.

### Distributing computation

To improve a cluster, there are myriad avenues:

- Fitting more GPUs in a server. There is a limit: you need power and cooling. We usually stop at 8 per rack;
- Interconnecting GPUs with Server PCI-Express Modules or SXM. These support up to 900GB/s and deliver up to 700W of
  power per GPU;
- Connecting more racks together: HuggingFace has 768 NVidia H100 GPUs;
- Scaling vertically: bi-socket fast CPUs with loads of fast RAM for operations that cannot be handled by GPUs;
- Scaling horizontally: Ethernet is slow. Even 100GB/s is slow when your GPUs can connect at 900GB/s to each other.
  Supercalculators tend to use Infiniband because it's way faster and adds delivery guarantees. On AWS, [Elastic Fabric Adapter](https://aws.amazon.com/hpc/efa/){:rel="nofollow"}
  is the fastest you'll get, with speeds ranging to up to 3200GB/s per node! EFA implements a Scalable Reliable Datagram
  protocol which augments the capabilities of the Ethernet transport;
- Physically close nodes can reduce the amount of hops needed to talk to each other;
- Remote Direct Memory Access or RDMA allows GPUs to talk to each other bypassing their CPU;
- EFA's latency is similar to Ethernet by design. Infiniband is much an order of magnitude better;
- AWS uses multipath internally to accelerate throughput;
- NVLink can do 900GB/s between GPUs, EFA can do 3200GB/s across nodes. 8 GPU per node = 8 * 900GB/s = 7200GB/s <
  3200GB/s. The current bottleneck is EFA.

Storage is a beast too: how to deliver high-performance distributed storage? The solution uses Lustre and S3: the former
for hot data and the latter for checkpoints and cold data. Checkpoints regularly save the training state for debug and
recovery, although recovery is near impossible when jobs are scheduled one after the next. Moreover, object storage is
cost-effective because it stores raw data irrespective of file type. To optimize file retrieval, objects could be split
into fragments called "stripes" stored separately. Information about the file would be stored in Lustre, which would
also handle retrieval.

### Monitoring and performance

In these super-infrastructures, everything must be measured all the time. The link between GPUs, between CPUs and GPUs,
NUMA affinities, etc. Benchmarks are node using inefficient operations such as computing the sum of contents sharing the
same index on all GPUs. This is called a "collective". Performance is measured in TFLOPs or in token/s. Additionally,
observing the infrastructure must not significantly slow down tasks running on it. Fortunately, NVidia GPUs come with an
administration network and hardware counters which data is extracted and sent to Prometheus.

These infrastructures fail very frequently and in often arcane ways. GPUs are known to be very unstable. As such
Monitoring must span every layer of the infrastructure to facilitate debug:

- Global health checks and status for nodes and jobs;
- Slurm issues and downtime, node allocation events, error correction events;
- Raw metrics exported from Slurm, EFA and Lustre imported to Prometheus using a [custom exporter](https://prometheus.io/docs/instrumenting/writing_exporters/);
- Alerts and resource allocation recommendations for jobs to maximize utilization;
- Power efficiency, "collectives".

Because of the unstable nature of the infrastructure, self-healing must be implemented to catch most of the issues and
leave the most complex ones to operators. Frequent issues include driver crashes, NVLink errors, throttling, hardware
issues, memory remaps. Memory remaps happen because GPU have more vRAM than they advertise and swaps failing sections
with healthy ones regularly.

This architecture has been designed to fail fast and loudly. As such, every time a job starts, a self-check runs for
GPUs, storage, networking. If one check fails, the new node gets ejected. If the issue happens during training, the
infrastructure will attempt to self-heal. When it cannot, it notifies the user depending on the criticality of the issue
and may unload the job.

Predictive maintenance is near impossible as AWS is managing the infrastructure but cannot peek at what it is doing.
When issues concern hardware, AWS is automatically pinged using its support APIs. If one node fails catastrophically,
the job must stop as recalculating to redistribute the job amongst the N-1 nodes is impossible today. Jobs would reach
their next synchronization step and hard fail.

### Orchestration

HuggingFace uses [Slurm](https://slurm.schedmd.com/){:rel="nofollow"} to schedule and orchestrate jobs.

```
[Logging node]            ➡ [ [Cluster] ]
      ⬆                   ➡ (Job queue w/ priorities)
Users + Job definition
```

Job definitions can be submitted by users on Slurm Logging nodes. Access to the rest of the infrastructure is denied
except to authorized personnel. Job definitions contain information about the job and reserved resources such as GPUs,
memory, CPUs, etc.

Slurm understands topology, NUMA and Network placement, cgroups isolation for CPUs, RAM and GPUs, Quality of Service,
rootless containers using [NVidia Pyxis](https://github.com/NVIDIA/pyxis){:rel="nofollow"} and [NVidia Enroot](https://github.com/nvidia/enroot){:rel="nofollow"}
and job arrays.

Supporting Slurm does not require any code change, however the code must be aware that in runs in a distributed
environment. [`torch.distributed`](https://pytorch.org/docs/stable/distributed.html){:rel="nofollow"} can help with
coordination and distributing work, no need for anything else. Same goes with the data since it is prepared separately
for consumption and integrates seamlessly.

This infrastructure supports AWS's custom AI chips [Trainium](https://aws.amazon.com/machine-learning/trainium/){:rel="nofollow"}
and [Inferentia](https://aws.amazon.com/machine-learning/inferentia/){:rel="nofollow"}, unfortunately Inferentia is
difficult to use because of its SDK which requires the code to be written in a different way. This added friction makes
Inferentia not worth it, unless [HuggingFace Optimum](https://huggingface.co/docs/optimum/index){:rel="nofollow"} is
used.

New offerings are popping up on the market such as [Groq](https://groq.com/){:rel="nofollow"} which optimized AI
inference by dropping the unused silicon in GPUs and focusing on inference primitives.

Training and inference run on Transformers, which essentially compute large matrices on GPUs. Retrieving and cleaning
data are tasks suited for CPUs. CPU-only nodes are also orchestrated by Slurm, which knows how to manage autoscaling for [Spot](https://aws.amazon.com/ec2/spot/){:rel="nofollow"}
instances. It's frequent that these jobs burst from 0 to 12k VMs in about an hour. All instances are provisioned within
the same Availability Zone and placement groups and multiple VM families are used to guarantee capacity.

### Managing the cluster

In the end, lots of time gets spent on the control plane. Compute is ephemeral. This relates back to the Pets vs Cattle
concept, where operations take care of pets but accept that Cattle only exist for a time and are okay recreating them.
The infrastructure has been fully automated using [Terraform](https://www.terraform.io/){:rel="nofollow"} and [Ansible](https://www.ansible.com/){:rel="nofollow"}.
This is a requirement as only two people are behind this behemoth of an infrastructure.

Here, Slurm is not used for massive calculation but rather to orchestrate small microscopic jobs. Lots of them, lasting
for a long time. This leads to contributing fixes to the Slurm code base for edge cases and bugs. Working in this
advanced infrastructure requires custom tooling to debug performance and deadlock issues, which do not scale well with
cluster size.

Developer experience is crucial in HPC. Scientists love doing science and as such operations must provide everything
that they can to reduce the knowledge barrier to entry: documentations, tips, examples, active help.

This is not over, are today research is focused on using infrastructure more efficiently and improving measurements and
reporting. [MLCO2](https://mlco2.github.io/impact/){:rel="nofollow"} is a project that computes carbon emissions from
training. We find that smaller and focused models can be trained more efficiently on all metrics. The same goes with
ethics: the FineWeb dataset is derived from [CommonCrawl](https://commoncrawl.org/){:rel="nofollow"}. Free and open
source code is used for training and data is removed from datasets when requested.

If you wish to try some models trained and hosted by HuggingFace without the need for a user account, head over to [HuggingChat](https://huggingface.co/chat/){:rel="nofollow"}.

## Your LLM stack LGTM!
By Wilfried Roset, Engineering Manager @ OVHCloud

Technology is a universe of ideas, practices and tools of its own. It is so vast that it is self-sustaining and
professions branched out and specialized, offering the capability to really pick the best tool for the right job. Take
Infrastructure as Code: we can quickly and reliably create infrastructure and destroy it in a matter of minutes with
minimal human intervention.

Reaching full automation from scratch requires a few steps:

- Manual provisioning;
- Repeatable provisioning;
- Simplified provisioning;
- Observability;
- Ability to destroy and rebuild from scratch.

Moreover, a higher targeted level of abstraction implies more layers of shared infrastructure and steps towards
provisioning the solution. For instance, to deliver an infrastructure capable of displaying a web chat interface for
Large Language Models, we would need to deploy the following layers:

- Kubernetes and its nodes, with their underlying infrastructure;
- HuggingFace's solutions such as [UI Chat](https://huggingface.co/docs/chat-ui/index){:rel="nofollow"};
- An observability stack such as the one provided by Grafana Labs: [Loki](https://grafana.com/products/cloud/logs/){:rel="nofollow"},
  [Grafana](https://grafana.com/grafana/){:rel="nofollow"}, [Tempo](https://grafana.com/products/cloud/traces/){:rel="nofollow"},
  [Mimir](https://grafana.com/products/cloud/metrics/){:rel="nofollow"}, [Pyroscope](https://pyroscope.io/){:rel="nofollow"};
- A load testing tool such as [k6](https://k6.io/){:rel="nofollow"}.

While everything can be deployed with Terraform and Ansible, we do not advise doing so: duplicating infrastructure state
in multiple places may cause complex issues. Apps deployed in Kubernetes, including observability tooling, should be
deployed with [ArgoCD](https://argo-cd.readthedocs.io/en/stable/){:rel="nofollow"} or [FluxCD](https://fluxcd.io/){:rel="nofollow"}.
Their state will depend on configuration hosted in a place accessible to target infrastructure and synchronized with it.
Plus, most Cloud providers and services have started supporting GitOps solutions natively.
