/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    term: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired
};

const GlossaryLink = ({ term, currentUrl }) => (
    <a className="usda-glossary-link" href={`#/${currentUrl}?glossary=${term}`}>
        <FontAwesomeIcon icon="book" />
    </a>
);

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
