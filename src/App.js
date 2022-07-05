import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="container mt-5 p-5 bg-light rounded">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/registration" exact element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
