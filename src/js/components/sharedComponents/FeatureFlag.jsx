/**
 * FeatureFlag.jsx
 * Created by Andrea Blackwell 09/09/2022
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import GlobalConstants from "GlobalConstants";


const FeatureFlag = ({ children }) => {
    const isQAT = GlobalConstants.QAT;
    return (isQAT ? <>{children}</>
        :
        <></>);
};

export default FeatureFlag;
