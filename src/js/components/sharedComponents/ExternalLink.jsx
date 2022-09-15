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


    return (<>
        {isCard ?
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <a style={{ cursor: "pointer" }} onClick={redirect}>{children}</a>
            :
            <button className="usda-external-link" onClick={redirect}>
                {children || url} <FontAwesomeIcon icon="external-link-alt" />
            </button>}
    </>);
};

ExternalLink.propTypes = propTypes;
export default ExternalLink;
