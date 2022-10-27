/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNewUrlForGlossary } from 'helpers/glossaryHelper';

const propTypes = {
    term: PropTypes.string.isRequired,
    hidden: PropTypes.bool
};

const GlossaryLink = ({ term, hidden }) => {
    const { pathname, search } = useLocation();
    const newUrl = getNewUrlForGlossary(pathname, `?glossary=${term}`, search);
    const stopBubble = (e) => {
        e.stopPropagation();
    };
    return (
        <Link
            className="usda-glossary-link"
            to={newUrl}
            aria-label="Open the Glossary"
            tabIndex={hidden ? "-1" : ""}
            onClick={stopBubble}>
            <FontAwesomeIcon icon="book" />
        </Link>
    );
};

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
