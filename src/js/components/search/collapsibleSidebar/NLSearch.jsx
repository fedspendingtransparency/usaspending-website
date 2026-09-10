/*
* NLSearch.jsx
* Created by Trey Morgan 8/27/2026
*/

import React from "react";
import PropTypes from "prop-types";
import NLSearchSuggestionsIcon from "../../naturalLanguage/NLSearchSuggestionsIcon";
import { RESPONSE_TYPE } from "./NLConstants";

const propTypes = {
    responseData: PropTypes.object
};

const NLSearch = ({responseData}) => {
    console.log({responseData});
    const {search_id: searchId, tool_use_id: toolId, type, message, result} = responseData ?? {};
    const lookup = {
        [RESPONSE_TYPE.SEARCH_START]: {searchId, variant: 'complete', label: message, icon: ['far', 'circle-check']},
        [RESPONSE_TYPE.SEARCH_COMPLETE]: {searchId, result, variant: 'complete', label: message, icon: ['far','circle-check']},
        [RESPONSE_TYPE.SEARCH_ERROR]: {searchId, variant: 'error', label: message, icon: ['far','circle-xmark']},
        // [RESPONSE_TYPE.TOOL_START]: {variant: 'start', label: message, icon: 'sparkles'},
        [RESPONSE_TYPE.TOOL_START]: {searchId, toolId, variant: 'start', label: message, icon: ['far', 'sparkles']},
        [RESPONSE_TYPE.TOOL_COMPLETE]: {searchId, toolId, variant: 'complete', icon: ['far','circle-check']},
        [RESPONSE_TYPE.TOOL_ERROR]: {searchId, toolId, variant: 'error', label: message, icon: ['far', 'circle-xmark']}
    }

    return (
        <NLSearchSuggestionsIcon { ...lookup[type]} />
    );
};


NLSearch.propTypes = propTypes;
export default NLSearch;