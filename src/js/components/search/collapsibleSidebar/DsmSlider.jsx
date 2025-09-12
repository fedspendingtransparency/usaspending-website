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

const DsmSlider = ({
    isDsmOpened, setIsDsmOpened, dsmFile, currentLevel, selectedCategoryTitle, height, hasChildren
}) => {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        const fetchMarkdown = async () => {
            const file = await import(`../../../../content/search/${dsmFile}`);
            setMarkdownContent(file.default());
        };
        fetchMarkdown();
    }, [dsmFile]);

    const clickHandler = (e) => {
        const action = isDsmOpened ? 'Close' : 'Open';
        e.preventDefault();
        setIsDsmOpened(!isDsmOpened);
        Analytics.event({
            event: 'dsm_menu_action',
            category: 'Advanced Search - Filter DS&M',
            action: `${action} DS&M`,
            label: selectedCategoryTitle
        });
    };

    const adjustFilterLabel = () => {
        if (hasChildren) {
            return `filters`;
        }
        return `filter`;
    };

    const renderButtonLabel = () => {
        if (currentLevel === 1) {
            return <div>Learn more about the Filter Categories</div>;
        }

        return <div>About the {selectedCategoryTitle} {adjustFilterLabel()}</div>;
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
                        setIsDsmOpened(!isDsmOpened);
                    }
                }}>
                {renderButtonLabel()}
                <div>{isDsmOpened ? (
                    <FontAwesomeIcon className="chevron" icon="chevron-up" />
                ) : (
                    <FontAwesomeIcon className="chevron" icon="chevron-down" />
                )}
                </div>
            </span>
            {isDsmOpened &&
                <div className="collapsible-sidebar--dsm-content">
                    <div className="collapsible-sidebar--dsm-wrapper" style={{ height: `${height}px` }}>
                        {markdownContent}
                    </div>
                </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
