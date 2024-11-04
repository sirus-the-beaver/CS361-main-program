import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const location = useLocation();
    const recipe = location.state.recipe;

    return (
        <div>
            <h1>{recipe.title}</h1>
            {recipe.analyzedInstructions.map((instruction, index) => (
                <div key={index}>
                    <h2>{instruction.name}</h2>
                    <ol>
                        {instruction.steps.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    )
}

export default RecipeDetail;