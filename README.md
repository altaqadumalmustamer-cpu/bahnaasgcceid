# BAHNAAS GCC Emirates ID

Bilingual Arabic/English Angular landing page for the BAHNAAS GCC Emirates ID assistance campaign.

## Included
- Angular 19 standalone application, responsive desktop and mobile layout.
- Arabic-first content with RTL Arabic and LTR English language switching.
- Hero, six-field enquiry form, four service cards, benefits, process, FAQ and footer.
- Required-field and email validation.
- Clear private-provider disclaimer: BAHNAAS is not a government entity and does not guarantee approval or issuance.
- Catalyst integration point is intentionally inactive until its endpoint is configured.

## Run locally
```bash
npm install
npm start
npm run build
```

## Zoho Catalyst integration
Set `apiUrl` in `src/environments/environment.ts` to the HTTPS Catalyst function endpoint when ready. The frontend sends:
```json
{
  "fullName": "Full name",
  "email": "name@example.com",
  "whatsapp": "+971...",
  "nationality": "Omani",
  "purpose": "New application",
  "serviceRequired": "New Emirates ID",
  "preferredLanguage": "ar",
  "source": "BAHNAAS GCC Emirates ID"
}
```
Validate and sanitize on Catalyst, apply spam protection, then create the CRM Lead server-side. Keep OAuth credentials and CRM secrets in Catalyst environment variables, never in this repository or Angular.

## Proposed CRM mapping
- fullName → Last Name (or split into First Name / Last Name if the CRM layout requires it)
- email → Email
- whatsapp → Phone
- nationality → Nationality
- purpose → Purpose
- serviceRequired → Service Required
- preferredLanguage → optional custom field
- source → Lead Source / campaign tracking

Confirm actual CRM API field names and picklist values before enabling live submissions.

## Before launch
Confirm approved contact details, privacy notice, fees, eligibility and official requirements. Replace temporary remote Unsplash photography with approved Figma exports. Configure Catalyst and test CRM lead creation, Arabic/English, RTL/LTR, mobile layout and form errors.
