# DDD, CQ(R)S and Clean Architecture in an MVC framework
By [Julien Vitte](https://twitter.com/pitchart), Lead Web Developer @ InsideGroup, [Slides](https://pitchart.github.io/ddd-cqrs-mvc/)

## Context
The desired end product is an Enterprise Resource Planning solution for an agency, tailor-made that enables business collaboration, protected with a layer of configurable access policies. Guarantees the control and unicity of the company data, eases access to information, availability, data coherence. The solution must be able to evolve long terme and allow the frequent and fast delivery of high-value features.

## The theory
### Clean Architecture
[Interesting read](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

Applied to this project, the Clean Architecture would simplify testing and reduce the development feedback loop to speed up feature development and future changes and migrations. In a domain where change is in every mind, reducing the impact of evolutions by making the code independent is a necessary step.

Some ground rules apply to create a Clean code: The external layers can only exchange with the internal ones and all the data formats must be normalized at every step before ever reaching the business logic. Your domain code must be pristine, isolated enough so that is can be reused and only include that domain entities and rules.

Your application must become a list of use cases and orchestrate data from and to your domains. Infrastructure-wise, each layer must know the data formats it manipulates at every step. You might have to create your own persistance layer based on a query builder at most or plain SQL. The organization of the source directory is semantic; the subdirectory names are no longer those offered by your framework or language of choice. You can introduce sense and sanity in your code without actually writing a single line of it!

Note that you must stay as far away as possible from framework additions. For instance, in PHP, you should not use annotations since they are not supported by the language and lock your code with the technology that enables them. Be similarly cautious with libraries and frameworks.

### Domain-Driven Design
[Good read](http://dddcommunity.org/learning-ddd/what_is_ddd/)

Semantically speaking, CRUD can limit your team. CRUD is an acronym for "Create, Read, Update, Delete" and represents a normalised way to consume and update resources. While this way might work for generic resources such as orders and users, it falls apart when dealing with complex entities such as Employees. In the real world, employees retire, change position, leave. Sometimes, CRUD does not suffice to represent the complexity of your domain and might even introduce issues when designing your business logic. Maintenance and evolutions will not profit from CRUD either; you might need to update a large chunk of your application if your domain entities are designed like generic resources.

If the need arises, you can adapt your data storage solution to your application. This might come in handy if you know that it can be difficult to make your application work on any database or file storage type. Moreover, databases are among the most difficult third parties to abstract away.

### CQ\[R\]S: Command Query \[Responsibility\] Separation
A Query generates a Read-only, immutable result, like a `SELECT` in SQL. A Command is a mutator, is Write-only, like `INSERT`, `UPDATE` and `DELETE` statements in SQL. Command never return data! The R in CQRS implies a distinct separation between your queries and your commands. The separation is subject to debates and can be partial. Nevertheless, the CQRS approach particularly fits complex domains and out of control business rules.

Rather than using an ORM, it is possible to rely on a Query to use your database better. Doctrine tends to send unoptimlized SQL queries by default and can induce bad habits such as fetching unused fields to suit multiple business rules at once. You can also rely on Views and the power of NoSQL for search queries. The Clean Architecture and DDD should not make your solution more difficult to maintain.

Since commands must not return a result, how would you know if an entity has successfully been updated? You can query it after your Command has completed and check for yourself.

How would you validate errors in such an architecture?
- Validate your entities as soon as possible. If you can, validate them before they even enter the outermost layer of your application. Client side is your best option whenever it is possible;
- Create domain exceptions and use them at your advantage with web forms and events;
- Use HTTP verbs and status codes! Always return user-friendly messages;
- Return a common result object to handle errors. If your errors are normalized, they become a breeze to log and present to your users.

Never let your data storage solution handle identifiers. Generate your own unique IDs to avoid surprises such as scraping and people who will update the URLs manually. If you store data from an external service, generate an internal ID to hide your implementation. A Command Bus can help your application centralizing writes for performance or logging reasons. In Computer Science, it is commonly accepted that a component should prepare its data as soon as possible but write at the last minute.

