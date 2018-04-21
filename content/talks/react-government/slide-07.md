---
layout: slide
align: left
---
## React to HTML with properties


```jsx
// Import react
import React from 'react';
import ReactDomServer from 'react-dom/server';

// Instance of the component
const ExampleComponent = ( props ) => {
	return <h1 className="site-title">Hello { props.name }</h1>;
}

// Turn the component
const example = ReactDomServer.renderToStaticMarkup(
	<ExampleComponent name="CanberraJS" />
);

// Renders the JSX from before
console.log( example );
```

```html
<h1 class="site-title">Hello CanberraJS</h1>
```
