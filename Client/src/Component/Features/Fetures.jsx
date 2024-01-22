import React from "react";
import FetureStrore from "../../store/FetureStore";
import Feture_skeleton from "../../skeleton/Fretures_skeleton";
const Fetures = () => {
  const { FetureList } = FetureStrore();
  if (FetureList == null) {
    return <Feture_skeleton />;
  } else {
    return (
      <div className="container section">
        <div className="row">
          {

        FetureList.map((row,i)=>{

            return(
                <div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-3">
                    <img className="w-100" src={row['img']} />
                  </div>
                  <div className="col-9">
                    <h3 className="bodyXLarge">{row['name']}</h3>
                    <span className="bodySmal">{row['description']}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
        })
          }
        </div>
      </div>
    );
  }
};

export default Fetures;
