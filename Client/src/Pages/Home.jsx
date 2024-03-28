import React, { useEffect } from 'react';
import Layout from '../Component/Layout/Layout'
import Brands from '../Component/Product/Brands';
import Categoryes from '../Component/Product/Categoryes';
import Products from '../Component/Product/Products';
import Slider from '../Component/Product/Slider';
import Fetures from '../Component/Features/Fetures'
import FetureStore from '../store/FetureStore'; // call api
import PrductStore from '../store/ProductStore'; // call api
const Home = () => {

    const {BrandRequest,CategoryRequest,SliderRequest,RemarkRequest} = PrductStore();
    const {Feturereqest} = FetureStore();

    useEffect(()=>{
        (async ()=>{
           await SliderRequest(); 
           await BrandRequest();
           await CategoryRequest();
           await Feturereqest();
           await RemarkRequest("top");
           
        })()
    },[]);
    return (
        <Layout>
            <Slider/>
           <Fetures/> 
            <Categoryes/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default Home;