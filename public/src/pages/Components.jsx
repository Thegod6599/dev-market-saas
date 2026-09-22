import { useCallback, useEffect, useMemo, useState } from 'react';
import ComponentCard from '../components/library/ComponentCard';
import {
  LibraryEmpty,
  LibraryError,
  LibraryLoading,
} from '../components/library/LibraryState';
import { getLibrary } from '../services/libraryService';
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
    () => groupComponents(library.categories, library.components),
    [library.categories, library.components],
  );

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
      {status === 'ready' && groups.length === 0 ? <LibraryEmpty /> : null}
      {status === 'ready' && groups.length > 0
        ? groups.map((group) => (
            <section className={styles.section} key={group.id} id={group.slug}>
              <div className={styles.sectionHeader}>
                <h2>{group.name}</h2>
                <span className={styles.sectionCount}>
                  {group.is_under_construction
                    ? 'Coming soon'
                    : `${group.components.length} ${group.components.length === 1 ? 'component' : 'components'}`}
                </span>
              </div>
              {group.is_under_construction ? (
                <LibraryEmpty>
                  This section is under construction. New components will appear here soon.
                </LibraryEmpty>
              ) : group.components.length ? (
                <div className={styles.grid}>
                  {group.components.map((component) => (
                    <ComponentCard component={component} key={component.id} />
                  ))}
                </div>
              ) : (
                <LibraryEmpty>This section does not have published components yet.</LibraryEmpty>
              )}
            </section>
          ))
        : null}
    </main>
  );
}

export default Components;
