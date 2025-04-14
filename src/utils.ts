import type { AnyColumn } from 'drizzle-orm';

export function formatList(
  items: string[],
  escapeName: (name: string) => string,
  escapeSpaces: boolean = false
) {
  return items
    .reduce(
      (str, item) => `${str}, ${escapeSpaces && item.includes(' ') ? escapeName(item) : item}`,
      ''
    )
    .slice(2);
}

export function wrapColumns(columns: AnyColumn[], escapeName: (name: string) => string) {
  //console.log("COLUMNS", columns);
  const formatted = formatList(
    columns.map((column) => column ? column.name : "MISSING_COLUMN"),
    escapeName,
    true
  );
  if (columns.length === 1) {
    return columns[0] ? columns[0].name : "noname";
  }
  else {
    return `(${formatted})`;
  }

}

export function wrapColumnNames(columns: string[], escapeName: (name: string) => string) {
  return columns.length === 1 ? columns[0] : `(${formatList(columns, escapeName)})`;
}
