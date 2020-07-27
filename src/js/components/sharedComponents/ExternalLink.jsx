/**
 * ExternalLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showModal } from 'redux/actions/redirectModal/redirectModalActions';

const propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.element
};

const ExternalLink = ({ url, children }) => {
    const dispatch = useDispatch();
    const redirect = () => {
        dispatch(showModal(url));
    };
    return (
        <button className="usda-external-link" onClick={redirect}>
            {children || url} <FontAwesomeIcon icon="external-link-alt" />
        </button>
    );
};

ExternalLink.propTypes = propTypes;
export default ExternalLink;
