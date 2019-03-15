# The UX saved my DevOps
By [Estelle Landry](https://twitter.com/estelandry), Product Owner and UX Designer @ Elium  
By [François Teychené](https://twitter.com/fteychene), Cloud developer @ Saagie

Good read, if you are interested in DevOps: [https://devops.com/](https://devops.com/). Articles, webinars, and more.

## Introduction
Strong open source believers and contributors and organizers in the spirit, Estelle and François represent an excellent mix of skills that can help companies progress on the engineering front. This meetup will be an experience feedback as much as a presentation of some UX techniques applied to organizations.

First off, what is a DevOps and a UX?  
A DevOps is a bridge between developers and Operations. They understand what developers create and help them carry their code from their computers to the remote environments, held by the system and network administrators. The Operations part also adds automation and the reduction of the different frictions developers might encounter in the process.  
A UX combines product design, technology and strategy. They aim for the removal of any form of user frustration to create the most pleasant product experience. The UX cycle works like a classic Design Sprint: it starts by laying out a plan, a strategy for the current product and objectives. Then, we explore different paths and retain the most relevant ones, for which we generate ideas of all sorts. These ideas are sorted and some of them will actually be prototyped or implemented, then evaluated internally or against end users, which will feed a new exploration phase and so on.

## The Mix

François was a developer before becoming a DevOps. In his former company, DevOps were not really understood and wrongly associated with Operations. DevOps were often late because they never had the opportunity to automate their deployments, which slowed down the entire production. That is when Estelle joined the company. Her first mission as a Product Owner was to help the DevOps team prioritizing and organizing. The problem is more often than not linked to communication between the stakeholders, in our case the DevOps team, the developers and the hierarchy.

### Part One: Speed Boat

The first objectives were the following:
- Send more workload to developers and Operations;
- Redefine what the DevOps team should and should not handle;
- Enhance the communication.

For that, the UX decided to use the [Speed Boat](http://www.agile-ux.com/2011/10/17/a-speed-boat-or-nothing/) with a handful of developers, DevOps and operationals. This Agile exercise is intended for retrospectives, which is kind of the case here, considering this is a lingering issue. We can see the Speed Boat as a simple motor boat with anchors:
- The destination represents your ideal, the situation you would like to reach;
- The motor is the set of elements that are helping you reaching the destination;
- The deployed anchors are the obstacles that slow you down.

Once the Speed Boat is laid down, we can clearly identify what is wrong, remedy most of the anchors and reinforce the motor. This exercise is easy to setup but the format is such that you will not get a lot of feedback. Nevertheless, you might retrieve interesting insights out of it.

### Part Two: Roadmap Board

After having eased the communication between teams, the second set of objectives builds on top of the first one to align the strategies of each team with each other and progress together:
- Define the objectives of each team;
- Align the roadmaps and objectives across all the teams;
- Plan the capacity with the other teams.

The DevOps were clearly in need of time and the developers relied on the DevOps team so this part needed multiple tools: one to align the teams and another to identify the root cause of the issues. Enter the Roadmap Board and the [Five Whys](https://en.wikipedia.org/wiki/5_Whys).

The Roadmap Board is simply a meta Kanban board, nothing fancy. With this board, every team knows about the interdependencies of each task. This may cause unexpected side effects like noticing that a large subset of these dependencies points to an unexpected and unforeseen issue. That is why it is useful to pair this exercise with the "Five Whys".

Frustration can drive teammates crazy. That is why it is necessary to detect and bring solutions or ideas in order to drive down frustration. The principle of the "Five Whys" is quite easy: you start from a point of frustration and simply ask yourself why it happened. Here is an example:
0. The developers cannot test anything on the test environments!
1. Why? The test environments never update rapidly!
2. Why? The test environment queue is always busy!
3. Why? There are slow jobs on the queue!
4. Why? Some build processes are very slow.
5. Why? The knowledge was not sufficient in the teams to create a more efficient process.

In this case, we went from an issue that concerned the DevOps team to an issue that could be solved through training of the developer teams. This technique can be applied to the most pressing issues to identify root causes and devise action plans in order to relieve pressure. It is efficient and pretty easy to organize, even though it is very hard to have every concerned person present. Nevertheless, the solutions may not be ideal and the collaboration between developers and the Operational team is not that easy, since both teams have very different objectives.

### Path Three: Six Thinking Hats

UX is also about extracting needs and developing user engagement. Sometimes, when the situation is too complex, it is preferable to take it apart and analyze it thoroughly, under multiple angles. There is an exercise for that called the "Six Thinking Hats". It requires an ambitious objective, an open team and from sixty to ninety minutes.

The six hats each have their own color and meaning:
- White: Neutrality, facts, statistics and **no** feelings;
- Red: Emotions, feelings, intuition;
- Green: Creativity, ideas, no limit;
- Black: Pessimism, carefulness, avoiding risks;
- Yellow: Optimism, hopes, dreams, opportunities;
- Blue: Organization, thinking process, rigorousness, solution.

The resulting debates are very constructive though the strict rules need a strong arbitration to avoid losing track. Many, many ideas and visions are exposed during this exercise but in the end, there must be someone or some group that makes the final decision.

Sometimes, a decision may require some thinking but not a "Six Tinking Hats" level process. If you often need to ask yourself "What would X do?", then Personas might be what you are looking for. A Persona is a fictional profile representing a target audience. This profile can be used to extract the reaction of a member of that target audience through the history of the profile. Personas are often your end users, the ones that use applications. How would you transpose this concept to the ones developing them? Two developers may use the same technologies in a different fashion and with different goals in mind with different sets of skills and interests. In other words, developers are very sparse.

1. Analyze the profiles around you: frontend, backend, CTO, support;
2. Analyze their ideas and thoughts: interest in DevOps, no interest, intent to participate;
3. Adapt the categories of a classic Persona sheet to developers: experience, influences, added value.

Personas are a good way to put yourself in someone else's shoes even though adapting a Persona is very difficult. Not only that, it is also hard to think like another kind of technical profile, projecting oneself in another field. Personas are almost always a UX thing and never really stuck with developers, which might explain some degree of resistance.

## Finally

The tools we have analyzed here are complementary and may take a lot of time to be actively put into practice. They do not represent an absolute ground truth and may or may not be adapted to your company. Nevertheless, they should be a motivation for you to involve your UX designer and their tools with issues that are beyond experience design! In any case, it is recommended following roughly the same front:

1. Communication: Speed Boat
2. Visibility: Roadmap Board, Five Whys
3. Engagement: Six Thinking Hats, Personas
