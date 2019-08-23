# Kotlin: Zero to Hero
🕑 *Estimated reading time:* **6mn**

By [Marc Wieser](https://twitter.com/marcwieserdev), Software engineer @ Orange Business Services  
[Slides](https://docs.google.com/presentation/d/1hoMbmI8agdJzftzbHE2Z-tEO0hQvbN1dRPBBsr6zKPg)

## Table of Contents
  * [Context](#context)
  * [Key syntax elements](#key-syntax-elements)
  * [Specifics and syntactic sugar](#specifics-and-syntactic-sugar)
  * [Final pieces of advice](#final-pieces-of-advice)

## Context

Java is a language that aged a lot and that is verbose. Recently, JetBrains, the company behind IntelliJ and WebStorm, decided to tackle this issue by presenting their take on the Java ecosystem and their new language, Kotlin. Its adoption has sharply increased throughout the years that followed, even more when Google made it a first citizen for their Android platform. This means that new APIs will be developed for Kotlin but still compatible with Java.

Kotlin is also good for JVM programming, native and JS, even though the work on the second and the latter are ongoing. It is strictly typed, supports type inference, autocast and is null-safe. A variable that can contain the value `null` must explicitly be defined nullable, otherwise the application might not be able to compile.

## Key syntax elements

```kotlin
var someValue  // Declares a mutable variable
val otherValue // Declares an immutable variable

foo is Type // Tests if the variable foo is of type Type
foo as Type // Casts the variable foo to the type Type

Type?                    // A variable which type is followed by an interrogation mark is nullable
someValue?.someAttribute // Returns null if an element in the chain is null
someValue!!              // Throws an exception if someValue is null

someVar === someOtherVar // True if both variables point to the same object

when (n) {        // Switch equivalent
    0, 1 -> 1
    else -> n * 2
}

1 .. 10        // Range between 1 and 10, inclusive
1 until 10     // Range between 1 and 10, not including 10
1 .. 10 step 2 // Range between 1 and 10, with an increment of 2

fun foo(n: Int): Int {} // Function declaration, takes an Int called "n" and returns an Int
fun doSomething() {}    // Implicitly void. The Unit type can also be used to declare void functions

do {} while (predicate) // Loops
while (predicate) {}
for (el in list) {}
list.forEach{}
```

## Specifics and syntactic sugar

To quickly operate on list structures, you can natively use functions like `filter` and `map`. If the last argument of a function is a callable, there is a shorter way to write your statement. For example, to retrieve even numbers on a list of numbers, you could write the following:
```kotlin
list.filter{ it % 2 == 0 }
```
"it" is the name given by Kotlin to arguments resulting of such constructions. In JavaScript, this would be the equivalent of the "this" variable. Not to be confused with the "this" variable in Kotlin.

The exception ecosystem is mostly identical to Java, as is type erasure with Generics. However, unlike Java, you can easily extend primitive types.
```kotlin
fun String.isThirteen() = this == "13"
```

Classes are final by default and can be made inheritable by adding the `open` keyword on their declaration. Nested classes are natively supported and static unless you add the keyword `inner`, in which case they can freely access the attributes and methods of their parent class, since they carry a reference to an object of that class.

Data classes can be one-liners since equals, hashCode, toString, copy and destructuration are automatically handled by the compiler.

Sealed classes are abstracts with a private constructor and children declared within the same file. They are especially useful for private enumerations. This limitation does not apply to their grand-children.

Enum classes can contain functions and globally provision one instance per value.

Singletons are to be declared as "objects", while a companion object is a singleton for a class.

To do type transformation, it is possible to use the special function `with`, which, when provided with a type, can transform its attribute to change its value to cast it to some other type.

Lambdas are straightforward:
```kotlin
(TypeA, TypeB) -> TypeC // Declaration

{ varA, varB -> varA + varB } // Usage
{ it * 2 }                    // Variant: the lambda only declared one argument
```

Destructuration is also straightforward:
```kotlin
data class Foo(val bar = 1, var baz = "Hi")

val foo = Foo(baz = "Hello!")
val (bar, baz) = foo // Destructuration
```

Infixes are very powerful, yet very dangerous structures as they allow you to create operators. They are another way of extending primitive types. Their creation is very similar to basic type extension except they do not leak a variable but rather use the keyword `infix` and do not need to reference the instance on which they are called since it is sent to a variable called "this".

Terminal recursion is also supported under the operator `tailrec`. This actually transforms recursive functions to iterative ones by simulating the call stack in an actual stack data structure.

Initialization can be lazy, too. This is especially useful if you need to initialize some variable later or never and the initialization is a costly or asynchronous process.

## Final pieces of advice

Peruse null-safety. It is the major feature of this language. Similarly, even if this makes Kotlin harder to get into, stop null values leaking from your Java ecosystem (extensions) as soon as possible. Avoid opening your classes needlessly and learn to use `mapOf`, `listOf`, `buildString`, immutability, infixes and data classes to your advantage.