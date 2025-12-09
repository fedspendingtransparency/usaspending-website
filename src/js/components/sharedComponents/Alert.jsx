/**
 * Alert.jsx
 * Created by Nick Torres 4/11/23
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import useOnKeydown from "../../hooks/useOnKeydown";

const propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClose: PropTypes.func,
    closeIcon: PropTypes.string,
    className: PropTypes.string
};

const Alert = ({
    type = "info",
    header,
    body,
    icon,
    onClose = undefined,
    closeIcon,
    className
}) => {
    const closeRef = useOnKeydown(onClose);

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
    const closeIconString = closeIcon || 'times';
    const hideCloseIcon = onClose ? {} : { display: 'none' };

    return (
        <div className={`alert ${type}${className ? ` ${className}` : ''}`}>
            <div className="alert__message__container">
                { icon &&
                    <div className="alert___message__icon-container">
                        <FontAwesomeIcon
                            className="alert___message__icon"
                            icon={iconString} />
                    </div>
                }
                <div className="alert__message">
                    { header &&
                        <div className="alert__message__header">
                            {header}
                        </div>
                    }
                    <div className="alert__message__body">
                        {body}
                    </div>
                </div>
            </div>
            <div className="alert__close-icon__container" style={hideCloseIcon}>
                <FontAwesomeIcon
                    className="alert__close-icon__icon"
                    icon={closeIconString}
                    onClick={onClose}
                    tabIndex="0"
                    aria-hidden={false}
                    ref={closeRef} />
            </div>
        </div>
    );
};

Alert.propTypes = propTypes;
export default Alert;
