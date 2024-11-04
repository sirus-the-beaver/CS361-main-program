import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Preferences from './components/Preferences';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

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
              <button className="text-white text-lg font-medium mr-4" onClick={() => navigate('/preferences')}>Preferences</button>
              <SignOut />
            </nav>
          ) : (
            <nav>
              <button className="text-white text-lg font-medium mr-4" onClick={() => navigate('/signup')}>Sign Up</button>
              <button className="text-white text-lg font-medium" onClick={() => navigate('/signin')}>Sign In</button>
            </nav>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/ingredient-input" element={<IngredientInput />} />
        <Route path="/recipes-list" element={<RecipeList />} />
        <Route path="/recipe-detail" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
