import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import homeIcon from '../../assets/icons/home.svg';
import componentsIcon from '../../assets/icons/components.svg';
import templatesIcon from '../../assets/icons/template.svg';
import builderIcon from '../../assets/icons/builder.svg';
import userIcon from '../../assets/icons/user.svg';
function Navbar() {
  return (
    <nav className={styles.nav}>
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
      </Link>
    </nav>
  );
}

export default Navbar;