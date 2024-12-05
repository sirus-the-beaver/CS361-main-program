import React, { useState } from 'react';
import axios from 'axios';

const WineRecommendation = () => {
    const [food, setFood] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        if (!food) {
            setError('Please enter a dish, cuisine, or ingredient');
            return;
        }

        setLoading(true);
        setError('');
        setRecommendation(null);

        try {
            const response = await axios.post('http://localhost:5016/wine-recommendation', {
                food: food
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
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Get Wine Recommendation</h1>
            <input
                type="text"
                placeholder="Enter a dish, cuisine, or ingredient"
                value={food}
                onChange={(e) => setFood(e.target.value)}
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Wine Recommendation</h2>
                    <p className="text-gray-800 mb-2">
                        <span className="font-semibold">Wines:</span> {recommendation.pairedWines.join(', ')}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-semibold">Description:</span> {recommendation.pairingText}
                    </p>
                    {recommendation.productMatches.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Matches</h3>
                            {recommendation.productMatches.map((product) => (
                                <div key={product.id} className="border p-4 mb-4 rounded-lg">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h4>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">Price:</span> {product.price}
                                    </p>
                                    { product.description &&
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">Description:</span> {product.description}
                                    </p>
                                    }
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">Average Rating:</span> {product.averageRating.toFixed(2)}
                                    </p>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Product
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WineRecommendation;