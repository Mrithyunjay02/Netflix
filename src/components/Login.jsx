import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ isAuthenticated, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    // Simulate async auth; in real app you would call an API
    window.setTimeout(() => {
      onLogin();
      navigate('/', { replace: true });
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.overlay} />
      <header className={styles.header}>
        <img src="/logo.png" alt="Netflix logo" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Sign In</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className={styles.field}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
            >
              {submitting ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
          <p className={styles.secondaryText}>
            New to Netflix? <span className={styles.link}>Sign up now.</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;

