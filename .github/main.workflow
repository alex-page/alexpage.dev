workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Deploy"]
}

# Install dependencies
action "Install" {
  uses = "actions/npm@master"
  runs = "npm install"
}

# Build the website
action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build"
}

# Only deploy if master branch
action "Master" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

# Deploy the site if master branch
action "Deploy" {
  needs = "Master"
  uses = "actions/npm@master"
  args = "run deploy"
}
