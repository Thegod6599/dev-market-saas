import { ArrowUpRight, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  getComponentResourceFilename,
  getComponentResourceUrl,
} from '../../services/libraryService';
import styles from './library.module.css';

export default function TemplateCard({ template }) {
  const [hasFailed, setHasFailed] = useState(false);
  const resourceUrl = getComponentResourceUrl(template);
  const resourceFilename = getComponentResourceFilename(template);

  return (
    <article className={styles.templateCard}>
      {template.preview_url && !hasFailed ? (
        <div className={styles.previewFrame}>
          <img
            src={template.preview_url}
            alt={`${template.name} preview`}
            loading="lazy"
            onError={() => setHasFailed(true)}
          />
        </div>
      ) : (
        <div className={styles.previewPlaceholder}>
          <span>Template</span>
        </div>
      )}
      <div className={styles.templateBody}>
        <div className={styles.cardHeading}>
          <div>
            <div className={styles.eyebrow}>{template.type}</div>
            <h3>{template.name}</h3>
          </div>
          <Link
            to={`/templates/${template.slug}`}
            className={styles.iconButton}
            aria-label={`View ${template.name} details`}
            title="View details"
          >
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.description}>
          {template.description || 'A complete website experience from the DevMarket template library.'}
        </p>
        <div className={styles.cardActions}>
          <Link to={`/templates/${template.slug}`} className={styles.secondaryButton}>
            <Eye size={16} aria-hidden="true" />
            Details
          </Link>
          {resourceUrl ? (
            <a href={resourceUrl} className={styles.primaryButton} download={resourceFilename}>
              <Download size={16} aria-hidden="true" />
              Download
            </a>
          ) : (
            <span className={styles.disabledButton}>
              <Download size={16} aria-hidden="true" />
              Download soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}