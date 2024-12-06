import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/signin', { replace: true });

        window.location.reload();
    };

    return (
        <button onClick={handleSignOut} className="text-white text-lg font-medium">Sign Out</button>
    );
}

export default SignOut;