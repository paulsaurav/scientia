/**
 * Parse department points from Scientia 6.0 Final results xlsx.
 * Tries to find a sheet with "Department" (or similar) and "Points"/"Total"/"Score" columns.
 * Falls back to first sheet: first column = department, second (or last numeric) = points.
 */
import * as XLSX from 'xlsx'

const DEPT_HEADER_NAMES = ['department', 'departments', 'dept', 'name', 'department name']
const POINTS_HEADER_NAMES = ['points', 'point', 'total', 'score', 'total points', 'final score']

function normalizeHeader (cell: unknown): string {
  if (cell == null) return ''
  return String(cell).toLowerCase().trim()
}

function findColumnIndex (row: unknown[], possibleNames: string[]): number {
  for (let i = 0; i < row.length; i++) {
    const h = normalizeHeader(row[i])
    if (possibleNames.some((n) => h.includes(n) || n.includes(h))) return i
  }
  return -1
}

function parsePoints (cell: unknown): number {
  if (cell == null || cell === '') return NaN
  if (typeof cell === 'number' && !Number.isNaN(cell)) return cell
  const n = Number(String(cell).replace(/[^\d.-]/g, ''))
  return Number.isNaN(n) ? NaN : n
}

export function parseFinalResultsXlsx (arrayBuffer: ArrayBuffer): Record<string, number> {
  const wb = XLSX.read(arrayBuffer, { type: 'array', cellNF: false })
  const out: Record<string, number> = {}

  const trySheet = (sheet: XLSX.WorkSheet): boolean => {
    const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
    if (rows.length < 2) return false
    const headerRow = rows[0] as unknown[]
    const deptCol = findColumnIndex(headerRow, DEPT_HEADER_NAMES)
    const pointsCol = findColumnIndex(headerRow, POINTS_HEADER_NAMES)
    if (deptCol < 0 || pointsCol < 0) return false
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r] as unknown[]
      const dept = row[deptCol] != null ? String(row[deptCol]).trim() : ''
      const pts = parsePoints(row[pointsCol])
      if (dept && !Number.isNaN(pts) && pts >= 0) out[dept] = (out[dept] ?? 0) + pts
    }
    return true
  }

  // Prefer a sheet that looks like summary/total (name or header)
  const summaryLike = wb.SheetNames.find((n) =>
    /summary|total|final|score|points/i.test(n)
  )
  if (summaryLike) {
    const sheet = wb.Sheets[summaryLike]
    const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
    if (rows.length >= 2) {
      const headerRow = rows[0] as unknown[]
      const deptCol = findColumnIndex(headerRow, DEPT_HEADER_NAMES)
      const pointsCol = findColumnIndex(headerRow, POINTS_HEADER_NAMES)
      if (deptCol >= 0 && pointsCol >= 0) {
        for (let r = 1; r < rows.length; r++) {
          const row = rows[r] as unknown[]
          const dept = row[deptCol] != null ? String(row[deptCol]).trim() : ''
          const pts = parsePoints(row[pointsCol])
          if (dept && !Number.isNaN(pts) && pts >= 0) out[dept] = (out[dept] ?? 0) + pts
        }
        return out
      }
    }
  }

  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName]
    const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
    if (rows.length < 2) continue
    const headerRow = rows[0] as unknown[]
    const deptCol = findColumnIndex(headerRow, DEPT_HEADER_NAMES)
    const pointsCol = findColumnIndex(headerRow, POINTS_HEADER_NAMES)
    if (deptCol >= 0 && pointsCol >= 0) {
      trySheet(sheet)
      continue
    }
    // Fallback: A = department, B = points
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r] as unknown[]
      const dept = row[0] != null ? String(row[0]).trim() : ''
      const pts = parsePoints(row[1])
      if (dept && !Number.isNaN(pts) && pts >= 0) out[dept] = (out[dept] ?? 0) + pts
    }
  }

  return out
}
