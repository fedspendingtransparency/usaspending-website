import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    onClick: PropTypes.func
};

const ATDButton = (props) =>
    (
        <button tabIndex="0" className="sticky-toolbar__atd-icon" onClick={props.onClick}>
            <FontAwesomeIcon icon="file-alt" size="lg" />
            <span className="sticky-toolbar__atd-span">About the Data</span>
        </button>
    );

ATDButton.propTypes = propTypes;
ATDButton.displayName = "ATDButton";
export default ATDButton;
