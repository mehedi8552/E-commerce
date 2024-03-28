import React from 'react';
import parse from 'html-react-parser'
import ProductStore from '../../store/ProductStore';
import Legal_skeleton from '../../skeleton/Legal_skeleton';
const Legal = () => {
    const {legal} = ProductStore();
    //console.log(legal);
    
    
    
    if(legal === null || legal === undefined){
        <Legal_skeleton/>
    }else{
    return (
          <div className=' container mt-5'>
            <div className=' col-md-12'>
                <div className=' card p-4'>
                   {legal.length > 0 &&  parse(legal[0]?.description)}
                </div>
            </div>
        </div>
    );
}
};

export default Legal;