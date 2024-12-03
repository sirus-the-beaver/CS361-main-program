import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Signup = ({ setSignedIn }) => {
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
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user.email));
            localStorage.setItem("userId", res.data.user.id);
            setSignedIn(true);
            login(res.data);
            navigate("/ingredient-input");
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sign Up For an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <button type="submit" className="block w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <p className="mt-4">Sign up for an account to be able to keep track of your ingredients and save your favorite recipes!</p>
            <p className="mt-2">Already have an account? <a href="/signin" className="text-blue-500">Sign in</a></p>
        </div>
    );
};

export default Signup;