# Back to Basics: Never lose time with Dates again
By [Frédéric Camblor](https://twitter.com/fcamblor), Web developer @ 4SH  
[Slides](https://www.slideshare.net/fcamblor/back-to-basics-ne-perdez-plus-votre-temps-avec-les-dates-bordeaux-js-edition) - [Bibliography](https://github.com/fcamblor/talk-back-to-basics-datetime/blob/master/src/notes/sources.adoc)

The aim of this presentation is to avoid the classic traps set by time and date handling in software development.

## History

Initially, time was measured using a sun clock. Sun clocks had very peculiar issues, one of which being thay they do not display the time whan luminosity is too low. These clocks would not work at night or suring bad weather. In addition, citied at different longitudes obviously displayed a different time!

To solve most of these issues, the Greewich Observatory decided to standardize hours and time by creating GMT, now deprecated in favor of UTC.

Usual units of time have been defined thanks to physical and mathematical phenomena around us. The notion of day is linked to the Sun. Hours are a regular subdivision of a day. A day and a night both contain twelve subsivisions because twelve exposes a lot of divisors: two, three, four, six. Minutes and seconds follow the same path, by being one sixtieth of their parent unit.

The last definition of the second is linked to the number of state changes in an atom of Cesium 133. Here is the NIST definition as of today:
> The second is the duration of 9 192 631 770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium 133 atom.

Today, a large network of atomic clocks based on the latest definition of time allow us to track very precisely events in our timeline, along with enabling complex usages such as navigation and communication. UTC is based on atomic time. International, agnostic, stable and continuous, the UTC Epoch, i.e. its second 0, passed the First of January 1970 at the Greenwich time zone.

## Key concepts

The rotations of the Earth have an influence on GMT's definition. The GMT adjustment variable, UT1, deviates progressively and periodically, necessitating the addition of leap seconds from time to time, at the end of June of December. Languages like Java handle such leap seconds by introducing fractions of them during the last seconds of the related days.

**Network Time Protocol:** Computers and electronic devices that embark clocks only use quark modules. Quark modules are very imprecise and the time must be synchronized from time to time. NTP has been thought to use an atomic clock from the large network of 300 clocks. Any device should be able to reach a clock in five hops or less and in one second or less. Thus, your computer clock should never deviate of more than one second after an NTP resynchronization. Keep in mind that this protocol is 32bits only, which means that it will soon lose its relevance, as the last positive timestamp approaches.

**Timestamp:** A simple number representing the quantity of seconds since the Epoch. Unfortunately, they do not convey the notion of date, time, time zone or time zone offset. Moreover, two formats of timestamps compete depending on your favorite technology: millisecond-based and second-based timestamps. This makes communication very difficult between two distinct services as one is more or less a thousand times larger than the other.

**ISO 8601:** An ISO date leads to one timestamp but it does not convey the time zone information.

**"Local" time:** Context can help defining dates. For instance, if someone asks to set a meeting every Monday at three in the afternoon, Summer time should not have any impact on the meeting time, which will still be set at three after a change. Unfortunately, time zone offset changes and leap seconds can make creating future events very difficult. An usual way to avoid such issues is to set the actual time of the events very close to the moment they happen. How close can make up for your user experience, though.

Each of these representations brings different informations and are more or less relevant depending on the context.

## Time zones and Offsets

A time zone is a geopolitical zone that observes uniform changes of their notion of time. In other words, Summer and Winter time apply at the same moment everywhere in a same time zone. It is impossible to deduce a time zone offset from a time zone and vice-versa: a time zone can have different offset throughout its history and even throughout a year and a time zone offset can apply to multiple time zones.

Time zone offsets vary from -12:00 to +14:00. This means that there are locations in the world where a time zone change can lead to a full day skip. This symbolic line is called the [International Date Line](https://www.timeanddate.com/time/dateline.html).

In order to track the time zone offset linked to each time zone, systems use Time zone databases. These databases contain an exhaustive list of the time zone offset changes for each time zone and track the latest changes. Changes happen very often, at the rate of roughly ten per year. Being up to date with these databases can be very crucial for critical systems. There are two main providers for such databases : Microsoft and the [IANA](https://www.iana.org/time-zones). The IAIA Time zone database repository is [publicly available](https://github.com/eggert/tz).

Java natively ships with the new Time zone databases with each new JDK and proposes a tool to update them: the [TZUpdater](https://www.oracle.com/technetwork/java/javase/downloads/tzupdater-download-513681.html). As for JavaScript, you will have to handle them manually or with a [specialized package](https://www.npmjs.com/package/geo-tz).

Time zone databases are very geopolitical and change on a regular basis and sometimes unpredictably. For instance, since 2012 DSTs or Dailight Saving Times are suspended in Morocco during the Ramadan. This makes date and time projections in the future very difficult.

In a few years, a new rule might be added for France with the end of DST. Therefore, if you ever need to store a date, also store the origin time zone of the user that generated it.

## Summer time and other traps

[...]

## Recommendations

[...]
