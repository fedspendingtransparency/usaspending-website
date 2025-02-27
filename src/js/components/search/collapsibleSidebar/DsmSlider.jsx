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
    dsmFile: PropTypes.string,
    currentLevel: PropTypes.number,
    selectedCategoryTitle: PropTypes.string,
    height: PropTypes.number
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

    const adjustFilterLabel = () => {
        if (props.currentLevel === 2 && props.selectedCategoryTitle) {
            return `${props.selectedCategoryTitle} filters`;
        }

        return 'this filter';
    };
    return (
        <div
            className={`collapsible-sidebar--dsm-slider ${props?.isDsmOpened ? `dsm-opened` : ''}`}
            role="button"
            tabIndex="0"
            onClick={clickHandler}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    props.setIsDsmOpened(!props.isDsmOpened);
                }
            }}>
            About {adjustFilterLabel()}{props.isDsmOpened ? <FontAwesomeIcon className="chevron" icon="chevron-up" /> : <FontAwesomeIcon className="chevron" icon="chevron-down" />}
            {props.isDsmOpened &&
                <div className="collapsible-sidebar--dsm-content">
                    <div className="collapsible-sidebar--dsm-wrapper" style={{ height: `${props.height - 64}px` }}>
                        {markdownContent}
                    </div>
                </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
