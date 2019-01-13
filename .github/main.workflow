workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "install"
}

action "Build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "build"
  needs = ["Install"]
}

action "Deploy" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "deploy"
  needs = ["Build"]
}
