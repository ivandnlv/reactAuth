import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import './firebase';
import Main from './pages/Main';

function App() {
  return (
    <div className="container mt-5 p-5 bg-light rounded">
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/registration" exact element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
