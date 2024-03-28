import React from 'react';
import AppNavBar from './AppNavBar'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast'
const Layout = (props) => {
    return (
        <>
        <AppNavBar/>
        <Toaster position = "top-center" />
            {props.children}
        <Footer/>
        </>
    );
};

export default Layout;