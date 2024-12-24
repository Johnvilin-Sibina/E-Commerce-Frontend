
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigationbar from './Components/Navigationbar';
import Home from './Pages/Home';
import About from './Pages/About';
import SignUp from './Pages/SignUp';
import Signin from './Pages/Signin';
import FooterComponent from './Components/FooterComponent';

const App = () => {
  return (
  <BrowserRouter>
  <Navigationbar />
 <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='signin' element={<Signin />} />
  </Routes>
  <FooterComponent />
  </BrowserRouter>
  );
};

export default App;