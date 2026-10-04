import { useMemo, useState } from 'react';
import './component.css';

export function Pagination({ totalPages = 12, page: controlledPage, defaultPage = 1, onPageChange, siblingCount = 1 }) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = Math.min(totalPages, Math.max(1, controlledPage ?? internalPage));
  const setPage = (next) => { const safe = Math.min(totalPages, Math.max(1, next)); if (controlledPage === undefined) setInternalPage(safe); onPageChange?.(safe); };
  const pages = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(2, page - siblingCount);
    const end = Math.min(totalPages - 1, page + siblingCount);
    return [1, ...(start > 2 ? ['left-gap'] : []), ...Array.from({ length: end - start + 1 }, (_, i) => start + i), ...(end < totalPages - 1 ? ['right-gap'] : []), totalPages];
  }, [page, siblingCount, totalPages]);
  return <nav className="cc-pagination" aria-label="Pagination" data-testid="navigation-pagination">
    <div className="cc-pagination__summary"><span className="cc-pagination__dot"></span><span>PAGE <b>{String(page).padStart(2, '0')}</b> <i>/</i> {String(totalPages).padStart(2, '0')}</span></div>
    <div className="cc-pagination__controls"><button type="button" aria-label="Previous page" disabled={page <= 1} data-testid="button-page-previous" onClick={() => setPage(page - 1)}>← <span>Previous</span></button><div className="cc-pagination__pages">{pages.map((item, index) => typeof item === 'string' ? <span className="cc-pagination__gap" key={item} aria-hidden="true">···</span> : <button key={`${item}-${index}`} type="button" aria-label={`Page ${item}`} aria-current={page === item ? 'page' : undefined} data-testid={`button-page-${item}`} onClick={() => setPage(item)}>{String(item).padStart(2, '0')}</button>)}</div><button type="button" aria-label="Next page" disabled={page >= totalPages} data-testid="button-page-next" onClick={() => setPage(page + 1)}><span>Next</span> →</button></div>
  </nav>;
}