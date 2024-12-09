import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcPrevious } from 'react-icons/fc';

const RecipeList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recipes = location.state.recipes;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const viewRecipe = async (id) => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://dishfindr-4d3c3b6f3b94.herokuapp.com/recipes/${id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                if (response.status === 200) {
                    navigate(`/recipe-detail`, { state: { recipe: response.data, id: id } });
                } else {
                    console.error('An error occurred');
                    setError('Could not fetch recipe details');
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(true);
        await fetchRecipe();
        setLoading(false);
    }   

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <button 
                onClick={() => navigate(-1)} 
                className="text-blue-500 underline mr-2 hover:text-blue-700 transition duration-300 flex items-center"
            >
                <FcPrevious className="inline-block" size={24} />
                <span className="ml-2">Ingredient Input</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-gray-800">Recipes</h2>
            <p className="mb-4 sm:mb-6 text-gray-600">Please choose a recipe to view the equipment, ingredients, and steps.</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition duration-300">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-sm mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">{recipe.title}</h3>
                        <button onClick={() => viewRecipe(recipe.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto">View Recipe</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipeList;