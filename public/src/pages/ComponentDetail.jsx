import { ArrowLeft, Download, ExternalLink, LockKeyhole } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import {
  getComponentBySlug,
  getComponentResourceUrl,
} from '../services/libraryService';
import {
  LibraryEmpty,
  LibraryError,
  LibraryLoading,
} from '../components/library/LibraryState';
import styles from '../components/library/library.module.css';

function ComponentPreview({ component }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!component.preview_url || hasFailed) {
    return <LibraryEmpty>No preview has been linked for this component yet.</LibraryEmpty>;
  }

  const isImage = /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(component.preview_url);
  return (
    <div className={styles.detailPreview}>
      {isImage ? (
        <img
          src={component.preview_url}
          alt={`${component.name} preview`}
          onError={() => setHasFailed(true)}
        />
      ) : (
        <iframe
          src={component.preview_url}
          title={`${component.name} preview`}
          loading="lazy"
        />
      )}
    </div>
  );
}

function ComponentDetail() {
  const { slug } = useParams();
  const [component, setComponent] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const loadComponent = useCallback(async () => {
    if (!slug) return;
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await getComponentBySlug(slug);
      setComponent(result);
      setStatus(result ? 'ready' : 'not-found');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Please try again in a moment.');
      setStatus('error');
    }
  }, [slug]);

  useEffect(() => {
    void loadComponent();
  }, [loadComponent]);

  if (status === 'loading') {
    return <main className={styles.detailPage}><LibraryLoading /></main>;
  }

  if (status === 'error') {
    return (
      <main className={styles.detailPage}>
        <LibraryError message={errorMessage} onRetry={loadComponent} />
      </main>
    );
  }

  if (status === 'not-found') {
    return (
      <main className={styles.detailPage}>
        <Link to="/components" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to components
        </Link>
        <LibraryEmpty>The component you’re looking for is not published or no longer exists.</LibraryEmpty>
      </main>
    );
  }

  const resourceUrl = getComponentResourceUrl(component);

  return (
    <main className={styles.detailPage}>
      <Link to="/components" className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to components
      </Link>
      <header className={styles.detailHeader}>
        <span className={styles.kicker}>
          {component.category?.name || component.type || 'Component'}
          {component.is_vip ? (
            <span className={styles.vipBadge}>
              <LockKeyhole size={12} aria-hidden="true" />
              VIP
            </span>
          ) : null}
        </span>
        <h1>{component.name}</h1>
        <p className={styles.detailDescription}>
          {component.description || 'A reusable component from the DevMarket library.'}
        </p>
      </header>

      <ComponentPreview component={component} />

      <div className={styles.detailMeta}>
        {component.type ? <span className={styles.metaItem}>Type: {component.type}</span> : null}
        {component.tags?.map((tag) => (
          <span className={styles.tag} key={tag.id}>{tag.name}</span>
        ))}
      </div>

      <div className={styles.detailActions}>
        {resourceUrl ? (
          <a href={resourceUrl} className={styles.primaryButton} target="_blank" rel="noreferrer" download>
            <Download size={16} aria-hidden="true" />
            Download resource
          </a>
        ) : null}
        {component.preview_url ? (
          <a
            href={component.preview_url}
            className={styles.secondaryButton}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Open preview
          </a>
        ) : null}
      </div>
    </main>
  );
}

export default ComponentDetail;
