import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="side-navbar">
      <div>
        <h2 className="game-logo">AKKIRA<span>.UI</span></h2>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '3px', marginTop: '4px', textTransform: 'uppercase' }}>System Version 1.0.7</p>
      </div>

      <div className="menu-groups">
        <NavLink to="/" className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"}>[01] OVAL_MAIN</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"}>[02] DATABASE_BIO</NavLink>
        <NavLink to="/project" className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"}>[03] ARCHIVE_WORKS</NavLink>
        <NavLink to="/experience" className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"}>[04] JOURNEY_LOG</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"}>[05] TRANSMIT_MSG</NavLink>
      </div>

      <div>
        <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold' }}>● ONLINE_SERVER</p>
      </div>
    </nav>
  );
}

export default Navbar;