/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNewUrlForGlossary } from 'helpers/glossaryHelper';
import { showSlideout } from '../../helpers/slideoutHelper';


const propTypes = {
    term: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    label: PropTypes.string
};

const GlossaryLink = ({ term, hidden, label = "" }) => {
    const [urlSearchParam, setUrlSearchParam] = useState(null);
    const { pathname, search } = useLocation();
    useEffect(() => {
        setUrlSearchParam(search.includes('glossary') ? '' : search);
    }, [search]);
    const newUrl = getNewUrlForGlossary(pathname, `?glossary=${term}`, urlSearchParam);
    const stopBubble = (e) => {
        showSlideout('glossary');
        e.stopPropagation();
    };
    return (
        <Link
            className="usda-glossary-link"
            to={newUrl}
            aria-label="Open the Glossary"
            tabIndex={hidden ? "-1" : ""}
            onClick={stopBubble}>
            {label ? <a href={newUrl}>{label} <FontAwesomeIcon icon="book" /></a> : <FontAwesomeIcon icon="book" />}
        </Link>
    );
};

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
