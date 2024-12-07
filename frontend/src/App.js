import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
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
  const { auth, login } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState( () => {
    return localStorage.getItem('token') ? true : false;
  });
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (token && user && userId && username) {
      if (auth.token !== token) {
        login({ token, user, userId, username });
      }

      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setAuthLoading(false);
  }, [auth, login, setIsAuthenticated]);

  const ProtectedRoute = ({ children }) => {
    if (authLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return children;
  }

  return (
    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <h1 className="text-white text-2xl font-bold">DishFindr</h1>
          {auth.token ? (
            <nav className="w-full sm:w-auto">
              <SignOut />
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
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
    
        <Route path="/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
        <Route path="/ingredient-input" element={<ProtectedRoute><IngredientInput /></ProtectedRoute>} />
        <Route path="/recipes-list" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />
        <Route path="/recipe-detail" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
        <Route path="/recipe-recommendations" element={<ProtectedRoute><RecipeRecommendations /></ProtectedRoute>} />
        <Route path="/wine-recommendation" element={<ProtectedRoute><WineRecommendation /></ProtectedRoute>} />
        <Route path="/dish-recommendation" element={<ProtectedRoute><DishRecommendation /></ProtectedRoute>} />

      </Routes>
    </div>
  );
}

export default App;
