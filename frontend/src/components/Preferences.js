import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
    const navigate = useNavigate();
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [savedPreferences, setSavedPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");

    const availableDietaryRestrictions = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto-vegetarian",
        "ovo-vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "whole30"
    ];

    const availableAllergies = [
        "dairy",
        "egg",
        "gluten",
        "grain",
        "peanut",
        "seafood",
        "sesame",
        "shellfish",
        "soy",
        "sulfite",
        "tree nut",
        "wheat"
    ]

    useEffect(() => {
        if (savedPreferences === null) {
            const fetchPreferences = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com/preferences/${userId}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
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
        }
    }, [userId, savedPreferences]);

    const handleCheckboxChange = (item, state, setState) => {
        if (state.includes(item)) {
            setState(state.filter(i => i !== item));
        } else {
            setState([...state, item]);
        }
    };


    const handleSavePreferences = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com/preferences",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    userId,
                    dietaryRestrictions,
                    allergies
                }
            });
            setSavedPreferences({ dietaryRestrictions, allergies });
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error("Error saving preferences: ", error);
            setMessage("Error saving preferences. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Manage Your Preferences</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ): (
                <>
                {savedPreferences && (
                    <div className="mb-4">
                        <h4 className="text-lg font-bold">Saved Preferences:</h4>
                        <p className="mb-2">Dietary Restrictions: {savedPreferences.dietaryRestrictions.join(', ') || "None"}</p>
                        <p className="mb-2">Allergies: {savedPreferences.allergies.join(', ') || "None"}</p>
                    </div>
                )}

                <div>
                    <h4 className="text-lg font-bold mb-2 text-center sm:text-left">View Recipe Recommendations Based On Your Dietary Restrictions and Allergies</h4>
                    <button onClick={() => navigate('/recipe-recommendations')} className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto">View Recommendations</button>
                </div>

                <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2 text-center sm:text-left">Set Dietary Restrictions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {availableDietaryRestrictions.map(item => (
                            <label key={item} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={dietaryRestrictions.includes(item)}
                                    onChange={() => handleCheckboxChange(item, dietaryRestrictions, setDietaryRestrictions)}
                                    className="mr-2"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2 text-center sm:text-left">Set Allergies</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {availableAllergies.map(item => (
                            <label key={item} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={allergies.includes(item)}
                                    onChange={() => handleCheckboxChange(item, allergies, setAllergies)}
                                    className="mr-2"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                <button onClick={handleSavePreferences} className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto">Save Preferences</button>
                </>
            )}

            {message && <p className="mt-4 text-center sm:text-left">{message}</p>}
        </div>
    );
};

export default Preferences;