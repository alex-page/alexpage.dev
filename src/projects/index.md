---
layout: page
pagetitle: Projects
tags: landingPages
documentation: https://github.com/alex-page/harmonograph#readme
---
# Projects

### Australian Government Design System

As the Lead User Experience Engineer I worked in a team to launch the [Australian Government Design System](https://designsystem.gov.au) to align 1000+ websites over 200+ organisations.

It was received as a [world class example](https://twitter.com/i/moments/970119499427938304). It included accessibility guidance, rationales of design decisions and prominent contributors. 

We created and supported our federated community on [Discourse](http://community.digital.gov.au), [GitHub](https://github.com/govau/design-system-components) and Slack that drove the future direction of the design system.

We continuously maintained, created and enhanced the 25+ components. The components met WCAG AA 2.1 and best practice HTML, React, JavaScript, jQuery, CSS and SASS.

_See the source code on [GitHub](https://github.com/govau/design-system-components)._


### Furnace

I led the development on [Furnace](https://designsystem.gov.au/download), a tool that removes the barrier to entry for users unfamiliar to _npm_ by allowing them to easily download a zip file of the design system.

Furnace is a NodeJS API that bundles component dependencies based on user input, outputting the result to a zip file. The development included building the user interface, server, continuous integration, continuous deployment, unit and integration tests.

_See the source code on [GitHub](https://github.com/govau/furnace)._

### Chameleon

I mentored two developers, together we created [Chameleon](https://designsystem.gov.au/templates/home/customise/) a user interface and Node JS API that allows users to customise and share colour palettes of the Australian Government Design System.

The user interface of Chameleon allows users to choose colours and palettes. They can then view their selection with different types of vision impairment. As the user changes the colours the template renders again in real time.

When the user inputs a new palette it sends the values to a server. The values are then used to create a new HTML template that is sent back to the user interface.

_See the source code on [GitHub](https://github.com/govau/chameleon)._


### Harmonograph

As a child I used to visit the National Science and Technology Centre and see the harmonograph they had on display. A Harmonograph is a swinging platform where a pen attached to a pendulum, draws intricate shapes and patterns on paper.

Inspired I decided to make an npm package, [harmonograph](/projects/harmonograph). The package draws a randomised harmonograph using JavaScript and SVG bezier curves. The project was a perfect blend of code and design. 

_See the source code on [GitHub](https://github.com/alex-page/harmonograph)._


### A11yColor

Having to solve colour contrast for 1000+ websites I created functions to generate the nearest accessible colour in SASS and JavaScript. This allowed users to input their colours into a system and the output was guaranteed to meet colour contrast.

_See the source code on [GitHub](https://github.com/alex-page/a11ycolor)._
