workflow "Deploy site on master" {
  on = "push"
  resolves = ["Deploy"]
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
  needs = ["Master branch only"]
}

action "Deploy" {
  uses = "actions/npm@master"
  args = "run deploy"
  needs = ["Install dependencies"]
}
