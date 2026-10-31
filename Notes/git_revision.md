Let's create a proper Git & GitHub reference note for your TypeScript learning repository. These are the commands you'll use regularly while working on projects.

# Git & GitHub – Basic Commands

## 1. Initial setup

Install Git and configure your identity.

```
git config --global user.name "Mahesh Mane"
git config --global user.email "your-email@gmail.com"
```

Check configuration:

```
git config --global --list
```

## 2. Initialize a repository

Navigate to your project folder:

```
cd typescript-learning
```

Initialize Git:

```
git init
```

This creates a hidden `.git` folder that stores repository history and configuration.

Check repository status:

```
git status
```

## 3. Add files to staging

Add all files:

```
git add .
```

Add a specific file:

```
git add README.md
```

Check staged changes:

```
git status
```

What is staging?

Staging means selecting which changes you want to include in your next commit.

## 4. Commit changes

```
git commit -m "Initial commit"
```

A commit is a snapshot of your staged changes.

Good commit messages:

```
git commit -m "Add TypeScript basics"
git commit -m "Add notes on type inference"
git commit -m "Add function examples"
git commit -m "Update project documentation"
```

## 5. Connect to GitHub

First, create an empty repository on GitHub.

Then connect your local repository:

```
git remote add origin https://github.com/username/typescript-learning.git
```

Check remote connection:

```
git remote -v
```

Rename the current branch to `main`:

```
git branch -M main
```

## 6. Push code to GitHub

```
git push -u origin main
```

Here:

- `push` – uploads commits to GitHub.
- `origin` – remote repository name.
- `main` – branch name.
- `-u` – sets the upstream branch for future pushes.

Next time, simply use:

```
git push
```

## 7. Regular workflow (Most important)

Whenever you make changes to your TypeScript code or notes:

```
git status

git add .

git commit -m "Add notes on interfaces"

git push
```

This is the workflow you'll use most frequently.

## 8. Other useful Git commands

| Command                      | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `git log`                    | View commit history                |
| `git log --oneline`          | Compact commit history             |
| `git diff`                   | See unstaged changes               |
| `git diff --staged`          | See staged changes                 |
| `git branch`                 | List local branches                |
| `git branch feature-name`    | Create a branch                    |
| `git switch branch-name`     | Switch branches                    |
| `git switch -c feature-name` | Create and switch branch           |
| `git pull`                   | Fetch and integrate remote changes |
| `git clone URL`              | Clone a repository                 |
| `git restore file.ts`        | Discard unstaged changes in a file |
| `git rm file.ts`             | Remove a tracked file              |
| `git stash`                  | Temporarily save working changes   |

## 9. Important Git concepts

- Working Directory: Where you write and modify code.
- Staging Area: Where you prepare changes for committing.
- Repository: Where Git stores committed project history.
- Commit: A snapshot of your changes.
- Remote: Your connected GitHub repository.
- Branch: An independent line of development.

Remember this workflow

Working Directory

`git add .`

Staging Area

`git commit`

Local Repository

`git push`

GitHub Remote Repository

## 10. Recommended README reference

You can save these notes in:

`notes/git-github-basics.md`

And add this to your main README:

```
## Git & GitHub Reference

Learning Git alongside TypeScript.

- [Git & GitHub Basic Commands](notes/git-github-basics.md)
```

One important tip: Add a `.gitignore` file before your first push.

For a TypeScript/Node project, include:

```
node_modules/
dist/
.env
.env.*
!.env.example
```

This prevents dependencies, build output and environment secrets from being pushed to GitHub.