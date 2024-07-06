---
categories: ["meetups/gdg-bdx"]
title: "Building a realtime Progressive Web Application with Firebase"
---

By [Mathilde Lemée](https://twitter.com/mathildelemee){:rel="nofollow"}, Co-founder & CTO @ Jolimoi  
By [Loïc Vaillé](https://twitter.com/hydrog3n){:rel="nofollow"}, Full stack developer @ Jolimoi

## On Progressive Web Applications

A Progressive Web Application, often abbreviated PWA, is a website that can be installed on a mobile device. The
underlying technology is independent from the mobile application stores, uses web technologies and can be relatively
light on space and resources. PWAs are real web applications, it is not a hybrid concept. While the concept has been
around for a while, Google coined the term and advocated for its support on mobile platforms.

Any site can become a PWA with a [Service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API){:rel="nofollow"}
and a [Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest){:rel="nofollow"}. This technology brings
multiple advantages: offline modes, similarity to mobile applications, ease of development, push notifications, etc.

## Firebase

[Firebase](https://firebase.google.com/){:rel="nofollow"} is a realtime database service that looks similar to a giant
JSON file. It has been acquired by Google and specialized for many purposes: application crash reports, Machine
Learning, Website hosting, etc. Firebase comes bundled with a Command Line Interface that gets teams started faster with
`firebase init` and to deploy faster with `firebase deploy`.

Firebase Firestore relies on two concepts: Collections and Documents. A collection may contain a large number of
Documents. Documents may reference one or more Collections. Documents must be as small as possible to avoid performance
degradation.

To create a Document, you can follow either of these steps:
- Create a Collection, create an empty Document, update the contents of the Document;
- Create a Collection, create a Document with data;
- Create a Collection, create an empty Document, create a Collection, etc.

With the API, it is possible to watch for changes using [`onSnapshot`](https://firebase.google.com/docs/firestore/query-data/listen){:rel="nofollow"}.
This could be used to add Publish / Subscribe features by specifically requesting recently modified Documents in a
Collection. Moreover, Firebase supports [ACID transactions](https://en.wikipedia.org/wiki/ACID){:rel="nofollow"},
SQL-like requests and Indexes. It is not recommended to use WHERE in realtime applications as the syntax is not powerful
and may cause inefficiencies.

## Offline mode and accounts

Side note: there is a [plugin for VueJS](https://github.com/filrak/vue-offline){:rel="nofollow"} that adds offline
capabilities to applications. Similarly, adding major OpenID providers is as simple thanks to related modules that link
them to Firestore PWAs. Such integrations will link accounts to user IDs which can be then used to limit access to a
Document or a Collection, for instance.

To reduce the network usage for a mobile device, it is possible to setup a cache and define cache strategies with
Firebase Firestore. The different cache strategies are:
- Use the cache, default on Firestore if nothing is found;
- Prioritize the cache but check for new versions in Firestore;
- Never use the cache.

If a user is offline, their messages are queued up before being sent in bulk after the client reconnected to the
network.

## Limits

PWAs being supported by Google, they do not expose much limits on Android. That said, the story is different on iOS; the
access to the Notifications API is reduced, changing the icon is impossible unless the application is reinstalled,
application state persistence is not perfect. Until very recently, users that switched to an open PWA had to come back
to the splash screen every time even though this fix caused other subsequent issues. Finally, there is no hardware
access with Google Chrome. This is not true with Safari, though, since its runtime is different.

Firestore is not adapted for search. Also, when a Document is deleted, its sub-Collections are not deleted and become
unreachable, which can become very costly over time.

Connections to Firestore usually rely on HTTP but can use WebSockets. Cross-Origin Resource Sharing requests are managed
by Google when applicable.
