---
layout: presentation/slide
align: left
---
## React to HTML


```jsx
// Import react and react-dom/server
import React from 'react';
import ReactDomServer from 'react-dom/server';

// Create an example component
const ExampleComponent = () => {
	return <h1>Hello world</h1>;
}

// Turn the component into static HTML
const exampleMarkup = ReactDomServer.renderToStaticMarkup( <ExampleComponent /> );

// Log the HTML
console.log( exampleMarkup );
```

```html
<h1>Hello world</h1>
```
