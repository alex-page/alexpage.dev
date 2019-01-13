workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install" {
  uses = "actions/npm@master"
  runs = "npm install"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "build"
}


action "Deploy" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "deploy"
}
