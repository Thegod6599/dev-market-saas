import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import LibrarySection from '../components/library/LibrarySection';
import {
  LibraryEmpty,
  LibraryError,
  LibraryLoading,
} from '../components/library/LibraryState';
import {
  filterComponents,
  getComponentFilterOptions,
  getLibrary,
} from '../services/libraryService';
import styles from '../components/library/library.module.css';

function groupComponents(categories, components) {
  const groups = categories.map((category) => ({
    ...category,
    components: components.filter((component) => component.category_id === category.id),
  }));
  const categorizedIds = new Set(categories.map((category) => category.id));
  const uncategorized = components.filter((component) => !categorizedIds.has(component.category_id));

  if (uncategorized.length) {
    groups.push({
      id: 'uncategorized',
      name: 'Other components',
      slug: 'other-components',
      section_type: 'components',
      is_under_construction: false,
      components: uncategorized,
    });
  }

  return groups;
}

function Components() {
  const [library, setLibrary] = useState({ categories: [], components: [] });
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [filters, setFilters] = useState({
    query: '',
    categoryId: '',
    type: '',
    tagId: '',
  });

  const loadLibrary = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      setLibrary(await getLibrary());
      setStatus('ready');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Please try again in a moment.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadLibrary();
  }, [loadLibrary]);

  const groups = useMemo(
    () => groupComponents(library.categories, filterComponents(library.components, filters)),
    [library.categories, library.components, filters],
  );
  const filteredComponents = useMemo(
    () => filterComponents(library.components, filters),
    [library.components, filters],
  );
  const filterOptions = useMemo(
    () => getComponentFilterOptions(library.components),
    [library.components],
  );
  const hasFilters = Object.values(filters).some(Boolean);
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const clearFilters = () => setFilters({ query: '', categoryId: '', type: '', tagId: '' });

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>DevMarket library</span>
          <h1>Build from a better starting point.</h1>
          <p>
            Browse reusable React components, organized by the sections that matter to your
            project. Preview the work, inspect its metadata, and download the linked resource.
          </p>
        </div>
      </header>

      {status === 'loading' ? <LibraryLoading /> : null}
      {status === 'error' ? <LibraryError message={errorMessage} onRetry={loadLibrary} /> : null}
      {status === 'ready' ? (
        <>
          <div className={styles.filters} aria-label="Search and filter components">
            <label className={styles.searchField}>
              <Search size={18} aria-hidden="true" />
              <span className={styles.visuallyHidden}>Search components</span>
              <input
                type="search"
                placeholder="Search name, type, tags, or description"
                value={filters.query}
                onChange={(event) => updateFilter('query', event.target.value)}
              />
            </label>
            <div className={styles.filterSelects}>
              <label className={styles.selectField}>
                <span className={styles.visuallyHidden}>Category</span>
                <select
                  value={filters.categoryId}
                  onChange={(event) => updateFilter('categoryId', event.target.value)}
                >
                  <option value="">All categories</option>
                  {library.categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.selectField}>
                <span className={styles.visuallyHidden}>Type</span>
                <select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)}>
                  <option value="">All types</option>
                  {filterOptions.types.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.selectField}>
                <span className={styles.visuallyHidden}>Tag</span>
                <select value={filters.tagId} onChange={(event) => updateFilter('tagId', event.target.value)}>
                  <option value="">All tags</option>
                  {filterOptions.tags.map((tag) => (
                    <option value={tag.id} key={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {hasFilters ? (
              <button type="button" className={styles.clearButton} onClick={clearFilters}>
                <X size={16} aria-hidden="true" />
                Clear
              </button>
            ) : (
              <span className={styles.filterHint}>
                <SlidersHorizontal size={16} aria-hidden="true" />
                {library.components.length} available
              </span>
            )}
          </div>
          {hasFilters && filteredComponents.length === 0 ? (
            <LibraryEmpty
              title="No components match those filters"
              children="Try a different search term or clear the filters to browse the full library."
            />
          ) : groups.length === 0 ? (
            <LibraryEmpty />
          ) : (
            groups.map((group) => (
              <LibrarySection category={group} components={group.components} key={group.id} />
            ))
          )}
        </>
      ) : null}
    </main>
  );
}

export default Components;
