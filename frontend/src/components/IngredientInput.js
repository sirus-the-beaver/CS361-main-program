import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcInfo, FcPrevious } from 'react-icons/fc';
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";

const IngredientInput = () => {
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ignorePantry, setIgnorePantry] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

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
            const response = await axios.post('http://localhost:5002/recipes', 
                { ingredients: ingredientsList,
                  ignorePantry: ignorePantry
                },
                { headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                    } 
                }
            )
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
        <div className="p-4">
            <div className="flex items-center mb-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-blue-500 underline mr-2"
                >
                    <FcPrevious className="inline-block" size={48} />
                </button>
                
                <div className="relative flex items-center">
                    <FcInfo 
                        className="text-xl cursor-pointer"
                        title="Going back will erase these results"
                    />
                    <span className="bottom-full mb-1 w-48 p-2 text-sm text-white bg-gray-700 rounded-lg shadow-lg opacity-0 transition-opacity duration-200 hover:opacity-100">
                        Going back will erase inputted ingredients
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder='Enter an ingredient'
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
                />
                <button 
                    type='button' 
                    onClick={handleAddIngredient}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2"
                >
                    {editIndex !== null ? 'Edit Ingredient' : 'Add Ingredient'}
                </button>
                <ul className="space-y-2 mb-4">
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index} className="text-gray-700 text-lg flex items-center space-x-2">
                            <span>{ingredient}</span>
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
                <label className="flex items-center mb-4">
                    <input 
                        type='checkbox' 
                        checked={ignorePantry}
                        onChange={(e) => setIgnorePantry(e.target.checked)}
                        className="mr-2 h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                    />
                    <span className="text-gray-600">Ignore common pantry ingredients (Using this feature may lead to different recipe results as this will automaticllay include common ingredients such as flour, water, sugar, etc.)</span>
                </label>
                <button 
                    type='submit' 
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hpver:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                >
                    Find Recipes
                </button>
            </form>
        </div>
    );
};

export default IngredientInput;