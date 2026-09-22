import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import {
  getComponentResourceUrl,
  getTemplateBySlug,
} from '../services/libraryService';
import {
  LibraryEmpty,
  LibraryError,
  LibraryLoading,
} from '../components/library/LibraryState';
import styles from '../components/library/library.module.css';

function TemplatePreview({ template }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!template.preview_url || hasFailed) {
    return <LibraryEmpty title="No preview yet" children="A preview has not been linked for this template." />;
  }

  const isImage = /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(template.preview_url);
  return (
    <div className={styles.detailPreview}>
      {isImage ? (
        <img
          src={template.preview_url}
          alt={`${template.name} preview`}
          onError={() => setHasFailed(true)}
        />
      ) : (
        <iframe src={template.preview_url} title={`${template.name} preview`} loading="lazy" />
      )}
    </div>
  );
}

function TemplateDetail() {
  const { slug } = useParams();
  const [template, setTemplate] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const loadTemplate = useCallback(async () => {
    if (!slug) return;
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await getTemplateBySlug(slug);
      setTemplate(result);
      setStatus(result ? 'ready' : 'not-found');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Please try again in a moment.');
      setStatus('error');
    }
  }, [slug]);

  useEffect(() => {
    void loadTemplate();
  }, [loadTemplate]);

  if (status === 'loading') return <main className={styles.detailPage}><LibraryLoading /></main>;
  if (status === 'error') {
    return <main className={styles.detailPage}><LibraryError message={errorMessage} onRetry={loadTemplate} /></main>;
  }
  if (status === 'not-found') {
    return (
      <main className={styles.detailPage}>
        <Link to="/templates" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to templates
        </Link>
        <LibraryEmpty title="Template not found" children="This template is not published or no longer exists." />
      </main>
    );
  }

  const resourceUrl = getComponentResourceUrl(template);
  return (
    <main className={styles.detailPage}>
      <Link to="/templates" className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to templates
      </Link>
      <header className={styles.detailHeader}>
        <span className={styles.kicker}>{template.type}</span>
        <h1>{template.name}</h1>
        <p className={styles.detailDescription}>
          {template.description || 'A complete website experience from DevMarket.'}
        </p>
      </header>
      <TemplatePreview template={template} />
      <div className={styles.detailActions}>
        {resourceUrl ? (
          <a href={resourceUrl} className={styles.primaryButton} target="_blank" rel="noreferrer" download>
            <Download size={16} aria-hidden="true" />
            Download resource
          </a>
        ) : null}
        {template.preview_url ? (
          <a href={template.preview_url} className={styles.secondaryButton} target="_blank" rel="noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            Open preview
          </a>
        ) : null}
      </div>
    </main>
  );
}

export default TemplateDetail;
