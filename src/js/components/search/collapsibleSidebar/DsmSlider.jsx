/**
 * DsmSlider.jsx
 * Created by Nick Torres 1/9/2025
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Analytics from "../../../helpers/analytics/Analytics";

const propTypes = {
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func,
    dsmFile: PropTypes.string,
    currentLevel: PropTypes.number,
    selectedCategoryTitle: PropTypes.string,
    height: PropTypes.number,
    hasChildren: PropTypes.bool
};

const DsmSlider = (props) => {
    const [markdownContent, setMarkdownContent] = useState('');
    const isDsmOpened = props?.isDsmOpened;

    useEffect(() => {
        const fetchMarkdown = async () => {
            const file = await import(`../../../../content/search/${props.dsmFile}`);
            setMarkdownContent(file.default());
        };
        fetchMarkdown();
    }, [props.dsmFile]);

    const clickHandler = (e) => {
        const action = isDsmOpened ? 'Close' : 'Open';
        e.preventDefault();
        props.setIsDsmOpened(!isDsmOpened);
        Analytics.event({
            event: 'dsm_menu_action',
            category: 'Advanced Search - Filter DS&M',
            action: `${action} DS&M`,
            label: props.selectedCategoryTitle
        });
    };

    const adjustFilterLabel = () => {
        if (props.hasChildren) {
            return `filters`;
        }
        return `filter`;
    };

    const renderButtonLabel = () => {
        if (props.currentLevel === 1) {
            return <div>Learn more about the Filter Categories</div>;
        }

        return <div>About the {props.selectedCategoryTitle} {adjustFilterLabel()}</div>;
    };

    return (
        <div
            className={`collapsible-sidebar--dsm-slider ${isDsmOpened ? `dsm-opened` : ''}`}>
            <span
                role="button"
                tabIndex={0}
                onClick={clickHandler}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        props.setIsDsmOpened(!isDsmOpened);
                    }
                }}>
                {renderButtonLabel()}
                <div>{props.isDsmOpened ? (
                    <FontAwesomeIcon className="chevron" icon="chevron-up" />
                ) : (
                    <FontAwesomeIcon className="chevron" icon="chevron-down" />
                )}
                </div>
            </span>
            {props.isDsmOpened &&
                <div className="collapsible-sidebar--dsm-content">
                    <div className="collapsible-sidebar--dsm-wrapper" style={{ height: `${props.height}px` }}>
                        {markdownContent}
                    </div>
                </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
