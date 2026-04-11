

CAS presentation folder .pptx
pptx

Can you create a version of this in a suitable format that is easy for students and teachers to use. Students should be able to add evidence and respond to lo's throughout the year. There should be persistent storage of the information and also the ability to view the data for each student in a common format. This does not have to be a web app.

Apr 1

Viewed a file, ran a command
Viewed a file, ran a command
Now I have a thorough understanding of the CAS portfolio structure. Let me build a comprehensive React artifact with AI-powered features and persistent storage.

Now I have everything I need. Let me build a comprehensive CAS Portfolio React artifact with persistent storage.

V

Connecting to visualize...
Here's your CAS Portfolio tracker. It's fully self-contained and runs in the browser with persistent storage (localStorage), so data survives page refreshes and future sessions.

How it works:

Student view — students use the dropdown to stay in Student mode. They can:

Add experiences (Single, Short 8-week, Extended 6-month, or CAS Project)
Fill in the What / When / Where / Who summary
Tick the relevant CAS strands (Creativity, Activity, Service)
Write reflections and evidence for each Learning Outcome that applies
Mark LOs as Met
View their LO coverage and requirements check at a glance
Teacher view — switch to Teacher mode to:

Add students and assign them to Year 12 or 13
Click any student to see their full portfolio (read-only)
Use the Class Overview tab for a grid showing every student's experience counts and LO completion at a glance
A few things to note:

The current build uses browser localStorage, which means data is stored per-device. For a genuinely shared multi-student system you'd want a backend or Google Sheets integration — but for a classroom where each student uses their own device (and the teacher has their own), this works well as-is.

If you'd like to extend it — for example adding a shared Google Sheets export, an evidence file link field, or a teacher comment/approval system — just let me know and I can build that in.

ok can you build and share

Apr 2
Let me build this as a proper standalone HTML file that can be distributed to students and teachers.


Viewed a file, created a file, ran a command
Viewed a file, created a file, ran a command
Here's the standalone file — a single cas_portfolio.html that anyone can open directly in a browser with no installation needed.

How to distribute it:

Students — share the file via Google Drive, Teams, or your VLE. Each student opens it on their own device and their data saves automatically via localStorage (persists across sessions on that browser/device).
Teacher — keep your own copy, switch to Teacher mode, and add each student's name. You can then view their portfolio structure, but note that since each student's data lives in their own browser, you'd need students to bring their device to you — or see the note below.
One important limitation to know: because localStorage is per-device/per-browser, student data doesn't automatically sync to the teacher's copy. There are a few practical workarounds:

Shared device — if students use school Chromebooks/computers with the same browser profile, data persists there and a teacher can view it on the same machine.
Export feature — I can add a one-click "Export my data as JSON" button and a teacher-side "Import student data" button, which would let students submit their portfolio as a file at any point.
Google Sheets backend — I can wire the app to a Google Apps Script endpoint so all data syncs to a shared spreadsheet automatically.
Would you like me to add the export/import feature, or go the Google Sheets route?

Cas portfolio
Code · HTML 
google sheets backend

Apr 2
Let me set this up properly. You'll need two things: a Google Apps Script (the backend) and an updated HTML file (the frontend).


Created 2 files, viewed a file
Created 2 files, viewed a file
Now build the updated HTML with the Google Sheets API layer:


Created 2 files, ran 2 commands, read a file
Created 2 files, ran 2 commands, read a file
Here are your three files. Here's what each one does and the order to tackle them:

SETUP.md — read this first. It walks you through every step.

Code.gs — the Google Apps Script backend. Paste this into your Sheet's Apps Script editor. It creates three tabs automatically (Students, Experiences, LO_Entries) and handles all the read/write operations.

cas_portfolio.html — the app. Once you've deployed the Apps Script and have your URL, open this in a text editor and replace YOUR_APPS_SCRIPT_URL_HERE with it. Then share the file with students.

How it all works once running:

Students open the HTML file in any browser and switch to Student mode — their data saves to the sheet automatically as they type
You open the same file in Teacher mode — it fetches all students and their portfolios live from the sheet
The sync status dot in the top-right shows green when connected, amber when saving, red if there's a problem
Everything also caches locally, so if a student loses internet mid-session their work isn't lost — it'll sync next time they're connected
The Google Sheet stays fully readable as plain data, so you can filter/sort/export it directly if needed for reporting
The whole setup takes about 10 minutes. The trickiest part is the Apps Script deployment — SETUP.md has screenshots-level detail for that step. Let me know if you hit any snags.

Cas portfolio
Code · HTML 
Code
GS 
Setup
Document · MD 
i need it so students and teachers can sign in and then they are provided with the correct view. Student can view only their entires. Teachers can see each class and then see the students in each class and also drill down to their data.

Apr 2
Let me plan this out properly before building. The key addition is authentication + class management, so I need to think through the data model first.


Check Code.gs for current data model
Check Code.gs for current data model
Good. Now I have the full picture. I need to design a new data model with: Users (email + PIN + role), Classes, ClassMembers (linking students to classes), then rebuild both files completely.


Created 2 files, ran a command
Created 2 files, ran a command
Now the full frontend with auth + all views:


Created 2 files, ran a command, read a file
Created 2 files, ran a command, read a file
Here's what's been completely rebuilt across all three files.

What's new in this version:

Authentication — sign in / register screen on first load. Sessions persist (12-hour tokens stored server-side in Apps Script Properties). Students and teachers each get the correct view automatically based on their role.

Role-based access — the backend enforces this server-side, not just in the UI. A student's token cannot fetch another student's portfolio, and teacher-only actions (class management, user management) are rejected if called with a student token.

Teacher flow:

Classes view — see all your classes, with a preview of students and their LO progress dots
Class detail — full student list for a class, add/remove students, click through to any student's portfolio
Full Overview tab — the cross-class grid showing every student's experience counts and LO coverage at a glance
Manage users — create, edit and delete student and teacher accounts (set name, email, role, PIN)
Student flow — identical to before, but now gated behind login. They only ever see their own data.

Account setup flow — the very first teacher can self-register. After that, all accounts are created by a teacher via Manage Users, which means you control who gets in (useful for a school setting where you want students using their school email). SETUP.md covers both approaches.

The Google Sheet now has five tabs: Users, Classes, ClassMembers, Experiences, LO_Entries.

Cas portfolio
Code · HTML 
Code
GS 
Setup
Document · MD 
Can you remove the authorization an Tebet back to the previous version. Can you also add an image place holder in the header of the webpage so I can upload an image. Also can you populate with some dummy students around 5 or 6 in two different classes also add some testing data for each student with regards to a mixture of experiences and also some lo’s. Also provide an option to print a template showing their progress so far as a pdf that can be used in review meetings with students.

Apr 2

Read the previous version of the HTML to use as base
Read the previous version of the HTML to use as base
Good — let me build this fresh from the v1 (no-auth) base, adding logo upload, dummy data, class management, and PDF print template.


Ran 2 commands, created a file, read a file
Ran 2 commands, created a file, read a file
Here's the updated file — single HTML, open in any browser, no login needed.

What's changed and been added:

School logo — the top-left corner has a dashed 🏫 placeholder. Click it to upload any image (PNG, JPG, SVG). It persists in local storage and appears on all printed PDFs automatically.

No authentication — back to the simple role toggle (Student / Teacher) in the top-right.

Student demo mode — since there's no login, the student view has a dropdown at the top so anyone can pick which student they're "viewing as". In a real deployment you'd replace this with a simple name/PIN lookup, but it works perfectly for demo and review purposes.

Dummy data — 2 classes, 6 students:

IB Year 12 — Class A: Aisha Patel, Marcus Chen, Sofia Reyes — mix of single, short, extended and project experiences, some LOs met, some still in progress
IB Year 13 — Class B: James Okafor, Lena Kowalski, Noah Tanaka — richer portfolios reflecting a year's more experience, with detailed reflections and evidence entries
Print / PDF button — appears both in Student view and when a teacher drills into a student. It opens a print-ready page in a new tab with:

School logo (if uploaded), student name, class, date
Progress summary stats
All 7 LOs with met/not-yet status and the best reflection quote for each
Full experience log table
Requirements check grid (Y12/Y13 counts vs minimums)
Blank review notes section and signature lines for the meeting
Hit Print / Save PDF in the new tab — in Chrome/Edge you can choose "Save as PDF" as the printer destination to get a clean document for the review folder.

Cas portfolio
Code · HTML 
students should be able to upload / attach files as evidence. These will be image files, video files of PDF / Documents

Apr 3
This is a meaningful architectural decision before building. File storage options:

Good choice. I'll build Google Drive file upload via Apps Script — files go into a structured folder per student, and the app stores the Drive links against each LO evidence entry. This means both the updated Code.gs and cas_portfolio.html need rebuilding.


Viewed 2 files
Viewed 2 files
Good, I have the full picture. Now I'll write the updated Code.gs with Drive upload support, and update the HTML with a proper evidence file manager panel.


Ran a command, created a file
Ran a command, created a file
Now the main HTML — I'll add a full evidence file manager panel inside each experience, with upload UI, file type icons, thumbnail previews for images, and progress indicators:


Created a file, ran a command, read a file
Created a file, ran a command, read a file
Both files updated. Here's exactly how the evidence upload system works:

For students — uploading files: Every experience card now has an evidence panel at the bottom. Students can drag and drop files directly onto it, or click "browse" to pick from their device. Accepted types are images (JPG, PNG, GIF, WebP), videos (MP4, MOV etc.), PDFs, Word documents, and PowerPoint files — up to 50MB each. A progress bar appears during upload. Once uploaded, files live permanently in Google Drive.

How files are organised in Drive: The Apps Script creates a CAS Portfolio Evidence folder in your Google Drive automatically. Inside, each student gets their own subfolder (named with their ID and name). All their evidence files go in there, organised by when they were uploaded. The sheet's EvidenceFiles tab records every file with its Drive URL, student, experience, and LO it relates to.

What teachers see: The experience cards in teacher view show a file count badge and list all files in read-only mode (open links to Drive, but can't delete). The Class Overview table now has a "Files" column. The PDF print document notes how many evidence files are attached in Drive per LO.

Key setup note for file uploads: The setupSheets() function now also creates the Drive folder automatically. Make sure when you deploy the Apps Script you select Execute as: Me — this is what gives the script permission to write to your Drive on behalf of the school account. Students don't need any Google sign-in; the files are uploaded through your credentials server-side.

Cas portfolio
Code · HTML 
Code
GS 
Also on the student screen have the overview for each activity a box with met / not met in green and red with black font. Then when clicking on each one it takes to a screen that shows the number of tasks required for each activity. Athena can then add an activity which can then be marked as send for approve to the teacher who can then check the submission and return with feedback or mark as met. Once met a en. Kng total is kept for each activity to be displayed on the screen mentioned at the start. Keep all othwr features

Apr 3
Let me read the current file thoroughly before making any changes.


Viewed 3 files
Viewed 3 files
Good, I have the full picture. Now let me plan the additions clearly before writing:

New features needed:

LO overview grid on the student home screen — 7 cards, each showing Met (green) / Not met (red) with black text, clickable
LO detail screen — shows required count per experience type for that LO, lists existing linked experiences, and lets student add a new experience activity linked to that LO
Approval workflow — experience activities can be "submitted for approval", teacher sees pending submissions, can return with feedback or mark as met
Running total — met count displayed on the overview grid cards

Backup current file before major edit
Backup current file before major edit
Now I'll add the new CSS and JavaScript sections via targeted insertions:


Add LO overview grid, approval workflow CSS after the existing misc card styles
Add LO overview grid, approval workflow CSS after the existing misc card styles
Now add the approval workflow data into the dummy data and state:


Extend dummy data experiences with status field and add some approval dummy entries
Extend dummy data experiences with status field and add some approval dummy entries
Now add the currentLoId to APP state and the new LO navigation state:


Add currentLoId and studentScreen to APP state
Add currentLoId and studentScreen to APP state
Now replace the entire renderStudentView function and add all the new functions:


Edited 2 files, viewed 2 files
Edited 2 files, viewed 2 files
Now add the teacher approval panel into renderTeacherHome and a review modal:


Add approval tab to teacher home and pending count badge
Add approval tab to teacher home and pending count badge
Now add the approvals panel function and teacher review modal, right before the renderClassList function:


Add renderApprovalsPanel and openTeacherReview functions before renderClassList
Add renderApprovalsPanel and openTeacherReview functions before renderClassList
Now update openAddExp to accept an optional focusLoId parameter and pre-tick that LO:


Update openAddExp and buildExpModal to accept optional focusLoId
Update openAddExp and buildExpModal to accept optional focusLoId
Now update buildLOForms to highlight the focused LO, and update saveExp to include status:'draft':


Edited 2 files, ran a command, viewed a file
Edited 2 files, ran a command, viewed a file
Now also add status pill rendering into the renderExpList function so the status shows on each card:


Add status pill and submit button to experience cards in renderExpList
Add status pill and submit button to experience cards in renderExpList
Also fix the switchRole to reset the student screen state:


Fix switchRole to reset studentScreen
Fix switchRole to reset studentScreen
Let me copy what we have and present it:

Continue

Apr 4

Ran 2 commands
Ran 2 commands
Good — no syntax errors. Let me also quickly verify the key new functions all exist:


Verify all new functions exist
Verify all new functions exist
All functions present. Now copy the updated Code.gs too since we need the status, submittedAt, and teacherFeedback columns added to it:


Ran 4 commands, read a file
Ran 4 commands, read a file
Both files updated. Here's what's new:

Student home screen — LO overview grid The seven LOs now appear as clickable cards at the top of the student view. Each card shows the LO label, title, description, and a bold MET (green) or NOT MET (red) pill with black text. Below the pill is a running total of how many approved experiences address that outcome. Only experiences the teacher has formally marked as Met count towards this total — pending or draft entries don't.

LO detail screen Clicking any LO card drills into a dedicated screen showing the experience types that cover it (with a count of how many have been approved), and a list of every activity the student has linked to that outcome. From here students can add a new activity directly (the relevant LO is highlighted and pre-ticked in the form), edit drafts, or hit "Submit for approval" to send to the teacher.

Approval workflow — four statuses

Draft — saved but not yet submitted (grey pill)
Awaiting approval — submitted, teacher yet to review (amber, left border stripe)
Feedback received — teacher returned it with comments (red, feedback box shown inline)
Met — teacher approved (green)
A feedback alert banner appears on the student home screen whenever any of their experiences have been returned.

Teacher — Approvals tab The teacher home now has a third tab, "Approvals", with a badge showing the pending count. Each submission shows the student name, experience details, which LOs they've claimed as met, and two actions: "Mark as Met" (one click, sets status and marks all claimed LOs as met) or "Return with Feedback" (opens a modal to type comments, which appear inline on the student's screen).

Code.gs has been updated to persist the three new fields (status, submittedAt, teacherFeedback) alongside each experience row in the sheet.

Cas portfolio
Code · HTML 
Code
GS 




Claude is AI and can make mistakes. Please double-check responses.
Code · GS
Copy

// ═══════════════════════════════════════════════════════════════════
//  CAS PORTFOLIO — Google Apps Script Backend  v3.0
//  Includes Google Drive file upload for evidence files.
//  Run setupSheets() once after pasting to initialise all tabs.
// ═══════════════════════════════════════════════════════════════════
 
const SH = {
  STUDENTS: 'Students',     // id | name | year | classId | createdAt
  CLASSES:  'Classes',      // id | name | createdAt
  EXP:      'Experiences',  // id | studentId | type | year | creativity | activity | service | name | what | when | where | who | savedAt
  LO:       'LO_Entries',   // expId | loId | met | reflection | evidence (text notes)
  FILES:    'EvidenceFiles', // id | studentId | expId | loId | fileName | mimeType | driveId | driveUrl | uploadedAt
};
 
// Name of the root Drive folder that will be created automatically
const DRIVE_ROOT_FOLDER = 'CAS Portfolio Evidence';
 
// ── Router ──────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents);
    let result;
    switch (p.action) {
      case 'ping':              result = { ok: true };                                       break;
 
      // Students & classes
      case 'getAllData':         result = getAllData();                                       break;
      case 'saveStudent':       result = saveStudent(p.student);                             break;
      case 'deleteStudent':     result = deleteStudent(p.studentId);                         break;
      case 'saveClass':         result = saveClass(p.cls);                                   break;
      case 'deleteClass':       result = deleteClass(p.classId);                             break;
 
      // Experiences
      case 'saveExperience':    result = saveExperience(p.exp);                              break;
      case 'deleteExperience':  result = deleteExperience(p.expId);                          break;
 
      // Evidence files
      case 'uploadFile':        result = uploadFile(p.studentId, p.expId, p.loId, p.fileName, p.mimeType, p.base64Data); break;
      case 'deleteFile':        result = deleteFile(p.fileId);                               break;
      case 'getFiles':          result = getFiles(p.studentId, p.expId);                     break;
 
      default: result = { error: 'Unknown action: ' + p.action };
    }
    return json(result);
  } catch(err) {
    return json({ error: err.message });
  }
}
 
function doGet() {
  return json({ ok: true, message: 'CAS Portfolio API v3 running.' });
}
 
function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
 
// ── Sheet helpers ────────────────────────────────────────────────────
function ss() { return SpreadsheetApp.getActiveSpreadsheet(); }
 
function getOrCreate(name, headers) {
  let sheet = ss().getSheetByName(name);
  if (!sheet) {
    sheet = ss().insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f3f4f6');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
 
function rows(name) {
  const sheet = ss().getSheetByName(name);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}
 
function appendRow(name, headers, vals) {
  getOrCreate(name, headers).appendRow(vals);
}
 
function updateRow(name, keyCol, keyVal, newVals) {
  const sheet = ss().getSheetByName(name);
  if (!sheet) return;
  const data = sheet.getDataRange().getValues();
  const ki = data[0].indexOf(keyCol);
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][ki]) === String(keyVal)) {
      sheet.getRange(i + 1, 1, 1, newVals.length).setValues([newVals]);
      return;
    }
  }
}
 
function deleteRowsWhere(name, col, val) {
  const sheet = ss().getSheetByName(name);
  if (!sheet) return;
  const data = sheet.getDataRange().getValues();
  const ci = data[0].indexOf(col);
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][ci]) === String(val)) sheet.deleteRow(i + 1);
  }
}
 
function bool(v) { return v === true || v === 'TRUE' || v === 'true'; }
 
// ── BULK LOAD (single call loads everything) ─────────────────────────
function getAllData() {
  getOrCreate(SH.STUDENTS, ['id','name','year','classId','createdAt']);
  getOrCreate(SH.CLASSES,  ['id','name','createdAt']);
  getOrCreate(SH.EXP,      ['id','studentId','type','year','creativity','activity','service','name','what','when','where','who','savedAt','status','submittedAt','teacherFeedback']);
  getOrCreate(SH.LO,       ['expId','loId','met','reflection','evidence']);
  getOrCreate(SH.FILES,    ['id','studentId','expId','loId','fileName','mimeType','driveId','driveUrl','uploadedAt']);
 
  const allExps  = rows(SH.EXP);
  const allLOs   = rows(SH.LO);
  const allFiles = rows(SH.FILES);
 
  // Build experiences with embedded LO entries and file lists
  const expsByStudent = {};
  allExps.forEach(exp => {
    const sid = exp.studentId;
    if (!expsByStudent[sid]) expsByStudent[sid] = [];
    const los = {};
    allLOs.filter(l => l.expId === exp.id).forEach(l => {
      los[l.loId] = {
        met: bool(l.met),
        reflection: l.reflection || '',
        evidence: l.evidence || '',
      };
    });
    const files = allFiles.filter(f => f.expId === exp.id).map(f => ({
      id: f.id, loId: f.loId || '', fileName: f.fileName,
      mimeType: f.mimeType, driveId: f.driveId,
      driveUrl: f.driveUrl, uploadedAt: f.uploadedAt,
    }));
    expsByStudent[sid].push({
      id: exp.id, studentId: exp.studentId,
      type: exp.type, year: exp.year,
      creativity: bool(exp.creativity), activity: bool(exp.activity), service: bool(exp.service),
      name: exp.name, what: exp.what, when: exp.when, where: exp.where, who: exp.who,
      savedAt: exp.savedAt, status: exp.status||'draft', submittedAt: exp.submittedAt||'', teacherFeedback: exp.teacherFeedback||'', los, files,
    });
  });
 
  return {
    students:    rows(SH.STUDENTS),
    classes:     rows(SH.CLASSES),
    experiences: expsByStudent,
  };
}
 
// ── STUDENTS ─────────────────────────────────────────────────────────
function saveStudent(student) {
  getOrCreate(SH.STUDENTS, ['id','name','year','classId','createdAt']);
  const existing = rows(SH.STUDENTS).find(r => r.id === student.id);
  const row = [student.id, student.name, student.year, student.classId || '',
               student.createdAt || new Date().toISOString()];
  if (existing) updateRow(SH.STUDENTS, 'id', student.id, row);
  else appendRow(SH.STUDENTS, ['id','name','year','classId','createdAt'], row);
  return { ok: true };
}
 
function deleteStudent(studentId) {
  deleteRowsWhere(SH.STUDENTS, 'id', studentId);
  const expIds = rows(SH.EXP).filter(r => r.studentId === studentId).map(r => r.id);
  deleteRowsWhere(SH.EXP, 'studentId', studentId);
  expIds.forEach(eid => {
    deleteRowsWhere(SH.LO, 'expId', eid);
    // Also remove Drive files
    const fileRecs = rows(SH.FILES).filter(f => f.expId === eid);
    fileRecs.forEach(f => { try { DriveApp.getFileById(f.driveId).setTrashed(true); } catch(e){} });
    deleteRowsWhere(SH.FILES, 'expId', eid);
  });
  deleteRowsWhere(SH.FILES, 'studentId', studentId);
  return { ok: true };
}
 
// ── CLASSES ──────────────────────────────────────────────────────────
function saveClass(cls) {
  getOrCreate(SH.CLASSES, ['id','name','createdAt']);
  const existing = rows(SH.CLASSES).find(r => r.id === cls.id);
  const row = [cls.id, cls.name, cls.createdAt || new Date().toISOString()];
  if (existing) updateRow(SH.CLASSES, 'id', cls.id, row);
  else appendRow(SH.CLASSES, ['id','name','createdAt'], row);
  return { ok: true };
}
 
function deleteClass(classId) {
  deleteRowsWhere(SH.CLASSES, 'id', classId);
  // Unassign students (don't delete them)
  const sheet = ss().getSheetByName(SH.STUDENTS);
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const ci = data[0].indexOf('classId');
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][ci]) === String(classId)) {
        sheet.getRange(i + 1, ci + 1).setValue('');
      }
    }
  }
  return { ok: true };
}
 
// ── EXPERIENCES ──────────────────────────────────────────────────────
function saveExperience(exp) {
  getOrCreate(SH.EXP, ['id','studentId','type','year','creativity','activity','service','name','what','when','where','who','savedAt','status','submittedAt','teacherFeedback']);
  getOrCreate(SH.LO,  ['expId','loId','met','reflection','evidence']);
 
  const row = [
    exp.id, exp.studentId, exp.type, exp.year,
    exp.creativity, exp.activity, exp.service,
    exp.name, exp.what, exp.when, exp.where, exp.who, exp.status||'draft', exp.submittedAt||'', exp.teacherFeedback||'',
    exp.savedAt || new Date().toISOString()
  ];
 
  const existing = rows(SH.EXP).find(r => r.id === exp.id);
  if (existing) {
    updateRow(SH.EXP, 'id', exp.id, row);
    deleteRowsWhere(SH.LO, 'expId', exp.id);
  } else {
    appendRow(SH.EXP, ['id','studentId','type','year','creativity','activity','service','name','what','when','where','who','savedAt','status','submittedAt','teacherFeedback'], row);
  }
 
  if (exp.los) {
    Object.entries(exp.los).forEach(([loId, d]) => {
      appendRow(SH.LO, ['expId','loId','met','reflection','evidence'],
        [exp.id, loId, d.met, d.reflection || '', d.evidence || '']);
    });
  }
  return { ok: true };
}
 
function deleteExperience(expId) {
  deleteRowsWhere(SH.EXP, 'id', expId);
  deleteRowsWhere(SH.LO, 'expId', expId);
  const fileRecs = rows(SH.FILES).filter(f => f.expId === expId);
  fileRecs.forEach(f => { try { DriveApp.getFileById(f.driveId).setTrashed(true); } catch(e){} });
  deleteRowsWhere(SH.FILES, 'expId', expId);
  return { ok: true };
}
 
// ── FILE UPLOAD ──────────────────────────────────────────────────────
function getOrCreateDriveFolder(studentId, studentName) {
  // Root folder: "CAS Portfolio Evidence"
  let rootFolder;
  const rootFolders = DriveApp.getFoldersByName(DRIVE_ROOT_FOLDER);
  if (rootFolders.hasNext()) {
    rootFolder = rootFolders.next();
  } else {
    rootFolder = DriveApp.createFolder(DRIVE_ROOT_FOLDER);
  }
 
  // Student subfolder: "studentId — studentName"
  const subName = studentId + ' — ' + (studentName || 'Unknown');
  const subFolders = rootFolder.getFoldersByName(subName);
  if (subFolders.hasNext()) return subFolders.next();
  return rootFolder.createFolder(subName);
}
 
function uploadFile(studentId, expId, loId, fileName, mimeType, base64Data) {
  if (!studentId || !expId || !fileName || !base64Data) {
    return { error: 'Missing required upload parameters.' };
  }
 
  // File size check: base64 of 50MB = ~67MB string; reject > ~67MB base64
  if (base64Data.length > 70_000_000) {
    return { error: 'File too large. Maximum size is 50MB.' };
  }
 
  const student = rows(SH.STUDENTS).find(s => s.id === studentId);
  const folder  = getOrCreateDriveFolder(studentId, student ? student.name : studentId);
 
  // Decode base64 and create file
  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64Data),
    mimeType || 'application/octet-stream',
    fileName
  );
  const file = folder.createFile(blob);
 
  // Make viewable by anyone with link (read-only)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
 
  const driveId  = file.getId();
  const driveUrl = file.getUrl();
  const fileId   = Utilities.getUuid();
 
  getOrCreate(SH.FILES, ['id','studentId','expId','loId','fileName','mimeType','driveId','driveUrl','uploadedAt']);
  appendRow(SH.FILES, ['id','studentId','expId','loId','fileName','mimeType','driveId','driveUrl','uploadedAt'],
    [fileId, studentId, expId, loId || '', fileName, mimeType || '', driveId, driveUrl, new Date().toISOString()]);
 
  return {
    ok: true,
    file: { id: fileId, studentId, expId, loId: loId || '', fileName, mimeType, driveId, driveUrl, uploadedAt: new Date().toISOString() }
  };
}
 
function deleteFile(fileId) {
  const rec = rows(SH.FILES).find(f => f.id === fileId);
  if (rec && rec.driveId) {
    try { DriveApp.getFileById(rec.driveId).setTrashed(true); } catch(e) {}
  }
  deleteRowsWhere(SH.FILES, 'id', fileId);
  return { ok: true };
}
 
function getFiles(studentId, expId) {
  const all = rows(SH.FILES);
  const filtered = expId
    ? all.filter(f => f.studentId === studentId && f.expId === expId)
    : all.filter(f => f.studentId === studentId);
  return { files: filtered };
}
 
// ── ONE-TIME SETUP ───────────────────────────────────────────────────
function setupSheets() {
  getOrCreate(SH.STUDENTS, ['id','name','year','classId','createdAt']);
  getOrCreate(SH.CLASSES,  ['id','name','createdAt']);
  getOrCreate(SH.EXP,      ['id','studentId','type','year','creativity','activity','service','name','what','when','where','who','savedAt','status','submittedAt','teacherFeedback']);
  getOrCreate(SH.LO,       ['expId','loId','met','reflection','evidence']);
  getOrCreate(SH.FILES,    ['id','studentId','expId','loId','fileName','mimeType','driveId','driveUrl','uploadedAt']);
 
  // Create the root Drive folder upfront
  const rootFolders = DriveApp.getFoldersByName(DRIVE_ROOT_FOLDER);
  if (!rootFolders.hasNext()) DriveApp.createFolder(DRIVE_ROOT_FOLDER);
 
  SpreadsheetApp.getUi().alert(
    '✅ CAS Portfolio v3 setup complete!\n\n' +
    '• 5 sheets created in this spreadsheet\n' +
    '• "' + DRIVE_ROOT_FOLDER + '" folder created in your Drive\n\n' +
    'Deploy as Web App (Execute as: Me, Access: Anyone), then paste the URL into cas_portfolio.html.'
  );
}
 
