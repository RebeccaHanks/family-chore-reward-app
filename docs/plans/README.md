# Family Chore & Reward App — Feature Plans

## Feature Inventory

1. F1 — User Registration & Login
2. F2 — Family & User Roles
3. F3 — Chore Management
4. F4 — Chore Completion & Parent Approval
5. F5 — Points System
6. F6 — Reward Management
7. F7 — Reward Redemption
8. F8 — Parent & Child Dashboards

## Implementation Order

| Order | Feature | Depends On |
|---|---|---|
| 1 | F1 — Registration & Login | None |
| 2 | F2 — Family & User Roles | F1 |
| 3 | F3 — Chore Management | F1, F2 |
| 4 | F4 — Chore Completion & Approval | F2, F3 |
| 5 | F5 — Points System | F3, F4 |
| 6 | F6 — Reward Management | F1, F2 |
| 7 | F7 — Reward Redemption | F5, F6 |
| 8 | F8 — Dashboards | F1–F7 |

## Dependency Map

Registration → Family/Roles → Chores → Chore Approval → Points → Reward Redemption → Dashboards

Reward Management can be built after the family system and must be finished before Reward Redemption.

## First Feature

F1 should be completed first because the other features need users to be logged in before family information, chores, and rewards can be saved correctly.

## Main Risks

The main risks are making sure parent and child permissions work correctly, points are not added or removed more than once, and each family's information stays separate.

## W03 Reflection

The points system was probably the hardest feature to make testable. I had to make sure points could not be added more than once for the same chore. AI also suggested extra features that I did not really need, so I kept the project more simple. The order of the features also changed as I worked through the plans. I realized chores and approvals had to work before the points system could work. One risk I noticed was making sure children could not access things only parents should use. Planning everything out helped me see how each feature connects before starting the project.