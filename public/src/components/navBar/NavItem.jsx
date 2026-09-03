import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NavItem.module.css";

function NavItem({ name, path, icon: Icon }) {
  return (
    <NavLink to={path} className={({isActive}) => isActive ? styles.active : styles.link}>
      {({ isActive }) => (
        <>
          <div className={styles.content}>
            <Icon className={styles.icon} />
            <span>{name}</span>
          </div>
          <AnimatePresence mode='wait'>
          {isActive && (
              <motion.div
                key={path}
                className={styles.activeNav}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)"}}
                exit={{ clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                <Icon className={styles.icon} />
                <span>{name}</span>
              </motion.div>
          )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}
export default NavItem;