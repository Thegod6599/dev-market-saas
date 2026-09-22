import styles from './library.module.css';

export function LibraryLoading() {
  return (
    <div className={styles.state} role="status">
      <div className={styles.spinner} />
      <p>Loading the component library…</p>
    </div>
  );
}

export function LibraryError({ message, onRetry }) {
  return (
    <div className={`${styles.state} ${styles.errorState}`} role="alert">
      <h2>We couldn’t load the library</h2>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className={styles.primaryButton} onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function LibraryEmpty({
  title = 'The library is ready for its first drop',
  children = 'No published components are available yet.',
}) {
  return (
    <div className={styles.state}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}