import React from "react";
import PropTypes from "prop-types";
import NLSearchSuggestionsIcon from "../../naturalLanguage/NLSearchSuggestionsIcon";
import { RESPONSE_TYPE } from "../../../../../tests/mockData";



const propTypes = {
    type: PropTypes.string,
    message: PropTypes.string
};

const NLSearch = ({type, message}) => {
    const lookup = {
        [RESPONSE_TYPE.TOOL_START]: {variant: 'start', label: message, icon: 'sparkles'},
        [RESPONSE_TYPE.TOOL_COMPLETE]: {variant: 'complete', label: message, icon: ['far','circle-check']},
        [RESPONSE_TYPE.TOOL_ERROR]: {variant: 'error', label: message, icon: ['far', 'circle-xmark']}
    };

    return (
        <NLSearchSuggestionsIcon { ...lookup[type]} />
    );
};


NLSearch.propTypes = propTypes;
export default NLSearch;