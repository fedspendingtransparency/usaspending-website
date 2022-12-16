/**
 * AboutTheDataNoResults.jsx
 * Created by Brian Petway 11/30/22
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    searchTerm: PropTypes.string
};

const AboutTheDataNoResults = ({ searchTerm }) => (
    <div className="atd-no-results">
        <div className="atd-no-results__heading">
            No Results Found
        </div>
        <div className="atd-no-results__text">
            No results found for "{searchTerm}."
        </div>
    </div>
);

AboutTheDataNoResults.propTypes = propTypes;
export default AboutTheDataNoResults;
