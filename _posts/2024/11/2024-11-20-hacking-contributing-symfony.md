---
categories: ["meetups/afup-bdx"]
title: "I hacked then contributed to Symfony"
---

By Andoni Larzabal, PHP developer @ Conserto  
[Slides](https://slides.com/andonilarzabal/j-ai-contribue-a-symfony-c4a4c6){:rel="nofollow"}

The story starts with a project where a Zend component returned XML that needed to be updated by a Symfony app with one
requirement: never using [CDATA sections](https://en.wikipedia.org/wiki/CDATA#CDATA_sections_in_XML){:rel="nofollow"}.
CDATA allows escaping content that could be considered valid XML. In this case, the XML consumers did not support CDATA
and adding support would require significantly more engineering effort than avoiding including them in the first place.

## Symfony

The Symfony Serializer Component can serialize PHP objects to diverse data types such as XML, JSON and CSV. The
XMLEncoder class forced adding CDATA sections when some string contained "&lt;", "&gt;" or "&". This is embarrassing
given the requirement. This is problem as URL query parameters often contain "&" characters to denote the passing of
more than one of them.

No decoration is possible: that method is private. Here are some alternatives:

- Modifying the code in the dependencies directory: nope, it would be replaced on the next reinstall;
- Suggesting the change in a GitHub issue on the [Symfony project](https://github.com/symfony/symfony){:rel="nofollow"}:
  that might take too long for anything to happen;
- Hack the code using namespacing to circumvent the issue.

Indeed, the code used namespacing but invoked `preg_match` without the leading prefix "\\" which meant that, by default,
PHP looks for that function in the current namespace before defaulting to the [runtime function of the same name](https://www.php.net/manual/en/function.preg-match.php){:rel="nofollow"}.
This overloading works but is risky: this hack can cause unexpected results from the uninformed user point of view,
which in turn may lead to maintenance issues. Furthermore, it cannot be trusted: if the class code changes in just the
wrong way, the hack stops working. No choice then: contributing to the core is inevitable.

## First contribution

Symfony core contributions follow this procedure: find or create a GitHub issue, look for the contribution rules and
read them, request that you are taking the fix, implement it and submit a Pull Request.

The implementation is where it starts to get interesting: you will need to be comfortable forking the project and
working from a dedicated branch in your fork. Commit your changes to that branch, add tests and documentation, submit
the Pull Request and then wait for the review. This first experience will introduce you to the contribution workflow and
good code hygiene. Indeed, tests are a good habit. If you with to learn more about the Symfony community, visit the
following page: [https://symfony.com/community](https://symfony.com/community){:rel="nofollow"}.

Once the Pull Request has been reviewed and accepted, expect an email stating the contribution has been merged to the
core! Contributing truly is for everyone: there is no minimum lines of code or skills and the GitHub repository has
plenty of good first issues to implement. If you have the time, go check these issues as most are about missing
translations, documentation improvements, CI/CD work —GitHub Actions— or quirks that could help thousands of developers
when fixed.

Contributions lead to other contributions: in the case of the `preg_match` invocation, a different contributor added
support for custom regular expression patterns to cover even more scenarios.

## Questions and Answers
### How many lines of code are there in the XMLEncoder?

About 500 lines of terrible code written by many people over the years, generating some sort of incoherent lasagna code.

### What is a good example of deep rework in Symfony?

The JSONEncoder class has seen significant performance improvements, internal cache use, has been rewritten from scratch
and has been the occasion of several talks but is still officially in the talks because of how massively this class is
being used and how impactful this change can be. Merging this code scares maintainers who will then need to assume
responsibility.

Even if contributions like these do not get merged, then can lead to reworks that steer the framework in the right
direction.

### Are there other alternatives rather than contributing?

Well yes, you could patch vendors with [Composer Patches](https://www.cweagans.net/project/composer-patches/){:rel="nofollow"}
and a Git diff file.

### More about the missing "\\" in preg_match

It was actually intended! The Symfony developers made it an unspoken rule to only prefix optimized functions with "\\".
Overriding functions is therefore possible and allowed! This implies a malicious package could similarly "hack" core
functions, so be careful and audit installed dependencies to check for similar hacks in them.

### What is the policy regarding tests?

They are required whenever code is involved, i.e. for features and fixes. Develop the right habits: write tests stating
your expectations before the contribution. If you need help, ask the community for advice.
