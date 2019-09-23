# WebAssembly for developers (web&hellip; or not)
🕑 *Estimated reading time:* **?mn**

By [Horacio Gonzalez](https://twitter.com/lostinbrittany), Dev Rel @ OVH

## Table of Contents

## Introduction

WASM is a binary portable format serving as a compilation target for many other languages. The result of the compilation can be used inside the VMs of modern web browsers and in Node.JS, since V8 supports WASM. Although, it is not meant to replace current web technologies.

It is fair to say that WASM is a spiritual successor to Java applets, Flash and Silverlight but open source, standard and natively supported by web browsers! In terms of performance, WASM is fast, memory-safe, efficient, sandboxed, debuggable and is part of the Web toolkit, now. Again, WASM does not replace the web stack, rather it **completes** it.

Many companies and programs use WASM today, including Figma, Autocad, Qt, Unreal Engine, Unity, Google Earth, etc. The common denominator between all of these are the fact that you can use them on the web and that they have strong requirements in terms of performance and memory usage.

## History

The first versions of JavaScript have been released around 1995. JavaScript was never meant to be a fully-fledged language and needed to be completed by Java applets that were inefficient and did not execute in your browser but rather in an add-on system. Then came Flash, with similar drawbacks and more vulnerabilities than we can count.

In 2012, for some reason [Alon Zakai](https://twitter.com/kripken) decided to create a tool to compile C to JavaScript using Clang and LLVM and called it [Emscripten](https://emscripten.org/). [LLVM](https://llvm.org/) is a compiler framework and toolkit that helps with cross-language code compilation. Thanks to LLVM, Emscripten unknowingly opened JavaScript to many, many other languages than just C and C++!

Unfortunately for Emscripten, the initial performance of the solution was poor. This was caused by the very nature of JavaScript: because the language is dynamic, some instructions cannot be optimized until the very last moment. Moreover, there are many hacks in the JavaScript engines that make each browser implementation unique. To counter that, in 2013, Emscripten decided to concentrate on a subset of JavaScript that was compatible with Ahead of Time compilation. This subset is known as [asm.js](http://asmjs.org/). This alone made Emscripten relevant!

If you wish to try out WASM, you can do so in [WebAssembly Explorer](https://mbebenita.github.io/WasmExplorer/) or its refreshed version [WebAssembly Studio](https://webassembly.studio/). You can also use the local toolkit to compile your WASM code on your machine or on your CI environments called `emcc`, which is the equivalent of `gcc` applied to Emscripten.

Quick tip: to test some WASM code, compile it to an HTML file. This compilation will generate three files: your compiled WASM code, a JavaScript bootstrapper and an HTML test page. Today, WASM needs a buffer to exchange information with JavaScript and with Web APIs. Eventually, WASM will be able to access Web APIs directly, such as the DOM, for instance.

## Process

To write WebAssembly code, you will follow this process:
1. Write code in a supported language: C, C++, Rust, Go, AssemblyScript, etc. Note that you can use libraries to add features since they will be compiled with your code!
2. Compile. During development, you may want to make a stop by the Intermediate Representation level of the compilation, called WAT for WebAssembly Text format.

WebAssembly uses a stack to work. There is only one specification but the implementation is up to the browser vendor, which might very well decide not to use a stack as the driver data structure. If you are on a Windows installation, it is recommended you use the Linux subsystem for Windows to develop with the toolkit.

(...)
