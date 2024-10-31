import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <button onClick={() => navigate("/signup")} className='p-2 bg-blue-500 text-white rounded'>Sign Up</button>
      </header>
    </div>
  );
}

export default App;
