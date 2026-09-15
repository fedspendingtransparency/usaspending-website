/**
 * NLSidebarContent.jsx
 * Created by Nick Torres 8/28/2026
 */

/* eslint-disable max-len */
import React, {useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import NLDefaultHint from "./NLDefaultHint";
import NLSearchButton from "./NLSearchButton";
import NLSearchSuggestionsIcon from "../../naturalLanguage/NLSearchSuggestionsIcon";
import { setIsSearchActive } from "../../../redux/actions/sidebar/sidebarActions";
import { buildResponseState } from "../../../helpers/search/naturalLanguage/searchResponseHelper";

const propTypes = {
    hintOnClick: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func,
    startNLSearch: PropTypes.func,
    data: PropTypes.array
};


const NLSidebarContent = ({
    hintOnClick,
    text,
    setText,
    startNLSearch,
    data
}) => {
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);
    const isNLSearchComplete = useSelector((state) => state.sidebar.isNLSearchComplete);

    const dispatch = useDispatch();

    const MAX_CHARS = 500;
    const responseState = useMemo(
        () => buildResponseState(data), 
        [data]
    );

    const reset = () => setText("");
    let searchClass = 'default-search';
    let btnText = "Search";
    let icon = '../../../../img/magnifying-glass-white.svg';

    if (isSearchActive) {
        if (isNLSearchComplete) {
            searchClass +=  " complete";
            btnText = "Start a new search";
        }
        else {
            searchClass += " loading";
            btnText = "Working...";
        }
    }
    else if (text.length === 0) {
        searchClass += " disabled";
        icon = '../../../../img/magnifying-glass-disabled.svg';
    }

    const handleStartNLSearch = () => {
        dispatch(setIsSearchActive(true));
        startNLSearch();
    };

    const handleNewNLSearch = () => {
        dispatch(setIsSearchActive(false));
    }

    const handleNLSearch = isSearchActive ? handleNewNLSearch : handleStartNLSearch;

    return (
        <>
            {isSearchActive &&  <p className="sidebar-text semibold">{text}</p> }
            { isSearchActive ? (
                
                <div className="sidebar-body-row response">
                    {responseState.items.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={`${item.toolId ?? 'search'}-${index}`}>
                            <NLSearchSuggestionsIcon {...item} />
                        </div>
                    ))}
                </div>   
            ) : (
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
            )}
            <div className="sidebar-body-row">
                <NLSearchButton
                    startNLSearch={handleNLSearch}
                    text={btnText}
                    icon={icon}
                    classname={searchClass}
                    loadingState={isSearchActive && !isNLSearchComplete} />
            </div>
            <div className="sidebar-body-row">
                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
            </div>
        </>
    );
};

NLSidebarContent.propTypes = propTypes;
export default NLSidebarContent;