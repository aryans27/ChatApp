import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join/Join.js';
import Chat from './components/Chat/Chat';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
       
      </Routes>
    </Router>
  );
}

export default App;