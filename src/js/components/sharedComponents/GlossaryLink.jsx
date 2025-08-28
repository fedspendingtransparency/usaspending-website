/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNewUrlForGlossary } from 'helpers/glossaryHelper';
import { showSlideout } from '../../helpers/slideoutHelper';
import { Glossary } from './icons/Icons';


const propTypes = {
    term: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    label: PropTypes.string,
    alt: PropTypes.string,
    showHoverText: PropTypes.bool
};

const GlossaryLink = ({
    term,
    hidden,
    label = "",
    alt = "",
    showHoverText = false
}) => {
    const [urlSearchParam, setUrlSearchParam] = useState(null);
    const { pathname, search } = useLocation();
    useEffect(() => {
        setUrlSearchParam(search.includes('glossary') ? '' : search);
    }, [search]);
    const newUrl = getNewUrlForGlossary(pathname, `?glossary=${term}`, urlSearchParam);
    const stopBubble = (e) => {
        showSlideout('glossary', { url: term });
        e.stopPropagation();
    };

    const innerContent = () => {
        if (showHoverText) {
            if (label) {
                return <a href={newUrl}>{label} <Glossary alt={alt} /></a>;
            }

            return <Glossary alt={alt} />;
        }

        if (label) {
            return <a href={newUrl}>{label} <FontAwesomeIcon icon="book" /></a>;
        }

        return <FontAwesomeIcon icon="book" />;
    };

    return (
        <Link
            className="usda-glossary-link"
            to={newUrl}
            aria-label="Open the Glossary"
            tabIndex={hidden ? "-1" : ""}
            onClick={stopBubble}>
            {innerContent()}
        </Link>
    );
};

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
