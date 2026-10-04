# F5 — Points System

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F5 |
| **Section** | Points System |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F3, F4 |
| **Unblocks** | F7, F8 |

---

## 1. Problem Statement

Children need a way to earn points for completing their chores. The website needs to keep track of these points so children can save them and later use them for rewards.

## 2. Goals

- Automatically give points for approved chores.
- Keep track of each child's point balance.
- Allow children and parents to view the child's points.
- Prevent points from being earned more than once for the same chore.

## 3. Non-Goals

- Manually adding bonus points.
- Point streaks or multipliers.
- Badges or achievements.
- Family leaderboards.
- Reward redemption.

Reward redemption will be handled in F7.

## 4. Personas & User Stories

- **As a child**, I want to earn points when my chores are approved.
- **As a child**, I want to see how many points I have.
- **As a parent**, I want points to be automatically added after I approve a chore.
- **As a parent**, I want to see how many points each child has.

## 5. Functional Requirements

- **FR-1.** The system MUST add the chore's point value to the child's balance after the parent approves the chore.
- **FR-2.** Points MUST only be awarded once for each approved chore.
- **FR-3.** The system MUST keep a point balance for each child.
- **FR-4.** Children MUST be able to view their current point balance.
- **FR-5.** Parents MUST be able to view the point balance of children in their family.
- **FR-6.** Children MUST NOT be able to manually change their point balance.
- **FR-7.** Points MUST NOT be awarded for rejected or unfinished chores.

## 6. Non-Functional Requirements

- **Security** — Children must not be able to manually change their points.
- **Privacy** — Point information should only be available within the correct family.
- **Reliability** — The same chore must not award points more than once.
- **Performance** — The point balance should update quickly after a chore is approved.
- **Accessibility** — Point totals should be clearly labeled and easy to read.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a chore waiting for approval, *when* the parent approves it, *then* the chore's point value is added to the assigned child's balance.
- **AC-2.** *Given* an approved chore, *when* an attempt is made to approve it again, *then* no additional points are added.
- **AC-3.** *Given* a rejected chore, *when* it returns to the child's chore list, *then* no points are added.
- **AC-4.** *Given* a child with earned points, *when* they view their profile or dashboard, *then* their current point balance is displayed.
- **AC-5.** *Given* a parent, *when* they view a child's profile, *then* the child's current point balance is displayed.
- **AC-6.** *Given* a child user, *when* they try to manually change their point balance, *then* the action is denied.

## 8. Data Model

The Child Profile will store the child's current point balance.

### Child Profile

- id
- familyId
- name
- username
- PIN
- points
- createdAt

The existing Chore model will provide the number of points earned.

### Chore

- id
- assignedTo
- pointValue
- status
- approvedAt

Points will only be added when a chore changes to the approved status.

## 9. API Surface

Possible API interactions:

```text id="ghd7bs"
GET /api/children/:id/points
```

The existing chore approval action from F4 will also update the child's point balance:

```text id="7z32r6"
POST /api/chores/:id/approve
```

The points should be updated automatically. Children will not have an API action for manually changing their points.

## 10. UI / UX

The child's current points should be easy to see on their dashboard.

Example:

```text id="0uy5c1"
------------------------
      MY POINTS

          125
------------------------
```

Parents should also be able to see each child's point balance when viewing family members.

Basic flow:

1. Child completes a chore.
2. Parent approves the chore.
3. The chore's points are automatically added.
4. The child's point balance updates.
5. The child can see their new total.

The point total should display clearly on both mobile and desktop.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F2 Family & User Roles
- F3 Chore Management
- F4 Chore Completion & Parent Approval
- F7 Reward Redemption
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F3 and F4.
- Must ship before: F7.
- Chores need point values and must be approved before points can be earned.
- The points system must work before children can spend points on rewards.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Points are awarded twice | M | H | Only award points when the chore first changes to Approved |
| Wrong child receives points | L | H | Use the chore's assigned child |
| Points are awarded for rejected chores | L | M | Only award points for Approved status |
| Child changes their own points | L | H | Do not allow child access to point-changing actions |

## 15. Rollout Plan

The point balance will first be added to child profiles. Next, approved chores will be connected to the point system. Testing will confirm that points are only awarded once before reward redemption is added.

## 16. Test Plan

- Test points being added after chore approval.
- Test the correct number of points is added.
- Test that the correct child receives the points.
- Test that rejected chores do not award points.
- Test that a chore cannot award points twice.
- Test child point display.
- Test parent view of child points.
- Test that children cannot manually change their points.

## 17. Documentation & Training

The README should explain how children earn points. API documentation should explain that chore approval automatically updates the child's point balance.

## 18. Open Questions

1. Should parents be able to manually add or remove points?

For the MVP, the answer is no. Points will only change through approved chores and reward redemption.

## 19. References

- Family Chore & Reward App project specification.
- `F3-chore-management.md`
- `F4-chore-completion-approval.md`
- Related plans are stored in `docs/plans/`.