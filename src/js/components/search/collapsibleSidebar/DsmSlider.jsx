/**
 * DsmSlider.jsx
 * Created by Nick Torres 1/9/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    dsmContent: PropTypes.element,
    isDsmError: PropTypes.bool,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func
};

const DsmSlider = (props) => {
    const clickHandler = () => {
        props.setIsDsmOpened(!props.isDsmOpened);
    };
    return (
        <div
            className={`collapsible-sidebar--dsm-slider ${props.isDsmOpened ? `dsm-opened` : null}`}
            role="button"
            tabIndex="0"
            onClick={clickHandler}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    props.setIsDsmOpened(!props.isDsmOpened);
                }
            }}>
            About this filter{props.isDsmOpened ? <FontAwesomeIcon className="chevron" icon="chevron-up" /> : <FontAwesomeIcon className="chevron" icon="chevron-down" />}
            {props.isDsmOpened &&
            <div className="collapsible-sidebar--dsm-content">
                {!props.isDsmError && props.dsmContent}
            </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
