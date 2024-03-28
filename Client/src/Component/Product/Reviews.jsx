import React from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from "react-star-ratings";
const Reviews = () => {

    const {ReviewList} = ProductStore();
   //console.log(ReviewList);

    return (
        <div>
            <ul class="list-group ">
                {
                    
                    ReviewList!==null?(ReviewList.map((item,i)=>{
                        return <li key={i} className="list-group-item bg-transparent">
                            <h6 ><i className="bi bi-person-circle p-1"></i>{ item['profile']['cus_name']}</h6>
                            <p className='m-0 p-0'>{item['profile']['cus_phone']}</p>
                            
                            <StarRatings
                                  
                                  rating={parseFloat(item["rating"])}
                                  starRatedColor="red"
                                  starDimension="15px"
                                  starSpacing="2px"
                                />
                                <p className='p-0'>{item['des']}</p>
                        </li>
                    })):(<span></span>)
                    
                }
            </ul>
        </div>
    );
};

export default Reviews;