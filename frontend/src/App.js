
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';

function App() {
  return (
    <div className="App">

      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      </Routes>

    </div>
  );
}

export default App;
