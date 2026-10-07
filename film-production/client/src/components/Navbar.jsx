import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">

        <NavLink to="/" className="brand">
          <span className="brand-icon">🎬</span>
          <span>Film Production</span>
        </NavLink>

        <nav className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/films"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Films
          </NavLink>

          <NavLink
            to="/add-film"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Add Film
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;