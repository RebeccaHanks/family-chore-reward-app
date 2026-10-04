# F8 — Parent & Child Dashboards

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F8 |
| **Section** | Parent & Child Dashboards |
| **Severity** | MAJOR |
| **Markets** | Family users |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Team |
| **Depends on** | F1, F2, F3, F4, F5, F6, F7 |
| **Unblocks** | None |

---

## 1. Problem Statement

Parents and children need a simple place to see the information that is most important to them. The dashboard will bring together chores, points, rewards, and family information without making users visit several different pages.

## 2. Goals

- Create a dashboard for parents.
- Create a simpler dashboard for children.
- Show important chore information.
- Show point balances and rewards.
- Give users easy access to the main parts of the website.

## 3. Non-Goals

- Advanced charts or reports.
- Family leaderboards.
- Chore streaks.
- Custom dashboard layouts.
- Notifications.

These could be added later if needed.

## 4. Personas & User Stories

- **As a parent**, I want to quickly see chores that need my approval.
- **As a parent**, I want to see my children and their point balances.
- **As a parent**, I want quick access to chores, rewards, and family settings.
- **As a child**, I want to see my assigned chores when I log in.
- **As a child**, I want to see how many points I have.
- **As a child**, I want easy access to the rewards I can earn.

## 5. Functional Requirements

- **FR-1.** The system MUST show a parent dashboard to parent users.
- **FR-2.** The system MUST show a child dashboard to child users.
- **FR-3.** The parent dashboard MUST show chores waiting for approval.
- **FR-4.** The parent dashboard MUST show family members and their point balances.
- **FR-5.** The parent dashboard MUST provide access to chore and reward management.
- **FR-6.** The child dashboard MUST show chores assigned to that child.
- **FR-7.** The child dashboard MUST show the child's current point balance.
- **FR-8.** The child dashboard MUST provide access to available rewards.
- **FR-9.** Children MUST NOT see parent-only controls.
- **FR-10.** Dashboard information MUST only come from the user's own family.

## 6. Non-Functional Requirements

- **Security** — Parent-only actions must not appear or be available to child users.
- **Privacy** — Dashboard information must only show data from the correct family.
- **Accessibility** — Navigation, buttons, and dashboard sections should have clear labels and keyboard support.
- **Performance** — The main dashboard should load quickly during normal use.
- **Responsive Design** — The dashboard should work on both mobile and desktop screens.
- **Maintainability** — Parent and child dashboard sections should be clearly separated.
- Other requirements are N/A for the initial project.

## 7. Acceptance Criteria

- **AC-1.** *Given* a logged-in parent, *when* they open the dashboard, *then* the parent dashboard is displayed.
- **AC-2.** *Given* a child profile, *when* the child opens the dashboard, *then* the child dashboard is displayed.
- **AC-3.** *Given* chores waiting for approval, *when* the parent opens their dashboard, *then* those chores are shown.
- **AC-4.** *Given* a parent with child profiles, *when* they view the dashboard, *then* each child's current point balance is shown.
- **AC-5.** *Given* a child with assigned chores, *when* they open their dashboard, *then* their chores are displayed.
- **AC-6.** *Given* a child with earned points, *when* they open their dashboard, *then* their current point balance is displayed.
- **AC-7.** *Given* a child user, *when* they view their dashboard, *then* parent-only controls are not shown.
- **AC-8.** *Given* any family user, *when* they view their dashboard, *then* information from another family is not displayed.

## 8. Data Model

No new main data model is required for the dashboard.

The dashboard will use information from existing models:

### Parent User
- id
- name
- familyId

### Child Profile
- id
- familyId
- name
- points

### Chore
- id
- assignedTo
- title
- pointValue
- dueDate
- status

### Reward
- id
- familyId
- title
- pointCost

### Reward Redemption
- id
- rewardId
- childId
- redeemedAt

## 9. API Surface

The dashboard may use existing API endpoints from earlier features.

Possible interactions include:

```text id="9tnb3e"
GET /api/chores
GET /api/rewards
GET /api/families/:id
GET /api/children/:id/points
GET /api/redemptions
```

No major new API endpoints are required unless a combined dashboard endpoint is needed later.

## 10. UI / UX

### Parent Dashboard

The parent dashboard should show:

- Family name
- Children and their point balances
- Chores waiting for approval
- Upcoming chores
- Quick link to add a chore
- Quick link to manage rewards
- Quick link to manage family members

Example:

```text id="e0d6ps"
----------------------------------------
           FAMILY DASHBOARD

Chores Waiting for Approval

Clean Bedroom - James - 10 Points
[ Approve ] [ Reject ]

Family

James     125 Points
Sarah      80 Points

Upcoming Chores

Take Out Trash - James
Wash Dishes - Sarah

[ + Add Chore ]    [ Manage Rewards ]

Chores | Rewards | Family | Profile
----------------------------------------
```

### Child Dashboard

The child dashboard should be simpler and focused on the child's own information.

Example:

```text id="mofv9b"
----------------------------------------
            HI, JAMES!

Your Points
    125

My Chores

Clean Bedroom
Due Today
+10 Points
[ Mark Complete ]

Take Out Trash
Due Tomorrow
+5 Points
[ Mark Complete ]

[ View Rewards ]

Home | Chores | Rewards
----------------------------------------
```

### Basic Parent Flow

1. Parent logs in.
2. Parent is taken to the parent dashboard.
3. Parent sees chores that need approval.
4. Parent can view family points and upcoming chores.
5. Parent can navigate to chores, rewards, or family settings.

### Basic Child Flow

1. Child selects their profile.
2. Child enters their PIN.
3. Child is taken to their dashboard.
4. Child sees their points and chores.
5. Child can mark chores complete or view rewards.

The dashboard should adjust to smaller mobile screens by stacking sections vertically.

## 11. AI / ML Considerations

N/A — This feature does not use AI or machine learning.

## 12. Integration Points

This feature connects with:

- F1 User Registration & Login
- F2 Family & User Roles
- F3 Chore Management
- F4 Chore Completion & Parent Approval
- F5 Points System
- F6 Reward Management
- F7 Reward Redemption

## 13. Dependencies & Sequencing

- Must ship after: F1, F2, F3, F4, F5, F6, and F7.
- Must ship before: N/A.
- The dashboard should be completed after the main features because it displays information from those features.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Too much information makes the dashboard confusing | M | M | Only show the most important information |
| Child sees parent controls | L | H | Display controls based on user role |
| Wrong family's information appears | L | H | Filter all information by family |
| Dashboard is difficult to use on mobile | M | M | Use a responsive layout and test smaller screens |

## 15. Rollout Plan

The parent dashboard will first be connected to existing family and chore information. The child dashboard will then be connected to chores, points, and rewards. Both dashboards will be tested on desktop and mobile before the feature is considered complete.

## 16. Test Plan

- Test parent dashboard access.
- Test child dashboard access.
- Test parent approval list.
- Test child point balances on the parent dashboard.
- Test assigned chores on the child dashboard.
- Test the child's point balance.
- Test navigation to chores and rewards.
- Test that children cannot see parent controls.
- Test that information from another family does not appear.
- Test mobile and desktop layouts.
- Test keyboard navigation and readable labels.

## 17. Documentation & Training

The README should explain the difference between the parent and child dashboards. Any important dashboard actions should also be included in the user documentation.

## 18. Open Questions

1. Should redeemed rewards appear directly on the parent dashboard?

For the MVP, the parent dashboard can show a simple recent redemption section if there is enough space. A full reward history can stay on a separate page.

## 19. References

- Family Chore & Reward App project specification.
- `F1-user-registration-login.md`
- `F2-family-user-roles.md`
- `F3-chore-management.md`
- `F4-chore-completion-approval.md`
- `F5-points-system.md`
- `F6-reward-management.md`
- `F7-reward-redemption.md`
- Related plans are stored in `docs/plans/`.