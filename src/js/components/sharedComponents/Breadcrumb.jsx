/**
 * BreadcrumbNav.jsx
 * Created by JD House 04/13/2026
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    url: PropTypes.string
};

const Breadcrumb = ({ label, url }) => (
    <div className="usa-breadcrumb-nav__container">
        <ul className="usa-breadcrumb-nav__list">
            <li>
                <Link
                    to={url}
                    className="usa-breadcrumb__item" >
                    <FontAwesomeIcon icon="arrow-left" alt="Back" className="bc-back-link" />
                    {label}
                </Link>

            </li>
        </ul>
    </div>
);

Breadcrumb.propTypes = propTypes;
export default Breadcrumb;
