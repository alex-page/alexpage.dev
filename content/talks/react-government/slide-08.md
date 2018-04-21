---
layout: slide
align: left
---
## Seperating content and components


`content/homepage.json`
```json
{
  "component": "page.js",
  "properties": {
    "title": "Home - Hello CanberraJS",
    "content": "Hello world"
  }
}
```

`components/page.js`
```jsx
import React from "react";

export default ( page ) => (
  <html>
  <head>
    <title>{ page.title }</title>
  </head>
  <body>{ page.content }</body>
  </html>
);
```
