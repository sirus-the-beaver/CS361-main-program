import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeList = () => {
    const location = useLocation();
    const recipes = location.state.recipes;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map(recipe => (
                <div key={recipe.id} className="border rounded-lg p-4 shadow">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    <button onClick={() => viewRecipe(recipe.id)} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        View Recipe
                    </button>
                </div>
            ))}
        </div>
    )
}

export default RecipeList;