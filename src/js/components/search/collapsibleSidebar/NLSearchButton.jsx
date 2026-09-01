/**
 * NLSearchButton.jsx
 * Created by Nick Torres 8/28/2026
 */
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DEFAULT_ICON_PATH = "../../../../img/magnifying-glass-white.svg";
const propTypes = {
    loadingState: PropTypes.string,
    classname: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string
    /* ,onclick: PropTypes.func */
};

const NLSearchButton = ({loadingState, classname="default-search", icon=DEFAULT_ICON_PATH, text = "Search"}) => {

    return (
        <button className={`natural-language-submit ${classname}`} /* onClick={()=> console.debug("clicked")} */ >
            {!loadingState && <img src={icon} alt="Icon for Search Button"/>}
            {loadingState && <FontAwesomeIcon icon={['far', 'wand-magic-sparkles']} />}
            {text}
        </button>
    );
};

NLSearchButton.propTypes = propTypes;
export default NLSearchButton;