workflow "Add issues to project" {
  on = "issues"
  resolves = ["Add new issues to project"]
}

action "Add new issues to project" {
  uses = "alex-page/add-new-issue-project@master"
  runs = "Hello world"
  args = "Hello world"
}
