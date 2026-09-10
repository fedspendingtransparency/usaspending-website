import React, {useMemo} from "react";
import PropTypes from "prop-types";
import NLDefaultHint from "./NLDefaultHint";
import NLSearchButton from "./NLSearchButton";
import NLSearch from "./NLSearch";
import { RESPONSE_TYPE, OPERATION } from "./NLConstants";


const propTypes = {
    hintOnClick: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func,
    startNLSearch: PropTypes.func,
    data: PropTypes.array
};

const {SEARCH, TOOL} = OPERATION;

const responseLookup = {
    [RESPONSE_TYPE.SEARCH_START]: {
        operation: SEARCH,
        variant: 'complete',
        icon: ['far', 'circle-check']
    },

    [RESPONSE_TYPE.SEARCH_COMPLETE]: {
        operation: SEARCH
    },

    [RESPONSE_TYPE.SEARCH_ERROR]: {
        operation: SEARCH,
        variant: 'error', 
        icon: ['far','circle-xmark']
    },

    [RESPONSE_TYPE.TOOL_START]: {
        operation: TOOL,
        variant: 'start', 
        icon: ['far', 'sparkles']
    },

    [RESPONSE_TYPE.TOOL_COMPLETE]: {
        operation: TOOL,
        variant: 'complete', 
        icon: ['far','circle-check']
    },

    [RESPONSE_TYPE.TOOL_ERROR]: {
        operation: TOOL,
        variant: 'error',
        icon: ['far', 'circle-xmark']
    }
};

const buildResponseState = (data = []) => {
    const state = {
        search: null,
        tools: {} 
    };

    data.forEach((event) => {
        const {
            search_id, 
            tool_use_id, 
            type, 
            message, 
            result
        } = event ?? {};
       
        const response = responseLookup[type];

        if (!response) {
            return;
        }

        if (response.operation === SEARCH) {
            state.search = {
                ...state.search,
                searchId: search_id,
                ...response,
                ...(message && {
                    label: response.variant ? message : '',
                    result
                })
            };
            return;
        }

        const toolId = tool_use_id;

        if (!toolId) {
            return;
        }

        const existingTool = state.tools[tool_use_id];

        state.tools[toolId] = {
            ...existingTool,
            searchId: search_id,
            toolId,
            ...response,
            ...(message && {
                label: message
            })
        }
    });

    return state;
}

const NLSidebarContent = ({ hintOnClick, text, setText, startNLSearch, data }) => {
    const MAX_CHARS = 500;
    const responseState = useMemo(
        () => buildResponseState(data), 
        [data]
    );

    const reset = () => setText("");
    let searchClass = 'default-search';
    console.log('DATA:', data);
    const searchText = data?.length ? 'Start a new search' : 'Search';

    // eslint-disable-next-line no-useless-assignment
    let icon = '';
    if (text.length === 0) {
        searchClass += " disabled";
        icon = '../../../../img/magnifying-glass-disabled.svg';
    }
    else {
        icon = '../../../../img/magnifying-glass-white.svg';
    }
    return (
        <>
            {data?.length &&  <p className="sidebar-text semibold">{text}</p> }
            { data?.length ? (
                
                <>
                    {responseState.search && (
                        <NLSearch responseData={responseState.search} />
                    )}
                    {Object.values(responseState.tools).map((tool, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <NLSearch key={`${tool.toolId}-${index}`} responseData={tool}  />

                    ))}
                </>   
            ) :(
                <>
                    <p className="sidebar-text">Start a USAspending search in your own words, or use one of the prompts below to help you get started.</p><div className="sidebar-body-row">
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
                { /* We will have to make a couple adjustments to this when we have the api hooked up and are getting loading states back
                on submit we have to sanitize the html*/}
                <NLSearchButton
                    startNLSearch={startNLSearch}
                    text={searchText}
                    icon={icon}
                    classname={searchClass} />
            </div>
            <div className="sidebar-body-row">
                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
            </div>
        </>
    );
};

NLSidebarContent.propTypes = propTypes;
export default NLSidebarContent;