/**
 * GlossaryHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import GlossarySearchBar from './GlossarySearchBar';

const propTypes = {
    closeGlossary: PropTypes.func
};

const GlossaryHeader = (props) => {
    const closeButtonRef = useRef(null);
    useEffect(() => {
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, []);

    return (
        <div className="glossary-header">
            <div role="navigation" aria-label="Glossary navigation">
                <button
                    className="close-button"
                    id="glossary-close-button"
                    aria-label="Close Glossary"
                    title="Close Glossary"
                    onClick={props.closeGlossary}
                    ref={closeButtonRef}>
                    <Icons.Close alt="Close Glossary" />
                </button>
            </div>
            <h1
                id="glossary-title"
                className="glossary-title"
                tabIndex={-1}>
                Glossary
            </h1>

            <GlossarySearchBar {...props} />

            <div className="glossary-example">
                Example: &quot;Obligation&quot;
            </div>
        </div>
    );
};

GlossaryHeader.propTypes = propTypes;
export default GlossaryHeader;
