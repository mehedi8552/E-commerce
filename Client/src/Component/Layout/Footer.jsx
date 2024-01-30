import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import payment from "../../assets/images/payment.png";
import ProductStore from "../../store/ProductStore";
const Footer = () => {

    const {legalRequest} = ProductStore();

    const {type} = useParams();
    useEffect(()=>{
        (async()=>{
            await legalRequest(type)
        })()
    },[type])

    
  return (
    <>
      <div>
        <div className="section-bottom shadow-sm bg-light">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4">
                <h1 className="bodyMedium">Legals</h1>
                <p className="my-2">
                  <Link className="nav-link" to={`/LegalsControl/about`}>
                    About
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/LegalsControl/refund">
                    Refund Policy
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/LegalsControl/terms">
                    Terms
                  </Link>
                </p>
              </div>
              <div className="col-md-4">
                <h1 className="bodyMedium">Information</h1>
                <p className="my-2">
                  <Link className="nav-link" to="/LegalsControl/howtobuy">
                    How to buy
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/LegalsControl/contact">
                    Contact
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/LegalsControl/complain">
                    Complain
                  </Link>
                </p>
              </div>
              <div className="col-md-4">
                <h1 className="bodyMedium">About</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum{" "}
                </p>
                <img className="w-75" src={payment} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark py-3 text-center">
          <p className="text-white bodySmal">All Rights Reserved </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
