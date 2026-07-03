import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/components">Components</Link>
      <Link to="/templates">Templates</Link>
      <Link to="/builder">Builder</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
