import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';

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
        const fetchPreferences = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5007/preferences/${userId}`);
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
            const response = await axios.post("http://localhost:5007/preferences", {
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
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 underline mr-2 hover:text-blue-700 transition duration-300"
            >
                <FcPrevious className="inline-block" size={48} />
                Back
            </button>
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

                <div>
                    <h4 className="text-lg font-bold">View Recipe Recommendations Based On Your Dietary Restrictions and Allergies</h4>
                    <button onClick={() => navigate('/recipe-recommendations')} className="bg-blue-500 text-white py-2 px-4 rounded">View Recommendations</button>
                </div>

                <div className="mb-4">
                    <h4 className="text-lg font-bold">Set Dietary Restrictions</h4>
                    <div className="grid grid-cols-2 gap-2">
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
                    <h4 className="text-lg font-bold">Set Allergies</h4>
                    <div className="grid grid-cols-2 gap-2">
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

                <button onClick={handleSavePreferences} className="bg-blue-500 text-white py-2 px-4 rounded">Save Preferences</button>
                </>
            )}

            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Preferences;