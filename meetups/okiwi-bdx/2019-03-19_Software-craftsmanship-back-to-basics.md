# Software craftsmanship: Back to basics
By [Frédéric Faure](https://twitter.com/ffaure32/), @ Zenika - [Slides](https://www.slideshare.net/ffaure32/okiwi-software-craftsmanship-back-to-basics)

Some good reads:
- [The pragmatic Programmer](https://www.oreilly.com/library/view/the-pragmatic-programmer/020161622X/), by Andrew Hunt and David Thomas
- [The Software Craftsman](https://www.oreilly.com/library/view/the-software-craftsman/9780134052625/), by Sandro Mancuso

## Agile and Software Craftsmanship

The [Agile Manifesto](https://agilemanifesto.org/) is at the heart of the Software Craftsmanship culture, so much that the names of great programmers co-signed it. The subsequent evolutions of the Agile community, like the SCRUM implementation, casted doubt about the effectiveness of Agile in organizations. The co-signers themselves denounced faulty practices such as Agile Certifications that diverted the ownership of the values from development teams to managers.

During his keynote of Agile 2008, Robert C. Martin proposed a fifth value for Agile and revised it to "Craftsmanship over Execution". He pointed out that most development teams add value and execute but they do so without enough regards for their product quality. Soon after, the [Software Craftsmanship Manifesto](http://manifesto.softwarecraftsmanship.org/) was born. Even though it did not take over Agile, its principles are still present and relevant today.

The founding ideas of Software Craftsmanship are much like the good points of the *[Compagnons_du_Devoir](https://en.wikipedia.org/wiki/Compagnons_du_Devoir)*: community, support and learning. To achieve a high quality of work, you need to know the tools you are using, softwares and physical. Rather that judging the work of others, you need to consider their ecosystem and position at the time they created it, as the [Prime Directive](http://agileretrospectivewiki.org/index.php?title=The_Prime_Directive) in Agile teaches us.

Most of the ideas of the Agile phlosophy were already implemented in [eXtreme Programming](http://www.extremeprogramming.org/). SCRUM itself has many similarities with XP and organizations tend to naturally use a mix of SCRUM and XP. eXtreme Programming is often disregarded because of its name, even though "extreme" is only referring to the good practices.

## The practices of Software craftsmanship

**Collective ownership**: The software belongs to everyone and any developer should be able to edit part or all of it. All developers should have experience in everything but should also possess their expertise.

**Code review**: "You are not your code". A person can be completely different depending on their mental state, their maturity, etc. These changes can happen from a day to the next. Reviews are a good occasion to abandon one's ego. Apply the principles of [Egoless programming](https://blog.codinghorror.com/the-ten-commandments-of-egoless-programming/) on a daily basis.

**Pair programming**: allows developers to provide feedback on design, code quality and mistakes as soon as they are made. By reducing the feedback loop time and not wasting resources developing software that will need to be rewritten, the level of expertise of all programmers will increase and knowledge will be shared. Nevertheless, mind the extremes of Pair programming: never be too harsh or too soft. To prevent this from happening, switch positions often but not too much and be kind and honest regardless of the level of the peer. After a session of pair programming, code does not necessarily need to be reviewed. It is up to the development team to decide what feels better for them.

**Standards**: Have validated, explicit and automated standards. Everyone should be aligned on them and apply them on a large variety of situations: code style, Agile, workflow, etc.
