import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className={`nav ${show ? "nav__black" : ""}`}>
            <img
                className="nav__logo"
                src="/netflix-logo.svg"
                alt="Netflix"
                onClick={() => navigate('/home')}
            />
            {user && (
                <div className="nav__right">
                    <img
                        className="nav__avatar"
                        src="/netflix-avatar.svg"
                        alt="Profile"
                        onClick={() => navigate('/profile')} // Keeping simplified, profile might not exist in new structure but harmless
                    />
                    <span className="nav__username">{user.name}</span>
                    <button className="nav__signout" onClick={handleLogout}>Sign Out</button>
                </div>
            )}
        </nav>
    );
}

export default Nav;
