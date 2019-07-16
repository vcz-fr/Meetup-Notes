# AWS Feedbacks from AT Internet and Betclic
🕑 *Estimated reading time:* **?mn**

## Table of Contents


## AT Internet feedback
By Samuel Renassia, Solution Architect @ Gekko  
By [David Boyrie](https://twitter.com/dboyrie), Responsable R&D @ AT Internet
By Fedor Myznikov, Lead Developer @ AT Internet

### Offerings

AWS proposes many offerings for data science: [EMR](https://aws.amazon.com/emr/), [Glue](https://aws.amazon.com/glue/), [Athena](https://aws.amazon.com/athena/), [Redshift](https://aws.amazon.com/redshift/), [DynamoDB](https://aws.amazon.com/dynamodb/) or [S3](https://aws.amazon.com/s3/). When you create an EMR cluster, AWS will guide you through the choice of its size in terms of number of instances and capacity and its application layer (Hadoop, Spark, etc.). AWS will also allow you to create and start jobs automatically from data retrieved from S3.

You can start your clusters on demand to avoid reserving and paying instances if you have no plan on using them all the time. Dependenging on your workloads, different types of reservation may fit and they can even be combined:
- For sustained workloads, toy can reserve capacity for up to three years, with optional upgrades with the convertible option;
- For shorter workloads in supplement on the reserved capacity, on demand can do the trick. They can be added and removed at will but are the most expensive option;
- For very short workloads lasting less than two hours, Spot instances are the best. The capacity is not guaranteed but their price is very low, since it reserved capacity resold at market rates.

AT Internet owns their own analytics platform. Used by a large number of clients, this solution retrieves metrics from end users, whatever device they are using (cross-platform handover). It currently handles not less than six billion daily events, enriches them with nearly two hundred functions that open data points about the device or user category. The collection, handling and storage of that data is all done by AT Internet and represents a total of six Petabytes, which is equivalent to a million Gigabytes! End users have the choice to expose data.

Another objective for this data processing chain is data visualization and interactive media. An analytics platform would not be complete without these tools. That is why this solution allows teams to analyze journeys, recoveries, tunnels, anomalies and predict the trends with the AI.

The development of this product started two years ago with new objectives, from scratch and with AWS in mind. AWS here brings flexibility, scalability and implementation speed to deliver features faster.

### Denormalization

Each day, the platform receives 6 billion events with more than 200 dimensions, which represent four terabytes of data. For data visualization purposes, this data is analyzed by one of twenty thousand Apache Spark daily jobs. Such workloads being very dense, they require large enough computing capacity, such as memory-optimized r4 and r5, in the 4xlarge capacity. The price of Spot instances being very volatile, jobs were often cut off before the end and not easily recoverable. AWS proposes a solution for that: instance fleets. You can set your preferences in terms of instance capacity, type and region and choose to opt into the fallback to on demand if your order cannot be completed successfully.

Data can be very heterogeneous and require specific processing methods. Unfortunately, EMR can only handle one job at a time, which makes it non scalable. Moreover, auto-scaling is disabled and auto-scaling manually is very impractical and slow. A solution for this would be to parallelize jobs and orchestrate them thanks to a job manager connected to the EMR API. When the system receives a new job, the manager evaluates its size, the availability of a cluster that could host the job and uses business rules and statistics to absorb load efficiently. To parallelize jobs, you can use the [Akka framework](https://akka.io/) with a pool, sourced by [SQS](https://aws.amazon.com/sqs/) to distribute them. Beware: having too many jobs running at the same time may slow down jobs.

In this product, Kubernetes and Kafka ae hosted on EC2. [EKS](https://aws.amazon.com/eks/) has been planned to replace EC2 Kubernetes clusters in the future.

## Analytics at BetClic

By [Camille Reverdy](https://twitter.com/camillereverdy), Tech Lead & Product Manager @ BetClic