import React, { useState } from 'react';
import axios from 'axios';

const DishRecommendation = () => {
    const [wine, setWine] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        if (!wine) {
            setError('Please enter a wine type');
            return;
        }

        setLoading(true);
        setError('');
        setRecommendation(null);

        try {
            const response = await axios.post('http://localhost:5015/dish-recommendation', {
                wine
            });

            setRecommendation(response.data);
        } catch (error) {
            console.error('Error fetching wine recommendation: ', error);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Get Dish Recommendation Based on Wine Type</h1>
            <input
                type="text"
                placeholder="Enter a wine type (e.g. Merlot, Chardonnay, etc.)"
                value={wine}
                onChange={(e) => setWine(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
            />
            <button
                onClick={fetchRecommendations}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                disabled={loading}
            >
                Get Recommendation
            </button>
            {loading && <p className="text-gray-800 mt-4">Loading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {recommendation && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Dish Recommendation</h2>
                    { recommendation.dishes.map((dish, index) => (
                        <p key={index} className="text-gray-800 mb-2">
                            <span className="font-semibold">Dish:</span> {dish}
                        </p>
                    ))}
                    <p className="text-gray-800 mb-2">
                        <span className="font-semibold">Description:</span> {recommendation.text}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DishRecommendation;