/**
 * DownloadBreadcrumb.jsx
 * Created 8/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
    step: PropTypes.number,
    goToStep: PropTypes.func
};

const steps = [
    'Choose Level of Data',
    'Choose Columns',
    'Download and Finish'
];

const DownloadBreadcrumb = ({ step = 1, goToStep }) => {
    const items = steps.map((stepTitle, index) => {
        let type = 'mid';
        if (index === 0) {
            type = 'first';
        }
        else if (index + 1 === steps.length) {
            type = 'last';
        }

        return (<BreadcrumbItem
            key={stepTitle}
            type={type}
            title={stepTitle}
            step={index + 1}
            currentStep={step}
            totalSteps={steps.length}
            goToStep={goToStep} />);
    });

    return (
        <div className="download-breadcrumb">
            {items}
        </div>
    );
};

DownloadBreadcrumb.propTypes = propTypes;
export default DownloadBreadcrumb;
