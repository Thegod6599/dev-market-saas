import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import homeIcon from '../../assets/icons/home.svg';
import componentsIcon from '../../assets/icons/components.svg';
import templatesIcon from '../../assets/icons/template.svg';
import builderIcon from '../../assets/icons/builder.svg';
import userIcon from '../../assets/icons/user.svg';
import menuIcon from '../../assets/icons/menu.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react'


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
    <div className={styles.navContainer}>
    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <div className={styles.links}>
      <Link to="/">
        <img className={styles.icons} src={homeIcon} alt='Home'/>
        Home
      </Link>
      <Link to="/components">
        <img className={styles.icons} src={componentsIcon} alt='Components'/>
        Components
      </Link>
      <Link to="/templates">
        <img className={styles.icons} src={templatesIcon} alt='Templates'/>
        Templates
      </Link>
      <Link to="/builder">
        <img className={styles.icons} src={builderIcon} alt='Builder'/>
        Builder
      </Link>
      </div>
      <Link className={styles.login}to="/login">
        <img className={styles.icons} src={userIcon} alt='login'/>
        Login
      </Link>

      <div className={styles.dropdown}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}><img className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ""}`} src={menuIcon}/></button>
      </div>
    </nav>
    {isMenuOpen && (
      <motion.div 
        className={styles.mobilelinks}
        initial={{y: -20}}
        animate={{y: 0}}
        exit={{y: -20}}
        transition={{
          duration: 0.2,
          ease: isMenuOpen ? "easeOut" : "easeIn"
        }}
        >
        <Link to="/">Home</Link>
        <Link to="/components">Components</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/login">Login</Link>
      </motion.div>
      )}
      </div>
    </>
  );
}

export default Navbar;