import styles from './loadingPage.module.css';
import { AnimatePresence, motion } from 'framer-motion'

function LoadingScreen() {
  return (
    <>
      <div className={styles.loadingContainer}>
      <AnimatePresence>
      <div className={styles.loadingComponents}>
      <motion.div className={styles.loadingComponent1}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        exit={{ scale: [1, 1.15, 0]}}
        transition={{ duration: 0.8, }}
        ></motion.div>
      <motion.div className={styles.loadingComponent2}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        exit={{ scale: [1, 1.15, 0]}}
        transition={{ duration: 0.8, delay: 0.95, }}
        ></motion.div>
      <motion.div className={styles.loadingComponent3}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        exit={{ scale: [1, 1.15, 0]}}
        transition={{ duration: 0.8, delay: 1.90, }}
        ></motion.div>
      </div>
      </AnimatePresence>
      </div>
    </>
  )
}
export default LoadingScreen;