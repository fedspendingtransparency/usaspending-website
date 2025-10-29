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
    onShareOptionClick: PropTypes.func.isRequired
};

const NewShare = ({
    classNames = '',
    url = '',
    onShareOptionClick = () => {}
}) => {
    console.debug(newSocialShareOptions);

    return (
        <FlexGridRow className="featured-content__share-wrapper">
            {newSocialShareOptions.map((option) => (
                <FlexGridCol mobile={12} desktop={12} tablet={2}>
                    {option.component ? option.component : option.name}
                </FlexGridCol>
            ))}
        </FlexGridRow>
    );
};

NewShare.propTypes = propTypes;
NewShare.displayName = 'New Share Menu';
export default NewShare;
