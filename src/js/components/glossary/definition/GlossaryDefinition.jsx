/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase } from "lodash";
import { useDispatch } from 'react-redux';

import { handleShareOptionClick } from 'helpers/socialShare';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';
import { showModal } from '../../../redux/actions/modal/modalActions';

const propTypes = {
    glossary: PropTypes.object,
    clearGlossaryTerm: PropTypes.func
};

const getGlossaryEmailSubject = (slug) => `USAspending.gov Glossary Term: ${startCase(slug)}`;
const getGlossaryEmailBody = (url) => `View the definition of this federal spending term on USAspending.gov: ${url}`;

const GlossaryDefinition = (props) => {
    const [tab, setTab] = useState('plain');
    const [hasPlain, setHasPlain] = useState(true);
    const [hasOfficial, setHasOfficial] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [showCopiedConfirmation, setShowCopiedConfirmation] = useState(false);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    // preserving in case it is needed
    // let copyConfirmation = null;

    // const getCopyFn = () => {
    //     const separator = window.location.href.includes('?') ? '&' : '?';
    //     const slug = `${separator}glossary=${props.glossary.term.toJS().slug}`;
    //     const value = window.location.href.includes("glossary") ? window.location.href : window.location.href + slug;
    //     if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
    //         window.navigator.clipboard.writeText(value);
    //         setShowCopiedConfirmation(true);
    //         copyConfirmation = window.setTimeout(() => {
    //             setShowCopiedConfirmation(false);
    //         }, 1750);
    //     }
    // };
    // useEffect(() => window.clearTimeout(copyConfirmation), []);


    const checkDefinitions = () => {
        let hasPlainLocal = false;
        let hasOfficialLocal = false;
        let tabLocal = tab;

        if (props.glossary.term.plain && props.glossary.term.plain !== '') {
            hasPlainLocal = true;
        }
        if (props.glossary.term.official && props.glossary.term.official !== '') {
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
        props.clearGlossaryTerm();
    };

    const slug = props.glossary.term.toJS().slug;

    const stripUrl = () => {
        const query = new URL(window.location.href);
        if (query.search !== '') {
            const test = window.location.href.includes("?");
            if (test) {
                return `${window.location.href}&glossary=`;
            }
        }
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
        checkDefinitions(props);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props]);

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
                {...props.glossary.term.toJS()}
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
