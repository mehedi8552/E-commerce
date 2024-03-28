import React,{ useEffect }  from 'react';
import ProductStore from '../store/ProductStore';
import Layout from '../Component/Layout/Layout'
import BrandList from '../Component/Product/BrandList'
import { useParams } from 'react-router-dom';

const ListByBrand = () => {
const {BrandListRequest} = ProductStore();
const {id} = useParams();
//console.log(id)
useEffect(()=>{
    (async ()=>{
       await BrandListRequest(id); 
    })()
},[id]);
    return (
        <Layout>
           <BrandList/>
        </Layout>
    );
};

export default ListByBrand;