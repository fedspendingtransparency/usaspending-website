/**
 * ExternalLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showModal } from 'redux/actions/modal/modalActions';

const propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    isCard: PropTypes.bool
};

const ExternalLink = ({ url, children, isCard }) => {
    const dispatch = useDispatch();
    const redirect = () => {
        dispatch(showModal(url));
    };

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(showModal(url));
        }
    };
    return (<>
        {isCard ?
            <a className="usda-external-link__card" role="link" onClick={redirect} onKeyPress={keyPressHandler} tabIndex={0}>{children}</a>
            :
            <button className="usda-external-link" onClick={redirect}>
                {children || url} <FontAwesomeIcon icon="external-link-alt" />
            </button>}
    </>);
};

ExternalLink.propTypes = propTypes;
export default ExternalLink;
