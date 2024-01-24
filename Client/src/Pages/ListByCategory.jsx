import React, { useEffect } from 'react';
import Layout from '../Component/Layout/Layout';
import CategoryList from '../Component/Product/CategoryList';
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';

const ListByCategory = () => {

    const {CategoryListRequest} = ProductStore();
    const {id} = useParams();

    useEffect(()=>{
        (async ()=>{
           await CategoryListRequest(id); 
        })()
    },[id]);
    return (
        <Layout>
            <CategoryList/>
        </Layout>
    );
};

export default ListByCategory;
