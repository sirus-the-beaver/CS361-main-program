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
        if (recipes.length === 0) {
            const fetchRecipes = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`https://dishfindr-microservice-c-ca58d83577d1.herokuapp.com/recipes/${userId}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    console.log(response.data);
                    response.data.length > 0 ? setRecipes(response.data) : setError('No recipes found');
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching recipes: ', error);
                    setError('An error occurred');
                    setLoading(false);
                }
            };

            fetchRecipes();
        }
    }, [userId, recipes]);

    const viewRecipe = (id) => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://dishfindr-4d3c3b6f3b94.herokuapp.com/recipes/${id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                navigate(`/recipe-detail`, { state: { recipe: response.data, id: id } });
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe();
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
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
};

export default RecipeRecommendations;