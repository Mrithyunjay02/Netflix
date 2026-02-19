import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { name, email, password, phone });
            if (res.data.success) {
                alert('Registration successful! Please login.');
                navigate('/');
            } else {
                alert('Registration failed');
            }
        } catch (err) {
            alert('Registration error');
        }
    };

    return (
        <div className="auth-page fade-in">
            <div className="auth-overlay"></div>
            <div className="auth-form-container">
                <div className="glass-card" style={{ maxWidth: '500px' }}>
                    <h1>Create Account</h1>
                    <form onSubmit={handleRegister}>
                        <div className="auth-input-group">
                            <input
                                className="modern-input"
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                className="modern-input"
                                type="email"
                                placeholder="Email address"
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
                            <input
                                className="modern-input"
                                type="tel"
                                placeholder="Phone Number (Optional)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button className="auth-btn" type="submit">Sign Up</button>
                    </form>
                    <div className="auth-footer">
                        Already have an account?
                        <span className="auth-link" onClick={() => navigate('/')}>Sign in.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
