import React from "react";
import Submitbtn from "./Submitbtn";
import UserStore from "../../store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
const OTPFrom = () => {
  const navigate = useNavigate()
    const {OTP,OTPData,LoginRequest}= UserStore();

    let SubmitOTP = async()=>{
      if(ValidationHelper.IsEmpty(OTP.otp)){
        toast.error('OTP not match')
      }else{
        
        let res =  await LoginRequest(OTP.otp)
        res? navigate('/'):toast.error('Somthig went wrong');
      }
    }
  

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Verification Code</h4>
            <p>
              A verification code has been sent to the email address you provide
            </p>
            <input
              value={OTP.otp}
              onChange={(e)=>{OTPData("otp",e.target.value)}}
              placeholder="Verification"
              type="text"
              className="form-control"
            />
            <Submitbtn
              onClick={SubmitOTP}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPFrom;
