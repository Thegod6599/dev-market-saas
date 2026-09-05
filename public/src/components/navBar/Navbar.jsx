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
import NavItem from './NavItem.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon
  },
  {
    name: 'Components',
    path: '/components',
    icon: ComponentsIcon
  },
  {
    name: 'Templates',
    path: '/templates',
    icon: TemplatesIcon
  },
  {
    name: 'Builder',
    path: '/builder',
    icon: BuilderIcon
  }
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeDark, setIsThemeDark] = useState(false)
  const [isThemeSaving, setIsThemeSaving] = useState(false)
  const { user, profile, loading, settings, updateSettings, } = useContext(AuthContext);
  async function handleThemeChange() {
    if (isThemeSaving) return;

    const previousTheme = isThemeDark;
    const nextTheme = !previousTheme;
    setIsThemeDark(nextTheme);

    if (!user) return;

    setIsThemeSaving(true);
    try {
      await updateSettings({
        theme: nextTheme ? "dark" : "light",
      });
    } catch (error) {
      console.error("Theme update failed:", error);
      setIsThemeDark(previousTheme);
    } finally {
      setIsThemeSaving(false);
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!settings) return;

    if (settings.theme === "dark") {
      setIsThemeDark(true)
    } else if (settings.theme === "light") {
      setIsThemeDark(false)
    } else if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const updateTheme = () => {
        setIsThemeDark(mediaQuery.matches)
      }
      updateTheme();

      mediaQuery.addEventListener("change", updateTheme);

      return () => {
        mediaQuery.removeEventListener("change", updateTheme);
      }
    }
  }, [settings]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isThemeDark ? 'dark' : 'light');
  }, [isThemeDark])
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside() {
      setIsMenuOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen])
  return (
    <>
    <div className={styles.navContainer}>
    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.links}>
          {navLinks.map((link) => (
          <NavItem key={link.name} {...link}/>
          ))}
        </div>
      {!loading && (
        user ? (
          <Link to="/settings" className={styles.login} aria-label='Profile settings'>
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Profile" className={styles.profilePic} />
            ) : (
              <UserIcon className={styles.profileIcons} />
            )}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            <UserIcon className={styles.icons} />
            <span>Login</span>
          </Link>
        )
      )}
      <button onClick={handleThemeChange} className='styles.themeToggle' disabled={isThemeSaving} aria-busy={isThemeSaving}>
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

      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ""}`} /></button>
      </div>
    </nav>
    <AnimatePresence>
    {isMenuOpen && (
      <motion.div 
        className={styles.mobilelinks}
        onClick={(e) => e.stopPropagation()}
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
          <NavItem key={link.name} {...link}/>
          ))}
        </div>
        {!loading && (
        user ? (
          <Link to="/settings" className={styles.mobileLogin} aria-label='Profile settings'>
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Profile" className={styles.profilePic} />
            ) : (
              <UserIcon className={styles.profileIcons} />
            )}
          </Link>
        ) : (
          <Link to="/login" className={styles.mobileLogin}>
            <UserIcon className={styles.icons} />
            <span>Login</span>
          </Link>
        )
      )}
        <button onClick={handleThemeChange} disabled={isThemeSaving} aria-busy={isThemeSaving}>
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