# Extensible architecture with Laravel
🕑 *Estimated reading time:* **?mn**

## Table of Contents

## Extensible architecture with Laravel
By [Marty Lamoureux](https://twitter.com/martylamoureux), CTO & Co-Founder @ DynamicScreen

### Extensibility

DynamicScreen is a company that created an application that allows companies to stream content on screens. Contents can exist under different formats: plain text, images, videos, facebook posts, tweets, etc. The underlying code is always pretty similar, which calls for a specific architecture.

To avoid maintaining different variants of the same product for each project or each client, the project has been subdivided in a core and components. The main objectives of the architecture would be the following:
- Adding features without changing the Core;
- Addict features for specific projects or clients;
- Reuse common modules between multiple projects.
