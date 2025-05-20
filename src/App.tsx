import './App.css';
import { Routes, Route } from 'react-router-dom';
import AnalyticsComponent from './components/custom/analyticsComponent';
import Signin from './components/custom/signin'; // Note: capitalized component name
// Note: capitalized component

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signin />} />
        <Route path="/analytics" element={<AnalyticsComponent />} />
      </Routes>
    </>
  );
}

export default App;
