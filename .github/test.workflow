workflow "Add issues to project" {
  on = "issues"
  resolves = ["Add new issues to project"]
}

action "Add new issues to project" {
  uses = "https://github.com/alex-page/add-new-issue-project"
  runs = "Hello world"
  args = "Hello world"
}
