import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import LibrarySection from '../components/library/LibrarySection';
import { LibraryError, LibraryLoading } from '../components/library/LibraryState';
import { getLibrary } from '../services/libraryService';
import styles from './home.module.css';

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
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

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(trimmedQuery ? `/components?query=${encodeURIComponent(trimmedQuery)}` : '/components');
  };

  const latestComponents = library.components.slice(0, 6);
  const latestCategory = {
    id: 'recent-components',
    name: 'Recent components',
    slug: 'recent-components',
    description: 'The latest published additions from the shared DevMarket library.',
    is_under_construction: false,
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>DevMarket library</span>
          <h1>Ship the interface, not the setup.</h1>
          <p>
            Find polished, reusable React building blocks for the product you are already making.
            Browse real library data, preview each component, and download the source when you are ready.
          </p>
        </div>
        <div className={styles.searchCard}>
          <p>Search the component library</p>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <label>
              <span className={styles.visuallyHidden}>Search components</span>
              <input
                className={styles.searchInput}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “pricing” or “dashboard”"
              />
            </label>
            <button type="submit" className={styles.searchButton}>
              <Search size={16} aria-hidden="true" />
              Search
            </button>
          </form>
        </div>
      </section>

      {status === 'loading' ? <LibraryLoading /> : null}
      {status === 'error' ? (
        <div className={styles.error}>
          <LibraryError message={errorMessage} onRetry={loadLibrary} />
        </div>
      ) : null}
      {status === 'ready' ? (
        <>
          <div className={styles.stats} aria-label="Library summary">
            <div className={styles.stat}>
              <strong>{library.components.length}</strong>
              <span>published components</span>
            </div>
            <div className={styles.stat}>
              <strong>{library.categories.length}</strong>
              <span>library sections</span>
            </div>
            <div className={styles.stat}>
              <strong><Sparkles size={20} aria-label="New" /></strong>
              <span>new resources added regularly</span>
            </div>
          </div>
          {latestComponents.length ? (
            <>
              <div className={styles.sectionIntro}>
                <div>
                  <h2>Start with something useful</h2>
                  <p>Browse the newest resources first.</p>
                </div>
                <Link to="/components">
                  View all components <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <LibrarySection category={latestCategory} components={latestComponents} />
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}

export default Home;
