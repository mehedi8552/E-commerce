import React from 'react';
import UserStore from '../../store/UserStore';

const Submitbtn = (props) => {

    const {isSubmitbtn} = UserStore();

    if (isSubmitbtn === false){

        return <button onClick={props.onClick} className="btn mt-3 btn-success" text="Submit" > Submit</button>
    }else{
        return <button className="btn mt-3 btn-success" text="Submit" ><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
    }

};

export default Submitbtn;