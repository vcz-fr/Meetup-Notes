---
categories: ["meetups/bdx-js"]
title: "Delivering beautiful and fast images and video"
---

By [Doug Sillars](https://twitter.com/dougsillars){:rel="nofollow"}, Freelance Developer - [Personal website](https://dougsillars.com/){:rel="nofollow"}

## Introduction

In the domain of Web performance, the best free developer tools you can find in the market are [Lighthouse](https://developers.google.com/web/tools/lighthouse/){:rel="nofollow"}
and [WebPageTest.org](https://www.webpagetest.org/){:rel="nofollow"}.

[Cloudinary](https://cloudinary.com/){:rel="nofollow"} is a good tool if you wish to resize or apply filters to images
and videos! Its free tier gives a large head start to individuals and small businesses.

## Working with images

A few months ago, Google released [Butteraugli](https://github.com/google/butteraugli){:rel="nofollow"}. This tool
analyzes the structural similarity of images in order, for example, to choose the absolute best quality when compressing
an image. The structural similirarity is a number that relates to how close two images look like for our psychovisual
systems.

Always use tools to compress images, at least in a lossless fashion. If unsure, compress at 85% for JPEGs. You can also
compress SVGs and convert your images to the WebP format, now that it is supported in the major browsers! In addition to
compression, never forget about cropping and resizing your images to serve just the right amount of pixels to your
users. Remember that reducing your image dimensions by a factor of two divides the number of pixels by a factor of four,
which can vastly reduce the size of your original image!

The ["srcset" attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset){:rel="nofollow"} can
help you when you need to serve responsive images, i.e. when you would like to serve the image that fits the viewport
the most. That way, the same HTML can expose different images depending on your screen resolution!

The Google Chrome team is also working on lazy loading strategies with a feature that recently landed on the v70. This
feature loads the first KiloBytes of every image on the page you are visiting to extract its size and build the page
flow. This flow helps the browser understand which images intersect or are the most likely to intersect the viewport
next and thus will need to be fully loaded. This strategy could save us tremendous amounts of bandwidth and avoid
emulating this feature with JS.

Another way to optimize image loading would be to send a placeholder image. You can be creative with placeholders:
pixelated, blurry, monochrome, etc. The goal is to serve an image that will eventually be replaced by the higher
resolution one without the initial one not looking too out of place.

About progressive JPEGs: the community is split on this topic. Implement them if your user experience can be improved,
otherwise stick to placeholders or any other cleaner alternative to present loading content to your users.

## Working with videos

Unless you are creating a streaming platform and the user consented to watching a video, never play a video
automatically nor load or preload it on the user behalf! Videos are the heaviest content to be served on the web and
account for the vast majority of its traffic. If your video has a purely presentational aim then use GIFs instead.

14% of videos do not start or the user simply abandoned. This alone represents nearly 800 millions of hours of lost
watch time! If your user **wants** to watch your video, then sure, preload it. Also serve just the right size: do not
serve 4K if your user only supports 720p, for instance. Be careful about integrations and third party contents and
choose a sensible bitrate.

The recommended way to select the bitrate is the Goldilocks one: start with the highest, then the lowest, then the
median one. Ther browser will start displaying the video in HD and automatically adjust depending on the network quality
of service. To find the best initial quality, experiment with your available bitrates.
