# Contributing

Thank you for taking the time to contribute! ♥️ You can:

- Submit [bug reports or feature requests](../../issues/new/choose). Contribute to discussions. Fix [open issues](../../issues).
- Improve docs, the code and more! Any idea is welcome.

# Git Branch and Commit Naming Rules

## **Branch Naming Rules**

### 1. **Main Branches**
- `main` — stable branch for production.
- `dev` — main branch for development. All changes from temporary branches are merged here before being merged into `main`.

### 2. **Temporary Branches**
Use **clear and descriptive branch names** to easily understand the purpose of the branch. Format:

```
<type>/<description>
```


#### **Branch Types**
- **feature/** — for new feature development.
  - Example: `feature/add-user-profile`, `feature/localization`
- **bugfix/** — for fixing bugs.
  - Example: `bugfix/fix-login-redirect`, `bugfix/update-error-handling`
- **hotfix/** — for urgent fixes in `main`.
  - Example: `hotfix/fix-critical-bug`, `hotfix/update-env-vars`
- **release/** — for preparing releases.
  - Example: `release/v1.0.0`, `release/v1.1.0`
- **docs/** — for updating documentation.
  - Example: `docs/api-update`, `docs/add-readme`

#### **Examples**
- `feature/add-payment-system`
- `bugfix/fix-placeholders`
- `release/v1.2.3`
- `hotfix/fix-security-vulnerability`
- `docs/update-api-docs`

---

## **Commit Naming Rules**

Use [Conventional Commits](https://www.conventionalcommits.org/) for standardized commit messages. Format:

```
<type>(scope): description
```


### **Main Commit Types**
- **feat** — for adding new features.
  - Example: `feat(user): add user registration`
- **fix** — for bug fixes.
  - Example: `fix(auth): correct token expiration handling`
- **docs** — for documentation changes.
  - Example: `docs(readme): update installation instructions`
- **style** — for style fixes (non-functional changes like formatting).
  - Example: `style(button): fix indentation`
- **refactor** — for refactoring code (without adding features or fixing bugs).
  - Example: `refactor(profile): optimize data fetching`
- **test** — for adding or updating tests.
  - Example: `test(api): add tests for user endpoints`
- **chore** — for tasks that don’t affect the app functionality (dependency updates, CI/CD configuration).
  - Example: `chore(deps): update axios to v1.2.3`
- **perf** — for performance improvements.
  - Example: `perf(api): reduce response time for workouts`

---

## **Examples of Commit Messages**
1. `feat(auth): implement Google login flow`
2. `fix(api): handle missing user ID in requests`
3. `docs(api): add examples for workout endpoints`
4. `refactor(workouts): simplify query logic`
5. `style(navbar): update spacing between links`
6. `chore(ci): add auto-deploy to staging`
7. `test(auth): add unit tests for token validation`

---

## **General Recommendations**
1. **Commits should be small and focused**: Each commit should represent one task or change.
2. **Write meaningful descriptions**: They should answer the question, "What has changed?"
