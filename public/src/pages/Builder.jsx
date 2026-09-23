import { ArrowRight, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './builder.module.css';

function Builder() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.icon}>
          <Hammer size={30} aria-hidden="true" />
        </span>
        <span className={styles.kicker}>Builder</span>
        <h1>Your next build starts here.</h1>
        <p>
          The visual Builder is coming soon. Until then, explore the published component library
          and download the resources you need for your own project.
        </p>
        <Link to="/components" className={styles.link}>
          Browse components <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

export default Builder;
