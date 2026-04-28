# CAS Portfolio Tracker

**IB Creativity, Activity, Service — 2017 Syllabus**  
A browser-based portfolio management tool for IB CAS coordinators, supervisors and students.

---

## Overview

The CAS Portfolio Tracker is a single HTML file that runs in any modern browser with no installation required. It supports the full IB CAS workflow — from student experience logging and evidence upload through to supervisor approval and coordinator review.

It is designed for use at schools following the IB Diploma Programme and the 2017 CAS syllabus. All data is stored in a connected Google Sheet via Google Apps Script, with local browser caching so the app works offline between syncs.

---

## Files

| File | Purpose |
|---|---|
| `cas_portfolio.html` | The complete application — open in any browser |
| `Code.gs` | Google Apps Script backend — paste into your Sheet's Apps Script editor |
| `SETUP.md` | Step-by-step deployment guide |
| `CAS_Portfolio_User_Guide.docx` | User guide for teachers and students |
| `README.md` | This file |

---

## Features

### Student view
- **Experience slot grid** — visual numbered slots for each experience type (Single, Short, Extended, CAS Project, Charity Fundraiser), colour-coded by status
- **Colour-coded workflow** — Red (working on), Orange (sent for approval), Blue (teacher feedback received), Green (approved)
- **Proposal form gate** — CAS Project and Charity Fundraiser slots are locked until the student submits a proposal form and it is approved by the teacher
- **Learning Outcomes tab** — segmented progress bars for all 7 LOs with teacher-specified targets (LO1=16, LO2=16, LO3=6, LO4=6, LO5=6, LO6=3, LO7=3); click any bar to expand linked experiences
- **Evidence file upload** — drag-and-drop upload of images, videos, PDFs and documents to Google Drive; files stored per-student in a structured folder
- **Review meeting recordings** — paste URLs to audio/video recordings of review meetings; displayed as playable links
- **Gemini AI assistant** — floating chat panel powered by Google Gemini, pre-prompted with IB CAS context to help students write reflections, plan activities and understand LOs
- **Print / PDF** — generates a formatted review document for CAS interviews including LO status, experience log, proposal summaries, requirements check, and review recording links
- **Demo mode** — student picker lets anyone switch between demo student profiles without login

### Teacher view
- **Classes and Students** — create classes, enrol students, view LO progress dots at a glance
- **Full Overview** — cross-class grid showing experience counts and LO coverage for every student
- **Approvals tab** — single panel for reviewing both pending proposals and submitted experiences; approve or return with typed feedback; badge shows total pending count
- **Student portfolio drill-down** — read-only view of any student's full portfolio (experiences, LOs, requirements, evidence files, recordings)
- **Print / PDF** — generate review documents for any student from the teacher view
- **School logo** — upload a school logo that appears in the header and on all printed PDFs

### Proposal workflow (CAS Project & Charity Fundraiser)
1. Student opens the Proposal Form for their Project or Charity Fundraiser
2. Student completes all fields and submits for approval
3. Proposal appears in teacher Approvals tab
4. Teacher approves (unlocks the experience slot) or returns with feedback
5. Once approved, student can log the experience in the now-unlocked slot
6. Student submits the completed experience for approval
7. Teacher marks as Met — experience appears green

---

## Experience types

| Type | Slots | Y12 minimum | Y13 minimum | LOs covered | Proposal required |
|---|---|---|---|---|---|
| Single Experience | 10 | 6 | 4 | LO1, LO2 | No |
| Short (8 weeks) | 3 | 2 | 1 | LO1–LO5 | No |
| Extended (6 months) | 2 | 1 | 1 | LO1–LO7 | No |
| CAS Project | 1 | 1 | 0 | LO1–LO7 | **Yes** |
| Charity Fundraiser | 1 | 1 | 1 | LO1–LO7 | **Yes** |

---

## Learning Outcome targets

| LO | Title | Target (approved experiences) |
|---|---|---|
| LO1 | Strengths & Growth | 16 |
| LO2 | Challenges & Skills | 16 |
| LO3 | Initiative & Planning | 6 |
| LO4 | Commitment & Perseverance | 6 |
| LO5 | Collaboration | 6 |
| LO6 | Global Significance | 3 |
| LO7 | Ethics & Choices | 3 |

---

## Setup

### Quick start (prototype / demo)

1. Open `cas_portfolio.html` in Chrome or any modern browser
2. Use the **Student / Teacher** toggle in the top right to switch views
3. Demo data is pre-loaded with 2 classes and 6 students — no configuration needed

### Production deployment (Google Sheets backend)

See `SETUP.md` for the full step-by-step guide. Summary:

1. Create a new Google Sheet
2. Open **Extensions → Apps Script**, paste in `Code.gs`, run `setupSheets()`
3. Deploy as a **Web App** (Execute as: Me, Access: Anyone)
4. Copy the Web App URL
5. Open `cas_portfolio.html` in a text editor, replace `YOUR_APPS_SCRIPT_URL_HERE` with your URL
6. Optionally add a Gemini API key (see below)
7. Share `cas_portfolio.html` with students

### Gemini AI assistant

1. Get a free API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)
2. Open `cas_portfolio.html` in a text editor
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your key

> **Note:** The API key is visible in the HTML file. This is acceptable for a school prototype. For wider deployment, proxy requests through your Apps Script backend.

---

## Google Sheets data structure

The backend creates five tabs automatically:

| Tab | Contents |
|---|---|
| `Students` | id, name, year, classId, createdAt |
| `Classes` | id, name, createdAt |
| `Experiences` | id, studentId, type, year, strands, name, what, when, where, who, recordingUrl, status, submittedAt, teacherFeedback, savedAt |
| `LO_Entries` | expId, loId, met, reflection, evidence |
| `EvidenceFiles` | id, studentId, expId, loId, fileName, mimeType, driveId, driveUrl, uploadedAt |

Evidence files are stored in a Google Drive folder called **CAS Portfolio Evidence**, with one subfolder per student.

Proposal records, review recordings, and the school logo are stored in browser `localStorage` and do not currently sync to the Sheet. If you need these persisted across devices, they would need an additional Apps Script endpoint.

---

## Browser support

| Browser | Support |
|---|---|
| Chrome | ✅ Full support (recommended) |
| Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Mobile Chrome / Safari | ✅ Responsive layout |

---

## Architecture

```
cas_portfolio.html          ← Everything (HTML + CSS + JS, single file)
    │
    ├── localStorage        ← Local cache (offline use, proposals, recordings, logo)
    │
    └── Google Apps Script  ← REST API (POST to Web App URL)
            │
            └── Google Sheet  ← All student/experience data
                    │
                    └── Google Drive  ← Evidence files (one folder per student)
```

All data flows through a single `doPost()` entry point in `Code.gs`. The app uses optimistic local updates (changes appear immediately) then syncs to the Sheet in the background.

---

## Security notes

- The Apps Script is deployed with **Execute as: Me** — all Sheet and Drive writes run under the deploying teacher's Google account
- Students do not need a Google account; they interact via the HTML file only
- The Web App URL should be treated as semi-private — anyone with it can write to your Sheet. Do not publish it publicly
- The Gemini API key is visible in the HTML source. Rotate it if the file is shared beyond your school
- This is a **prototype** — it has not been security-audited for production use with sensitive student data

---

## Customisation

### Changing LO targets

In `cas_portfolio.html`, find:
```javascript
const LO_TARGETS={lo1:16,lo2:16,lo3:6,lo4:6,lo5:6,lo6:3,lo7:3};
```
Edit the numbers to match your school's requirements.

### Changing slot counts

```javascript
const EXP_SLOTS={single:10,short:3,extended:2,project:1,charity:1};
```

### Changing requirements table minimums

Search for the `renderReqsView` function and edit the `y12` and `y13` values in the `rows` array.

### Adding or removing experience types

Add a new entry to the `ET` object (following the existing pattern) and to `EXP_SLOTS`. If the type requires a proposal, set `hasProposal:true`.

### Disabling features for non-Diploma students

The role toggle and student picker can be used to restrict which students see which features. A future enhancement (noted by the CAS coordinator) would be a per-student Diploma/non-Diploma flag that hides irrelevant experience types.

---

## Known limitations (prototype)

- No login / authentication — role is controlled by a toggle, not a session
- Proposal records and review recordings are stored in `localStorage` only (not synced to Sheet)
- Evidence file upload requires the Google Sheets backend to be configured; local-only mode shows a warning
- The Gemini API key is client-side visible
- No bulk import of existing student records
- PDF generation uses Blob URLs which may be blocked by some browser security policies (falls back to in-page iframe)

---

## Roadmap (suggested next steps)

- [ ] Student login with PIN / email (backend authentication via Apps Script)
- [ ] Sync proposal records to Google Sheet
- [ ] Teacher ability to deactivate experience types per student (for non-Diploma students)
- [ ] Email notifications when submissions are approved or returned
- [ ] Bulk student import from CSV
- [ ] CAS coordinator dashboard across multiple teacher classes
- [ ] Mobile app wrapper (PWA)

---

## Credits

Built for **BISP** (British International School of Phuket) as a prototype CAS management tool.  
IB CAS 2017 Syllabus · Google Gemini API · Google Apps Script · Google Drive

---

## Version history

| Version | Notes |
|---|---|
| v1.0 | Initial prototype — experience logging, LO tracking, Google Sheets sync |
| v1.1 | Approval workflow, colour-coded slots, segmented LO progress bars |
| v1.2 | Charity Fundraiser type, proposal form with approval gate |
| v1.3 | Gemini AI assistant, review meeting recordings, evidence file gallery |
