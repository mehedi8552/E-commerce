import { create } from 'zustand';
import axios from "axios";


const  ProductStore = create ((set)=>({

    BrandList: null,
    BrandRequest : async ()=>{
        let res = await  axios.get('/api/v1/ProducBrandList');
        if(res.data['status'] === "success"){
            set({BrandList:res.data['data']})
        }
    },

    //..........

    CategoryList: null,
    CategoryRequest : async ()=>{
        let res = await  axios.get('/api/v1/ProducCategoryList');
        if(res.data['status'] === "success"){
            set({CategoryList:res.data['data']})
        }
    },

    
   // ...........
    SliderList:null,
    SliderRequest:async()=>{
        let res=await axios.get('/api/v1/ProducSliderList');
        if(res.data['status']==="success"){
            set({SliderList:res.data['data']})
        }
    },

    //...........
    ListByRemark : null,
    RemarkRequest:async (Remark)=>{
        let res = await  axios.get(`/api/v1/ProductListByRemark/${Remark}`);
        if(res.data['status'] === "success"){
            set({ListByRemark:res.data['data']});
        }
    },
     //..............
    ListProduct: null ,
    BrandListRequest: async (brandID) => {
        set({ ListProduct: null });
        let res = await axios.get(`/api/v1/ProducListByBrand/${brandID}`);
        //console.log(res.data.data);
        if (res.data['status'] === "success") {
            set({ ListProduct: res.data['data'] });
            
            //console.log(ProductStore.getState().ListProduct);
        }
    },

    CategoryListRequest:async(categoryID)=>{
        set({ListProduct:null} )
        let res = await axios.get(`/api/v1/ProducListByCategory/${categoryID}`)
        if(res.data['status']=== "success"){
            set({ListProduct:res.data['data']})
           //console.log(ProductStore.getState().ListProduct);
        }
    },

    KeywordListRequest:async(keyword)=>{
        set({ProductList:null} )
        let res = await axios.get(`/api/v1/ProducListByKeyword/${keyword}`)
        if(res.data['status']=== "success"){
            set({ListProduct:res.data['data']})
        }
    }
}))

export default ProductStore;