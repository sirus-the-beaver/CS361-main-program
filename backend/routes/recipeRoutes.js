const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', (req, res) => {
    const { ingredients } = req.body;
    
    const recipes = async (ingredients) => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
                params: {
                    ingredients: ingredients.join(','),
                    ranking: 2,
                    apiKey: process.env.SPOONACULAR_API_KEY
                }
            });
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    res.json(recipes(ingredients));
})

module.exports = router;