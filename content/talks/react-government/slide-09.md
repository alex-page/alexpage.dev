---
layout: slide
align: left
---
## React to HTML pipeline


`src/index.js`
```js
import Path from 'path';
import { RenderSite } from './render';
import SiteContent from '../content/homepage.json';

const siteComponent = Path.resolve( __dirname, '../components/' + SiteContent.page.component );
const siteProperties = SiteContent.page.properties;

RenderSite( './site', siteComponent, siteProperties );
```

`src/render.js`
```js
export const RenderSite = ( location, siteComponent, siteProperties ) => {

  return PreRender( location )
    .then( ( ) => ReadFile( siteComponent ) )
    .then( ( contents ) => RequireBabelfy( contents ) )
    .then( ( component ) => ReactRender( component.default, siteProperties ) )
    .then( ( renderedComponent ) => CreateFile( `${location}/index.html`, renderedComponent ) )
    .catch( ( error ) => console.log( error ) );
};
```
