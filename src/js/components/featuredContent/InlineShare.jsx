/**
 * InlineShare.jsx
 * Created by Nick Torres 10/24/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { newSocialShareOptions } from "../../helpers/socialShare";

const propTypes = {
    url: PropTypes.string,
    classNames: PropTypes.string,
    onShareOptionClick: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    includedDropdownOptions: PropTypes.arrayOf(PropTypes.string)
};

const InlineShare = ({
    includedDropdownOptions = [],
    classNames = '',
    onShareOptionClick = () => {}
}) => {
    const socialShareOptions = newSocialShareOptions
        .filter(({ name }) => {
            if (!includedDropdownOptions.length) return true;
            return includedDropdownOptions.includes(name);
        })
        .map((option) => ({
            ...option,
            onClick: () => onShareOptionClick(option.name)
        }));

    return (
        <div className={classNames}>
            <span className="featured-content__citation-heading">
            Share this page
            </span>
            <FlexGridRow className="featured-content__share-wrapper">
                {socialShareOptions.map((option) => (
                    <FlexGridCol mobile={12} desktop={12} tablet={2} className="featured-content__share-option">
                        <div
                            className="featured-content__share-button"
                            role="button"
                            tabIndex={0}
                            onClick={option.onClick}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    option.onClick();
                                }
                            }}>
                            {option.component ? option.component : option.name}
                        </div>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </div>
    );
};

InlineShare.propTypes = propTypes;
InlineShare.displayName = 'Inline Share Menu';
export default InlineShare;
