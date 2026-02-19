import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/home');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="auth-page fade-in">
            <div className="auth-overlay"></div>
            <div className="auth-form-container">
                <div className="glass-card">
                    <h1>Sign In</h1>
                    <form onSubmit={handleLogin}>
                        <div className="auth-input-group">
                            <input
                                className="modern-input"
                                type="email"
                                placeholder="Email or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="modern-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="auth-btn" type="submit">Sign In</button>
                    </form>
                    <div className="auth-footer">
                        New to Netflix?
                        <span className="auth-link" onClick={() => navigate('/register')}>Sign up now.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
