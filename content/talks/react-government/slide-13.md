---
layout: slide
align: left
---

`content/index/index.yml`
```yaml
layout: page
title: Homepage
header: /_shared/header.md
main:
  - main.md
```

`src/react/page.js`
```jsx
import React from "react";

export default ({ title, main }) => (
  <html>
    <head>
      <title>{ title }</title>
    </head>
    <body>
      { header }
      <main>{ main }</main>
    </body>
  </html>
);
```
