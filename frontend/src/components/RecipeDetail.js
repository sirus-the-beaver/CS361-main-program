import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetail = () => {
    const location = useLocation();
    const recipe = location.state.recipe;

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Recipe Detail</h1>
            <div className='space-y-4'>
                {recipe.map((section, index) => (
                    <div key={index}>
                        <h2 className='text-lg font-semibold'>{section.name}</h2>
                        {section.steps.map((step, index) => (
                            <div key={index} className='border rounded-lg p-4 shadow'>
                                <h3 className='text-lg font-semibold'>Step {step.number}</h3>
                                <h4 className='text-lg font-semibold'>Equipment</h4>
                                <ul>
                                    {step.equipment.map((equipment, index) => (
                                        <li key={index}>{equipment.name}</li>
                                    ))}
                                </ul>
                                <h4 className='text-lg font-semibold'>Ingredients</h4>
                                <ul>
                                    {step.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.name}</li>
                                    ))}
                                </ul>
                                <h4 className='text-lg font-semibold'>Length</h4>
                                <p>{step.length ? `${step.length.number} ${step.length.unit}` : 'N/A'}</p>
                                <h4 className='text-lg font-semibold'>Step</h4>
                                <p>{step.step}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipeDetail;