import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/users/login', 
                { email, password }
            );

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/ingredient-input');
            } else {
                setError('An error occurred');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Sign In</button>
            </form>
            <p>Don't have an account? <a href='/signup'>Sign up</a></p>
        </div>
    )
};

export default SignIn;