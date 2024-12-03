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
        <div>
            <h2>Manage Your Preferences</h2>

            {loading ? (
                <p>Loading...</p>
            ): (
                <>
                {savedPreferences && (
                    <div>
                        <h4>Saved Preferences:</h4>
                        <p>Dietary Restrictions: {savedPreferences.dietaryRestrictions.join(', ') || "None"}</p>
                        <p>Allergies: {savedPreferences.allergies.join(', ') || "None"}</p>
                    </div>
                )}

                <div>
                    <h4>Set Dietary Restrictions</h4>
                    <input
                        type="text"
                        value={dietaryRestrictions.join(', ')}
                        placeholder='e.g. vegetarian, vegan, gluten free'
                        onChange={(e) => setDietaryRestrictions(e.target.value.split(',').map(item => item.trim()))}
                    />
                </div>

                <div>
                    <h4>Set Allergies</h4>
                    <input
                        type="text"
                        value={allergies.join(', ')}
                        placeholder='e.g. peanuts, shellfish, dairy'
                        onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()))}
                    />
                </div>

                <button onClick={handleSavePreferences}>Save Preferences</button>
                </>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default Preferences;