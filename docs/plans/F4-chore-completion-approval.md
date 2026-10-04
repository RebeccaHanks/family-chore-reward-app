# F4 — Chore Completion & Parent Approval

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F4 |
| **Section** | Chore Completion & Approval |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F2, F3 |
| **Unblocks** | F5, F8 |

---

## 1. Problem Statement

Children need a way to show their parents when they have finished a chore. Parents also need to approve the chore before it counts as completed and points are earned.

## 2. Goals

- Allow children to mark their assigned chores as complete.
- Show completed chores to the parent for approval.
- Allow parents to approve or reject completed chores.
- Clearly show the current status of each chore.

## 3. Non-Goals

- Adding points to the child's balance.
- Reward redemption.
- Notifications.
- Chore streaks or achievements.
- Photo proof of completed chores.

Points will be handled separately in F5.

## 4. Personas & User Stories

- **As a child**, I want to mark a chore complete so my parent knows I finished it.
- **As a child**, I want to see whether my chore is waiting for approval.
- **As a parent**, I want to see chores waiting for approval.
- **As a parent**, I want to approve a completed chore.
- **As a parent**, I want to reject a chore if it still needs to be finished.

## 5. Functional Requirements

- **FR-1.** A child MUST be able to mark one of their assigned chores as complete.
- **FR-2.** A child MUST NOT be able to mark another child's chore as complete.
- **FR-3.** A completed chore MUST change to a waiting-for-approval status.
- **FR-4.** Parents MUST be able to view chores waiting for approval.
- **FR-5.** Parents MUST be able to approve a completed chore.
- **FR-6.** Parents MUST be able to reject a completed chore.
- **FR-7.** A rejected chore MUST return to the child's active chore list.
- **FR-8.** Children MUST NOT be able to approve their own chores.

## 6. Non-Functional Requirements

- **Security** — Only the assigned child can mark their chore complete, and only a parent can approve or reject it.
- **Privacy** — Chore information should only be available to members of the correct family.
- **Accessibility** — Complete, approve, and reject buttons should have clear labels and be keyboard accessible.
- **Performance** — Chore status changes should appear quickly after an action.
- **Reliability** — A chore should not accidentally be approved or rejected more than once.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a child with an assigned chore, *when* they mark it complete, *then* the chore changes to waiting for approval.
- **AC-2.** *Given* a completed chore, *when* the parent views their approval list, *then* the chore appears there.
- **AC-3.** *Given* a chore waiting for approval, *when* the parent approves it, *then* its status changes to approved.
- **AC-4.** *Given* a chore waiting for approval, *when* the parent rejects it, *then* it returns to the child's active chore list.
- **AC-5.** *Given* a child user, *when* they try to approve a chore, *then* access is denied.
- **AC-6.** *Given* a child user, *when* they try to complete another child's chore, *then* access is denied.

## 8. Data Model

The existing Chore model will need to track the chore's status.

### Chore

- id
- familyId
- assignedTo
- title
- description
- pointValue
- dueDate
- status
- completedAt
- approvedAt
- createdAt

Possible statuses:

- Assigned
- Waiting for Approval
- Approved

If a chore is rejected, it will return to `Assigned`.

## 9. API Surface

Possible API interactions:

```text id="6xgkvh"
POST /api/chores/:id/complete
POST /api/chores/:id/approve
POST /api/chores/:id/reject
```

The complete action requires access to the assigned child profile.

Approve and reject actions require parent access.

## 10. UI / UX

### Child View

Assigned chores should have a **Mark Complete** button.

After selecting it, the chore should show:

```text id="huj65w"
Waiting for Parent Approval
```

### Parent View

Parents should have a section showing chores that need approval.

Example:

```text id="uy47w8"
Clean Bedroom
James
10 Points

[ Approve ] [ Reject ]
```

Basic flow:

1. Child opens their chore list.
2. Child completes the chore and selects "Mark Complete."
3. The chore moves to waiting for approval.
4. Parent sees the chore in their approval list.
5. Parent approves or rejects the chore.
6. The updated status is shown to the child.

The interface should work on both mobile and desktop.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F2 Family & User Roles
- F3 Chore Management
- F5 Points System
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F2 and F3.
- Must ship before: F5.
- Child profiles and chores must already exist before children can complete chores.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Child completes another child's chore | L | H | Check the assigned child before allowing completion |
| Child approves their own chore | L | H | Restrict approval actions to parents |
| Chore is approved multiple times | M | H | Only allow approval when status is waiting for approval |
| Rejected chore disappears | L | M | Return rejected chores to Assigned status |

## 15. Rollout Plan

Chore completion will be added first. Parent approval and rejection will then be added and tested. Once the approval process works correctly, the points system in F5 can use approved chores.

## 16. Test Plan

- Test a child marking their chore complete.
- Test that another child cannot complete the chore.
- Test that the chore moves to waiting for approval.
- Test parent approval.
- Test parent rejection.
- Test that children cannot approve chores.
- Test that a chore cannot be approved twice.
- Test that rejected chores return to the child's list.
- Test the feature on mobile and desktop.

## 17. Documentation & Training

The README should explain how chore completion and parent approval work. API documentation should include the complete, approve, and reject actions.

## 18. Open Questions

1. Should a parent be able to add a reason when rejecting a chore?

## 19. References

- Family Chore & Reward App project specification.
- `F2-family-user-roles.md`
- `F3-chore-management.md`
- Related plans are stored in `docs/plans/`.