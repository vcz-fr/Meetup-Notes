---
meetup_index: true
---

# AFUP Bordeaux

## List of meetups

{% for node in site.html_pages %}
    {% if node.dir contains page.dir and node.url != page.url %}
        [{{node.title}}]({{node.url}})  
    {% endif %}
{% endfor %}