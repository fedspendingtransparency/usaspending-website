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

const defaultProps = {
    step: 1
};

const steps = [
    'Choose Level of Data',
    'Choose Columns',
    'Download and Finish'
];

export default class DownloadBreadcrumb extends React.Component {
    render() {
        const items = steps.map((step, index) => {
            let type = 'mid';
            if (index === 0) {
                type = 'first';
            }
            else if (index + 1 === steps.length) {
                type = 'last';
            }

            return (<BreadcrumbItem
                key={index}
                type={type}
                title={step}
                step={index + 1}
                currentStep={this.props.step}
                totalSteps={steps.length}
                goToStep={this.props.goToStep} />);
        });

        return (
            <div className="download-breadcrumb">
                {items}
            </div>
        );
    }
}

DownloadBreadcrumb.propTypes = propTypes;
DownloadBreadcrumb.defaultProps = defaultProps;
