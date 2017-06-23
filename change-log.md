# v 1.0.4

## Features
- fix headers on downloaded report files
- add Client status to mentee details
- allow Admin edit and delete Skills

# v 1.0.3

## Features
- fix lenken to use ssl in production
- link Mentor name on Request details to profile page
- create new skills
- allow Admin User view report based on percentage in descending order
- add loading graphic to Admin Skills page 


# v 1.0.2

## Features

#### Requests

- Mentee name now show up on requests (Admin and Offer mentorship tab)

#### Reports
- Users can download csv versions of the mentorship requests statistics
- Average time to match now included in Reports
- Location filter now uses full location names, no longer location codes

## Fixed Bugs
- Users are now auto redirected to use SSL, which fixes the issue of Lenken not loading all assets
- All requests now show up on page load on the Admin requests tab


# v 1.0.1

## Features

- Mentorship request detail page now shows real mentee information
- Request list font color no longer appear inactive
- Filtering by time & location
- Skills chart updates based on selected period and location
- Integration of Segment and Intercom

## Fixed Bugs
- Mentor profile page loads correctly without errors
- Users can no longer indicate interest in their own requests
- Filtering by status and skills works

## Known Bugs
- Admin report page no longer shows any mentorship requests
- On first load, requests are filtered by time in the last day even though "All days is selected" for admin view.
- Viewing all requests shows a static name "Abolaji Femi" instead of actual mentee's name
- Viewing requests to offer mentorship shows static name "Jorg Are".

# v 1.0.0

## Features

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

## Known Bugs

- On first load, requests are filtered by time in the last day even though "All days is selected" for admin view.
- Filtering by status and skills does not work
- Viewing all requests shows a static name "Abolaji Femi" instead of actual mentee's name
- Viewing requests to offer mentorship shows static name "Jorg Are".
