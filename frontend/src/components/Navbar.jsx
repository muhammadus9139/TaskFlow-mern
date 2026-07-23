import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const savedUser = localStorage.getItem("user");

    const user = savedUser
        ? JSON.parse(savedUser)
        : null;

    const logout = () => {

        document.cookie = "token=; max-age=0; path=/";

        localStorage.removeItem("user");

        navigate("/login");

    };

    const linkClass = ({ isActive }) =>
        isActive ? "active" : "";

    return (

        <nav>

            <div className="logo">

                TaskFlow

            </div>

            <div
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            <div className={`left-nav ${menuOpen ? "show" : ""}`}>

                <NavLink
                    to="/"
                    end
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/add-task"
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                >
                    Add Task
                </NavLink>

                <NavLink
                    to="/tasks"
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                >
                    Task List
                </NavLink>

                <NavLink
                    to="/about"
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                >
                    Contact
                </NavLink>

            </div>

            <div className="right-nav">

                <div className="profile-circle">

                    {user?.name?.charAt(0).toUpperCase() || "U"}

                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;