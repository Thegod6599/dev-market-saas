import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import HomeIcon from '../../assets/icons/home.svg?react';
import ComponentsIcon from '../../assets/icons/components.svg?react';
import TemplatesIcon from '../../assets/icons/template.svg?react';
import BuilderIcon from '../../assets/icons/builder.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import MenuIcon from '../../assets/icons/menu.svg?react';
import MoonIcon from '../../assets/icons/dark.svg?react';
import SunIcon from '../../assets/icons/light.svg?react';
import { AnimatePresence, motion } from 'framer-motion';
import NavItem from './NavItem.jxs';
import { useState } from 'react';
import { useEffect } from 'react';

const navLinks = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    name: 'Components',
    path: '/components',
    icon: <ComponentsIcon />   
  },
  {
    name: 'Templates',
    path: '/templates',
    icon: <TemplatesIcon />
  },
  {
    name: 'Builder',
    path: '/builder',
    icon: <BuilderIcon />
  }
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeDark, setIsThemeDark] = useState(false)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isThemeDark ? 'dark' : 'light');
  }, [isThemeDark])
  return (
    <>
    <div className={styles.navContainer}>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
      <div className={styles.links}>
          {navLinks.map((link) => (
          <navItem key={link.name} {...link}/>
          ))}
        </div>
      <button onClick={() => setIsThemeDark(!isThemeDark)} className='styles.themeToggle'>
        <AnimatePresence mode='wait'>
          {isThemeDark ? (
            <motion.div key='moon'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                ease: "easeOut"
              }}
              >
              <MoonIcon className={styles.themeIcons} />
            </motion.div>
          ) : (
            <motion.div key='sun'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeIn"
              }}
              >
              <SunIcon className={styles.themeIcons} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

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
        <div className={styles.mobileLinks}>
          {navLinks.map((link) => (
          <navItem key={link.name} {...link}/>
          ))}
        </div>
        <button onClick={() => setIsThemeDark(!isThemeDark)}>
        <AnimatePresence mode='wait'>
          {isThemeDark ? (
            <motion.div key='moon'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                ease: "easeOut"
              }}
              >
              <MoonIcon className={styles.mobileThemeIcons} />
            </motion.div>
          ) : (
            <motion.div key='sun'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeIn"
              }}
              >
              <SunIcon className={styles.mobileThemeIcons} />
            </motion.div>
          )}
        </AnimatePresence>
        </button>
      </motion.div>
      )}
      </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;