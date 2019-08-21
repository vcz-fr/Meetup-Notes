# Kotlin: Zero to Hero
🕑 *Estimated reading time:* **?mn**

By [Marc Wieser](https://twitter.com/marcwieserdev), Software engineer @ Orange Business Services  
[Slides](https://docs.google.com/presentation/d/1hoMbmI8agdJzftzbHE2Z-tEO0hQvbN1dRPBBsr6zKPg)

## Table of Contents

## Context

Java is a language that aged a lot and that is verbose. Recently, JetBrains, the company behind IntelliJ and WebStorm, decided to tackle this issue by presenting their take on the Java ecosystem and their new language, Kotlin. Its adoption has sharply increased throughout the years that followed, even more when Google made it a first citizen for their Android platform. This means that new APIs will be developed for Kotlin but still compatible with Java.

Kotlin is also good for JVM programming, native and JS, even though the work on the second and the latter are ongoing. It is strictly typed, supports type inference, autocast and is null-safe. A variable that can contain the value `null` must explicitly be defined nullable, otherwise the application might not be able to compile.

## Key syntax elements

```kotlin
 var someValue // Declares a mutable variable
val otherValue // Declares an immutable variable

foo is Type // Tests if the variable foo is of type Type
foo as Type // Casts the variable foo to the type Type

                   Type? // A variable which type is followed by an interrogation mark is nullable
someValue?.someAttribute // Returns null if an element in the chain is null
             someValue!! // Throws an exception if someValue is null

someVar === someOtherVar // True if both variables point to the same object

when (n) {        // Switch equivalent
    0, 1 -> 1
    else -> n * 2
}

       1 .. 10 // Range between 1 and 10, inclusive
    1 until 10 // Range between 1 and 10, not including 10
1 .. 10 step 2 // Range between 1 and 10, with an increment of 2

fun foo(n: Int): Int {} // Function declaration, takes an Int called "n" and returns an Int
   fun doSomething() {} // Implicitly void. The Unit type can also be used to declare void functions

do {} while (predicate) // Loops
   while (predicate) {}
    for (el in list) {}
         list.forEach{}
```