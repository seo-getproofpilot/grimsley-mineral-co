# Email list setup

Ten minutes, no monthly cost. Addresses land in a Google Sheet you own.

Until you finish this, the footer form still works — it just opens a pre-filled
email to `grimsleymineralco@gmail.com` instead of writing to the sheet. Nothing
is broken while it's unset.

## 1. Make the sheet

New Google Sheet, name it **Grimsley Email List**. Put these three headers in
row 1:

| A | B | C |
|---|---|---|
| Date | Email | Source |

## 2. Add the script

In that sheet: **Extensions → Apps Script**. Delete whatever is there, paste
this, and save.

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var email = (e.parameter.email || '').trim();
  var source = e.parameter.source || '';

  if (email) {
    // Skip addresses already on the list so the sheet stays clean.
    var existing = sheet.getRange('B:B').getValues().flat();
    if (existing.indexOf(email) === -1) {
      sheet.appendRow([new Date(), email, source]);
    }
  }

  return ContentService.createTextOutput('ok');
}
```

## 3. Publish it

**Deploy → New deployment → Web app.**

- Execute as: **Me**
- Who has access: **Anyone**

Click Deploy, approve the permission prompt, and copy the **Web app URL**. It
looks like `https://script.google.com/macros/s/AKfy…/exec`.

## 4. Paste the URL into the site

Open `src/consts.ts` and put it in the `newsletterEndpoint` field:

```ts
newsletterEndpoint: "https://script.google.com/macros/s/AKfy…/exec",
```

That's it. Sign up on the site once yourself to confirm a row lands in the
sheet, then delete the test row.

## Notes

- The browser posts with `mode: "no-cors"`, so the site can't read the
  response. It shows success whenever the request goes out. That's normal for
  Apps Script and the write still happens.
- No spam protection on this form yet. It's one email field with nothing behind
  it, so the worst case is junk rows in a sheet. If bots find it, the same
  reCAPTCHA v3 setup running on the Wild Within site drops in here.
- **Re-deploying:** editing the script does not update the live URL unless you
  choose *Manage deployments → Edit → New version*. Deploying fresh each time
  gives you a new URL and silently orphans the old one.
