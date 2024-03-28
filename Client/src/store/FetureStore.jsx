import {create} from "zustand";
import axios from "axios";

const FeatureStore = create((set)=>({
    FetureList:null,
    Feturereqest:async()=>{
        let res = await axios.get(`/api/v1/FeatureList`)
        if(res.data['status'] === 'Success'){
            set({FetureList:res.data['data']});
        }
    }
})
)
export default FeatureStore;