---
layout: page
pagetitle:  GitHub actions for npm
tags: blog
summary: Version control, deploy and host your website with GitHub
---
Since the release of [GitHub actions](https://github.com/features/actions), I have been exploring ways I could reduce my usage of third party software. I was starting to lose track of the amount of programs I gave OAuth access to my GitHub account.

## npm packages

My first exploration into GitHub actions involved moving my npm packages to GitHub actions. I made a basic action that would install the dependencies then run the tests. If any steps of the process failed the Pull Request would fail and have to be fixed before merging.

```sh filename:main.workflow
workflow "Install and test" {
  on = "push"
  resolves = ["Test"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "test"
  needs = ["Install dependencies"]
}
```

> Note: you will need the word `run` before the arguments if it is a custom npm script.

I also wanted to set up automatic publishing to `npm`, only when the code got merged into the master branch. GitHub already had this covered with the [filter action](https://github.com/actions/bin/tree/master/filter). For the automatic publishing they also had me covered with the [GitHub action for `npm`](https://github.com/actions/npm).

I got my API key from `npm`, added it into my new action and ran my workflow. Unfortunately my build failed due to two factor authentication being enabled for publishing. I had to change my permissions to two factor for login only. I was also using `prepublishOnly` to run my tests before `npm publish`.

 After this I could publish my packages to `npm on push to master.

```sh filename:main.workflow
workflow "Build, test and publish on master" {
  on = "push"
  resolves = ["Publish"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "run test"
  needs = ["Install dependencies"]
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["Test"]
}

action "Publish" {
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Master branch only"]
}
```





## static sites


I had some hiccups, in doing this I would now be publishing my `npm` packages without two factor authentication. Currently there is no way to

My original website was built using [cuttlebelle](https://cuttlebelle.com/).

As I already used
