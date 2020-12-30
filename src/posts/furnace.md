---
layout: page
permalink: false
title: Furnace
summary: Get started with the Australian Government Design System by selecting components and downloading a zip file.
date: 2017-10-15
github: govau/furnace
---
I built [Furnace](https://designsystem.gov.au/download), a tool that removes the barrier to entry for users unfamiliar to _npm_ by allowing them to easily download a zip file of the design system. 

Users select the components of the design system, automatically including dependencies. Once they have chosen their components they can choose multiple ways to bundle the components, `css`, `sass`, `html`, `react`, `js` and `jquery`.

Furnace is a NodeJS API that bundles component dependencies based on user input, outputting the result to a zip file. The development included building the user interface, server, continuous integration, continuous deployment, unit and integration tests.
