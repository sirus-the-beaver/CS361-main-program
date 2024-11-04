import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcPrevious } from 'react-icons/fc';

const RecipeList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recipes = location.state.recipes;

    const viewRecipe = (id) => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/recipes/${id}`);
                navigate(`/recipe-detail`, { state: { recipe: response.data } });
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe();
    }   

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <button 
                onClick={() => navigate(-1)} 
                className="text-blue-500 underline mr-2 hover:text-blue-700 transition duration-300"
            >
                <FcPrevious className="inline-block" size={48} />
                Ingredient Input
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Recipes</h2>
            <p className="mb-6 text-gray-600">Please choose a recipe to view the equipment, ingredients, and steps.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition duration-300">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg shadow-sm mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{recipe.title}</h3>
                        <button onClick={() => viewRecipe(recipe.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">View Recipe</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipeList;