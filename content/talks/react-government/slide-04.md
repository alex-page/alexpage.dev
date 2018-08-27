---
layout: presentation/slide
align: left
---
## Set up package.json

`package.json`
```json
"scripts": {
  "build": "babel src --out-dir dist --watch"
},
"dependencies": {
  "babel-cli": "^6.24.1",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-react": "^6.24.1",
  "babel-preset-stage-0": "^6.24.1"
  "react": "^15.6.1",
  "react-dom": "^15.6.1"
}
```

`babel.rc`
```json
"presets": [
  "es2015",
  "stage-0",
  "react"
]
```
