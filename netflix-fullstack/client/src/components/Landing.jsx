import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            {/* Header */}
            <header className="landing__header">
                <img
                    className="landing__logo"
                    src="/netflix-logo.svg"
                    alt="Netflix"
                />
                <button
                    className="landing__signinBtn"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </button>
            </header>

            {/* Hero */}
            <div className="landing__hero">
                <div className="landing__hero__overlay" />
                <div className="landing__hero__content">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <p>Ready to watch? Create your account to start watching.</p>
                    <div className="landing__hero__actions">
                        <button
                            className="landing__getstarted"
                            onClick={() => navigate('/register')}
                        >
                            Get Started
                        </button>
                        <button
                            className="landing__signin"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="landing__features">
                <div className="landing__feature">
                    <div className="landing__feature__text">
                        <h2>Enjoy on your TV.</h2>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                </div>
                <div className="landing__feature landing__feature--reverse">
                    <div className="landing__feature__text">
                        <h2>Download your shows to watch offline.</h2>
                        <p>Save your favourites easily and always have something to watch.</p>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="landing__cta">
                <h2>Ready to watch? Create your account.</h2>
                <div className="landing__cta__actions">
                    <button
                        className="landing__getstarted"
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
