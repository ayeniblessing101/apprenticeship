# V 1.0.0

** Features **
---

#### Requests
- Create new mentorship requests
  - Implement Google type time pickers
  - Select all feature for days
  - Disable submit button until form is valid

- Cancel mentorship requests
- Edit mentorship requests within modal window

#### Mentor (Offer mentorship)
- Enable different view for folks who want to indicate interest in a request
- Enable users indicate interest
- Disable button when the user has already indicated interest
- Enable filtering by skills possessed by potential mentor
- Enable filtering by status
- Send mail to mentee when mentor indicates interest
- Enable mentor see in-depth details about mentee

#### Mentee (Seek mentorship)
- Enable view for users who want to edit/cancel request
- Enable users view mentors who have indicated interest
- Enable users select a mentor
- Enable filtering by all skills
- Enable filtering by status
- Send mail to mentor when mentee has chosen them

#### Admin

- Enable admin see all requests made
- Enable admin filter by status
- Enable admin filter by time
- Enable admin filter by skills

** Known Bugs **
---

- On first load, requests are filtered by time in the last day even though "All days is selected" for admin view.
- Filtering by status and skills does not work
- Viewing all requests shows a static name "Abolaji Femi" instead of actual mentee's name
- Viewing requests to offer mentorship shows staic name "Jorg Are".
