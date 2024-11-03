import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import Preferences from './components/Preferences';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <button onClick={() => navigate("/signup")} className='p-2 bg-blue-500 text-white rounded'>Sign Up</button>
        <button onClick={() => navigate("/signin")} className='p-2 bg-blue-500 text-white rounded'>Sign In</button>
      </header>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/ingredient-input" element={<IngredientInput />} />
        <Route path="/recipes-list" element={<RecipeList />} />
      </Routes>
    </div>
  );
}

export default App;
