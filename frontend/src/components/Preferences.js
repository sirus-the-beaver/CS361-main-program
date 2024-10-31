import React, { useState } from 'react';
import axios from 'axios';

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);

    const savePreferences = async () => {
        try {
            await axios.put("http://localhost:5002/users/preferences", { preferences }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Preferences saved!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Preferences</h1>
            <div className='space-y-4'>
                {/* dietary restrictions */}
                <h2 className='text-lg font-semibold'>Dietary Restrictions</h2>
                <div>
                    <input type="checkbox" name="preferences" value="Vegetarian" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Vegetarian</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Vegan" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Vegan</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Gluten-Free" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Gluten-Free</label>
                </div>
                {/* allergies */}
                <h2 className='text-lg font-semibold'>Allergies</h2>
                <div>
                    <input type="checkbox" name="preferences" value="Peanuts" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Peanuts</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Tree Nuts" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Tree Nuts</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Dairy" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Dairy</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Eggs" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Eggs</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Soy" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Soy</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Shellfish" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Shellfish</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Wheat" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Wheat</label>
                </div>
                <div>
                    <input type="checkbox" name="preferences" value="Fish" onChange={(e) => setPreferences([...preferences, e.target.value])} />
                    <label>Fish</label>
                </div>
                <button onClick={savePreferences} className='p-2 bg-blue-500 text-white rounded'>Save Preferences</button>
            </div>
        </div>
    );
};

export default Preferences;