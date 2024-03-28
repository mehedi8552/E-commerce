import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/utility";
import Cookies from "js-cookie";
const UserStore = create((set) => ({
  
  
  islogin: () => {
    return !!Cookies.get("token");
  },

  loginData: { email: "" },
  loginDataReq:(name, value) => {
    set((state) => ({
      loginData: {
        ...state.loginData,
        [name]: value,
      },
    }));
  },

  isSubmitbtn: false,
  OTPReqest: async (email) => {
    set({ isSubmitbtn: true });
    let res = await axios.get(`/api/v1/UserOTP/${email}`);
    setEmail(email);
    set({ isSubmitbtn: false });
    return res.data["status"] === "success";
  },


  OTP: { otp: "" },
  OTPData: async (name, value) => {
    set((state) => ({
      OTP: {
        ...state.OTP,
        [name]: value,
      },
    }));
  },

  LoginRequest: async (otp) => {
    set({ isSubmitbtn: true });
    let email = getEmail();
    let res = await axios.get(`/api/v1/VarifyOTP/${email}/${otp}`);
    set({ isSubmitbtn: false });
    return res.data["status"] === "success";
  },

  LogOutRequest: async () => {
    let res = await axios.get(`/api/v1/UserLogOut`);
    return res.data["status"] === "success";
  },

  // .............user profile...............................................

  ProfileFrom: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: ""
  },

  ProfileFromChange:(name,value)=>{
   set((state)=>({
    ProfileFrom:{
        ...state.ProfileFrom,
            [name]:value
    }
   })) 
  },

  ProfileDetails:null,
  ProfileDetailsRequest:async()=>{
    try{
       let res = await axios.get(`/api/v1/ReadProfile`);
       
        if(res.data['data'].length > 0){
            set({ProfileDetails:res.data['data'][0]})
            set({ProfileFrom:res.data['data'][0]})
        }else{
            set({ProfileDetails:[]})
        }
    }catch (e){
        unauthorized(e.response.status)
    }
  },

  ProfileSaveRequest: async(postBody)=>{
    try{
        set({ProfileDetails:null});
        let res = await axios.post(`/api/v1/UpdateProfile`,postBody);
        return res.data['status'] === 'success';
    }
    catch(e){
        unauthorized(e.response.status)
    }
  }

}));

export default UserStore;
