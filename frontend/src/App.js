import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai';
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
  const isAuthenticated = !!auth.token;
  const [authLoading, setAuthLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (token && user && userId && username) {
      if (auth.token !== token) {
        login({ token, user, userId, username });
      }
    }
    setAuthLoading(false);
  }, [auth, login]);

  const ProtectedRoute = ({ children }) => {
    if (authLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return children;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <h1 className="text-white text-2xl font-bold">DishFindr</h1>
          <button className="text-white text-2xl sm:hidden focus:outline-none" onClick={toggleMenu}>
            {menuOpen ? <AiOutlineCloseCircle /> : <AiOutlineMenu />}
          </button>
          {auth.token ? (
            <nav className={`w-full sm:w-auto sm:flex ${menuOpen ? "block" : "hidden"} bg-gray-700 sm:bg-transparent sm:static absolute top-full left-0`}>
              <SignOut />
              <button className="block sm:inline-block text-white text-base sm:text-lg p-4 sm:p-0 sm:ml-4 font-medium" onClick={() => {
                setMenuOpen(false);
                navigate('/preferences');
                setMenuOpen(false);
              }}>Preferences</button>
              <button className="block sm:inline-block text-white text-base sm:text-lg p-4 sm:p-0 sm:ml-4 font-medium" onClick={() => {
                setMenuOpen(false);
                navigate('/ingredient-input');
              }}>Ingredient Input</button>
              <button className="block sm:inline-block text-white text-base sm:text-lg p-4 sm:p-0 sm:ml-4 font-medium" onClick={() => {
                setMenuOpen(false);
                navigate('/wine-recommendation');
              }}>Wine Recommendations</button>
              <button className="block sm:inline-block text-white text-base sm:text-lg p-4 sm:p-0 sm:ml-4 font-medium" onClick={() => {
                setMenuOpen(false);
                navigate('/dish-recommendation');
              }}>Dish Recommendations Based On Wine</button>
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
