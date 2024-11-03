import React, { useState } from 'react';

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
        console.log(ingredientsList);
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