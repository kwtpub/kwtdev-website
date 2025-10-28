import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import University from './pages/University';  
import LinearAlgebra from './pages/LinearAlgebra/LinearAlgebra';
import Matrix from './pages/LinearAlgebra/sections/matrix/Matrix';
import Vectors from './pages/LinearAlgebra/sections/vectors/Vectors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/university" element={<University/>} />
        <Route path="/university/linear-algebra" element={<LinearAlgebra/>} />
        <Route path="/university/matrix" element={<Matrix/>} />
        <Route path="/university/vectors" element={<Vectors/>} />
      </Routes>
    </Router>
  );
}

export default App;
