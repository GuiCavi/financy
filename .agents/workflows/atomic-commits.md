---
description: This workflow automates file commiting grouping them logically
---

# Atomic Commits Workflow

This workflow is designed to help you break down all uncommitted changes into logical, atomic commits. It iteratively discovers changed files, groups related ones, generates a commit message, and commits them until the working tree is clean.

// turbo-all

## Step 1: Identify Uncommitted Changes
Run `git status -s` to list all modified, added, deleted, and untracked files.
If the output is empty, clearly state that there are no remaining changes to commit, and the workflow is complete.

## Step 2: Analyze and Group
Examine the list of uncommitted files.
Determine a logical grouping of files that share a common purpose (e.g., "theme provider updates", "UI component fixes", "backend schema changes").
DO NOT commit everything at once unless all remaining files are logically part of the exact same atomic change.
Select the most obvious first group of related files.

## Step 3: Stage and Commit the Group
Use the GitKraken MCP tool `mcp_GitKraken_git_add_or_commit` or run `git add <files>` and `git commit -m "<message>"` to:
1. Add the specific grouped files to the staging area.
2. Commit the staged files with an appropriate, conventional commit message (e.g., `feat: ...`, `fix: ...`, `refactor: ...`) summarizing the specific change.

## Step 4: Verify and Repeat
Once the commit is successful, evaluate if there are more files remaining by rerunning `git status -s`.
If there are still uncommitted files, repeat the process starting from Step 2 automatically.
If all files have been committed, report the completion to the user and show a brief summary of the commits made using `git log -n <number_of_commits> --oneline`.