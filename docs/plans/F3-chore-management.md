# F3 — Chore Management

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F3 |
| **Section** | Chore Management |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F1, F2 |
| **Unblocks** | F4, F5, F8 |

---

## 1. Problem Statement

Parents need a simple way to create and organize chores for their children. Each chore needs basic information such as who it is assigned to, when it is due, and how many points it is worth.

## 2. Goals

- Allow parents to create chores.
- Assign chores to a child.
- Give chores a point value and due date.
- Allow parents to view, edit, and delete chores.
- Keep chores connected to the correct family.

## 3. Non-Goals

- Completing chores.
- Approving completed chores.
- Awarding points.
- Advanced chore streaks or achievements.
- Notifications.

These features will either be handled in later plans or saved as optional features.

## 4. Personas & User Stories

- **As a parent**, I want to create chores for my children.
- **As a parent**, I want to assign a chore to a specific child.
- **As a parent**, I want to set a due date and point value.
- **As a parent**, I want to edit a chore if something changes.
- **As a parent**, I want to delete chores that are no longer needed.
- **As a child**, I want to see which chores have been assigned to me.

## 5. Functional Requirements

- **FR-1.** The system MUST allow parents to create chores.
- **FR-2.** Each chore MUST have a title.
- **FR-3.** A chore MUST be assigned to a child in the parent's family.
- **FR-4.** Parents MUST be able to add a point value to a chore.
- **FR-5.** Parents MUST be able to add a due date.
- **FR-6.** Parents MUST be able to view their family's chores.
- **FR-7.** Parents MUST be able to edit chores.
- **FR-8.** Parents MUST be able to delete chores.
- **FR-9.** Children MUST only see chores assigned to them.

## 6. Non-Functional Requirements

- **Security** — Only parents should be able to create, edit, or delete chores.
- **Privacy** — Chores should only be available to members of the correct family.
- **Accessibility** — Forms and chore lists should have clear labels and keyboard support.
- **Performance** — Chore lists should load quickly during normal use.
- **Maintainability** — Chore management should remain separate from points and rewards.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a logged-in parent, *when* they create a valid chore, *then* the chore is saved.
- **AC-2.** *Given* a family with child profiles, *when* a parent creates a chore, *then* they can assign it to one of their children.
- **AC-3.** *Given* an existing chore, *when* the parent edits it, *then* the updated information is saved.
- **AC-4.** *Given* an existing chore, *when* the parent deletes it, *then* it no longer appears in the chore list.
- **AC-5.** *Given* a child profile, *when* the child views their chores, *then* only chores assigned to that child are shown.
- **AC-6.** *Given* a child user, *when* they try to create, edit, or delete a chore, *then* access is denied.

## 8. Data Model

### Chore

- id
- familyId
- assignedTo
- title
- description
- pointValue
- dueDate
- status
- createdAt

Possible starting status:

- Assigned

The `familyId` keeps the chore connected to the correct family, and `assignedTo` connects it to a child.

## 9. API Surface

Possible API interactions:

```text id="y2c4v6"
GET    /api/chores
GET    /api/chores/:id
POST   /api/chores
PUT    /api/chores/:id
DELETE /api/chores/:id
```

Creating and changing chores requires parent access.

Children can read chores assigned to their profile but cannot create, edit, or delete them.

## 10. UI / UX

Pages or sections needed:

- Chore list
- Add chore form
- Edit chore form
- Chore details

The add chore form should include:

- Chore name
- Description
- Child
- Point value
- Due date

Basic flow:

1. Parent opens the chores page.
2. Parent selects "Add Chore."
3. Parent enters the chore information.
4. Parent selects a child.
5. Parent saves the chore.
6. The chore appears in the family's chore list and on the child's chore list.

The pages should work on mobile and desktop.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F1 User Registration & Login
- F2 Family & User Roles
- F4 Chore Completion & Parent Approval
- F5 Points System
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F1 and F2.
- Must ship before: F4 and F5.
- Users and child profiles need to exist before chores can be assigned.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Chore assigned to wrong family | L | H | Only show children from the parent's family |
| Child edits a chore | L | H | Restrict editing to parents |
| Invalid point values | M | M | Validate point values before saving |
| Missing required information | M | M | Validate required form fields |

## 15. Rollout Plan

Chore creation will be added first, followed by viewing, editing, and deleting chores. Child chore lists will then be tested before adding chore completion in F4.

## 16. Test Plan

- Test creating a chore.
- Test assigning a chore to a child.
- Test editing a chore.
- Test deleting a chore.
- Test required fields.
- Test invalid point values.
- Test a child's chore list.
- Test that children cannot create, edit, or delete chores.
- Test the chore pages on mobile and desktop.

## 17. Documentation & Training

The README should explain how parents create and assign chores. API documentation should include the chore endpoints.

## 18. Open Questions

1. Should chores be allowed without a due date?
2. Should one chore be assignable to more than one child?

## 19. References

- Family Chore & Reward App project specification.
- `F1-user-registration-login.md`
- `F2-family-user-roles.md`
- Related plans are stored in `docs/plans/`.