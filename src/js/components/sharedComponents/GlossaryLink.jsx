/**
 * GlossaryLink.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showSlideout } from 'helpers/slideoutHelper';
import { Glossary } from './icons/Icons';


const propTypes = {
    term: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    label: PropTypes.string,
    alt: PropTypes.string,
    showHoverText: PropTypes.bool,
    displayIcon: PropTypes.bool,
    boldLink: PropTypes.bool
};

const GlossaryLink = ({
    term,
    hidden,
    label = "",
    alt = "",
    showHoverText = false,
    displayIcon = true,
    boldLink = false
}) => {
    const { pathname, search } = useLocation();
    const params = new URLSearchParams(search);
    params.set('glossary', term)
    const glossaryUrl = `${pathname}`

    const stopBubble = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlideout('glossary', { url: term });
    };

    const innerContent = () => {
        if (showHoverText) {
            if (label) {
                return <>{label} <Glossary alt={alt} /></>;
            }

            return <Glossary alt={alt} />;
        }

        if (label) {
            return <>{label} { displayIcon && <FontAwesomeIcon icon="book" />}</>;
        }

        return <FontAwesomeIcon icon="book" />;
    };

    return (
        <Link
            to={glossaryUrl}
            className={`usda-glossary-link ${boldLink ? "usa-bold-link" : ""}`}
            aria-label="Open the Glossary"
            tabIndex={hidden ? -1 : 0}
            onClick={stopBubble}
            replace
            alt={alt}>
            {innerContent()}
        </Link>
    );
};

GlossaryLink.propTypes = propTypes;
export default GlossaryLink;
