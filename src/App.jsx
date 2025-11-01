import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import University from './pages/University';  
import LinearAlgebra from './pages/LinearAlgebra/LinearAlgebra';
import Matrix from './pages/LinearAlgebra/sections/matrix/Matrix';
import Vectors from './pages/LinearAlgebra/sections/vectors/Vectors';
import MathematicalAnalysis from './pages/MathematicalAnalysis/MathematicalAnalysis';
import Differential from './pages/MathematicalAnalysis/sections/differential/Differential';
import Landing from './pages/Landing';
import './App.css'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/university" element={<University/>} />
        <Route path="/university/linear-algebra" element={<LinearAlgebra/>} />
        <Route path="/university/matrix" element={<Matrix/>} />
        <Route path="/university/vectors" element={<Vectors/>} />
        <Route path="/university/mathematical-analysis" element={<MathematicalAnalysis/>} />
        <Route path="/university/differential" element={<Differential/>} />
      </Routes>
    </Router>
  );
}

export default App;
