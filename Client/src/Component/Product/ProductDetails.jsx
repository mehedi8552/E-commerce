import React, { useState } from 'react';
import ProductStore from "../../store/ProductStore";
import Image from  '../Product/DetailsImage' 
import parse from 'html-react-parser';
import Details_skeleton from "../../skeleton/Details_skeleton";

const ProductDetails = () => {

    const {Details,ReviewList} = ProductStore();
    //console.log(Details[0]['title']);
    //const {title} = Details[0]

    const [Qty,SetQty]= useState(1);


     const  increment=()=>{
      SetQty(Qty => Qty+1)
    }
     const  decrement =()=>{
      if(Qty>1){
        SetQty(Qty => Qty-1)
      }
    }

    if(Details === null){
      return  <Details_skeleton/>
    }
    else
    {
        return (
            <div>
              <div className="container mt-2">
                <div className="row">
                  <div className="col-md-7 p-3">
                    <Image/>
                  </div>
                  <div className="col-md-5 p-3">
                    <h4>{Details[0]['title']}</h4>
                    <p className="text-muted bodySmal my-1">{Details[0]['Category']}</p>
                    <p className="text-muted bodySmal my-1">{Details[0]['brand']['brandName']}</p>
                    <p className="bodySmal mb-2 mt-1">{Details[0]['shortDes']}</p>
                    
                      {
                        Details[0]['discount']? (<span className=" bodyXLarge"> <strike className="text-secondary"> { Details[0]['price']}</strike>{Details[0]['discountPrice']}</span>
                        ):(
                          <span className=" bodyXLarge">{Details[0]['price']}</span>)
                          }
                    
                    <div className="row">
                      <div className="col-4 p-2">
                        <label className="bodySmal"></label>
                        <select className="form-control my-2 form-select">
                          <option value="">Size</option>
                          {
                            Details[0]['details']['size'].split(',').map((item,i)=>{
                              return   <option key={i} value={item}>{item}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-4 p-2">
                        <label className="bodySmal">Color</label>
                        <select className="form-control my-2 form-select">
                          <option value="">Color</option>
                          {
                            Details[0]['details']['color'].split(',').map((item,i)=>{
                              return <option key={i} value={item}>{item}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-4 p-2">
                        <label  className="bodySmal">Quantity</label>
                        <div className="input-group my-2">
                          <button onClick={decrement} className="btn btn-outline-secondary">-</button>
                          <input
                            value={Qty}
                            type="text"
                            className="form-control bg-light text-center"
                            readOnly
                          />
                          <button onClick={increment} className="btn btn-outline-secondary">+</button>
                        </div>
                      </div>
                      <div className="col-4 p-2">
                        <button className="btn w-100 btn-success">Add to Cart</button>
                      </div>
                      <div className="col-4 p-2">
                        <button className="btn w-100 btn-success">Add to Wish</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab" data-bs-target="#Speci-tab-pane" type="button" role="tab" aria-controls="Speci-tab-pane" aria-selected="true">Specifications</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab" data-bs-target="#Review-tab-pane" type="button" role="tab" aria-controls="Review-tab-pane" aria-selected="false">Review</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(Details[0]['details']['des'])
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                               
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
          );
    }
};

export default ProductDetails;