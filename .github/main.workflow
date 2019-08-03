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

action "Test" {
  uses = "actions/npm@master"
  args = "run test"
  needs = ["Install dependencies"]
}

action "Build site" {
  uses = "actions/npm@master"
  args = "run build"
  needs = ["Install dependencies"]
}

action "Deploy" {
  uses = "actions/npm@master"
  args = "run deploy"
  needs = ["Build site", "Test"]
  secrets = ["GH_PAT"]
}
