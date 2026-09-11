/*
* NLSearch.jsx
* Created by Trey Morgan 8/27/2026
*/

import React from "react";
import PropTypes from "prop-types";
import NLSearchSuggestionsIcon from "../../naturalLanguage/NLSearchSuggestionsIcon";

const propTypes = {
    responseData: PropTypes.object
};

const NLSearch = ({responseData}) => {
    return (
        <NLSearchSuggestionsIcon { ...responseData} />
    );
};


NLSearch.propTypes = propTypes;
export default NLSearch;