---
layout: post
title: A month with ReactNative
date: 2015-11-30 20:38
categories: Javascript
tags: ReactNative
author: lxsameer
description: A month with ReactNative
---

[Reactnative](https://facebook.github.io/react-native/) is an other try to bring modern web
into mobile application development world. It follows a much brilliant way than previous tries
like [Cordova](https://cordova.apache.org/) or other similar software. **ReactNative** applications
run a javascript engine on thread and execute the application js code on that thread and render
the result in main thread. This simple idea ( it's much complicated than this, but for the sake of
simplicity I won't get to it ) allows us to use native platform components via javascript interact with
them much easier.

I decided to use **ReactNative** to create a client to one of our latest products. So I spend several
days reading ReactNative docs and creating prototype apps. Here are my thoughts on ReactNative after living
it for about a month.

## Pros
* **ReactNative** is much easier to use alternative to native application development. Let's face it
**Java** and **Objective-C** and even **Swift** are not as easy to use as **Javascript**. Personally
I don't like **Javascipt** either but it's the easier choice.

* You can use any **NodeJS** module that your want with your application.
* It's fast and smooth as a real native application in 99% of situation you won't notice the difference.
* You can still write native code when you need that. ReactNative provide a nice interface to enhance
your application via native code.
* As its name suggests **ReactNative** uses the **ReactJS** core framework and concepts to develop application.
**ReactJS** itself is a huge win.


## Cons
* Well it's **NodeJS**. Some people like it but I don't and specially the **npm** part is a real pain in the ass.
* It's documentation is not good enough. While it can guide you through getting started but It is not enough and
lacks so much information. No good API information.

* In the time of writing this article ReactNative for android is young so you have to write many parts of your app
your self using Java.

* **ReactNative** has a really weird development process. Each pull request will go through to much complexity to be
approved. Personally I won't contribute to **ReactNative** any more. It's too much trouble.

* **ReactNative** community is not a warm and welcoming place for newbies. It's small and cold. People ignores almost
every questions. It may be young but I don't see any future for this community. In about a month none of my problems
got fixed by community.

## Summary
I found **ReactNative** fascinating and awesome. I'm happy with it and I'll use it almost always. But I'll never
contribute to **ReactNative** again. It's not worth the time it took to get your code into main repository.

**ReactNative** development process showed me why facebook is not a successful company in introducing new technologies to the
world.

But in general **ReactNative rocks.**
