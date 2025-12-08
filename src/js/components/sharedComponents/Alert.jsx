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
    closeIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string
};

const Alert = ({
    type = "info",
    headerText,
    body,
    icon,
    closeIcon,
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

    const closeIconString = typeof closeIcon === 'string' ? closeIcon : 'times';

    return (
        <div className={`alert ${type}${className ? ` ${className}` : ''}`}>
            <div className="alert__header">
                { icon &&
                    <div className="alert__header__icon-container">
                        <FontAwesomeIcon
                            className="alert__header__icon"
                            icon={iconString} />
                    </div>
                }
                <p className="alert__header__text">
                    {headerText}
                </p>
            </div>
            <div className="alert__body">
                {body}
            </div>
            { closeIcon &&
                <div className="alert__close__icon-container">
                    <FontAwesomeIcon
                        className="alert__close__icon"
                        icon={closeIconString} />
                </div>
            }
        </div>
    );
};

Alert.propTypes = propTypes;
export default Alert;
