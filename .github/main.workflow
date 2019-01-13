workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Install, build and deploy"]
}

action "Install, build and deploy" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "npm install && npm run build && npm run deploy"
}
