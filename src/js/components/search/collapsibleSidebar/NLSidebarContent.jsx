/**
 * NLSidebarContent.jsx
 * Created by Nick Torres 8/28/2026
 */

/* eslint-disable max-len */
import React, { useState } from "react";
import PropTypes from "prop-types";
import NLDefaultHint from "./NLDefaultHint";
import NLSearchButton from "./NLSearchButton";
import NLSearch from "./NLSearch";

// will need updated when real api data is available
const RESPONSE_TYPE = {
    SEARCH_START: 'search_start',
    SEARCH_COMPLETE: 'search_complete',
    SEARCH_ERROR: 'search_error',
    TOOL_START: 'tool_start',
    TOOL_COMPLETE: 'tool_complete',
    TOOL_ERROR: 'tool_error' 
};

const propTypes = {
    hintOnClick: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func,
    startNLSearch: PropTypes.func,
    status: PropTypes.string
};

const NLSidebarContent = ({ hintOnClick, text, setText, startNLSearch, status, data }) => {
    // start api dummy states
    const [loading, setLoading] = useState(false);
    const queryText = "What schools in Anne Arundel, MD receive the most money in federal funding?";
    const searchResponse = [
        {
            type: [RESPONSE_TYPE.TOOL_COMPLETE],
            message: "Thinking..."
        },
        {   
            type: [RESPONSE_TYPE.TOOL_COMPLETE],
            message: 'Selecting Anne Arundel, MD'
        },
        {
            type: [RESPONSE_TYPE.TOOL_COMPLETE],
            message: 'Selecting higher education and public schools'
        },
        {
            type: [RESPONSE_TYPE.TOOL_START],
            message: 'Selecting funding over $500,000'
        }
    ];
    // end api dummy states

    const MAX_CHARS = 500;
    const reset = () => setText("");
    let searchClass = 'default-search';
    let btnText = "Search";
    let icon = '../../../../img/magnifying-glass-white.svg';

    if (loading) {
        searchClass += " loading";
        btnText = "Working...";
    }
    else if (text.length === 0) {
        searchClass += " disabled";
        icon = '../../../../img/magnifying-glass-disabled.svg';
    }

    const handleSubmit = () => {
        setLoading(true);
        startNLSearch()
    }

    let content = (
        <>
            <p className="sidebar-text">Start a USAspending search in your own words, or use one of the prompts below to help you get started.</p>
            <div className="sidebar-body-row">
                <span className="sidebar-example">Example Prompts: </span>
                <NLDefaultHint onClick={hintOnClick} hint={<p>What schools in <span tabIndex={-1} className="hint-user-replace">[county, state]</span> receive the most money in federal funding?</p>} />
                <NLDefaultHint onClick={hintOnClick} hint={<p>What programs received funding for veterans in <span tabIndex={-1} className="hint-user-replace">[state]</span> during <span tabIndex={-1} className="hint-user-replace">[time period]</span>?</p>} />
                <NLDefaultHint onClick={hintOnClick} hint={<p>What’s the spending on <span tabIndex={-1} className="hint-user-replace">[topic of interest]</span> in <span tabIndex={-1} className="hint-user-replace">[location]</span> over the past decade?</p>} />
            </div>
            <div className="sidebar-body-row">
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    name="smart-assist-input"
                    spellCheck
                    className="sidebar-textarea"
                    maxLength={MAX_CHARS}
                    value={text}
                    rows="3" cols="50"
                    placeholder="Type a question about government spending, or choose an example above." />
                <div className="textarea-char-row">
                    <button type="reset" className={`textarea-reset ${text.length <= 0 && 'text-area-reset-hidden'}`} onClick={reset}>Clear Input</button>
                    <span className="textarea-char-count">{text.length} / {MAX_CHARS}</span>
                </div>
            </div>
        </>
    )

    if (loading) {
        content = (
            <>
                <p className="sidebar-text query-text">{queryText}</p>
                <div className="sidebar-body-row response">
                    {searchResponse.map((response, i) => (
                        <div key={`querysearch-feedback-${response.type}-${i}`}>
                            <NLSearch {...response} />
                        </div>  
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            {content}
            <div className="sidebar-body-row">
                <NLSearchButton
                    text={btnText}
                    startNLSearch={handleSubmit}
                    icon={icon}
                    classname={searchClass}
                    loadingState={loading} />
            </div>
            <div className="sidebar-body-row">
                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
            </div>
        </>
    );
};

NLSidebarContent.propTypes = propTypes;
export default NLSidebarContent;