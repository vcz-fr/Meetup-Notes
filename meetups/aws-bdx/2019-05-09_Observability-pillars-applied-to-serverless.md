# Observability pillars applied to serverless
🕑 *Estimated reading time:* **?mn**

By [Steve Houël](https://twitter.com/SteveHouel), Cloud architect & Global Tech Leader @ Ippon Technologies - [Personal website 1](http://www.steve-houel.fr/),  [Personal website 2](https://www.steve-houel.com/)  
By [Pierre Baillet](https://twitter.com/octplane) SRE, R&D engineer @ Datadog - [Personal website](https://oct.zoy.org/)  
[Slides](https://www.slideshare.net/SteveHouel/observability-pillars-applied-to-serverless)

## Table of Contents

## A history of Observability

In 1945, World War 2 was still ongoing and planes were still crashing. The Army commanded scientists and statisticians to help them determine how they should reinforce their planes to reduce the number of casualties. Scientists asked for a map of the bullet impacts on planed that could come back to the base.

Initially, the Army reinforced the parts that were most hit by the bullets, which did not improve survivability much. Abraham Wald, statistician, suggested the Army do the opposite, that is reinforcing the plane parts that received no impact as that would mean that the planed that received those impacts were not returning.

This technique was not only very effective but also economical as it only required the most sensitive parts to be reinforced.

Skip forward to 2005 with the LAMP stack. LAMP stands for Linux - Apache - MySQL - PHP. This stack was very, very popular and not very effective to the points many users complained not being able to serve assets with it! Serving assets could require drastic and unrelated solutions such as increasing the supporting instancce capacity or the resources allocated to the database!

Rather than looking for the issue, we should monitor the metrics and alert if they go over some defined thresholds.

The year is 2016 and micro-services are gaining interest. To the point the complexity of the infrastructure has become increasingly exponential. Monitoring becomes difficult as metrics are all over the place. Rather than watching hundreds of graphs for irregularities, we start to **observe**. From the output of a system we deduce its internal state.

There are four categories of states a system can be in:
* OK: HTTP 2xx, nothing wrong;
* Known error: HTTP 5xx, to investigate
* Unknown knowns: A kind of errors that happen seemingly randomly
* Unknown unknowns: The worst kind. Errors that happen but have not been detected at all.

Monitoring watches for known errors but cannot do anything against unknown unknowns! Like Abraham Wald, rather than alerting when errors happen, we can alert when successes are oddly missing.

## Pillars and challenges

[...]

## Datadog

[...]

## Questions and Answers session

### How to effectively version enpoints in serverless?

[...]

### How to implement new connectors with Datadog?

[...]

### How is Datadog monitoring its services?

[...]

### How to anonymize the logs sent by lambdas?

[...]

### How to trace lambdas calls?

[...]