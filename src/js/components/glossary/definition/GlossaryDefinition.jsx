/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase } from "lodash-es";
import { useDispatch } from 'react-redux';

import { handleShareOptionClick } from '../../../helpers/socialShare';
import { clearGlossaryTerm } from '../../../redux/actions/glossary/glossaryActions';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';
import { showModal } from '../../../redux/actions/modal/modalActions';
import useQueryParams from "../../../hooks/useQueryParams";

const propTypes = {
    glossary: PropTypes.object
};

const getGlossaryEmailSubject = (slug) => `USAspending.gov Glossary Term: ${startCase(slug)}`;
const getGlossaryEmailBody = (url) => `View the definition of this federal spending term on USAspending.gov: ${url}`;

const GlossaryDefinition = ({ glossary }) => {
    const query = useQueryParams();
    const [tab, setTab] = useState('plain');
    const [hasPlain, setHasPlain] = useState(true);
    const [hasOfficial, setHasOfficial] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [showCopiedConfirmation, setShowCopiedConfirmation] = useState(false);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    
    const checkDefinitions = () => {
        let hasPlainLocal = false;
        let hasOfficialLocal = false;
        let tabLocal = tab;

        if (glossary.term.plain && glossary.term.plain !== '') {
            hasPlainLocal = true;
        }
        if (glossary.term.official && glossary.term.official !== '') {
            hasOfficialLocal = true;
            if (tabLocal === 'plain' && !hasPlain) {
                tabLocal = 'official';
            }
        }
        if (tabLocal === 'official' && !hasOfficial) {
            tabLocal = 'plain';
        }

        setHasPlain(hasPlainLocal);
        setHasOfficial(hasOfficialLocal);
        setTab(tabLocal);
    };

    const clickedTab = (local) => {
        setTab(local);
    };

    const clickedBack = () => {
        dispatch(clearGlossaryTerm());
    };

    const slug = glossary.term.toJS().slug;

    const stripUrl = () => {
        const url = new URL(window.location.href);

        // if the search query is glossary already, just replace it
        if (window.location.href.includes('?glossary=')) {
            return `${url.origin}${url.pathname}?glossary=`;
        }
        else if (url.search !== '') {
            // if glossary is already part of the query
            if (window.location.href.includes('&glossary=')) {
                // remove the old glossary term
                delete query.glossary;

                // add back in all other queries
                const queryArray = [];
                Object.entries(query).forEach(([key, value], i) => {
                    if (i === 0) {
                        queryArray.push(`?${key}=${value}`);
                    }
                    else {
                        queryArray.push(`&${key}=${value}`);
                    }
                });

                // append new glossary term to other queries
                return `${url.origin}${url.pathname}${queryArray}&glossary=`;
            }

            // if glossary wasn't previously in the query, add the glossary term
            return `${window.location.href}&glossary=`;
        }

        // if there are no existing search query, make glossary the query
        return `${window.location.href}?glossary=`;
    };

    const value = stripUrl();

    const onShareClick = (name) => {
        const emailArgs = {
            subject: getGlossaryEmailSubject(slug),
            body: getGlossaryEmailBody(value + slug)
        };
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    useEffect(() => {
        checkDefinitions();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [glossary]);

    return (
        <div className="glossary-definition">
            <DefinitionTabs
                hasPlain={hasPlain}
                hasOfficial={hasOfficial}
                activeTab={tab}
                clickedTab={clickedTab} />
            <div className="glossary-definition__column-share-icon">
                <ShareIcon
                    isSidePanel
                    url={value + slug}
                    tabIndex={0}
                    onShareOptionClick={onShareClick}
                    colors={{ backgroundColor: "#215493", color: "#e2e2e2" }}
                    dropDownDirection="left"
                    noShareText />
            </div>
            <ItemDefinition
                {...glossary.term.toJS()}
                type={tab} />
            <button
                className="glossary-back"
                onClick={clickedBack}>
                <div className="back-content">
                    <FontAwesomeIcon icon="chevron-left" className="left-chevron-icon" alt="Back" />
                    <div className="label">
                            Back
                    </div>
                </div>
            </button>
        </div>
    );
};

GlossaryDefinition.propTypes = propTypes;
export default GlossaryDefinition;
