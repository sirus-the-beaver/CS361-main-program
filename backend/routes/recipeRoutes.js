const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', (req, res) => {
    const { ingredients } = req.body;
    
    const recipes = async (ingredients) => {
        try {
            const response = await axios.post('https://api.spoonacular.com/recipes/findByIngredients', {
                apiKey: process.env.SPOONACULAR_API_KEY,
                ingredients: ingredients.join(','),
                ranking: 2
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