/**
 * GlossaryHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';
import GlossarySearchBar from './GlossarySearchBar';

const propTypes = {
    closeGlossary: PropTypes.func,
    glossary: PropTypes.object,
    performSearch: PropTypes.func
};

const GlossaryHeader = ({ closeGlossary, glossary, performSearch }) => {
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
                    onClick={closeGlossary}
                    ref={closeButtonRef}>
                    <Close alt="Close Glossary" />
                </button>
            </div>
            <h1
                id="glossary-title"
                className="glossary-title"
                tabIndex={-1}>
                Glossary
            </h1>

            <GlossarySearchBar glossary={glossary} performSearch={performSearch} />

            <div className="glossary-example">
                Example: &quot;Obligation&quot;
            </div>
        </div>
    );
};

GlossaryHeader.propTypes = propTypes;
export default GlossaryHeader;
