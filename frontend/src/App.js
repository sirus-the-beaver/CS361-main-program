import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Preferences from './components/Preferences';
import IngredientInput from './components/IngredientInput';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <button onClick={() => navigate("/signup")} className='p-2 bg-blue-500 text-white rounded'>Sign Up</button>
      </header>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/ingredient-input" element={<IngredientInput />} />
      </Routes>
    </div>
  );
}

export default App;
