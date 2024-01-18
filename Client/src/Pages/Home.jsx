import React from 'react';
//import AppNavBar from '../Component/Layout/AppNavBar';
import Layout from '../Component/Layout/Layout'
import Slider__skeleton from '../skeleton/Slider__skeleton';
import Fretures_skeleton from '../skeleton/Fretures_skeleton';
import Category_skeleton from '../skeleton/Category_skeleton';
import Brand_skeleton from '../skeleton/Brand_skeleton';
import Product_skeleton from '../skeleton/Product_skeleton';


//import Footer from '../Component/Layout/Footer'
const Home = () => {
    return (
        <Layout>
            <Slider__skeleton/>
            <Fretures_skeleton/>
            <Category_skeleton/>
            <Product_skeleton/>
            <Brand_skeleton/>
        </Layout>
    );
};

export default Home;