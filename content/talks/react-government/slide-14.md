---
layout: slide
align: left
---
## { header }

`content/_shared/header.md`
```markdown
---
layout: header
headline: First post
sub: Clear content separation
---
```

`src/react/header.js`
```jsx
import React from "react";

export default ({ headline, sub }) => (
  <header>
    <h1 className="header__headline">{ headline }</h1>
    {
      sub
        && <p className="header__sub">{ sub }</p>
    }
  </header>
);
```
