import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/users/register", formData);
            console.log("Account created:", res.data);
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded' required />
            <button type="submit" className='block w-full p-2 bg-blue-500 text-white rounded'>Sign Up</button>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    );
};

export default Signup;