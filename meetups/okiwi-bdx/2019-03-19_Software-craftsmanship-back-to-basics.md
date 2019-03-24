# Software craftsmanship: Back to basics
By [Frédéric Faure](https://twitter.com/ffaure32/), @ Zenika - [Slides](https://www.slideshare.net/ffaure32/okiwi-software-craftsmanship-back-to-basics)

Some good reads:
- [The pragmatic Programmer](https://www.oreilly.com/library/view/the-pragmatic-programmer/020161622X/), by Andrew Hunt and David Thomas
- [The Software Craftsman](https://www.oreilly.com/library/view/the-software-craftsman/9780134052625/), by Sandro Mancuso

## Agile and Software Craftsmanship

The [Agile Manifesto](https://agilemanifesto.org/) is at the heart of the Software Craftsmanship culture, so much that the names of great programmers co-signed it. The subsequent evolutions of the Agile community, like the SCRUM implementation, casted doubt about the effectiveness of Agile in organizations. The co-signers themselves denounced faulty practices such as Agile Certifications that diverted the ownership of the values from development teams to managers.

During his keynote of Agile 2008, Robert C. Martin proposed a fifth value for Agile and revised it to "Craftsmanship over Execution". He pointed out that most development teams add value without enough regards to their product quality. Soon after, the [Software Craftsmanship Manifesto](http://manifesto.softwarecraftsmanship.org/) was born. Even though it did not take over Agile, its ideas are still present and relevant today.

The founding ideas of Software Craftsmanship are much like the good points of the *[Compagnons_du_Devoir](https://en.wikipedia.org/wiki/Compagnons_du_Devoir)*: community, support and learning. To achieve a high quality of work, you need to know the tools you are using, softwares and physical. Rather that judging the work of others, you need to consider their ecosystem and position at the time they created it, as the [Prime Directive](http://agileretrospectivewiki.org/index.php?title=The_Prime_Directive) in Agile teaches us.

Most of the ideas of the Agile philosophy were already implemented in [eXtreme Programming](http://www.extremeprogramming.org/). SCRUM itself has many similarities with XP and organizations tend to naturally use a mix of SCRUM and XP. eXtreme Programming is often disregarded because of its name, even though "extreme" is only referring to the best practices.

## The practices of Software craftsmanship

**Collective ownership**: The software belongs to everyone and any developer should be able to edit part or all of it. All developers should have experience in everything but should also possess their expertise.

**Code review**: "You are not your code". A person can be completely different depending on their mental state, their maturity, etc. Reviews are a good occasion to abandon one's ego. Apply the commandments of [Egoless programming](https://blog.codinghorror.com/the-ten-commandments-of-egoless-programming/) on a daily basis.

**Pair programming**: allows developers to provide feedback on design, code quality and mistakes as soon as they are made. By reducing the feedback loop time and not wasting resources developing software that will need to be rewritten, the level of expertise of all programmers will increase and knowledge will be shared. Nevertheless, mind the extremes of Pair programming: never be too harsh or too soft. To prevent this from happening, switch positions from time to time and be kind and honest regardless of the level of the peer. After a session of pair programming, code does not necessarily need to be reviewed. It is up to the development team to decide what feels better for them.

**Standards**: Have validated, explicit and automated standards. Everyone should be aligned with them and apply them to a large variety of situations: code style, Agile, workflow, etc.

**TDD**: Red, Green, Blue. Never underestimate refactoring. Refactoring does not only apply to code: tests also need to be refactored. Structure your tests with Given-When-Then. A good read: [SourceMaking](https://sourcemaking.com/)

**Refactoring**: "Factor Mercilessly". Always reflect your intentions with your code and minimize duplications. When facing legacy code, identify the simplest violation, fix it and iterate. Good read: [Working Effectively with Legacy Code](https://www.oreilly.com/library/view/working-effectively-with/0131177052/), by Michael Feathers.  
In case of dire legacy situations, you can use [Golden Master Testing](https://michaelfeathers.silvrback.com/characterization-testing), also called Characterization Testing, to think about your legacy as a black box and map out how it works by adding tests. The produced set of tests becomes your reference that you will work to eliminate over time by migrating to better practices as this technique leads to tests that are hard to maintain.

**Technical Debt**: solve your debt as soon as you create it, not later. Later is often too late with technical debt. Having technical debt is much like having debt at all: the act **must** be conscious and debt creation and repayment are explicitly planned.

**Documentation**: Document if and only if you will use the documentation. If it is not read or updated, do not invest time on it. Document yourself with the practices of [Living Documentation](https://livingdoco.com/).

**CI/CD**: YES! As much as you can and as far as possible. Always find ways to deliver more value faster and safer. Understanding CI/CD is great, using it effectively is better.

**Code coverage**: Do not use it as a single indicator of product quality. Reaching high ratios of coverage is easy enough. Having clear and relevant test scenarios much less so. Having 70% of meaningful code coverage is better than having 90% of coverage through faulty and meaningless testing logic.

## Out of scope ideas

### Acronyms

You might encounter the following acronyms during your daily tasks. Understand them and use them carefully:
- **KISS**: Keep It Simple and Stupid. Be minimalistic and do not over-complicate something that should be simple;
- **YAGNI**: You aren't gonna need it. Do not anticipate needs or over-engineer your solutions just for the sake of genericity;
- **SOLID**: Single responsibility, Open–closed, Liskov substitution, Interface segregation, Dependency inversion. Decouple your code responsibly. [Kevlin Henney](http://kevlin.eu) made a talk about [SOLID principles deconstruction](https://www.youtube.com/watch?v=tMW08JkFrBA);
- **DDD**: Domain Driven Development. Try to create a common language between the development and the client.

### Attitude

Here are some key elements that, applied by everyone in a development team, can drive up product quality:
- **The scout rule**: Leave the code better than when you find it. This applies between any two points in time;
- **Egoless programming**: Mentioned before in this presentation. Is is a set of points that can be used to live with better peace of mind as a programmer;
- **Broken window theory**: [An explanation of the theory](https://www.britannica.com/topic/broken-windows-theory). Applied to software engineering, this theory is the belief that sooner or later, issues left unchecked lead to more serious violations of code practices;
- **The Stone Soup**: Originally a [folk story](https://en.wikipedia.org/wiki/Stone_Soup), the Stone Soup tells us that we need to share and collaborate at our scale to reach something bigger. We all should behave in exemplar ways, participating to workshop, teaching, sharing knowledge and pulling everyone upwards. Crafts swap is a good way to apply this on a larger scale: two different companies exchanging team members can teach them new sets of practices and the swapped members themselves can bring their own ideas and fresh points of view.
