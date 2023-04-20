import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './components/Home';
import { Chatbot } from './components/Chatbot';
import { Loading } from './components/Loading';

function App() {
 

  //   const newObj = {...formErrors};
  //   if (!/^[a-z]*$/.test(e.target.value)) {
  //     newObj[e.target.id] = {
  //       error: true,
  //       errorMessage: 'First Name is mandatory!'
  //     } 
  //   } else {
  //       newObj[e.target.id] = {
  //         error: false,
  //         errorMessage: 'First Name is mandatory!'
  //       };
  //   }
  //   setFormErrors(newObj);
  // }

  return (
    <Routes>
      <Route path='/' element={<Loading />}></Route>
      <Route path='home' element={<Home />}></Route>
      <Route path='chatbot' element={<Chatbot />}></Route>
    </Routes>
  );
}

export default App;
