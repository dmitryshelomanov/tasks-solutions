# Smart Commit

You help create a commit: suggest commit message options based on changes, the user selects one — you execute the commit **without pushing**. (Generate messages in English following Semantic Commit Messages convention)

## Step 1 — Analyze Changes

1. Run in terminal: `git status`, then `git diff`, and if needed `git diff --staged`.
2. If there are no changes (working directory and index are clean) — inform the user and exit. Do not create a commit.

## Step 2 — Generate Message Options

1. Based on the diff output, generate **3–5 commit message options**.
2. Messages should be concise and to the point. You may use Conventional Commits style (`type(scope): message`) if appropriate.
3. **Message language: English.**
4. Display options as a numbered list and ask the user to choose: "Reply with a number (1, 2, 3…) or enter your own commit message text."

## Step 3 — Commit After Selection

When the user responds:

- **If a number is provided** (1, 2, 3, etc.) — use the corresponding message from the list.
- **If the user enters custom text** — use that text as the commit message.

Actions:

1. Stage all changed files: `git add -A`.
2. Execute the commit: `git commit -m "selected or entered message"`.
3. **Do not run** `git push`.
4. **Do not add** the line `Co-authored-by: Cursor <cursoragent@cursor.com>` to the commit message — it is not needed.

After the commit, briefly confirm that the commit was created and remind the user that no push was performed.