import ComponentCard from './ComponentCard';
import { LibraryEmpty } from './LibraryState';
import styles from './library.module.css';

export default function LibrarySection({ category, components }) {
  const isUnderConstruction = Boolean(category.is_under_construction);

  return (
    <section className={styles.section} id={category.slug}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>{category.name}</h2>
          {category.description ? <p className={styles.sectionDescription}>{category.description}</p> : null}
        </div>
        <span className={styles.sectionCount}>
          {isUnderConstruction
            ? 'Coming soon'
            : `${components.length} ${components.length === 1 ? 'component' : 'components'}`}
        </span>
      </div>
      {isUnderConstruction ? (
        <LibraryEmpty
          title="This section is under construction"
          children="New components will appear here soon."
        />
      ) : components.length ? (
        <div className={styles.grid}>
          {components.map((component) => (
            <ComponentCard component={component} key={component.id} />
          ))}
        </div>
      ) : (
        <LibraryEmpty title="Nothing here yet" children="This section does not have published components yet." />
      )}
    </section>
  );
}