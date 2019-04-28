---
meetup_index: true
---

# AFUP Bordeaux

## List of meetups

{% for node in site.html_pages %}
    {% if node.dir contains page.dir and node.meetup_index == 'false' %}
        [{{node.title}}]({{node.url}})  
    {% endif %}
{% endfor %}