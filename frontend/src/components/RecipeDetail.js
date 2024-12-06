import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';
import axios from 'axios';

const RecipeDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state.recipe;
    const recipeId = location.state.id.toString();
    // const [notes, setNotes] = useState([]);
    // const [newNote, setNewNote] = useState('');
    const userId = localStorage.getItem('userId');

    const handleExcludeRecipe = async () => {
        try {
            const response = await axios.post('https://dishfindr-microservice-c-ca58d83577d1.herokuapp.com/exclude-recipe',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    userId: userId,
                    recipeId: recipeId
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const handleAddNote = async () => {
    //     const response = await axios.post('http://localhost:5002/notes', {
    //         recipeId: recipeId,
    //         content: newNote,
    //         author: localStorage.getItem('username')
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     console.log(response.data.note.content);
    //     const data = await response.data;
    //     if (notes) {
    //         setNotes([...notes, data.note]);
    //     } else {
    //         setNotes([data.note]);
    //     }
    //     setNewNote('');
    // }

    // const fetchNotes = async () => {
    //     const response = await axios.get('http://localhost:5002/notes', {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     });

    //     const data = await response.data;
    //     console.log(data.notes);
    //     setNotes(data.notes);
    // }

    // useEffect(() => {
    //     fetchNotes();
    // }, []);

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <button 
                onClick={() => navigate(-1)} 
                className="text-blue-500 underline mr-2 hover:text-blue-700 transition duration-300 flex items-center"
            >
                <FcPrevious className="inline-block" size={24} />
                <span className="ml-2">Recipe List</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-gray-800">Recipe Detail</h1>
            <button
                onClick={handleExcludeRecipe}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
                Exclude Recipe from Recommendations
            </button>
            {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Notes</h2>
                <div className="flex flex-col sm:flex-row items-center mb-4">
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="border border-gray-300 w-full sm:w-auto flex-grow mb-2 sm:mb-0 sm:mr-2 p-2 rounded-lg"
                        placeholder="Add a note..."
                    />
                    <button
                        onClick={handleAddNote}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                    >
                        Add Note
                    </button>
                </div>
                <div className="space-y-4">
                    {notes && notes.map((note, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow">
                            <h3 className="text-lg font-semibold text-gray-600">{note.author}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="space-y-6">
                {recipe.map((section, index) => (
                    <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">{section.name}</h2>
                        {section.steps.map((step, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow mb-4">
                                <h3 className="text-lg font-semibold text-gray-600">Step {step.number}</h3>
                                <h4 className='text-lg font-semibold'>Equipment</h4>
                                <ul className="list-disc list-inside">
                                    {step.equipment.map((equipment, index) => (
                                        <li key={index}>{equipment.name}</li>
                                    ))}
                                </ul>
                                <h4 className='text-lg font-semibold'>Ingredients</h4>
                                <ul className="list-disc list-inside">
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