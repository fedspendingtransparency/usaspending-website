import React from "react";
import PropTypes from "prop-types";
import NLSearchSuggestionsIcon from "../../naturalLanguage/NLSearchSuggestionsIcon";
import {START, COMPLETE, ERROR} from "../../naturalLanguage/NLConstants"



const propTypes = {
    type: PropTypes.string,
    message: PropTypes.string
};

const NLSearch = ({type, message}) => {
    const lookup = {
        [START]: {variant: 'start', label: message, icon: 'sparkles'},
        [COMPLETE]: {variant: 'complete', label: message, icon: ['far','circle-check']},
        [ERROR]: {variant: 'error', label: message, icon: ['far', 'circle-xmark']}
    };

    return (
        <NLSearchSuggestionsIcon { ...lookup[type]} />
    );
};


NLSearch.propTypes = propTypes;
export default NLSearch;