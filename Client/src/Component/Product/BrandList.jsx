import React, { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import Product_Skeleton from "../../skeleton/Product_skeleton";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ListByProduct = () => {
   const { ListProduct,BrandList,BrandRequest,CategoryList,CategoryRequest,FilterListRequest} = ProductStore();
   const [Filter,SetFilter] = useState(
      {
      brandID:"",
      categoryID:"",
      priceMax:"",
      priceMin:""
    }
    )
  
    const OnChange = async (name,value)=>{
      SetFilter((data)=>({
        ...data,
        [name]:value
      }))
    }
    

   useEffect(()=>{
    (async()=>{
      BrandList === null? await BrandRequest():null;
      CategoryList === null? await  CategoryRequest():null;

      let allempty = Object.values(Filter).every(value => value ==="");
      !allempty?await FilterListRequest(Filter):null;
    })()
   },[Filter])
  // console.log(ListProduct);
  //const data = ProductStore.getState().ListProduct;
  //console.log(data)
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select value={Filter.brandID} onChange={async(e)=> await OnChange('brandID',e.target.value)} className="form-control form-select">
              <option value=''>Choose Brand</option>
              {
                BrandList ===null?(
                BrandList.map((item,i)=>{
                  return(
                    <option value={item['_id']}>{item['brandName']}</option>
                  )
                })):(<option></option>)
              }
            </select>
            <label className="form-label mt-3">Categories</label>
            <select value={Filter.categoryID} onChange={async(e)=>await OnChange("categoryID",e.target.value)} className="form-control form-select">
              <option >Choose Category</option>
              {
                CategoryList===null?(
                CategoryList.map((item,i)=>{
                  return(
                    <option value={item['_id']}>{item['categoryName']}</option>
                  )
                })):(<option></option>)
              }
            </select>
            <label className="form-label mt-3">Maximum Price ${Filter.priceMax}</label>
            <input
            value={Filter.priceMax}
            onChange={async (e)=> {await OnChange('priceMax',e.target.value)}}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />
            <label className="form-label mt-3">Minimum Price ${Filter.priceMin}</label>
            <input
            value={Filter.priceMin}
            onChange={async (e)=> {await OnChange('priceMin',e.target.value)}}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {ListProduct === null ? (
                <Product_Skeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ListProduct.map((item, i) => {
                      let price = (
                        <p className="bodyMedium  text-dark my-1">
                          Price: ${item["price"]}{" "}
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className="bodyMedium  text-dark my-1">
                            Price:<strike> ${item["price"]} </strike> $
                            {item["discountPrice"]}{" "}
                          </p>
                        );
                      }
                      return (
                        <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                          <Link
                            to={`/ProductDetails/${item["_id"]}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["image"]}
                            />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {item["title"]}
                              </p>
                              {price}
                              <StarRatings
                                rating={parseFloat(item["star"])}
                                starRatedColor="red"
                                starDimension="15px"
                                starSpacing="2px"
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListByProduct;
