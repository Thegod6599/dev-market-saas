import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, Eye, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { getComponentResourceUrl } from '../../services/libraryService';
import styles from './library.module.css';

function Preview({ component }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!component.preview_url || hasFailed) {
    return (
      <div className={styles.previewPlaceholder}>
        <span>{component.type || 'Component'}</span>
      </div>
    );
  }

  return (
    <div className={styles.previewFrame}>
      <img
        src={component.preview_url}
        alt={`${component.name} preview`}
        loading="lazy"
        onError={() => setHasFailed(true)}
      />
    </div>
  );
}

export default function ComponentCard({ component }) {
  const resourceUrl = getComponentResourceUrl(component);

  return (
    <article className={styles.card}>
      <Preview component={component} />
      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <div>
            <div className={styles.eyebrow}>
              {component.type || 'Component'}
              {component.category?.name ? ` · ${component.category.name}` : ''}
              {component.is_vip ? (
                <span className={styles.vipBadge}>
                  <LockKeyhole size={12} aria-hidden="true" />
                  VIP
                </span>
              ) : null}
            </div>
            <h3>{component.name}</h3>
          </div>
          <Link
            to={`/components/${component.slug}`}
            className={styles.iconButton}
            aria-label={`View ${component.name} details`}
            title="View details"
          >
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.description}>
          {component.description || 'A reusable interface component for your next project.'}
        </p>
        {component.tags?.length ? (
          <div className={styles.tags} aria-label="Tags">
            {component.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
        <div className={styles.cardActions}>
          <Link to={`/components/${component.slug}`} className={styles.secondaryButton}>
            <Eye size={16} aria-hidden="true" />
            Details
          </Link>
          {resourceUrl && !component.is_vip ? (
            <a
              href={resourceUrl}
              className={styles.primaryButton}
              target="_blank"
              rel="noreferrer"
              download
            >
              <Download size={16} aria-hidden="true" />
              Download
            </a>
          ) : (
            <span className={styles.disabledButton} title="No downloadable resource is linked yet">
              <Download size={16} aria-hidden="true" />
              {component.is_vip ? 'Coming soon' : 'Download soon'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}