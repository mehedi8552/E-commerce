import React, { useEffect } from 'react';
import Layout from '../Component/Layout/Layout';
import Search from '../Component/Product/Search';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';

const ListByKeyword = () => {
const {KeywordListRequest}= ProductStore();
const {keyword} = useParams()
    useEffect(()=>{
        (async()=>{

        await KeywordListRequest(keyword)

    })()},[keyword])
    return (
       <Layout>
        <Search/>
       </Layout>
    );
};

export default ListByKeyword;