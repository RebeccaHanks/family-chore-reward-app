# F1 — User Registration & Login

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F1 |
| **Section** | User Authentication |
| **Severity** | BLOCKER |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | None |
| **Unblocks** | F2, F3, F6, F8 |

---

## 1. Problem Statement

Users need a way to create an account and securely log into the website. Without accounts, the website cannot save chores, rewards, points, or family information for each user.

## 2. Goals

- Allow parents to create an account with an email and password.
- Allow parents to log in and log out.
- Keep account information secure.
- Allow the parent account to later create child profiles.

## 3. Non-Goals

- Social media login.
- Two-factor authentication.
- Passwordless login.

## 4. Personas & User Stories

- **As a parent**, I want to create an account so that I can set up and manage my family.
- **As a parent**, I want to log in so that I can manage chores, rewards, and my children's profiles.
- **As a parent**, I want to log out when I am finished using the website.

Child profiles and child login will be handled in F2.

## 5. Functional Requirements

- **FR-1.** The system MUST allow a parent to register with a name, email, and password.
- **FR-2.** The system MUST prevent duplicate parent email accounts.
- **FR-3.** The system MUST allow registered parents to log in.
- **FR-4.** The system MUST allow parents to log out.
- **FR-5.** The system MUST protect pages that require a logged-in parent.

## 6. Non-Functional Requirements

- **Security** — Passwords MUST be stored securely and should never be displayed as plain text.
- **Accessibility** — Login and registration forms should have clear labels and be usable with a keyboard.
- **Performance** — Login and registration should respond quickly under normal use.
- **Maintainability** — Authentication should be kept separate from other major features.
- Other requirements are N/A for the initial student project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a new user, *when* they enter valid registration information, *then* an account is created.
- **AC-2.** *Given* an existing email address, *when* someone tries to register with it again, *then* an error is shown.
- **AC-3.** *Given* a registered user, *when* they enter the correct email and password, *then* they are logged in.
- **AC-4.** *Given* incorrect login information, *when* the user tries to log in, *then* an error is shown.
- **AC-5.** *Given* a logged-in user, *when* they select logout, *then* their session ends.

## 8. Data Model

### Parent User

- id
- name
- email
- password
- createdAt

The parent's email must be unique so that the same email cannot be used for multiple accounts.

Child profiles will be connected to the parent/family in F2.

## 9. API Surface

Possible API interactions:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Registration will accept the user's name, email, and password. Login will accept an email and password.

## 10. UI / UX

Pages needed:

- Registration page
- Login page

The forms should have clear labels and error messages. The pages should work on both mobile and desktop screens.

Basic flow:

1. User opens the registration page.
2. User enters their information.
3. Account is created.
4. User logs in.
5. User is taken to their account/dashboard.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature will later connect with family accounts, user roles, chores, rewards, and dashboards.

## 13. Dependencies & Sequencing

- Must ship after: None.
- Must ship before: F2, F3, F6, and F8.
- This should be one of the first features completed because other features depend on having users.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| User passwords are not stored securely | L | H | Use secure password storage |
| Duplicate accounts are created | M | M | Require unique email addresses |
| Users access protected pages without logging in | M | H | Require authentication on protected pages |

## 15. Rollout Plan

This feature will be tested before other user-specific features are added. If authentication does not work correctly, dependent features should not be added until the problem is fixed.

## 16. Test Plan

- Test successful registration.
- Test duplicate email registration.
- Test successful login.
- Test incorrect login information.
- Test logout.
- Test access to protected pages while logged out.
- Test forms on mobile and desktop sizes.

## 17. Documentation & Training

The README should explain how accounts and authentication work. API documentation should also include the authentication endpoints.

## 18. Open Questions

1. How long should a parent stay logged in before they are automatically logged out?

## 19. References

- Family Chore & Reward App project specification.
- Related plans will be stored in `docs/plans/`.