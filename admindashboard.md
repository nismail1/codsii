Add a prototype institutional dashboard to the existing COD I SII Expo React Native application.

Context:
COD I SII is a mobile safety app for women in Somalia and Somaliland. The current app uses React Native, TypeScript, Expo Router, Zustand, and AsyncStorage. There is no backend. This new feature is a visual prototype only and must use clearly labeled demo data. Do not imply that real incidents, volunteers, users, or organizations are currently being monitored.

Goal:
Create a tablet/web-friendly institutional dashboard showing how approved schools, clinics, NGOs, women’s organizations, and safeguarding teams could coordinate safety responses and view anonymized community insights in the future.

Navigation:
1. Add a new route at app/admin/index.tsx.
2. Add a discreet development-only link from Settings called “View institutional dashboard demo.”
3. Do not add the dashboard to the normal bottom tab navigation.
4. Include a back button and a visible “Prototype / Demo Data” badge.

Visual style:
- Match the existing COD I SII brand.
- Cream background, charcoal text, coral accents, muted gold, soft pink.
- Rounded white cards with subtle borders and shadows.
- Use the existing theme tokens wherever possible.
- The layout should be responsive:
  - Two-column or three-column dashboard on tablet/web.
  - Stacked cards on mobile.
- Avoid dense enterprise styling. It should feel warm, trustworthy, and easy for nonprofit staff to use.

Dashboard header:
- Title: “Safeguarding Dashboard”
- Subtitle: “A future coordination space for approved community partners”
- Demo Data badge
- Selected region control with demo options:
  - Hargeisa
  - Mogadishu
  - Nairobi
  - Dadaab

Top summary cards:
1. Open alerts: 3
2. Awaiting acknowledgment: 1
3. Verified support partners: 12
4. Average acknowledgment time: 6 min

Active incidents section:
Display three demo incidents with:
- Anonymous reference ID, for example “Alert CI-1042”
- General area only, not an exact address
- Time received
- Alert type
- Assigned support organization
- Status
- Priority
- Button to view details

Use demo examples:
- CI-1042, Hargeisa Central, Personal safety, Women’s support organization, Responding, High
- CI-1041, Dadaab Area 2, Online coercion, Safeguarding officer, Awaiting acknowledgment, High
- CI-1039, Mogadishu District, Scam / impersonation, Digital-safety team, Follow-up, Medium

When an incident is opened, show a modal or detail screen containing:
- Timeline
- General location
- Support requested
- Assigned responder
- Status updates
- Follow-up required
- A notice stating that this is demo data
Do not show names, exact addresses, phone numbers, or graphic incident details.

Trusted support network section:
Show a searchable directory of demo organizations and responders:
- Women’s rights organization
- Psychosocial counselor
- Safeguarding officer
- Clinic
- School safeguarding lead
- Community responder
- Safe space

Each entry should display:
- Organization or role name
- Service area
- Support categories
- Verification status
- Availability status
- Contact action disabled or labeled “Demo”

Community insights section:
Use simple charts or cards based on local static demo data:
- Reports by category:
  - Online harassment: 34%
  - Scams and impersonation: 27%
  - Coercion or blackmail: 18%
  - Physical safety concern: 13%
  - Other: 8%
- Reports by week for the past six weeks
- Most frequently reported needs:
  - Safety guidance
  - Trusted-person contact
  - Counseling referral
  - Safe-space referral
- An anonymized area list showing relative report volume

Do not use exact user location pins. If a map visualization is included, use broad region-level circles or a stylized non-interactive heat map with a note that all data is aggregated.

Safeguarding and privacy panel:
Include a prominent card explaining:
- Access would be restricted by role.
- Only necessary information should be shared.
- Community insights would be anonymized and aggregated.
- Data-retention and consent policies are not yet defined.
- The dashboard is a concept that requires safeguarding, legal, and community review.

Add a “Questions to resolve before launch” section:
- Who is authorized to receive an alert?
- What consent is required?
- How are organizations and responders verified?
- How are false, malicious, or unsafe reports handled?
- How long is incident data retained?
- What is the escalation process when emergency services are unavailable?

Implementation requirements:
- Use static TypeScript demo-data files.
- Do not add Supabase, authentication, APIs, or a real backend.
- Do not send network requests.
- Create reusable components for SummaryCard, IncidentTable, SupportDirectory, InsightCard, PrivacyNotice, and StatusBadge.
- Use accessible labels, sufficient contrast, and large touch targets.
- Add comments identifying where a future backend and role-based authentication would connect.
- Ensure npm type checking and Expo start continue to work.
- At the end, summarize every file created or changed and explain how to navigate to the dashboard.