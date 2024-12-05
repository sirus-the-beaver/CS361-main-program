import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Preferences from './components/Preferences';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeRecommendations from './components/RecipeRecommendations';
import WineRecommendation from './components/WineRecommendation';
import DishRecommendation from './components/DishRecommendation';

function App() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSignedIn(true);
    }
  }, []);  

  return (
    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          {signedIn ? (
            <nav className="w-full sm:w-auto">
              <SignOut setSignedIn={setSignedIn} />
              <button className="text-white text-base sm:text-lg ml-0 sm:ml-4 mt-2 sm:mt-0 font-medium" onClick={() => navigate('/preferences')}>Preferences</button>
              <button className="text-white text-base sm:text-lg ml-0 sm:ml-4 mt-2 sm:mt-0 font-medium" onClick={() => navigate('/ingredient-input')}>Ingredient Input</button>
              <button className="text-white text-base sm:text-lg ml-0 sm:ml-4 mt-2 sm:mt-0 font-medium" onClick={() => navigate('/wine-recommendation')}>Wine Recommendations</button>
              <button className="text-white text-base sm:text-lg ml-0 sm:ml-4 mt-2 sm:mt-0 font-medium" onClick={() => navigate('/dish-recommendation')}>Dish Recommendations Based on Wine</button>
            </nav>
          ) : (
            <nav className="w-full sm:w-auto">
            </nav>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/signup" element={<Signup setSignedIn={setSignedIn} />} />
        <Route path="/signin" element={<SignIn setSignedIn={setSignedIn} />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/ingredient-input" element={<IngredientInput />} />
        <Route path="/recipes-list" element={<RecipeList />} />
        <Route path="/recipe-detail" element={<RecipeDetail />} />
        <Route path="/recipe-recommendations" element={<RecipeRecommendations />} />
        <Route path="/wine-recommendation" element={<WineRecommendation />} />
        <Route path="/dish-recommendation" element={<DishRecommendation />} />
      </Routes>
    </div>
  );
}

export default App;
