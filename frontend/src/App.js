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
        <div className="container mx-auto flex justify-between items-center px-4">
          {signedIn ? (
            <nav>
              <SignOut setSignedIn={setSignedIn} />
              <button className="text-white text-lg font-medium ml-4" onClick={() => navigate('/preferences')}>Preferences</button>
              <button className="text-white text-lg font-medium ml-4" onClick={() => navigate('/ingredient-input')}>Ingredient Input</button>
              <button className="text-white text-lg font-medium ml-4" onClick={() => navigate('/wine-recommendation')}>Wine Recommendations</button>
            </nav>
          ) : (
            <nav>
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
      </Routes>
    </div>
  );
}

export default App;
