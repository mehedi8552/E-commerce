import React, { useEffect } from 'react';
import Layout from '../Component/Layout/Layout';
import { useParams } from 'react-router-dom';
import PrductStore from '../store/ProductStore'; 
import ProductDetails from '../Component/Product/ProductDetails';
import Brand from '../Component/Product/Brands';
const Details = () => {
    const {id} = useParams();
    const {ProductDetailsRequest,ProductReviewListRequest,BrandRequest,BrandList}= PrductStore();
    useEffect(()=>{
        (async()=>{
            await ProductDetailsRequest(id);
            await ProductReviewListRequest(id);
            BrandList ===null? await BrandRequest():null;

        })()
    },[])
    return (
        <Layout>
            <ProductDetails/>
            <Brand/>
        </Layout>
    );
};

export default Details;