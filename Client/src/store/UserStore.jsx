import {create} from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../utility/utility";

const UserStore = create((set)=>({

    loginData:{email:""},
    loginDataReq:async(name,value)=>{
        set((state)=>({
            loginData:{
                ...state.loginData,
            [name]:value
            }
        }))
    },

    isSubmitbtn:false,
    OTPReqest:async(email)=>{
        set({isSubmitbtn:true})
        let res = await axios.get(`/api/v1/UserOTP/${email}`)
        setEmail(email)
        set({isSubmitbtn:false})
        return res.data['status'] === 'success';
    },
    OTP:{otp:""},
    OTPData:async(name,value)=>{
        set((state)=>({
            OTP:{
                ...state.OTP,
            [name]:value
            }
        }))
    },

    LoginRequest:async(otp)=>{
        set({isSubmitbtn:true})
        let email= getEmail();
        let res = await axios.get(`/api/v1/VarifyOTP/${email}/${otp}`)
        set({isSubmitbtn:false})
        return res.data['status'] === 'success'
    }
})
)

export default UserStore;