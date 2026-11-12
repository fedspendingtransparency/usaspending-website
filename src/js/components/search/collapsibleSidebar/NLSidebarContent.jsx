/**
 * NLSidebarContent.jsx
 * Created by Nick Torres 8/28/2026
 */

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NLDefaultHint from './NLDefaultHint';
import NLSearchButton from './NLSearchButton';
import NLSearchSuggestionsIcon from '../naturalLanguage/NLSearchSuggestionsIcon';
import QueryAssistantResponse from '../naturalLanguage/QueryAssistantResponse';
import { setIsSearchActive } from '../../../redux/actions/sidebar/sidebarActions';
import { buildResponseState } from '../../../helpers/search/naturalLanguage/searchResponseHelper';
import { sanitizeNLInput } from '../../../helpers/search/naturalLanguage/sanitizeNLInput';
import { NL_INPUT_MAX_CHARS } from './NLConstants';
import animatedTour from './NLAnimatedTour';
import Analytics from '../../../helpers/analytics/Analytics';

const EXAMPLE_PROMPTS = [
    'Grants to universities in Texas in fiscal year 2024',
    'Department of Defense contracts over $1 million in Virginia',
    'Climate research awards from the Department of Energy'
];

const propTypes = {
    text: PropTypes.string,
    setText: PropTypes.func,
    startNLSearch: PropTypes.func,
    data: PropTypes.array,
    cancelQuery: PropTypes.func,
    assistantState: PropTypes.shape({
        status: PropTypes.string,
        result: PropTypes.object
    }),
    onApproveRewrite: PropTypes.func,
    onEditRewrite: PropTypes.func,
    onSelectSuggestion: PropTypes.func
};

const NLSidebarContent = ({
    text,
    setText,
    startNLSearch,
    data,
    cancelQuery,
    assistantState = {},
    onApproveRewrite,
    onEditRewrite,
    onSelectSuggestion
}) => {
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);
    const isNLSearchComplete = useSelector((state) => state.sidebar.isNLSearchComplete);

    const dispatch = useDispatch();

    const MAX_CHARS = NL_INPUT_MAX_CHARS;
    const responseState = useMemo(
        () => buildResponseState(data),
        [data]
    );

    const reset = () => {
        setText('');
        Analytics.event({
            category: 'Smart Assist - Query',
            action: 'Input Cleared',
            label: 'side panel'
        });
    };
    let searchClass = 'default-search';
    let btnText = 'Search';
    let icon = '../../../../img/magnifying-glass-white.svg';

    if (isSearchActive) {
        if (isNLSearchComplete) {
            searchClass += ' complete';
            btnText = 'Start a new search';
        }
        else {
            searchClass += ' loading';
            btnText = 'Working...';
        }
    }
    else if (text.length === 0) {
        searchClass += ' disabled';
        icon = '../../../../img/magnifying-glass-disabled.svg';
    }

    const handleStartNLSearch = (target) => {
        dispatch(setIsSearchActive(true));
        startNLSearch(target);
    };

    const handleNewNLSearch = () => {
        dispatch(setIsSearchActive(false));
    };

    const handleNLSearch = isSearchActive ? handleNewNLSearch : handleStartNLSearch;

    const handleNLCancel = () => {
        dispatch(setIsSearchActive(false));
        if (cancelQuery) {
            cancelQuery();
            Analytics.event({
                category: 'Smart Assist - Query',
                action: 'Query Cancelled',
                label: 'side panel'
            });
        }
    };

    const handleInput = (event) => {
        setText(sanitizeNLInput(event.target.value).slice(0, MAX_CHARS));
    };

    // Enter submits the search; Shift+Enter still adds a new line. Ignore Enter while an IME is composing text.
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent?.isComposing) {
            event.preventDefault();
            if (text.trim()) {
                handleStartNLSearch(event.target);
            }
        }
    };

    // clicking an example runs it right away instead of filling in the text area (examples are real queries, not templates)
    const handleExampleClick = (example) => {
        if (typeof onSelectSuggestion === 'function') {
            dispatch(setIsSearchActive(true));
            onSelectSuggestion(example);
        }
    };

    const handleStartTutorial = () => {
        animatedTour.drive();
    };
    return (
        <>
            {/* eslint-disable-next-line @stylistic/multiline-ternary */}
            { isSearchActive ? (
                <div className="sidebar-nl-container response">
                    <span className="sidebar-nl-label">Your search</span>
                    <p className="sidebar-text semibold">{text}</p>
                    <QueryAssistantResponse
                        status={assistantState.status}
                        result={assistantState.result}
                        onApprove={onApproveRewrite}
                        onEdit={onEditRewrite}
                        onSelectSuggestion={onSelectSuggestion} />
                    {responseState.items.length > 0 && (
                        <>
                            <span className="sidebar-nl-label progress">Progress</span>
                            <div className="sidebar-body-row response">
                                {responseState.items.map((item, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <div key={`${item.toolId ?? 'search'}-${index}`}>
                                        <NLSearchSuggestionsIcon {...item} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="sidebar-nl-container compact start">
                    <p className="sidebar-text">Describe the spending you want to find and I’ll set up the search filters for you. <button className="sidebar-nl-tutorial-start" onClick={handleStartTutorial}>Begin tutorial</button></p>
                    <div className="sidebar-body-row">
                        {/* the counter and Clear Input sit inside the box, at the bottom, like a message composer */}
                        <div className="sidebar-textarea-wrapper">
                            <textarea
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                id="animated-tour-step2"
                                name="smart-assist-input"
                                spellCheck
                                className="sidebar-textarea"
                                maxLength={MAX_CHARS}
                                value={text}
                                rows="3"
                                cols="50"
                                placeholder="Describe the spending you want to find, or choose an example below." />
                            <div className="textarea-char-row">
                                <button type="reset" className={`textarea-reset ${text.length <= 0 && 'text-area-reset-hidden'}`} onClick={reset}>Clear Input</button>
                                <span className="textarea-char-count">{text.length} / {MAX_CHARS}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isSearchActive && !isNLSearchComplete && (
                <div className="sidebar-body-row">
                    <button className="natural-language-stop" onClick={handleNLCancel}>
                        Stop generating
                    </button>
                </div>
            )}
            <div className="sidebar-body-row">
                <NLSearchButton
                    startNLSearch={handleNLSearch}
                    text={btnText}
                    icon={icon}
                    classname={searchClass}
                    loadingState={isSearchActive && !isNLSearchComplete} />
            </div>
            {!isSearchActive && (
                <div className="sidebar-nl-container compact examples">
                    <div id="animated-tour-step3" className="sidebar-body-row">
                        <span className="sidebar-example">Example Prompts: </span>
                        {EXAMPLE_PROMPTS.map((example) => (
                            <NLDefaultHint
                                key={example}
                                onClick={() => handleExampleClick(example)}
                                hint={<p>{example}</p>} />
                        ))}
                    </div>
                </div>
            )}
            <div className="sidebar-body-row">
                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
            </div>
        </>
    );
};

NLSidebarContent.propTypes = propTypes;
export default NLSidebarContent;
