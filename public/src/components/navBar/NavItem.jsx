import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./NavItem.module.css";

function NavItem({ name, path, icon: Icon }) {
  return (
    <NavLink to={path} className={({isActive}) => isActive ? styles.active : styles.link}>
      {({isActive}) => (
        <>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className={styles.activeNav}
        />
      )}
      <Icon className={styles.icon} />
      <span>{name}</span>
        </>
      )}
    </NavLink>
  );
}
export default NavItem;