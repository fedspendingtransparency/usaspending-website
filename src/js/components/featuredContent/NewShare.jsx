/**
 * NewShare.jsx
 * Created by Nick Torres 10/24/2025
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { newSocialShareOptions } from "../../helpers/socialShare";

const propTypes = {
    url: PropTypes.string.isRequired,
    classNames: PropTypes.string,
    onShareOptionClick: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired
};

const NewShare = ({
    classNames = '',
    onShareOptionClick = () => {},
    onKeyUp = () => {}
// eslint-disable-next-line arrow-body-style
}) => {
    return (
        <div className={classNames}>
            <span className="featured-content__citation-heading">
            Share this page
            </span>
            <FlexGridRow className="featured-content__share-wrapper">
                {newSocialShareOptions.map((option) => (
                    <FlexGridCol mobile={12} desktop={12} tablet={2} className="featured-content__share-option">
                        <div role="button" tabIndex={0} onClick={onShareOptionClick} onKeyUp={onKeyUp}>
                            {option.component ? option.component : option.name}
                        </div>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </div>
    );
};

NewShare.propTypes = propTypes;
NewShare.displayName = 'New Share Menu';
export default NewShare;
