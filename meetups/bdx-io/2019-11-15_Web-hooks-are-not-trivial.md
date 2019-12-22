# Webhooks: Not as trivial as it may seem
🕑 *Estimated reading time:* **5mn**

By [Guillaume Laforge](https://twitter.com/glaforge), Developer advocate @ Google  
[Video \[FR\]](https://www.youtube.com/watch?v=DRf7-dmhNHA) - [Slides](https://speakerdeck.com/glaforge/implementing-webhooks-not-as-trivial-as-it-may-seem) - [Blog post](https://glaforge.appspot.com/article/implementing-webhooks-not-as-trivial-as-it-may-seem)

## Table of Contents  
  * [Webhooks](#webhooks)
  * [Implementation](#implementation)
  * [Security considerations](#security-considerations)
  * [Questions and Answers](#questions-and-answers)
    + [Is there a managed webhook service in the market?](#is-there-a-managed-webhook-service-in-the-market)
    + [What solutions can be used for authentication?](#what-solutions-can-be-used-for-authentication)

## Webhooks

A webhook is a service that allows third parties to send notifications via an HTTP entry point. Many well-known domains and applications use webhooks: payment providers such as Stripe and Braintree, email services like SendGrid and Mailchimp, CI/CD with TravisCI or CircleCI or chatbots including Dialogflow and Intercom.

There are advantages to using webhooks, most notably the fact that this mechanism is near real time when not real time. You do not need to query for events as your callers will notify you as soon as something is of interest. You are free to restrict webhooks calls or to call only the webhooks that matter for you: this system is efficient for automatically connecting applications.

Nonetheless, scalability can become a real issue from the caller and the callee sides. The callee might have too many requests to send for their own good and webhook might become an inefficient way to communicate whereas callees do not have much control over the applications that send requests to their endpoints. For instance, GitHub exposes many events so following active repositories through webhooks may cause slowness in your systems. If you have to debug or implement webhooks based systems, you can use [RequestBin](https://requestbin.net/) by [Pipedream](https://pipedream.com/) to create temporary endpoints that will receive your event contents.

## Implementation

Implementing a webhook server is fairly simple:
- Implement the application behind the webhook;
- Expose endpoints which will receive HTTP POST requests;
- Generate and distribute unique URLs for your clients;
- Listen on the generated endpoints.

This implementation does not exclude error scenarios: what happens in such instances? To avoid overloading the server, clients can retry after an interval that gets longer each time. One second, then two, then four, then eight, etc until a defined limit. This technique is called **Exponential Backoff**. If client load becomes an issue due to an increasing number of events and responses, you can collect events and send them in batches. You will gain in performance and response time what you will lose in real-time capability. If missed calls is a possibility, you could implement a Dead Letter Queue, which is a queue containing messages which have not been handled yet. These messages may have been processed but never acknowledged. Comes idempotence: if the same message is processed twice, the resulting action should be the same.

## Security considerations

Unsurprisingly, use HTTPS. This will secure transport, even if establishing encrypted connections has a cost, which should be offloaded from your server anyway. If you use a strict stateless firewall, whitelist the IPs that will respond to your webhook requests or the ones that will send you requests depending on your side. However, whitelisting IPs may not be possible if your server is opened to the Internet. Sign your requests with a secret shared by the user under the form of a public key. Integrity verification is important. In the same domain, authentication and authorization techniques can be applied as well to secure your webhooks.

Since servers must respond as fast as possible, it may be wise to do background processing, asynchronously. For instance, for image transformation or document processing and filing, you may receive a download link from your clients, send them an answer that acknowledges their request then download the file and process it. In that sense, decoupling message reception and processing is also a good idea. That way, if you receive too many requests, you could scale to increase your processing power temporarily. If you receive few to no messages, a serverless approach might even be considered! Finally, for clients to avoid failing webhooks, track webhook server failures, avoid sending messages and contact their operators when possible.

## Questions and Answers

### Is there a managed webhook service in the market?

There is none at the moment, which does not mean it cannot be created from smaller managed services.

### What solutions can be used for authentication?

There are a lot of solutions out there. Do some research to find your match: JSON WebTokens (JWT), SaaS solutions such as Okta, API Keys, etc.