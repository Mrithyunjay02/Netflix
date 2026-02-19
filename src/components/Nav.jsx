import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav({ isAuthenticated, onLogout }) {
  const [showBackground, setShowBackground] = useState(false);
  const [avatarBroken, setAvatarBroken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoError = (event) => {
    // Hide broken logo while preserving layout box
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.style.visibility = 'hidden';
  };

  const handleAvatarError = () => {
    setAvatarBroken(true);
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  return (
    <header
      className={`${styles.nav} ${showBackground ? styles.navBlack : ''}`}
    >
      <div className={styles.navContent}>
        <img
          className={styles.logo}
          src="/logo.png"
          alt="Netflix logo"
          onError={handleLogoError}
        />
        {isAuthenticated ? (
          <div className={styles.rightSection}>
            <button
              type="button"
              className={styles.avatarWrapper}
              aria-label="Open user profile"
            >
              {avatarBroken ? (
                <div className={styles.avatarPlaceholder} aria-hidden="true">
                  U
                </div>
              ) : (
                <img
                  className={styles.avatar}
                  src="/avatar.png"
                  alt="User avatar"
                  onError={handleAvatarError}
                />
              )}
            </button>
            <button
              type="button"
              className={styles.authButton}
              onClick={handleLogoutClick}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.authButton}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Nav;

