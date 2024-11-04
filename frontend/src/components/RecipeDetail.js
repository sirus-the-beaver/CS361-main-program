import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe();
    }, [id]);

    return (
        <div>
            {recipe ? (
                <div>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default RecipeDetail;