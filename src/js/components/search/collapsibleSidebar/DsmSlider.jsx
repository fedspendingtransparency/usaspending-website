/**
 * DsmSlider.jsx
 * Created by Nick Torres 1/9/2025
 **/

import React, { useState, useEffect, lazy } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    contentFile: PropTypes.string
};

const DsmSlider = (props) => {
    const [isError, setIsError] = useState(false);
    const [opened, setIsOpened] = useState(false);
    const [content, setContent] = useState(null);
    useEffect(() => {
        if (props.contentFile?.length > 0) {
            // lazy load the md files
            const Component = lazy(() => import(/* webpackPreload: true */ `../../../../content/search/${props.contentFile}`).catch((err) => {
                setIsError(true);
                console.log(err);
            }));
            setContent(<Component />);
        }
    }, [props.contentFile]);

    const clickHandler = () => {
        setIsOpened(!opened);
    };
    return (
        <div
            className="collapsible-sidebar--dsm-slider"
            role="button"
            tabIndex="0"
            onClick={clickHandler}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    setIsOpened(!opened);
                }
            }}>
            About this filter{opened ? <FontAwesomeIcon className="chevron" icon="chevron-up" /> : <FontAwesomeIcon className="chevron" icon="chevron-down" />}
            {opened &&
            <div className="collapsible-sidebar--dsm-content">
                {!isError && content}
            </div>}
        </div>
    );
};


DsmSlider.propTypes = propTypes;
export default DsmSlider;
