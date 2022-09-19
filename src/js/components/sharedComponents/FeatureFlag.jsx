/**
 * FeatureFlag.jsx
 * Created by Andrea Blackwell 09/09/2022
 **/

import React from 'react';
import { Redirect } from "react-router-dom";
import GlobalConstants from "GlobalConstants";


const FeatureFlag = ({ children }) => {
    const isQAT = GlobalConstants.QAT;
    return (isQAT ? <>{children}</>
        :
        <Redirect to="/404" />);
};

export default FeatureFlag;
