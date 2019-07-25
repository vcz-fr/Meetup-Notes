# AWS Feedbacks from AT Internet and Betclic
🕑 *Estimated reading time:* **7mn**

## Table of Contents
  * [AT Internet feedback](#at-internet-feedback)
    + [Offerings](#offerings)
    + [Denormalization](#denormalization)
  * [Analytics at BetClic](#analytics-at-betclic)
    + [Context](#context)
    + [Tracking plan](#tracking-plan)
    + [Analytics portal](#analytics-portal)

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

### Context

Sports betting websites have a very irregular activity throughout the day and the year. Players usually bet mort during events and outside the day. To precisely quantify the business, the needs in Analytics are very specific to the point no provider is sufficiently qualitative or famous today. Moreover, third party services are less reliable, produce their own interpretation of the results which may lose in meaning and may cost too much. All of these reasons and more let BetClic to develop their own solution, which implied the creation of connectors with classic tools: [Kinesis](https://aws.amazon.com/kinesis/), [Kinesis Data Firehose](https://aws.amazon.com/kinesis/data-firehose/), [Snowflake](https://www.snowflake.com/), [S3](https://aws.amazon.com/s3/) and [Tableau](https://www.tableau.com/).

### Tracking plan

Versioned, browsable, code-first. Testable, debuggable in real time.  
[Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) has been a tool of choice as it manages EC2s as a replacement for [Fargate](https://aws.amazon.com/fargate/), not available in the Paris region yet. Used in tandem with [Kinesis Producer Library](https://github.com/awslabs/amazon-kinesis-producer), both will aggregate load and split it in a nicer way. Kinesis is employed like a managed Kafka but with subpar scaling capabilities, though it can become very cheap depending on the submitted workload. Firehose is in charge of event retrieval and batch upload to S3. Snowflake then detects the S3 objects and loads their contents.

This ecosystem is managed, highly available but is subject to slight event loss in the magnitude of 1000 events per shards, hence the usage of Kinesis Producer Library. This ecosystem also uses Kotlin, GitHub, [TeamCity](https://www.jetbrains.com/teamcity/) (CI) with [Localstack](https://localstack.cloud/) (AWS emulation) and [Octopus Deploy](https://octopus.com/) with [CloudFormation](https://aws.amazon.com/cloudformation/) for deployments.

Snowflake autoscales, is storage-cheap, on demand and decouples compute and storage. Its storage being cold is what makes the solution inexpensive. It ingests structured and semi-structured JSON and can recursively flatten the format if necessary. As for an estimate of pricing, for 4 billion events stored in 7 months of usage with 20 to 40 million more events per day, the solution costs 4€ plus compute costs per day!

### Analytics portal

The data visualization portal has been developed with Angular on top of Tableau. It adds authentication, widget navigation and filtering. Every night, SQL jobs crawl the database and prepare a reference table used by Tableau. It enables A/B Testing, is scalable, inexpensive and exposes few data gaps. Unfortunately, such a solution requires data scientists to understand the data, data visualization is difficult and the solution requires fine tuning.

The portal has not been tested End to end yet as this kind of testing is hard to manage today.