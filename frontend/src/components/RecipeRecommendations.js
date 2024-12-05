import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeRecommendations = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5011/recipes/${userId}`);
                console.log(response.data);
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes: ', error);
                setError('An error occurred');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [userId]);

    const viewRecipe = (id) => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/recipes/${id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                navigate(`/recipe-detail`, { state: { recipe: response.data } });
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {recipes.map(recipe => (
                <div key={recipe.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition duration-300">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg shadow-sm mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{recipe.title}</h3>
                    <button onClick={() => viewRecipe(recipe.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">View Recipe</button>
                </div>
            ))}
    </div>
    )
};

export default RecipeRecommendations;