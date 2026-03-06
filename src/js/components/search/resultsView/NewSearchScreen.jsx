/**
 * NewSearchScreen.jsx
 * Created by Josue Aguilar 4/23/2024
 */

import React from 'react';
import PropTypes from "prop-types";
import NewSearchScreenButton from "./NewSearchScreenButton";

const propTypes = { showButton: PropTypes.bool };

const NewSearchScreen = ({ showButton }) => (
    <div className="new-search-container">
        <img
            fetchPriority="high"
            className="new-search-icon"
            src="graphics/award-search-default-empty-state.svg"
            alt="Start your search by adding filters" />
        <p className="new-search__start-text">Start your search by adding filters</p>
        { showButton && <NewSearchScreenButton /> }
    </div>
);

NewSearchScreen.propTypes = propTypes;
export default NewSearchScreen;
