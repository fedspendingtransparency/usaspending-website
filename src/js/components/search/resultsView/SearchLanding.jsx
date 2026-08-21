/**
 * SearchLanding.jsx
 * Created by JD House 8/17/2026
 **/

import React from "react";

import NLMoreResources from "../../naturalLanguage/NLMoreResources";
import NLSearchSuggestions from "../../naturalLanguage/NLSearchSuggestions";
import NLPreSearchButtonGroup from "../../naturalLanguage/NLPreSearchButtonGroup";


const SearchLanding = () => (
    <div className="search-results-landing">
        <h3 className="landing-title">Start your USAspending search</h3>
        <p className="landing-subTitle">
            View popular data searches, frequently asked questions, & timely government spending topics.
        </p>
        <NLPreSearchButtonGroup />
        <NLSearchSuggestions />
        <NLMoreResources />
    </div>
);

export default SearchLanding;
