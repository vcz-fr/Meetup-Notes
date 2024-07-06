---
categories: ["meetups/gitlab-bdx"]
title: "NetOps and Hugo with GitLab CI"
---

## How to become a future-proof network engineer

By Alexandre Azario, Network Engineer @ OVHcloud

### History

A few decades ago, the network domain consisted of a triad containing Routers, Switches and Servers. Then came
vSwitches, Virtual Machines, Load Balancers, Containers and finally the Cloud. With these new components, the complexity
of managing network configuration is very different today than it was then.

It is possible to identify four acts in the evolution of networks:

1. [vLans](https://en.wikipedia.org/wiki/Virtual_LAN){:rel="nofollow"}, [Spanning-Trees](https://fr.wikipedia.org/wiki/Spanning_Tree_Protocol){:rel="nofollow"}
   and Static routing;
2. Dynamic routing, [WANs](https://en.wikipedia.org/wiki/Wide_area_network){:rel="nofollow"} and Backbones;
3. [MultiProtocol-BGP](https://en.wikipedia.org/wiki/Multiprotocol_BGP){:rel="nofollow"}, [vXLan](https://en.wikipedia.org/wiki/Virtual_Extensible_LAN){:rel="nofollow"},
   [Software Defined Networking](https://en.wikipedia.org/wiki/Software-defined_networking){:rel="nofollow"},
   Controllers;
4. Cloud, REST and Python on-board, [NetConf](https://en.wikipedia.org/wiki/NETCONF){:rel="nofollow"}, [Yang](https://en.wikipedia.org/wiki/YANG){:rel="nofollow"},
   [NFV](https://en.wikipedia.org/wiki/Network_function_virtualization){:rel="nofollow"}.

### Evolution of network consumption

Changing habits with the superior layers of the [OSI Model](https://en.wikipedia.org/wiki/OSI_model){:rel="nofollow"}
requires improving the lowest layers. At the lowest layer of this model, we find the following skills:

- Infrastructure;
- Operating Systems;
- Automation and Cloud management;
- Middlewares and Applications;
- Containers;
- Orchestration;
- Integration and Delivery pipelines
- Development environments.

Today, there is a dichotomy between network designers which handle the first three skills and consumers of such services
which possess the last three skills. The expectations of network designers and consumers are different and "DevOps"
naturally chose to fit in the middle as intermediaries.

### DevOps

DevOps should not be regarded as a role but rather as a state of mind, a culture. DevOps embraces failure, change and
automation.

#### The culture of fear in change

Changes in network are infrequent, consequent and complex. Therefore, they are considered risky and fail from time to
time. So much that it is common to regard errors as inevitable, which makes changes less frequent and more complex, etc.

Changes should be frequent, simple; usual, tested and verified. Atomic changes should reduce the occurrence and gravity
of potential issues. Consequently, changes are seen as successes.

#### Tooling

Rather than sending commands to follow, today it is usual to express a state to reach. Tools will help to bridge the
existing state with the desired one. This reconciliation loop can lead to these kinds of scenarios:

- Creating a Git branch locally;
- Reaching the desired state;
- Local test;
- Commit and push to the remote repository;
- Building and testing on a virtual or dedicated network;
- On success: Merge;
- On failure: Back to development.

Choosing a tool is often dependent on the community around the domain you are aiming to cover and on the support of
protocols and communication interfaces used by your existing hardware or software stack. Testing tools are relatively
recent in that space. We are here talking about [VIRL](http://virl.cisco.com/){:rel="nofollow"} and [EVE](https://www.eve-ng.net/){:rel="nofollow"}.

Teams often decide on a tool based on the following traits:

- Is it open source or proprietary?
- What programming or configuration languages does it support?
- What integrations does it offer?
- What is the community like?
- Who adopted it already?

### Questions and Answers session

#### Are tests realistic on a virtual network?

Virtual networks may not provide the full set of features an actual network would contain. A physical test network can
complete the tests for behaviors that cannot easily be virtualized.

#### How to run tests with interconnects?

Tests with interconnects are difficult to run natively. Nevertheless, tools can reproduce such behaviors such as Packet
Design.

#### Is it viable to run end-to-end tests in large-scale environments?

Spawning an entire fleet of network appliances is impossible today. Some of the tools are billed by the node and when
your network reaches a large enough scale end-to-end testing becomes unwise.

## Static website deployment using GitLabCI and Hugo

By Michael Bonfils, Backend developer @ OpenIO  
[Slides](https://murlock.gitlab.io/meetup-bordeaux-february-2020-slides/){:rel="nofollow"}

### Presentation

Wordpress is the typical example of a heavy CMS that can easily break. On the other hand, [Hugo](https://gohugo.io/){:rel="nofollow"}
is a static website generator. It is less feature-rich but the fact that it uses Go makes it lightweight and portable.
By default, Hugo is delivered with no theme and natively supports Markdown syntax.

GitLab can easily compile and host code from a Hugo website thanks to its [CI/CD](https://docs.gitlab.com/ee/ci/){:rel="nofollow"}
and [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/){:rel="nofollow"}. Be careful about the Docker image
you use for your Hugo website, though!

A Hugo website generated by GitLab CI can be saved thanks to [GitLab Artifacts](https://docs.gitlab.com/ee/user/project/pipelines/job_artifacts.html){:rel="nofollow"}.
Artifacts are downloadable by users as well as the next steps of your pipeline. Be careful to change the strategy for
your submodules in case you use them to import a theme.

On GitLab, whenever a job is called "pages", the content of its artifacts is automatically uploaded on GitLab Pages. It
is possible to configure the Pages domain for the repository through the settings. By default, that domain will be
`your_username.gitlab.io/project_name`. In any case, be careful about [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS){:rel="nofollow"}
when you deploy your website, as this can prevent loading external resources.

You may add plugins to extend Hugo's features.

### Testing a website before its deployment

When you are ready to deploy your website, on your staging environment:

- Validate the `.gitlab-ci.yml` using a Yaml linter and GitLab's own CI Linter;
- Protect sensitive branches to hide sensitive variables and restrict access;
- Use an Docker image that compiles and uploads your website.

### Questions and Answers session

#### Is there a limitation on runner minutes for hosted runners?

No, there is not. Additionally, you can host your runners on Kubernetes, on premise, etc.
