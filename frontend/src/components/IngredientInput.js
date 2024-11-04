import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';

const IngredientInput = () => {
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    const handleAddIngredient = () => {
        if (ingredient) {
            setIngredientsList([...ingredientsList, ingredient]);
            setIngredient('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/recipes', 
                { ingredients: ingredientsList },
                { headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                    } 
                }
            )
            if (response.status === 200) {
                navigate('/recipes-list', { state: { recipes: response.data } });
            } else {
                console.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex items-center mb-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-blue-500 underline mr-2"
                >
                    Back
                </button>
                
                <div className="relative flex items-center">
                    <FcInfo 
                        className="text-xl cursor-pointer"
                        title="Going back will erase these results"
                    />
                    <span className="absolute bottom-full mb-1 w-48 p-2 text-sm text-white bg-gray-700 rounded-lg shadow-lg opacity-0 transition-opacity duration-200 hover:opacity-100">
                        Going back will erase these results
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder='Enter an ingredient'
                />
                <button type='button' onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
                <ul>
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <button type='submit'>Find Recipes</button>
            </form>
        </div>
    );
};

export default IngredientInput;