import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import CommercialProposal from './CommercialProposal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/commercial-proposal" element={<CommercialProposal />} />
      </Routes>
    </Router>
  );
}

export default App;
