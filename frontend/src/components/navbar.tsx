import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                background: "#88c4d4ff",
                padding: "15px 25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
            }}
        >
            {/* LOGO */}
            <Link style={linkStyle} to="/">
                <h2 style={{ margin: 0 }}>H - Hospital</h2>
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    display: "none",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "26px",
                    cursor: "pointer",
                }}
                className="nav-toggle"
            >
                ☰
            </button>

            {/* NAV LINKS */}
            <div
                className="nav-links"
                style={{
                    display: "flex",
                    gap: "25px",
                }}
            >
                <Link style={linkStyle} to="/">
                    Home
                </Link>
                <Link style={linkStyle} to="/patients">
                    Patients
                </Link>
                <Link style={linkStyle} to="/doctors">
                    Doctors
                </Link>
                <Link style={linkStyle} to="/appointments">
                    Appointments
                </Link>
                <Link style={linkStyle} to="/register">
                    Register
                </Link>
                <Link style={linkStyle} to="/login">
                    Login
                </Link>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {open && (
                <div
                    className="mobile-menu"
                    style={{
                        position: "absolute",
                        top: "70px",
                        right: "0",
                        width: "100%",
                        background: "#5086e4ff",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                        gap: "15px",
                    }}
                >
                    <Link style={mobileLinkStyle} onClick={() => setOpen(false)} to="/">
                        Home
                    </Link>
                    <Link
                        style={mobileLinkStyle}
                        onClick={() => setOpen(false)}
                        to="/patients"
                    >
                        Patients
                    </Link>
                    <Link
                        style={mobileLinkStyle}
                        onClick={() => setOpen(false)}
                        to="/doctors"
                    >
                        Doctors
                    </Link>
                    <Link
                        style={mobileLinkStyle}
                        onClick={() => setOpen(false)}
                        to="/appointments"
                    >
                        Appointments
                    </Link>
                </div>
            )}
        </nav>
    );
}

const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    transition: "opacity 0.2s",
};

const mobileLinkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 500,
};

export default Navbar;
