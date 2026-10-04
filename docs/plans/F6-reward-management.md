# F6 — Reward Management

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F6 |
| **Section** | Reward Management |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F1, F2 |
| **Unblocks** | F7, F8 |

---

## 1. Problem Statement

Parents need a way to create rewards that children can work toward with the points they earn from chores. Each reward needs a name and point cost so children know how many points they need.

## 2. Goals

- Allow parents to create rewards.
- Allow parents to set the point cost of each reward.
- Allow parents to view, edit, and delete rewards.
- Allow children to view rewards available to their family.
- Keep rewards connected to the correct family.

## 3. Non-Goals

- Redeeming rewards.
- Subtracting points.
- Reward approval.
- Reward history.
- Notifications about rewards.

Reward redemption will be handled in F7.

## 4. Personas & User Stories

- **As a parent**, I want to create rewards for my children.
- **As a parent**, I want to choose how many points each reward costs.
- **As a parent**, I want to edit a reward if I need to change it.
- **As a parent**, I want to remove rewards that are no longer available.
- **As a child**, I want to see the rewards I can work toward.

## 5. Functional Requirements

- **FR-1.** The system MUST allow parents to create rewards.
- **FR-2.** Each reward MUST have a title.
- **FR-3.** Each reward MUST have a point cost greater than zero.
- **FR-4.** Parents MUST be able to view their family's rewards.
- **FR-5.** Parents MUST be able to edit rewards.
- **FR-6.** Parents MUST be able to delete rewards.
- **FR-7.** Children MUST be able to view rewards for their family.
- **FR-8.** Children MUST NOT be able to create, edit, or delete rewards.
- **FR-9.** Rewards MUST only be available to members of the family they belong to.

## 6. Non-Functional Requirements

- **Security** — Only parents can create, edit, or delete rewards.
- **Privacy** — Rewards should only be visible to members of the correct family.
- **Accessibility** — Reward forms and buttons should have clear labels and be keyboard accessible.
- **Performance** — Reward lists should load quickly during normal use.
- **Maintainability** — Reward management should stay separate from reward redemption.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a logged-in parent, *when* they create a reward with a title and valid point cost, *then* the reward is saved.
- **AC-2.** *Given* a reward, *when* the parent edits it, *then* the updated information is saved.
- **AC-3.** *Given* a reward, *when* the parent deletes it, *then* it no longer appears in the family's available rewards.
- **AC-4.** *Given* a child profile, *when* the child views the rewards page, *then* rewards for their family are displayed.
- **AC-5.** *Given* a child user, *when* they try to create, edit, or delete a reward, *then* access is denied.
- **AC-6.** *Given* an invalid point cost, *when* a parent tries to save the reward, *then* an error is shown.

## 8. Data Model

### Reward

- id
- familyId
- title
- description
- pointCost
- createdAt

The `familyId` connects each reward to the correct family.

The `pointCost` must be greater than zero.

## 9. API Surface

Possible API interactions:

```text id="8mmgy2"
GET    /api/rewards
GET    /api/rewards/:id
POST   /api/rewards
PUT    /api/rewards/:id
DELETE /api/rewards/:id
```

Parents can create, edit, and delete rewards.

Children can view rewards but cannot change them.

## 10. UI / UX

Pages or sections needed:

- Rewards list
- Add reward form
- Edit reward form

Example reward:

```text id="d1jgn5"
------------------------
Ice Cream Trip

50 Points
------------------------
```

The parent view can include options such as:

```text id="nt3zm4"
[ Edit ] [ Delete ]
```

Children will only see the reward information.

Basic parent flow:

1. Parent opens the rewards page.
2. Parent selects "Add Reward."
3. Parent enters the reward name, description, and point cost.
4. Parent saves the reward.
5. The reward appears in the family's reward list.

Basic child flow:

1. Child opens the rewards page.
2. Child sees the available family rewards and their point costs.

The pages should work on both mobile and desktop.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F1 User Registration & Login
- F2 Family & User Roles
- F5 Points System
- F7 Reward Redemption
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F1 and F2.
- Must ship before: F7.
- Families and child profiles need to exist before rewards can be connected to a family.
- Reward management can be developed separately from the chore system.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Child changes a reward | L | H | Restrict changes to parent users |
| Reward is connected to wrong family | L | H | Use the logged-in parent's family ID |
| Invalid point cost is entered | M | M | Require a number greater than zero |
| Deleted rewards continue to appear | L | M | Remove deleted rewards from available reward lists |

## 15. Rollout Plan

Reward creation will be added first, followed by viewing, editing, and deleting rewards. Child access to the reward list will then be tested before reward redemption is added in F7.

## 16. Test Plan

- Test creating a reward.
- Test editing a reward.
- Test deleting a reward.
- Test required fields.
- Test an invalid point cost.
- Test child reward viewing.
- Test that children cannot create rewards.
- Test that children cannot edit or delete rewards.
- Test that rewards only appear for the correct family.
- Test reward pages on mobile and desktop.

## 17. Documentation & Training

The README should explain how parents create and manage rewards. API documentation should include the reward endpoints.

## 18. Open Questions

1. Should a reward be available to every child in the family or only selected children?

For the MVP, rewards will be available to every child in the family.

## 19. References

- Family Chore & Reward App project specification.
- `F2-family-user-roles.md`
- `F5-points-system.md`
- Related plans are stored in `docs/plans/`.