import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import University from './pages/University';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/university" element={<University/>} />
      </Routes>
    </Router>
  );
}

export default App;
