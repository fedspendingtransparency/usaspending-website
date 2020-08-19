/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const propTypes = {
    term: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired
};

const GlossaryLink = ({ term, currentUrl }) => (
    <Link className="usda-glossary-link" to={`/${currentUrl}?glossary=${term}`} aria-label="Open the Glossary">
        <FontAwesomeIcon icon="book" />
    </Link>
);

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
