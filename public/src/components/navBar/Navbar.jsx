import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import HomeIcon from '../../assets/icons/home.svg?react';
import ComponentsIcon from '../../assets/icons/components.svg?react';
import TemplatesIcon from '../../assets/icons/template.svg?react';
import BuilderIcon from '../../assets/icons/builder.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import MenuIcon from '../../assets/icons/menu.svg?react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react'
import { useEffect } from 'react';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeDark, setIsThemeDark] = useState(false)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isThemeDark ? 'dark' : 'light');
  }, [isThemeDark])
  return (
    <>
    <div className={styles.navContainer}>
    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <div className={styles.links}>
      <Link to="/">
        <HomeIcon className={styles.icons} />
        Home
      </Link>
      <Link to="/components">
        <ComponentsIcon className={styles.icons} />
        Components
      </Link>
      <Link to="/templates">
        <TemplatesIcon className={styles.icons} />
        Templates
      </Link>
      <Link to="/builder">
        <BuilderIcon className={styles.icons} />
        Builder
      </Link>
      </div>
      <Link className={styles.login}to="/login">
        <UserIcon className={styles.icons} />
        Login
      </Link>
      <button onClick={() => setIsThemeDark(!isThemeDark)}>theme</button>

      <div className={styles.dropdown}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ""}`} /></button>
      </div>
    </nav>
    <AnimatePresence>
    {isMenuOpen && (
      <motion.div 
        className={styles.mobilelinks}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        >
        <Link to="/">Home</Link>
        <Link to="/components">Components</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/login">Login</Link>
        <button onClick={() => setIsThemeDark(!isThemeDark)}>theme</button>
      </motion.div>
      )}
      </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;