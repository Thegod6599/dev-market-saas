import { useMemo, useState } from 'react';
import './component.css';

const defaults = [
  { name: 'Atlas rebrand', owner: 'Nora Silva', status: 'In review', updated: 'Today, 10:42' },
  { name: 'Spring campaign', owner: 'Eli Brooks', status: 'In progress', updated: 'Yesterday' },
  { name: 'Field guide', owner: 'Sam Chen', status: 'Complete', updated: '12 Jun' },
];
const defaultColumns = [
  { key: 'name', label: 'Project' }, { key: 'owner', label: 'Owner' }, { key: 'status', label: 'Status' }, { key: 'updated', label: 'Updated' },
];
export function SortableDataTable({ rows = defaults, columns = defaultColumns, getRowKey = (row, index) => row.id ?? index, emptyMessage = 'No records to show.' }) {
  const [sort, setSort] = useState({ key: '', direction: 'asc' });
  const sortedRows = useMemo(() => {
    if (!sort.key) return rows;
    const column = columns.find((item) => item.key === sort.key);
    return [...rows].sort((a, b) => {
      const left = column?.sortValue ? column.sortValue(a) : a[sort.key];
      const right = column?.sortValue ? column.sortValue(b) : b[sort.key];
      const result = typeof left === 'number' && typeof right === 'number' ? left - right : String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true });
      return sort.direction === 'asc' ? result : -result;
    });
  }, [rows, columns, sort]);
  const activate = (key) => setSort((old) => ({ key, direction: old.key === key && old.direction === 'asc' ? 'desc' : 'asc' }));
  return <div className="cc-table-wrap" role="region" aria-label="Sortable data table" tabIndex="0"><table className="cc-table">
    <thead><tr>{columns.map((column) => <th key={column.key} scope="col" aria-sort={sort.key === column.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}><button type="button" onClick={() => activate(column.key)} aria-label={`Sort by ${column.label}`}>{column.label}<span aria-hidden="true">{sort.key === column.key ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}</span></button></th>)}</tr></thead>
    <tbody>{sortedRows.map((row, index) => <tr key={getRowKey(row, index)}>{columns.map((column) => <td key={column.key} data-label={column.label}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>)}</tbody>
  </table>{rows.length === 0 && <div className="cc-table__empty"><span aria-hidden="true">—</span><strong>{emptyMessage}</strong><small>Try changing your filters or add a new record.</small></div>}</div>;
}