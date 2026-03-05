/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

const DownloadWarning = (props) => (
    <div className="download-warning-container">
        <ExclamationTriangle />
        {props.message}
    </div>);

DownloadWarning.propTypes = propTypes;
export default DownloadWarning;
