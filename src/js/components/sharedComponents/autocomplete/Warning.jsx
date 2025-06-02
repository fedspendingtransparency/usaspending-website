/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';

const propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
};

const Warning = ({
    header = '',
    description = ''
}) => (
    <div className="error-message" role="alert">
        <div className="error-title">
            <Icons.ExclamationCircle alt="Warning icon" />
            <div className="heading">{header}</div>
        </div>
        <p className="message">{description}</p>
    </div>
);

Warning.propTypes = propTypes;
export default Warning;
