import React from "react";
import PropTypes from "prop-types";
import NLDefaultHint from "./NLDefaultHint";

const propTypes = {
    hintOnClick: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func
};

const NLSidebarContent = ({ hintOnClick, text, setText }) => {
    const MAX_CHARS = 500;
    const reset = () => setText("");

    return (
        <>
            <p className="sidebar-text">Start a USAspending search in your own words, or use one of the prompts below to help you get started.</p><div className="sidebar-body-row">
                <span className="sidebar-example">Example Prompts: </span>
                <NLDefaultHint onClick={hintOnClick} hint={<p>What schools in <span tabIndex={-1} className="hint-user-replace">[county, state]</span> receive the most money in federal funding?</p>} />
                <NLDefaultHint onClick={hintOnClick} hint={<p>What programs received funding for veterans in <span tabIndex={-1} className="hint-user-replace">[state]</span> during <span tabIndex={-1} className="hint-user-replace">[time period]</span>?</p>} />
                <NLDefaultHint onClick={hintOnClick} hint={<p>What’s the spending on <span tabIndex={-1} className="hint-user-replace">[topic of interest]</span> in <span tabIndex={-1} className="hint-user-replace">[location]</span> over the past decade?</p>} />
            </div><div className="sidebar-body-row">
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    name="smart-assist-input"
                    spellCheck
                    className="sidebar-textarea"
                    maxLength={MAX_CHARS}
                    value={text}
                    rows="4" cols="50"
                    placeholder="Type a question about government spending, or choose an example above" />
                <div className="textarea-char-row">
                    <button type="reset" className={`textarea-reset ${text.length <= 0 && 'text-area-reset-hidden'}`} onClick={reset}>Clear Input</button>
                    <span className="textarea-char-count">{text.length} / {MAX_CHARS}</span>
                </div>
            </div><div className="sidebar-body-row">
                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
            </div>
        </>
    );
};

NLSidebarContent.propTypes = propTypes;
export default NLSidebarContent;