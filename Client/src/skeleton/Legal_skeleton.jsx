import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
const Legal_skeleton = () => {
    return (
        <div className=' container mt-5'>
            <div className=' col-md-12'>
                <div className=' card p-4'>
                    {
                        Array.from({length:10}).map(()=>{
                            return(
                                <Skeleton count={3}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Legal_skeleton;