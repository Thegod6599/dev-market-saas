import ComponentCard from './ComponentCard';
import { LibraryEmpty } from './LibraryState';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './library.module.css';

export default function LibrarySection({ category, components }) {
  const isUnderConstruction = Boolean(category.is_under_construction);
  const viewportRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setCanScrollLeft(viewport.scrollLeft > 4);
    setCanScrollRight(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !components.length || isUnderConstruction) return undefined;

    updateScrollState();
    viewport.addEventListener('scroll', updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [components.length, isUnderConstruction, updateScrollState]);

  const scroll = (direction) => {
    viewportRef.current?.scrollBy({
      left: direction * Math.max(viewportRef.current.clientWidth * 0.82, 280),
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section} id={category.slug}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>{category.name}</h2>
          {category.description ? <p className={styles.sectionDescription}>{category.description}</p> : null}
        </div>
        <div className={styles.sectionTools}>
          <span className={styles.sectionCount}>
            {isUnderConstruction
              ? 'Coming soon'
              : `${components.length} ${components.length === 1 ? 'component' : 'components'}`}
          </span>
          {!isUnderConstruction && components.length > 1 && (canScrollLeft || canScrollRight) ? (
            <div className={styles.carouselControls} aria-label={`${category.name} carousel controls`}>
              <button
                type="button"
                className={styles.carouselButton}
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label={`Scroll ${category.name} left`}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.carouselButton}
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label={`Scroll ${category.name} right`}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {isUnderConstruction ? (
        <LibraryEmpty
          title="This section is under construction"
          children="New components will appear here soon."
        />
      ) : components.length ? (
        <div className={styles.carouselViewport} ref={viewportRef}>
          <div className={styles.carouselTrack}>
            {components.map((component) => (
              <ComponentCard component={component} key={component.id} />
            ))}
          </div>
        </div>
      ) : (
        <LibraryEmpty title="Nothing here yet" children="This section does not have published components yet." />
      )}
    </section>
  );
}