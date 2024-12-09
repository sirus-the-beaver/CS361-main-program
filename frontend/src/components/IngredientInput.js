import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";

const IngredientInput = () => {
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ignorePantry, setIgnorePantry] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const userId = localStorage.getItem('userId');

    const handleAddIngredient = () => {
        if (ingredient) {
            if (editIndex !== null) {
                const newIngredientsList = [...ingredientsList];
                newIngredientsList[editIndex] = ingredient;
                setIngredientsList(newIngredientsList);
                setEditIndex(null);
            } else {
                setIngredientsList([...ingredientsList, ingredient]);
            }
            setIngredient('');
        }
    }

    const handleDeleteIngredient = (index) => {
        setIngredientsList(ingredientsList.filter((_, i) => i !== index));
    }

    const handleEditIngredient = (index) => {
        setIngredient(ingredientsList[index]);
        setEditIndex(index);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com/recommendations',
            {
                ingredients: ingredientsList,
                ignorePantry: ignorePantry,
                userId: userId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                navigate('/recipes-list', { state: { recipes: response.data } });
            } else {
                console.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type='text'
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder='Enter an ingredient'
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type='button' 
                    onClick={handleAddIngredient}
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {editIndex !== null ? 'Edit Ingredient' : 'Add Ingredient'}
                </button>
                <ul className="space-y-2 mb-4">
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index} className="text-gray-700 text-lg flex items-center justify-between space-x-2">
                            <span className="flex-1">{ingredient}</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    type='button'
                                    className="text-blue-500"
                                    onClick={() => handleEditIngredient(index)}
                                >
                                    <BiSolidEditAlt size={24} />
                                </button>
                                <button
                                    type='button'
                                    className="text-red-500"
                                    onClick={() => handleDeleteIngredient(index)}
                                >
                                    <BiSolidTrashAlt size={24} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <label className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                    <input 
                        type='checkbox' 
                        checked={ignorePantry}
                        onChange={(e) => setIgnorePantry(e.target.checked)}
                        className="mr-2 h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                    />
                    <span className="text-gray-600 mt-2 sm:mt-0">Ignore common pantry ingredients (Using this feature may lead to different recipe results as this will automaticllay include common ingredients such as flour, water, sugar, etc.)</span>
                </label>
                <button 
                    type='submit' 
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hpver:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                >
                    Find Recipes
                </button>
            </form>
        </div>
    );
};

export default IngredientInput;