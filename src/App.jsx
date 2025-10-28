import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import University from './pages/University';  
import LinearAlgebra from './pages/LinearAlgebra/LinearAlgebra';
import Matrix from './pages/LinearAlgebra/sections/matrix/Matrix';
import Vectors from './pages/LinearAlgebra/sections/vectors/Vectors';
import MathematicalAnalysis from './pages/MathematicalAnalysis/MathematicalAnalysis';
import Calculus from './pages/MathematicalAnalysis/sections/calculus/Calculus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/university" element={<University/>} />
        <Route path="/university/linear-algebra" element={<LinearAlgebra/>} />
        <Route path="/university/matrix" element={<Matrix/>} />
        <Route path="/university/vectors" element={<Vectors/>} />
        <Route path="/university/mathematical-analysis" element={<MathematicalAnalysis/>} />
        <Route path="/university/calculus" element={<Calculus/>} />
      </Routes>
    </Router>
  );
}

export default App;
