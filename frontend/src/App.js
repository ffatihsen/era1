
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import Feed from './pages/Feed';
import EventDetail from './pages/EventDetail';


function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/feed/:eventId" element={<EventDetail />} />

      </Routes>

    </div>
  );
}

export default App;
