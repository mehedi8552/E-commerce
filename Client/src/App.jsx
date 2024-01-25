import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import 'react-bootstrap-icons';
import ListByBrand from './Pages/ListByBrand';
import ListByCategory from './Pages/ListByCategory';
import Search from './Component/Product/Search';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Home/>}></Route>
      <Route path="/ProducListByBrand/:id" element ={<ListByBrand/>}></Route>
      <Route path="/ProducListByCategory/:id" element ={<ListByCategory/>}></Route>//
      <Route path="/ProducListByKeyword/:keyword" element ={<Search/>}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;