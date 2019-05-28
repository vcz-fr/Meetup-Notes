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

The approach of using extensions would allow the Core codebase to remain the same without needing hacks to add features. In addition, the extensions code would be completely separated from the Core, which makes it possible to mix and match extensions across environments, projects and customers! Nevertheless, with this advantage comes two important drawbacks: compatibility between the extensions and the core and between the extensions themselves and, in Laravel, the exposition of the Core to the extensions, meaning that any extension can potentially retrieve sensitive data using the framework methods.

### How it works

The system contains four main components: the application core, the extensions, an extension support and an extension kit. The extension support is responsible for handling and loading extensions while the extension kit contains common code, interfaces and abstract classes to implement
