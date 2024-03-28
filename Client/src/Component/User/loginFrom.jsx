import React from "react";
import Submitbtn from "./Submitbtn";
import UserStore from "../../store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const loginFrom = () => {
  const navigate = useNavigate()
  const {loginData,loginDataReq,OTPReqest} = UserStore();
  let SubmitFrom = async()=>{
    if(!ValidationHelper.IsEmail(loginData.email)){
      toast.error('Email Address Requird ')
    }else{
      
      let res =  await OTPReqest(loginData.email)
      res? navigate('/otp'):toast.error('Somthig went wrong');
    }
  }
  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Your Email</h4>
            <p>
              A verification code will be sent to the email address you provide
            </p>
            <input
              value={loginData.email}
              onChange={(e)=>{loginDataReq("email",e.target.value)}}
              
              placeholder="Email Address"
              type="email"
              className="form-control"
            />
            <Submitbtn onClick={SubmitFrom} text = "next"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginFrom;
