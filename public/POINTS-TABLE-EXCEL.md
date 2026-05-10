# Points table data

Department standings and event results on **Points Table** come from `src/pages/PointsTable.tsx` (`eventResults` and `aggregateDepartmentPoints`).

To refresh from an Excel workbook, copy rows into that file (or reintroduce an `xlsx` parser and add the `xlsx` dependency). There is no automatic load from `public/` in the current build.
