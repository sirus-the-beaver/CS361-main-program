const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
    const { ingredients, ignorePantry } = req.body;
    
    const recipes = async (ingredients) => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
                params: {
                    ingredients: ingredients.join(','),
                    ranking: 2,
                    ignorePantry: ignorePantry,
                    apiKey: process.env.SPOONACULAR_API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    res.json(await recipes(ingredients));
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const recipe = async (id) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions`, {
                params: {
                    apiKey: process.env.SPOONACULAR_API_KEY,
                    stepBreakdown: true
                }
            })
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const instructions = await recipe(id);
    res.status(200).json(instructions);
});

module.exports = router;