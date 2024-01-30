import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import 'react-bootstrap-icons';
import ListByBrand from './Pages/ListByBrand';
import ListByCategory from './Pages/ListByCategory';
import ListByKeyword from './Pages/ListByKeyword';
import DetailsPage from './Pages/DetailsPage'
import LegalMain from './Pages/Legal/legalMain'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Home/>}></Route>
      <Route path="/ProducListByBrand/:id" element ={<ListByBrand/>}></Route>
      <Route path="/ProducListByCategory/:id" element ={<ListByCategory/>}></Route>//
      <Route path="/ProducListByKeyword/:keyword" element ={<ListByKeyword/>}></Route>
      <Route path="/ProductDetails/:id" element ={<DetailsPage/>}></Route>
      
      <Route path="/LegalsControl/:type" element ={<LegalMain/>}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;