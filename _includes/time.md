{%- assign reading_time = page.content | number_of_words | divided_by: 170.0 | ceil -%}
⏱ Estimated reading time: **{{ reading_time }} minute{% if reading_time > 1 %}s{% endif %}**
