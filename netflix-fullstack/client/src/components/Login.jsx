import api from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            login(user, token);
        } catch (err) {
            const msg = err.response?.data?.message || "Login failed. Check your credentials.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-overlay">
                <div className="auth-form">
                    <h1>Sign In</h1>
                    {error && <p className="auth-error">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="auth-footer">
                        <span className="auth-footer__gray">New to Netflix? </span>
                        <span className="auth-footer__link" onClick={() => navigate('/register')}>
                            Sign up now.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
