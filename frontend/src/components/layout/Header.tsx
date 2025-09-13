import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () =>
{
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className="header">
            <div className="logo"><img src="/vite.svg" style={{ height: "32px" }} alt="Argo logo" /> Argo</div>
            <nav className="nav-links">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/bookings">My Bookings</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </nav>

            <div
                className="hamburger"
                onClick={() => setShowMobileMenu(true)}
            >
                ☰
            </div>

            <div className="profile-container">
                <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="profile-img"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                    <div className="profile-menu">
                        <button className="logout-btn">Logout</button>
                    </div>
                )}
            </div>

            <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
                <div className="d-flex justify-content-between">
                    <div className="logo"><img src="/vite.svg" style={{ height: "32px" }} alt="Argo logo" /> Argo</div>
                    <button
                        className="close-btn"
                        onClick={() => setShowMobileMenu(false)}
                    >
                        ✕
                    </button>
                </div>
                <NavLink to="/" end onClick={() => setShowMobileMenu(false)}>
                    Home
                </NavLink>
                <NavLink to="/bookings" onClick={() => setShowMobileMenu(false)}>
                    My Bookings
                </NavLink>
                <NavLink to="/profile" onClick={() => setShowMobileMenu(false)}>
                    Profile
                </NavLink>
                <NavLink to="/admin" onClick={() => setShowMobileMenu(false)}>
                    Admin
                </NavLink>

                <div className="profile-container-mobile">
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="profile-img"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                    {showProfileMenu && (
                        <div className="profile-menu">
                            <button className="logout-btn">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
