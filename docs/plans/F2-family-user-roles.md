# F2 — Family & User Roles

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F2 |
| **Section** | Family & User Roles |
| **Severity** | BLOCKER |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F1 |
| **Unblocks** | F3, F4, F6, F8 |

---

## 1. Problem Statement

Parents need a way to create their family and add children without requiring each child to have an email account. The website also needs to know whether someone is a parent or child so they only have access to the correct features.

## 2. Goals

- Allow a parent to create a family.
- Allow parents to create and manage child profiles.
- Allow children to access their profile with a username and PIN.
- Give parents and children different permissions.

## 3. Non-Goals

- Children creating their own accounts.
- Children needing an email address.
- Multiple families connected to one parent account.
- Advanced family invitation systems.

## 4. Personas & User Stories

- **As a parent**, I want to create a family so that I can manage my children's chores and rewards.
- **As a parent**, I want to add child profiles without needing an email for each child.
- **As a parent**, I want to edit or remove a child profile.
- **As a child**, I want to access my profile using a simple username and PIN.
- **As a parent**, I want children to have limited permissions so they cannot change parent settings.

## 5. Functional Requirements

- **FR-1.** The system MUST allow a logged-in parent to create a family.
- **FR-2.** The system MUST allow a parent to create child profiles.
- **FR-3.** A child profile MUST include a name or username and PIN.
- **FR-4.** The system MUST allow parents to edit child profiles.
- **FR-5.** The system MUST allow parents to remove child profiles.
- **FR-6.** The system MUST identify users as either a parent or child.
- **FR-7.** Children MUST NOT have access to parent-only actions.
- **FR-8.** A child MUST only be able to access their own profile information.

## 6. Non-Functional Requirements

- **Security** — Child PINs should be stored securely and should not be displayed after they are saved.
- **Privacy** — Children should only have access to information needed for their own profile.
- **Accessibility** — Forms and buttons should have clear labels and be keyboard accessible.
- **Performance** — Family and child profile information should load quickly under normal use.
- **Maintainability** — Parent and child permissions should be clearly separated.
- Other requirements are N/A for the initial student project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a logged-in parent, *when* they create a family, *then* the family is connected to their account.
- **AC-2.** *Given* a parent with a family, *when* they add a child with a name and PIN, *then* the child profile is created.
- **AC-3.** *Given* an existing child profile, *when* the parent edits the profile, *then* the new information is saved.
- **AC-4.** *Given* a child profile, *when* the correct username and PIN are entered, *then* the child can access their profile.
- **AC-5.** *Given* an incorrect PIN, *when* a child tries to access their profile, *then* access is denied.
- **AC-6.** *Given* a child user, *when* they try to access a parent-only page, *then* access is denied.
- **AC-7.** *Given* a parent, *when* they remove a child profile, *then* that child can no longer access the profile.

## 8. Data Model

### Family

- id
- familyName
- parentId
- createdAt

### Child Profile

- id
- familyId
- name
- username
- PIN
- points
- createdAt

Each child belongs to one family. The parent account is connected to the family.

The child's username should be unique within their family.

## 9. API Surface

Possible API interactions:

```text
POST   /api/families
GET    /api/families/:id

POST   /api/families/:id/children
PUT    /api/children/:id
DELETE /api/children/:id

POST   /api/children/login
GET    /api/children/:id
```

Parent authentication is required to create, edit, or remove child profiles.

Child login will use the child's username and PIN.

## 10. UI / UX

Pages or sections needed:

- Family setup page
- Family management page
- Add child form
- Edit child form
- Child login/profile selection

Basic parent flow:

1. Parent logs in.
2. Parent creates their family.
3. Parent selects "Add Child."
4. Parent enters the child's name, username, and PIN.
5. The child is added to the family.

Basic child flow:

1. Child selects their profile or enters their username.
2. Child enters their PIN.
3. The website verifies the PIN.
4. The child is taken to their dashboard.

The pages should work on both mobile and desktop screens.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F1 User Registration & Login
- F3 Chore Management
- F4 Chore Completion & Approval
- F5 Points System
- F6 Reward Management
- F7 Reward Redemption
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F1.
- Must ship before: F3, F4, F6, and F8.
- Authentication must work before families and child profiles can be securely connected to a parent.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Child accesses parent features | M | H | Check the user's role before allowing parent actions |
| Child PIN is exposed | L | H | Store PINs securely |
| Duplicate child usernames cause confusion | M | M | Require unique usernames within a family |
| Child accesses another child's profile | L | H | Limit child access to their own profile |

## 15. Rollout Plan

This feature will be added after parent authentication is working. Family creation will be tested first, followed by child profile creation and child access. Role permissions should be working before chore and reward features are added.

## 16. Test Plan

- Test family creation.
- Test adding a child.
- Test editing a child.
- Test removing a child.
- Test successful child access with the correct PIN.
- Test an incorrect PIN.
- Test parent-only pages while using a child profile.
- Test that a child cannot access another child's information.
- Test family pages on mobile and desktop.

## 17. Documentation & Training

The README should explain how parent and child accounts work. API documentation should include family and child profile endpoints.

## 18. Open Questions

1. Should the child choose their profile from a family screen before entering their PIN, or should they type their username?
2. Should parents be able to reset a child's PIN if it is forgotten?

## 19. References

- Family Chore & Reward App project specification.
- `F1-user-registration-login.md`
- Related plans are stored in `docs/plans/`.