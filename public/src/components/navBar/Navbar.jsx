import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/components">Components</Link>
      <Link to="/templates">Templates</Link>
      <Link to="/builder">Builder</Link>
      </div>
      <Link className={styles.login}to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;