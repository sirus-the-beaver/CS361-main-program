import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';

const RecipeDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state.recipe;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <button 
                onClick={() => navigate(-1)} 
                className="text-blue-500 underline mr-2 hover:text-blue-700 transition duration-300"
            >
                <FcPrevious className="inline-block" size={48} />
                Recipe List
            </button>
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Recipe Detail</h1>
            <div className="space-y-6">
                {recipe.map((section, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{section.name}</h2>
                        {section.steps.map((step, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow mb-4">
                                <h3 className="text-lg font-semibold text-gray-600">Step {step.number}</h3>
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