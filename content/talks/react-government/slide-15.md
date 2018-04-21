---
layout: slide
align: left
---
## { main }

`content/index/main.md`
```markdown
---
layout: main
headline: First post
---

**Hello world**
```

`src/react/main.js`
```jsx
import React from "react";

export default ({ _body, headline }) => (
  <article>
    <h2>{ headline }</h2>
    <div className="body-text">{ _body }</div>
  </article>
);
```
