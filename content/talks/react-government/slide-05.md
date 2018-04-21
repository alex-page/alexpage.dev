---
layout: slide
align: left
---
## React components


```jsx
// Import react
import React from 'react';

// Create an element (this is JSX)
const exampleElement = React.createElement( "h1", null, "Hello world" );

// Show the output in nodeJS
console.log( exampleElement );
```

```jsx
{ 
  '$$typeof': Symbol(react.element),
  type: 'h1',
  key: null,
  ref: null,
  props: { children: 'Hello world' },
  _owner: null,
  _store: {} 
}
```
