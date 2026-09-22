import { useCallback, useEffect, useState } from 'react';
import TemplateCard from '../components/library/TemplateCard';
import {
  LibraryEmpty,
  LibraryError,
  LibraryLoading,
} from '../components/library/LibraryState';
import { getTemplates } from '../services/libraryService';
import styles from '../components/library/library.module.css';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const loadTemplates = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      setTemplates(await getTemplates());
      setStatus('ready');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Please try again in a moment.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadTemplates();
  }, [loadTemplates]);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>DevMarket templates</span>
          <h1>Start with the whole experience.</h1>
          <p>
            Browse complete website directions for when you need more than a single component.
            Templates stay separate from the component library and grow with the product.
          </p>
        </div>
      </header>
      {status === 'loading' ? <LibraryLoading /> : null}
      {status === 'error' ? <LibraryError message={errorMessage} onRetry={loadTemplates} /> : null}
      {status === 'ready' && templates.length === 0 ? (
        <LibraryEmpty
          title="Templates are coming soon"
          children="The template library is being prepared. Browse components while the first full experiences are on the way."
        />
      ) : null}
      {status === 'ready' && templates.length ? (
        <div className={styles.grid}>
          {templates.map((template) => (
            <TemplateCard template={template} key={template.id ?? template.slug} />
          ))}
        </div>
      ) : null}
    </main>
  );
}

export default Templates;
