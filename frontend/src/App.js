import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './components/Home';
import { Chatbot } from './components/Chatbot';
import { Loading } from './components/Loading';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Loading />}></Route>
      <Route path='home' element={<Home />}></Route>
      <Route path='chatbotload/:userID' element={<Loading />}></Route>
      <Route path='chatbot/:userID' element={<Chatbot />}></Route>
    </Routes>
  );
}

export default App;
