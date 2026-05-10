# Points table data from Excel

To show final scores from your **Scientia 6.0 Final results** Excel file on the Points Table page:

1. Run `npm install` in the project root (to install the `xlsx` package).
2. Copy your Excel file into this folder (`public/`).
3. Name it either:
   - `Scientia-6.0-Final-results.xlsx`, or
   - `Scientia 6.0 Final results..xlsx` (your original name).

**Expected format (one of):**

- A sheet whose name contains "Summary", "Total", "Final", "Score", or "Points", with columns like **Department** and **Points** (or **Total** / **Score**).
- Or any sheet with a header row containing "Department" (or "Dept", "Name") and "Points" (or "Total", "Score"), and data rows below.
- Or a simple layout: first column = department name, second column = points.

The app will use the first matching sheet. Department names are matched to the known list (e.g. "Physics", "Computer Science"); small spelling differences are tolerated. Only positive points are used (no negative marking).
