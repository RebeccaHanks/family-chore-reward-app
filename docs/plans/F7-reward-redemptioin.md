# F7 — Reward Redemption

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F7 |
| **Section** | Reward Redemption |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F5, F6 |
| **Unblocks** | F8 |

---

## 1. Problem Statement

Children need a way to use the points they earn from chores. The website needs to check that a child has enough points before allowing them to redeem a reward and then update their point balance.

## 2. Goals

- Allow children to redeem available rewards.
- Check that a child has enough points.
- Subtract the correct number of points.
- Keep a record of redeemed rewards.
- Allow parents to see reward redemptions.

## 3. Non-Goals

- Parents approving reward requests.
- Refunds for redeemed rewards.
- Notifications.
- Expiring rewards.
- Limits on how many times a reward can be redeemed.

These could be added later if needed.

## 4. Personas & User Stories

- **As a child**, I want to redeem rewards with the points I have earned.
- **As a child**, I want to know if I have enough points for a reward.
- **As a child**, I want to see my updated point balance after redeeming something.
- **As a parent**, I want to see which rewards my children have redeemed.

## 5. Functional Requirements

- **FR-1.** Children MUST be able to redeem an available reward.
- **FR-2.** The system MUST check the child's point balance before allowing redemption.
- **FR-3.** A child MUST NOT be able to redeem a reward if they do not have enough points.
- **FR-4.** The system MUST subtract the reward's point cost after a successful redemption.
- **FR-5.** Points MUST only be deducted once for each redemption.
- **FR-6.** The system MUST save a record of each successful redemption.
- **FR-7.** Parents MUST be able to view reward redemptions for their family.
- **FR-8.** Children MUST only be able to redeem rewards belonging to their family.

## 6. Non-Functional Requirements

- **Security** — Children must not be able to manually change the point cost or their point balance.
- **Privacy** — Redemption information should only be available within the correct family.
- **Reliability** — Points must only be deducted once for each redemption.
- **Performance** — The updated point balance should appear quickly after redemption.
- **Accessibility** — Redeem buttons and messages should have clear labels and be keyboard accessible.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a child with enough points, *when* they redeem a reward, *then* the reward is successfully redeemed.
- **AC-2.** *Given* a successful redemption, *when* it is completed, *then* the reward's point cost is subtracted from the child's balance.
- **AC-3.** *Given* a child without enough points, *when* they try to redeem a reward, *then* the redemption is denied and their points do not change.
- **AC-4.** *Given* a successful redemption, *when* the parent views redemption history, *then* the redeemed reward is shown.
- **AC-5.** *Given* a successful redemption, *when* the child views their points, *then* the new balance is displayed.
- **AC-6.** *Given* a reward from another family, *when* a child tries to redeem it, *then* access is denied.

## 8. Data Model

### Reward Redemption

- id
- rewardId
- childId
- familyId
- pointCost
- redeemedAt

The existing Child Profile will also be updated.

### Child Profile

- id
- points

The point cost should be saved with the redemption so there is a record of how many points were spent at the time.

## 9. API Surface

Possible API interactions:

```text id="b7w5qe"
POST /api/rewards/:id/redeem
GET  /api/redemptions
```

The redeem action will:

1. Find the selected reward.
2. Check the child's current points.
3. Confirm the child has enough points.
4. Subtract the reward cost.
5. Save the redemption.

Parents can view the family's redemption history.

## 10. UI / UX

Children will see their point balance and available rewards.

Example:

```text id="6v4pgq"
Your Points: 125

Ice Cream Trip
50 Points
[ Redeem ]

Extra Screen Time
75 Points
[ Redeem ]

Movie Night
150 Points
[ Not Enough Points ]
```

Basic flow:

1. Child opens the rewards page.
2. Child sees their current points.
3. Child chooses a reward.
4. The website checks their points.
5. The reward is redeemed.
6. The point cost is subtracted.
7. The child's updated balance is shown.

If the child does not have enough points, the reward should clearly show that it cannot be redeemed yet.

The page should work on both mobile and desktop.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F2 Family & User Roles
- F5 Points System
- F6 Reward Management
- F8 Dashboards

## 13. Dependencies & Sequencing

- Must ship after: F5 and F6.
- Must ship before: F8.
- Children need a working point balance and available rewards before redemption can work.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Child redeems reward without enough points | M | H | Check current balance before redemption |
| Points are deducted twice | L | H | Process each redemption only once |
| Wrong number of points is deducted | L | H | Use the saved reward point cost |
| Child redeems another family's reward | L | H | Check the reward's family before redemption |

## 15. Rollout Plan

Reward redemption will be added after the points system and reward management are working. Successful and unsuccessful redemptions will be tested before displaying redemption history on the parent dashboard.

## 16. Test Plan

- Test a successful reward redemption.
- Test a child with exactly enough points.
- Test a child without enough points.
- Test the correct number of points is deducted.
- Test that points cannot be deducted twice.
- Test that a redemption record is created.
- Test parent access to redemption history.
- Test that children cannot redeem another family's rewards.
- Test the rewards page on mobile and desktop.

## 17. Documentation & Training

The README should explain how children redeem rewards and how points are deducted. API documentation should include the reward redemption endpoint.

## 18. Open Questions

1. Should children have a separate page showing their past reward redemptions?

For the MVP, this is not required. Parents will be able to see the redemption history, while children will see their current points and available rewards.

## 19. References

- Family Chore & Reward App project specification.
- `F5-points-system.md`
- `F6-reward-management.md`
- Related plans are stored in `docs/plans/`.