# Git hooks

Commit checks use hk, pinned in `mise.toml` and configured in `hk.pkl`.

## Install in each clone

For an existing Husky clone, first remove the repository-local `core.hooksPath` if it points into `.husky`: `git config --local --unset core.hooksPath`. Preserve unrelated custom hook paths.

```sh
mise install
mise exec -- hk install --mise
mise exec -- hk validate
```

Dependency installation does not install hooks. Repeat the hk installation in each independent clone. Linked worktrees share the repository's hook configuration.

## Run checks

```sh
mise exec -- hk check --all
mise exec -- hk fix
```

The pre-commit hook stashes unstaged and untracked work, applies formatting and lint fixes to selected files, stages those fixes, runs the existing whole-project TypeScript check, and restores the saved work. Fixes operate on whole staged files, not individual staged hunks.

If restoring unstaged work conflicts with a fix, follow hk's recovery message and inspect the index, working tree, and saved stash before continuing.
