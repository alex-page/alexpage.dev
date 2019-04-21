---
layout: page--blog
pagetitle: GitHub actions to publish npm packages
tags: [ 'blog', 'featured' ]
languages: [ 'javascript', 'shell' ]
date: 2019-21-04
summary: Build, test and deploy npm packages with GitHub actions.
---
[GitHub actions](https://github.com/features/actions) allow you to run scripts for your repository without having to use applications. This is my early exploration of what is possible with GitHub actions and npm. There are heaps of alternatives, so make sure to try them out!

To follow along you will need to [sign up](https://github.com/features/actions/signup/) to the GitHub actions beta.


## Publishing workflow

I have some npm packages with specific workflow I always follow before deploying a new version. My usual workflow for publishing npm packages is to:

1. Create a Pull Request into master
1. Merge the pull request into master
1. Checkout master branch locally
1. Install dependencies `npm install`
1. Test the functionality `npm run test`
1. Publish the package to the npm registry `npm publish`
1. If any of these steps fail I don't want to publish the package

With GitHub actions I can change the workflow to:

1. Create a Pull Request into any branch
1. Run GitHub actions
1. If any of the actions fail I will get [failed checks](https://help.github.com/en/articles/about-required-status-checks) in the Pull Request
1. Merge the pull request


## Create a main.workflow

To use GitHub actions you need to create a `.github/main.workflow` file in your master branch. This file tells GitHub you have a workflow to run. You can do this by creating the file in your repository or clicking the actions tab in GitHub.

![Screenshot of the action user interface in GitHub](/assets/blog/gh-actions.jpg)


## Workflow

Once you have the file created we need to add a workflow. To create workflow we need:

- Workflow name: **Build, test and publish on master**
- The action to finish the workflow on: **["Test"]**
- The [event](https://developer.github.com/actions/managing-workflows/workflow-configuration-options/#events-supported-in-workflow-files) to run the workflow: **push**

A push event is ran when a push to a repository branch is made. Branch pushes and repository tag pushes also trigger webhook push events.

```sh filename:main.workflow
workflow "Build, test and publish on master" {
  resolves = ["Test"]
  on = "push"
}
```

![Screenshot of how to create a workflow in the GitHub user interface](/assets/blog/workflow.jpg)


## Actions

Now that we have a workflow created we can create our actions. Actions are [docker containers](https://developer.github.com/actions/managing-workflows/workflow-configuration-options/#using-a-dockerfile-image-in-an-action) that use arguments, secrets and environment variables with the files in your repository. To create an action for publish we need:

- The name of the action: **Install dependencies**
- The docker container: **[actions/npm@master](https://github.com/actions/npm)**
- The arguments to pass to the container: **install**

```sh filename:main.workflow
workflow "Build, test and publish on master" {
  resolves = ["Test"]
  on = "push"
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
```

> Note: you will need the word `run` before custom npm scripts.

![Screenshot of actions in a workflow](/assets/blog/actions.jpg)

We now have a new workflow that runs for every push into the repository. It will create a docker container using [actions/npm@master](https://github.com/actions/npm) and run `npm install` then `npm run test`. If the install and test pass the workflow resolves successfully.


## Publishing when pushed to master

Lets add some more actions for install, test and filtering for the master branch. We will use the [actions/bin/filter@master](https://github.com/actions/bin/tree/master/filter) to make sure we are in the master branch before running the publish action. The publish action will need a secret `NPM_AUTH_TOKEN` to publish to the NPM registry, you can get an [OAUTH token here](https://docs.npmjs.com/creating-and-viewing-authentication-tokens).

Lets update our workflow to include filtering and publishing:

```sh
workflow "Build, test and publish on master" {
  resolves = ["Publish"]
  on = "push"
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

And thats it! You now have a simple workflow to publish your npm packages.

If you liked this post or have feedback [please let me know](https://twitter.com/aalexpaage). I am thinking of writing some more posts on publishing static sites and a beginners guide to creating an action.
