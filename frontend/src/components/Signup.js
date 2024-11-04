import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5002/users/register", formData);
            login(res.data);
            navigate("/ingredient-input");
            console.log("Account created:", res.data);
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    return (
        <div>
            <h2>Sign Up For an Account</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
                <button type="submit" className='block w-full p-2 bg-blue-500 text-white rounded'>Sign Up</button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
            <p>Sign up for an account to be able to keep track of your ingredients and save your favorite recipes!</p>
            <p>Already have an account? <a href='/signin'>Sign in</a></p>
        </div>
    );
};

export default Signup;