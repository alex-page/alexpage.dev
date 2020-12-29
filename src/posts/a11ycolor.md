---
layout: page
title: A11yColor
summary: Generate the nearest accessible color in SASS and JavaScript.
tags: [featured]
date: 2017-10-18
ids:
  npm: a11ycolor
  github: alex-page/a11ycolor
---
# {{title}}

> {{summary}}

Having to solve colour contrast for 1000+ websites I created functions to generate the nearest accessible colour in [SASS](https://github.com/alex-page/sass-a11ycolor) and [JavaScript](https://github.com/alex-page/a11ycolor). This allowed users to input their colours into a system and the output was guaranteed to meet colour contrast.

The colour to become accessible is converted into Hue, Saturation and Lightness. The lightness is then binary searched to find the closest passing colour on the chosen colour.

The user can also provide a contrast ratio of 3.0 or a 4.5. The colour will then pass Web Content Accessibility Guidelines (WCAG) level AA 2.1 on the desired ratio.
