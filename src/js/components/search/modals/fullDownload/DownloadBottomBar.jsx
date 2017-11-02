/**
 * DownloadBottomBar.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationCircle, CheckCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string
};

const defaultProps = {
    showError: false,
    showSuccess: false
};

const Spinner = () => (
    <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
    </div>
);

const DownloadBottomBar = (props) => {
    let leftIcon = <Spinner />;
    if (props.showError) {
        leftIcon = <ExclamationCircle alt="Error" />;
    }
    else if (props.showSuccess) {
        leftIcon = <CheckCircle alt="Ready for Download" />;
    }

    return (
        <div className="floating-download-bottom-bar">
            <div className="bottom-bar-content">
                <div className="left-icon">
                    {leftIcon}
                </div>
                <div className="text-content">
                    <div className="title">
                        {props.title}
                    </div>
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

DownloadBottomBar.propTypes = propTypes;
DownloadBottomBar.defaultProps = defaultProps;

export default DownloadBottomBar;
