/**
 * Alert.jsx
 * Created by Nick Torres 4/11/23
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

const propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string
};

const Alert = ({
    type = "info",
    headerText,
    body,
    icon,
    className
}) => {
    const getIconString = () => {
        switch (type) {
            case 'info': return 'info-circle';
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'exclamation-circle';
            default: return 'share-alt';
        }
    };

    const iconString = typeof icon === 'string' ? icon : getIconString();

    return (
        <div className={`alert ${type}${className ? ` ${className}` : ''}`}>
            <div className="alert--header">
                { icon &&
                    <div className="alert--header--icon">
                        <FontAwesomeIcon
                            className="advanced-search__keyword-search-icon"
                            icon={iconString} />
                    </div>
                }
                <p className="alert--header--text">
                    {headerText}
                </p>
            </div>
            <div className="alert--body">
                {body}
            </div>
        </div>
    );
};

Alert.propTypes = propTypes;
export default Alert;
