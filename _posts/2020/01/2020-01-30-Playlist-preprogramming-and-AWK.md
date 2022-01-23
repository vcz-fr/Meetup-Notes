---
categories: ["meetups/afup-bdx"]
title: "Playlist preprogramming and AWK"
---

{% include time.md %}
{% include toc.md %}

## Playlist preprogramming, from almost nothing to something cool

By [Pierre Bertrand](https://twitter.com/pbnpierre){:rel="nofollow"}, Web developer @ Deezer  
[Slides](https://www.slideshare.net/PierreBERTRAND6/playlist-preprogramming-from-almost-nothing-to-something-cool-askip){:rel="nofollow"}

### Context

Deezer is a big company in which two thirds of the employees are located in France. 150 technical people write PHP, Go,
Rust and Python services. The current main project is a complete migration of the monolithic legacy to a set of
microservices codenamed DeezerNG.

It has been a year now that approximately thirty persons create official between 200 and 300 playlists a week for
Deezer. These playlists are published every Friday at midnight. Those in charge of the playlists creation were also in
charge of manually publishing them at that moment. To avoid being present at such late hours, they requested the tech
teams to create a scheduling system for their playlists and some additional quality of life features such as adding
unreleased tracks to playlists.

### Process

Fortunately, the feature about adding unreleased tracks to playlists was not difficult as these tracks were present in
the catalog. Connecting the catalog to the playlist creation application was all that was needed.

Scheduled publications were approached under the angle of stored states. The biggest issues faced with this feature was
the fact that the need shifted since its inception and that the monolith could not allow planning multiple publications
for the same playlist or changing the featured track. Both were solved by changing the way playlists are managed to a
list of atomic and orchestrable operations.

Deezer uses DDD and CQRS and their apps are architected in three layers: Domain, Application and Presentation. CQRS
separates operations that read data from those who persist data with all the advantages that such patterns can bring.
Thanks to that, a Playlist domain was already available and it already managed more complex problematics such as cache
management.

Thanks to event sourcing, we do not consider a state at any given moment but rather a collection of states. This allows
to easily implement versioning and previews without heavily interfering with the current ecosystem. With this change, it
has become possible to optimize performance by separating playlist and track operations to reduce the quantity of
events.

The orchestration feature started by polling the way large CMSs were implementing it. It turns out CMSs only implement
state changes for their contents however Deezer needed more flexibility. In that sense, the final solution is based on [Apache Kafka](https://kafka.apache.org/){:rel="nofollow"}.
This opened up extreme scalability with exactly once processing.

On top of this system, adding notifications, reporting and monitoring was almost a given:

- Notifications were designed as events sent after the end of the successful processing of a playlist or track event;
- Reporting was based on analyses of processed requests;
- Monitoring was already in place thanks to the Core team.

### The end product

In the end, the playlist manager handled a list of operations to apply to a playlist. This features comes along with a
preview interface and a Slack integration.

Any task sufficiently complex can be divided onto simpler sub-tasks, recursively. This may require altering the need or
the way it is faced. Retrieving all the needs is essential and recent technologies may help to reach a higher product
quality and are not to be put aside.

### Questions and Answers

#### What dates are saved in a playlist action event?

The date of the action and the date the action should be applied to the playlist. The actions that cancel each other
like adding then removing a song are simplified in the backend.

#### How are timezones handled?

They are retrieved from the user browser. Dates are automatically stored as UTC.  

Also read: [Back to Basics: Never lose time with Dates again]({% post_url 2019/04/2019-04-11-Never-lose-time-dates %})

#### How does validation works?

Actions are grouped and validated client-side before being sent and re-validated server-side.

## Aw[k]esome

By [Benjamin Rambaud](https://twitter.com/rambaud_b){:rel="nofollow"}, PHP engineer @ ekino  
[Slides](https://gitlab.com/beram-presentation/awkesome){:rel="nofollow"}

### A primer on awk

[AWK](https://en.wikipedia.org/wiki/AWK){:rel="nofollow"} is a language that has been created in 1977. Its name
originates from the initials of its authors, three accomplished developers named Alfred Aho, Peter Weinberger, and Brian
Kernighan. This language performs well on text streams and gets mainly used for data transformation including log
manipulation.

UNIX has been released in 1969, its manual -man- in 1971, pipelines in 1973 and finally awk in 1977. It has evolved
since: in 1985 with _new awk_, 1986 with GNU awk also named _gawk_ and 1988 with POSIX awk.

awk is an interpreted language which command line is the interpreter. It reads and interprets the script that is passed
onto the command. awk programs contain a `BEGIN` block marking the start of the program, commands that come executed
possibly conditionally and an `END` block that terminates the execution. To enrich the development experience, some
variables are natively supported such as the following:

- `$0`, the whole line or record;
- `$n`, the nth field of the record;
- `$NF`, the number of fields of the current record;
- `$FS`, the field separator, which is a single space by default;
- `$RS`, the record separator, which is `\n` by default;
- `$OFS` and `$ORS` which represent the output counterparts of the file and record separators.

To match only certain lines, you would need to place a conditional statement at the beginning of the block. Example:
`$0 ~ /^184/ { print "Hello world!\n" }`.

awk also exposes functions of its own, some even dedicated to [internationalization and localization](https://www.gnu.org/software/gawk/manual/html_node/Internationalization.html){:rel="nofollow"}
but also `system` for an OS command, `printf`, `sprintf`, etc. It is also possible to create functions which variables
will be passed by copy and arrays by reference. The language supports `if` statements and loops.

To debug on _gawk_, the best option is to use its integrated debugger based on [GDB](https://www.gnu.org/software/gdb/){:rel="nofollow"}
by adding the `-D` option to the command line ([documentation](https://www.gnu.org/software/gawk/manual/html_node/Debugger-Invocation.html){:rel="nofollow"}).

### A few examples

awk can be used for a multitude of applications. Not all of them may be recommended, though:

- A minimalistic web server;
- [Zodiac](https://github.com/nuex/zodiac){:rel="nofollow"}, a static website generator;
- [Grawkit](https://grawkit.deuill.org/){:rel="nofollow"}, a Git graph generator;
- [TranslateShell](https://www.soimort.org/translate-shell/){:rel="nofollow"}, a text translation readily available from
  your CLI based on Google Translate, Bing Translator, Yandex.Translate, etc;
- [AWKTC](https://github.com/mikkun/AWKTC){:rel="nofollow"}, a Tetris game;
- [awkaster](https://github.com/TheMozg/awk-raycaster){:rel="nofollow"}, a FPS game;
- Finally, the [slides](https://gitlab.com/beram-presentation/awkesome){:rel="nofollow"} of this presentation themselves
  use awk!
