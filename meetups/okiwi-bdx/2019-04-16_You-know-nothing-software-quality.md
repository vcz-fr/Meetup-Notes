# You know nothing about Software Quality, Jon Snow, CTO at WhiteWalkerConsulting
By [Arthur Magne](https://twitter.com/ArthurMagne), CTO and Co-founder @ ProMyze

## On Software Craftsmanship

Software Craftsmanship is a philosophy set on the the principle of continuous improvement applied to IT. Refer to the [Software Craftsmanship introduction](https://github.com/vcz-fr/meetup-notes/blob/master/meetups/okiwi-bdx/2019-03-19_Software-craftsmanship-back-to-basics.md) for an in-depth explanation of that philosophy.

One of the key concepts of Software Craftsmanship is the community. This concept evolved drastically for developers during the last ten years with a shift from mostly online sharing to Groups such as [Okiwi](https://okiwi.org/), Meetups, Brown Bag Lunches, Coding Dojos and entire conferences like the [BDX I/O](https://www.bdx.io/).

Software development is not just defined by a set of people writing lines of codes. This step is preceded and followed by a list of decisions that will ease future maintenance, if applicable. Developers are constansly reading software thus making decisions that tend to make the code understandable more quickly will prove beneficial to the development teams in the long term. This can avoid situations such as retro-engineering each piece of code or rewriting from scratch. Software quality is a very vast domain that spreads across architecture, code and tests.

## Architecture

Unfortunately, today, few are the tools and metrics that could make Software architecture durably better. Only experience and exchange can help and practices such as Pair design, Design review (much like code review but for architecture), reading and attending presentations, etc.

## Tests
### General recommendations

Carefully follow the [Test Pyramid](https://testpyramid.com/): start with a large base of relevant Unit tests, then a smaller count of Integration tests and optionally a sufficient number of End-to-End tests. Unit tests are fast and cheap so you should have as much as you can. If your Integration or End-to-End tests fail, add new underlying tests so that you will detect the error faster next time.

Statistically speaking, the number of tests and the number of bugs are correlated negatively. That is, the more the code is tested, the fewer the bugs.

It is common practice using code coverage to identify code sections that have not been tested. This is not a bad thing if and only if your tests are relevant! To help with that, TDD is recommended. Not only it will strenghten your code, TDD also reduces the feedback loop, failing faster and allowing you to spend more time focused on your code.

Well-made tests lead to less refactoring, frustrating development experience, attention loss, time lost understanding legacy code, etc.

### Mutation testing

From the initial source code and test code, generate mutations by changing one part of the code. A mutant can have one less block, one operator change, a condition swap, etc. Run the same tests on each mutant: if at least one fails, the mutant is considered "killed". If one mutant survives then the mutation has not been detected, which means that the tests are not strong enough to capture behavioral changes.

In JavaScript, you can use [Stryker](https://stryker-mutator.io/) to run Mutation tests. It is very difficult to configure but works very well. An Awesome list for Mutation testing is available at [theofidry/awesome-mutation-testing](https://github.com/theofidry/awesome-mutation-testing)

Beware: Mutation testing is **very** expensive. The number of mutations to test increases with the size of your code. Since your tests also increase over time, that means that Mutation testing time increases quadratically at best. It is recommended using this technique occasionally, on critical code and during a Continuous Integration pipeline.

## Code

### Clean Code

You never need to comment everything as long as your code is clear.

> Good read: [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), by Robert C. Martin.

[...]

### Adding value

[...]

## Practices

[...]

## Questions and Answers session

[...]