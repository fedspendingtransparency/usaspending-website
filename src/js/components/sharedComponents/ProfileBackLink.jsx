/**
 * ProfileBackLink.jsx
 * Created by JD House 04/13/2026
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string
};

const ProfileBackLink = ({ label, url, className = "" }) => (
    <div className={`usa-profile-back-link__container ${className}`}>
        <div className="usa-profile-back-link__wrapper">
            <Link
                to={url}
                className="usa-profile-back-link__item" >
                <FontAwesomeIcon icon="arrow-left" alt="Back" className="bc-back-link" />
                {label}
            </Link>
        </div>
    </div>
);

ProfileBackLink.propTypes = propTypes;
export default ProfileBackLink;
