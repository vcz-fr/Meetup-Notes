---
categories: ["meetups/okiwi"]
title: "Flashlight from scratch"
---

By Alexandre Moureaux, Mobile Performance Expert @ BAM  

Why would anyone need to build their own performance testing tool? Some organizations are mature enough that their
performance needs become very specific. [Lighthouse](https://developer.chrome.com/docs/lighthouse/){:rel="nofollow"} is
a tool of this space made by Google that analyzes web page performance over many aspects and computes a performance
score for web and mobile. It is integrated within the Google Chrome dev tools and is a very capable and versatile
testing utility.

This approach works well for web, could anything similar exist for mobile?

## Measuring performance

We define a "performant app" as a piece of mobile software that runs smoothly. Smoothness is measured in terms of images
displayed per second, also named "frames per second" or _fps_. 60 fps is the standard, even though many devices beat
this mark today.

Frames per second are not enough to measure performance: React Native runs on a JavaScript engine bound to one thread
and orchestrating native components. Whenever the JS engine thread hangs, the whole app hangs and consumes more battery.
Therefore, latency and power consumption are two such metrics to watch for.

The operating system is also crucial: iPhones are much more performant than Android phones and developers usually
possess performant high-end devices. What about the rest of the user base? Many cannot afford them and opt for low-end
devices that they replace when they slow down to a crawl. 80% of CO2-eq emissions come from device manufacturing, not
usage. Therefore, designing performant apps slows the device renewal cycle.

Performance measurements cannot be deterministic. Worse even, performance measurement tooling can have a sizable impact
on measured performance. Also mind the way the application run as debug mode is known to slow down the device.

## Flashlight

How would you call a **lighthouse** that fits in a pocket? A flashlight!

Lighthouse can be used on any website. Can we achieve the same on any Android app with an equivalent solution? First,
you will need [Android Debug Bridge](https://developer.android.com/tools/adb){:rel="nofollow"} or _adb_ to communicate
with and Android phone over its debug interface. Android is based on Linux and has a shell on which we can execute
commands such as [`top`](https://www.man7.org/linux/man-pages/man1/top.1.html){:rel="nofollow"}.

How can one estimate the power consumption of the JavaScript thread of React Native apps? By using the `-H` option
(**H**ardware frame) of `top`. While this approach works, `top` is resource-heavy and even appears in the list if you
increase the sampling rate. Its format is difficult to parse and there is a limit to the sampling rate.

To get better results, we need to turn to its code in the Android Open Source Project to understand where `top` sources
its data. The code can be searched at [https://cs.android.com/](https://cs.android.com/){:rel="nofollow"}. It turns out
`top` reads its data from `/proc/${process_id}/task`. Every app has one or multiple processes with each a process_id and
to retrieve it you need the app identifier, which can be its package name, the bundle name, and so on.

There are commands to retrieve the identifier of the application currently running on the phone, however this command is
dependent on the Android version the phone is running. With this identifier, run `adb shell pidof ${app_id}` to retrieve
the process identifier of the main thread of the application. `adb shell ls /proc/${process_id}/task` returns a list of
task (thread) identifiers. `adb shell cat /proc/${process_id}/task/${task_id}/stat` returns raw information on the
thread including its name.

By retrieving the information of all the threads in the app, we can find the one named `mot_v_js` which represents the
JavaScript thread of the React Native app and focus on its statistics. The meaning of each column in the `/stat` file is
explained in [this documentation](https://man7.org/linux/man-pages/man5/proc_pid_stat.5.html){:rel="nofollow"}. The 14th
and 15th columns are `utime` and `stime` and they represent the user time and the system time as measured in clock
ticks. Added together, they represent the time the CPU spent on the app.

To measure fps, use [`atrace`](https://perfetto.dev/docs/data-sources/atrace){:rel="nofollow"} which traces android and
app events. Its output can be used to build flame graphs as it returns the list of instructions and functions that run
the creation of views in Android. One function stands out in particular: `Choreographer#doFrame`. This one triggers
regularly and the difference between two invocations leads to believe that it is responsible for the app framerate. As a
reminder, to achieve a stable 60 fps the app must be able to produce 60 frames every second evenly spread. The time
allocated for one frame, also called "frame budget" is 1000ms / 60fps ≈ 16.67ms per frame.

Introducing [Flashlight](https://flashlight.dev/){:rel="nofollow"}. Install this tool on your computer, plug your phone
and enable USB debugging to access it through `adb`. Run `flashlight measure` to start the service, auto-detect the app,
play with it and watch the stats. End-to-end tests can be run with `flashlight test`. Flashlight can run on a CI/CD in a
device farm and has a dashboard. For deterministic end-to-end test measurements, check out [Maestro](https://github.com/mobile-dev-inc/maestro){:rel="nofollow"}.

Soon, Flashlight will show more measurements, support iOS and AI features.

## Questions and Answers
### Who is sponsoring Flashlight?

Alexandre Moureaux and BAM. This project was developed to objectively measure the performance of an app. The CTO
believed in the idea and invested resources in it.

### Can Flashlight detect other threads than the JavaScript one?

Flashlight is agnostic technology-wise and lists other threads as well.

### How is the score computed?

The score is empirically computed from the fps count, cpu usage and thread statistics depending on the technology. The
formula may change over time.

### Can't the React Native profiler do that?

It cannot! That profiler profiles React and native components, does not work in production builds and is only for React
Native apps.

### Can profiles be extracted as proper flame graphs?

Use [Perfetto](https://perfetto.dev){:rel="nofollow"} with an atrace export.
