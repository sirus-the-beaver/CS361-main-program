import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);

    const savePreferences = async () => {
        try {
            const user = localStorage.getItem("user");
            await axios.put("http://localhost:5002/preferences", { preferences, email: user }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Preferences saved!");
        } catch (error) {
            console.error(error);
        }
    };

    const getPreferences = async () => {
        try {
            const user = localStorage.getItem("user");
            const response = await axios.get("http://localhost:5002/preferences", { 
                params: { email: user }
             }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            setPreferences(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPreferences();
    }, []);

    const handleCheckboxChange = (preference) => {
        setPreferences((prevPreferences) => 
            prevPreferences.includes(preference)
                ? prevPreferences.filter((p) => p !== preference)
                : [...prevPreferences, preference]
        );
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Preferences</h1>
            <div className='space-y-4'>
                {/* dietary restrictions */}
                <h2 className='text-lg font-semibold'>Dietary Restrictions</h2>
                <div>
                    <input type="checkbox" name="preferences" value="Vegetarian" checked={preferences.includes("Vegetarian")} onChange={() => handleCheckboxChange("Vegetarian")} />
                    <label>Vegetarian</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Vegan" checked={preferences.includes("Vegan")} onChange={() => handleCheckboxChange("Vegan")} />
                    <label>Vegan</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Gluten-Free" checked={preferences.includes("Gluten-Free")} onChange={() => handleCheckboxChange("Gluten-Free")} />
                    <label>Gluten-Free</label>
                </div>
                {/* allergies */}
                <h2 className='text-lg font-semibold'>Allergies</h2>
                <div>
                    <input type="checkbox" name="preferences" value="Peanuts" checked={preferences.includes("Peanuts")} onChange={() => handleCheckboxChange("Peanuts")} />
                    <label>Peanuts</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Tree Nuts" checked={preferences.includes("Tree Nuts")} onChange={() => handleCheckboxChange("Tree Nuts")} />
                    <label>Tree Nuts</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Dairy" checked={preferences.includes("Dairy")} onChange={() => handleCheckboxChange("Dairy")} />
                    <label>Dairy</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Eggs" checked={preferences.includes("Eggs")} onChange={() => handleCheckboxChange("Eggs")} />
                    <label>Eggs</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Soy" checked={preferences.includes("Soy")} onChange={() => handleCheckboxChange("Soy")} />
                    <label>Soy</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Shellfish" checked={preferences.includes("Shellfish")} onChange={() => handleCheckboxChange("Shellfish")} />
                    <label>Shellfish</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Wheat" checked={preferences.includes("Wheat")} onChange={() => handleCheckboxChange("Wheat")} />
                    <label>Wheat</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Fish" checked={preferences.includes("Fish")} onChange={() => handleCheckboxChange("Fish")} />
                    <label>Fish</label>
                </div>
                <button onClick={savePreferences} className='p-2 bg-blue-500 text-white rounded'>Save Preferences</button>
            </div>
        </div>
    );
};

export default Preferences;