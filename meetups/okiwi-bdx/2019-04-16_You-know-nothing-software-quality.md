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

The number of code smells is negatively correlated to the number of bugs in your application. There are tools that can detect such issues such as your favorite linter or [SonarQube](https://www.sonarqube.org/). Used correctly, their reports help technical teams identifying issues and solving errors before they happen, reducing maintenance costs for companies and future developers.

> Good read: [The Developer coefficient (study)](https://stripe.com/reports/developer-coefficient-2018), by Stripe and Harris Poll, September 2018.

### Bugs and debt

Sometimes, the correction of an issue may necessitate the correction of another issue if not more. Living with legacy code may have a disastrous impact on developers such as skill or motivation loss. This situation can be apparented to the [Boiling Frog metaphor](https://en.wikipedia.org/wiki/Boiling_frog).

It is normal for technical debt to evolve with time. Sometimes, you have to make concessions for some piece of software to be ready sooner. Keep in mind that, much like an actual credit, technical debt must be repaid as soon as possible and must be kept in check in order not to grow exponentially over time.

To keep technical debt in check, you can opt for code reviews as they diffuse code ownership and ideas and help detecting issues sooner. To detect issues even sooner, you may want to try Pair programming or even Mob Programming. A golden rule during these exercises is Egoless Programming: developers are not their code and the only source of authority is knowledge, not power.

### Adding value

Always try to add functional **and** technical value to your software. This may be difficult in some companies: managers often see the end result but not the investment to reach it and may not be up to date with software development practices. Development teams are considered like black boxes that produce software. From the outside, the following indicators are available: Time, Cost and Scope. Each of these indicators has an influence on the product quality.

> Good read: [Monkey User: Tech Debt](https://www.monkeyuser.com/2018/tech-debt/)

Technical debt can become a real blocker for companies; it can slow down development to a crawl and developers that do something about it are slower, may have no impact on the code base and may even get scolded because they contribute less functional value. In contrast, defining objectives based on metrics can be very dangerous as [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law) formulated _"Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes."_

Also dangerous is over-quality: always choosing the rewrite route does not always lead to better results. Even though your developers will always use the trending technologies, this leads to hazardous bets on the future of the rewritten applications and may not solve the issues laying around.

## Practices

Introducing software quality practices may produce positive side effects including costs and brand image risk reduction, increased value for potential customers and for HR. If your company is known for producing great software, talented individuals will be attracted.

Software Quality is not just limited to SonarQube as much as Agile is not limited to Jira and DevOps to Docker. All of these are philosophies that go beyond some tool. Moreover, tools and best practices evolve and get better over time. Only culture can be a sign of knowledge.

Some practices induce organizational debt which may also affect production: how change is conducted, communication, offshore teams, team turnover, remote, team heterogeneity.

Software Craftsmanship is starting to take flight in 2019 and we might start to see parallels with Agile soon: events, best practices. This philosophy is still on its premises and applied heterogeneously.

## Questions and Answers session

### What to do when customers rely on a specific tool and fail to see the bigger picture?

The good thing is that they may have started digging in the right direction. As an expert, guide them and explain why it is difficult moving forward in your given situation.

### What about Software rot?

Technical debt is not always linked to conscious decisions and shortcuts. It is in reality a mix between decisions and lack of experience.

### How to sell Technical debt?

Technical debt is contracted during development and refunded by its resolution. If debt starts to become uncontrollable, start rejecting new features. Some development teams add debt refunding to their backlogs and prioritize it with their other tasks.

### Including C-Levels to Software Quality

Present solid studies, preferably executive summaries. Talk about the notion of debt, its relationship with bugs, experience feedbacks from other companies. Show examples of companies that applied and did not apply Software Craftsmanship practices. If this does not lead to anything, let it go.