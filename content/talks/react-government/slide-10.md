---
layout: slide
align: left
---
## RequireBabelify and ReactRender


`src/render.js`
```js
export const RequireBabelfy = ( source ) => {

    const registerObj = {
      presets: [ 
        'babel-preset-es2015', 
        'babel-preset-stage-0', 
        'babel-preset-react' 
      ]
    };

    const transpiledSource = require("babel-core").transform( source, registerObj );

    return RequireFromString( transpiledSource.code );
};

export const ReactRender = ( code, properties ) => {
  let component = React.createElement( code, properties );
  return ReactDomServer.renderToStaticMarkup( component );
};
```
