/**
 * PageFeatureFlag.jsx
 * Created by Andrea Blackwell 10/30/2023
 **/

import React from 'react';
import { Redirect } from "react-router-dom";
import GlobalConstants from "GlobalConstants";


const PageFeatureFlag = ({ children }) => {
    const isQAT = GlobalConstants.QAT;
    return (isQAT ? <>{children}</>
        :
        <Redirect to="/404" />);
};

export default PageFeatureFlag;
