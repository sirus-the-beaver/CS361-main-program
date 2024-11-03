import React, { useState } from 'react';
import axios from 'axios';

const IngredientInput = () => {
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
                console.log(response);
            } else {
                console.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
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
    );
};

export default IngredientInput;