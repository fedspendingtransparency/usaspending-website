/**
 * DsmSlider.jsx
 * Created by Nick Torres 1/9/2025
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func,
    dsmFile: PropTypes.string
};

const DsmSlider = (props) => {
    const [markdownContent, setMarkdownContent] = useState('');
    useEffect(() => {
        const fetchMarkdown = async () => {
            const file = await import(`../../../../content/search/${props.dsmFile}`);
            setMarkdownContent(file.default());
        };

        fetchMarkdown();
    }, [props.dsmFile]);
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
                    <div className="collapsible-sidebar--dsm-wrapper">
                        {markdownContent}
                    </div>
                </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
