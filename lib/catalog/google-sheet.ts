const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMunobKfR3kqKnTswrKXR0iPE_YA8-h2F9WZ8O3rSidMl6QAHOLGhsChkvMEWde7wqYJTVf4it-68K/pub?gid=1683813880&single=true&output=csv";

export type SheetRow = Record<string, string>;

/** Parser CSV con soporte para comillas, comas y saltos de línea dentro de campos. */
export function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (quoted) {
      if (character === '"' && csv[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

export function csvToRows(csv: string): SheetRow[] {
  const [headers = [], ...dataRows] = parseCsv(csv);
  return dataRows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) =>
      Object.fromEntries(headers.map((header, index) => [header.trim(), values[index]?.trim() ?? ""]))
    );
}

export async function fetchGoogleSheetRows(): Promise<SheetRow[]> {
  const response = await fetch(GOOGLE_SHEET_CSV_URL, {
    next: { revalidate: 60, tags: ["google-sheet-catalog"] },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets devolvió HTTP ${response.status}`);
  }

  return csvToRows(await response.text());
}
