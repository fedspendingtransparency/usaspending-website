/**
 * ExternalLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showModal } from 'redux/actions/modal/modalActions';
import { sanitizeUrl } from '../../helpers/url';

const propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.node]),
    isCard: PropTypes.bool,
    showIcon: PropTypes.bool
};

const ExternalLink = ({
    url, children, isCard, showIcon = false
}) => {
    const sanitized = sanitizeUrl(url);
    const isSafe = sanitized !== null;
    const href = isSafe ? sanitized : 'not available';
    
    const dispatch = useDispatch();
    const redirect = () => {
        dispatch(showModal(href));
    };

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(showModal(href));
        }
    };
    if (isCard) {
        if (showIcon) {
            return (
                <button
                    className="usda-external-link__card"
                    role="link"
                    onClick={redirect}
                    onKeyPress={keyPressHandler}
                    tabIndex={0}
                    disabled={!isSafe}
                    aria-disabled={!isSafe}>
                    {children} 
                    <FontAwesomeIcon icon="external-link-alt" />
                </button>
            );
        }
        return (
            <button
                className="usda-external-link__card"
                role="link"
                onClick={redirect}
                onKeyPress={keyPressHandler}
                tabIndex={0} 
                disabled={!isSafe}
                aria-disabled={!isSafe}>
                {children}
            </button>
        );
    }
    return (
        <button
            className="usda-external-link"
            onClick={redirect}
            disabled={!isSafe}
            aria-disabled={!isSafe}>
            {children || href} <FontAwesomeIcon icon="external-link-alt" />
        </button>);
};

ExternalLink.propTypes = propTypes;
export default ExternalLink;
