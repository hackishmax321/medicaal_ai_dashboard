
import './App.css';
import Layout from './layouts/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout/>
      </Router>
    </div>
  );
}

export default App;
