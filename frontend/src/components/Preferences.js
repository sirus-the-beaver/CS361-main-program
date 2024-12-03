import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = () => {
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [savedPreferences, setSavedPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5002/preferences/${userId}`);
                setSavedPreferences(response.data);
                setDietaryRestrictions(response.data.dietaryRestrictions || []);
                setAllergies(response.data.allergies || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching preferences: ", error);
                setMessage("No preferences found. Please set your preferences.");
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [userId]);


    const handleSavePreferences = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5002/preferences", {
                userId,
                dietaryRestrictions,
                allergies
            });
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error("Error saving preferences: ", error);
            setMessage("Error saving preferences. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Your Preferences</h2>

            {loading ? (
                <p>Loading...</p>
            ): (
                <>
                {savedPreferences && (
                    <div className="mb-4">
                        <h4 className="text-lg font-bold">Saved Preferences:</h4>
                        <p className="mb-2">Dietary Restrictions: {savedPreferences.dietaryRestrictions.join(', ') || "None"}</p>
                        <p className="mb-2">Allergies: {savedPreferences.allergies.join(', ') || "None"}</p>
                    </div>
                )}

                <div className="mb-4">
                    <h4 className="text-lg font-bold">Set Dietary Restrictions</h4>
                    <input
                        type="text"
                        value={dietaryRestrictions.join(', ')}
                        placeholder='e.g. vegetarian, vegan, gluten free'
                        onChange={(e) => setDietaryRestrictions(e.target.value.split(',').map(item => item.trim()))}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <h4 className="text-lg font-bold">Set Allergies</h4>
                    <input
                        type="text"
                        value={allergies.join(', ')}
                        placeholder='e.g. peanuts, shellfish, dairy'
                        onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()))}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                <button onClick={handleSavePreferences} className="bg-blue-500 text-white py-2 px-4 rounded">Save Preferences</button>
                </>
            )}

            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Preferences;