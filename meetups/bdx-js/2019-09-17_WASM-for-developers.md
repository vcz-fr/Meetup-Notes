# WebAssembly for developers (web&hellip; or not)
🕑 *Estimated reading time:* **8mn**

By [Horacio Gonzalez](https://twitter.com/lostinbrittany), Dev Rel @ OVH

## Table of Contents
  * [Introduction](#introduction)
  * [History](#history)
  * [Process](#process)
  * [Cool stuff](#cool-stuff)
  * [The future](#the-future)
  * [Questions and Answers session](#questions-and-answers-session)

## Introduction

WASM is a binary portable format serving as a compilation target for many other languages. The result of the compilation can be used inside the VMs of modern web browsers and Node.JS. It is fair to say that WASM is a spiritual successor to Java applets, Flash and Silverlight but open source, standard and natively supported by web browsers! In terms of performance, WASM is fast, memory-safe, efficient, sandboxed, debuggable and is part of the Web toolkit. Again, WASM does not replace the web stack, rather it **completes** it.

Many companies and aplications use WASM today, including Figma, Autocad, Qt, Unreal Engine, Unity, Google Earth, etc. The common denominator between all of these is that they have strong requirements in terms of performance and memory usage.

## History

The first versions of JavaScript have been released around 1995. JavaScript was never meant to be a fully-fledged language and needed to be completed by Java applets that were inefficient and did not execute in your browser but rather in an add-on system. Then came Flash, with similar drawbacks and more vulnerabilities than we can count.

In 2012, for some reason [Alon Zakai](https://twitter.com/kripken) decided to create a tool to compile C to JavaScript using Clang and LLVM and called it [Emscripten](https://emscripten.org/). [LLVM](https://llvm.org/) is a compiler framework and toolkit that helps with cross-language code compilation. Thanks to LLVM, Emscripten unknowingly opened JavaScript to many, many other languages than just C and C++!

Unfortunately for Emscripten, the initial performance of the solution was poor. This was caused by the very nature of JavaScript: because the language is dynamic, some instructions cannot be optimized until the very last moment. Moreover, there are many hacks in the JavaScript engines that make each browser implementation unique. To counter that, in 2013, Emscripten decided to concentrate on a subset of JavaScript that was compatible with Ahead of Time compilation. This subset is known as [asm.js](http://asmjs.org/). This alone made Emscripten relevant!

If you wish to try out WASM, you can do so in [WebAssembly Explorer](https://mbebenita.github.io/WasmExplorer/) or its refreshed version [WebAssembly Studio](https://webassembly.studio/). You can also use the local toolkit `emcc` to compile your WASM code on your machine or on your CI. The name reflects `gcc` applied to Emscripten. You might want to start a web server to serve your files on localhost as well; some browsers content security policies might prevent you from retrieving content from the file system directly. This will avoid the issue.

Quick tip: to test some WASM code, compile it to an HTML target. This compilation will generate three files: your compiled WASM code, a JavaScript bootstrapper and an HTML test page. Today, WASM needs a buffer to exchange information with JavaScript and with Web APIs. Eventually, WASM will be able to access Web APIs directly, such as the DOM, for instance.

## Process

Writing WebAssembly code follows this process:
1. Write code in a supported language: C, C++, Rust, Go, AssemblyScript, etc. You can use libraries to add features since they will be compiled with your code!
2. Compile. During development, you may want to make a stop by the Intermediate Representation level of the compilation, called WAT for "WebAssembly Text format".

WebAssembly typically relies on a stack memory and its functions always return what is at the top of the stack at the end of their execution. There is only one specification but the implementation is up to the browser vendor, which might very well decide not to use a stack as the driver data structure. If you are on a Windows installation, it is recommended you use the Linux subsystem for Windows to develop with the toolkit.

The technology is fit for workloads requiring computations that cannot be efficiently done in plain JavaScript. At the same time, this implies that something as simple as a Hello world cannot be as easily achieved in WASM, as it will require to compile and ship the standard libraries of the origin language, which is all but efficient.

Manually wrapping WebAssembly scripts with JavaScript requires some asynchronous operations: fetching it, retrieving an ArrayBuffer from the response, instantiating a WebAssembly interface from the ArrayBuffer and retrieving and exposing the exported WebAssembly functions to the rest of your JavaScript. For instance, you could do Canvas manipulation by creating a canvas tag in your HTML, defining a memory space equivalent to the number of pixels to render, create a WASM function that will use this space to generate images and feed the result back to the cavas. The whole process is heavy, though it will be simplified soon by lightening the required wrapper boilerplate and opening access to browser APIs.

## Cool stuff

WASM has its own package manager, [WAPM](https://wapm.io/), where you will find all sorts of packages that will complement your applications and allow you to iterate much faster on your development. With [Wasmer](https://wapm.io/), the technology gets out of the browser and can reach your OS! Using both of these ideas, you can create applications that will rely on standard packages that you can even compile yourself to create rich and performant applications. [Squoosh](https://squoosh.app/), the image compressor, is a perfect example of that, since it embarks several image compression algorithms in a single **web** application and is very performant.

WASM eliminates JavaScript's bottlenecks. It is way easier to optimize as each JavaScript engine has its own way to understand and optimize the scripts. With WASM, variance is an order of magnitude less pronounced. And if you are interested in WebAssembly but only know TypeScript, this is no problem: thanks to [AssemblyScript](https://docs.assemblyscript.org/) and the [Binaryen](https://github.com/WebAssembly/binaryen) toolkit, you can develop WebAssembly applications using a subset of TypeScript without cutting on predictability or performance! And you can even develop in your browser with [WebAssembly Explorer](https://mbebenita.github.io/WasmExplorer/) or [WebAssembly Studio](https://webassembly.studio/), as mentioned earlier.

## The future

Although the present form of WebAssembly is very promising, its future shines brighter. The current multi-threading capabilities of the technology are seen as a hack based on shared workers. Soon, this mechanism will be a first-class citizen, along with SIMD, or _Single Instruction, Multiple Data_, which is a way to highly parallelize similar operations using the features of current generation hardware. Speaking of hardware, there is an ongoing effort to standardize access to system interfaces with [WASI](https://wasi.dev/), which gives access to sockets, file systems, random number generators, and more. And to increase the visibility, accessibility and comfort of using WebAssembly, Garbage collection and Exception handling is on the way and will help bringing Java into the ecosystem in the vicinity of 2020! And if you are more of a C#/.NET person, you might want to check out [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) as well.

## Questions and Answers session

1. How do Native modules compare to WebAssembly?  
Native modules have an additional compilation step. With WebAssembly, there is no need for additional compilation as it is natively supported by the browser.

1. Can you compile JavaScript to WebAssembly?  
You certainly can but the performance will not be better. It is more relevant to rewrite your code using AssmblyScript, for instance.

1. What about security?  
Unfortunately, this technology opens new attack vectors that can use the performance of WebAssembly such as cryptominers or simply keyloggers. A bug in the original language or dependencies may be transferred to WebAssembly.