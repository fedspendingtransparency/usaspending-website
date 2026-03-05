/**
 * ShareIcon508.jsx
 * Created by JD House 3/4/2026
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "lodash-es";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Picker } from 'data-transparency-ui';
import { newSocialShareOptionsWithCopy } from "helpers/socialShare";

const propTypes = {
    url: PropTypes.string.isRequired,
    onShareOptionClick: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    dropdownDirection: PropTypes.string,
    isEnabled: PropTypes.bool,
    key: PropTypes.string
};

const ShareIcon508 = ({
    url = '',
    onShareOptionClick = () => {},
    classNames = '',
    dropdownDirection = 'left',
    isEnabled = true,
    key = "ShareIcon"
}) => {
    const [showConfirmationText, setConfirmationText] = useState(false);
    const hideConfirmationText = debounce(() => setConfirmationText(false), 1750);

    const copyLink = async () => {
        // eslint-disable-next-line no-undef
        await navigator.clipboard.writeText(url);
        setConfirmationText(true);
        onShareOptionClick('copy');
    };

    const socialShareOptions = newSocialShareOptionsWithCopy
        .map((option) => {
            if (option.name === 'copy') {
                return {
                    ...option,
                    onClick: copyLink
                };
            }
            return {
                ...option,
                onClick: () => onShareOptionClick(option.name)
            };
        });

    useEffect(() => {
        if (showConfirmationText) {
            hideConfirmationText();
        }
        return hideConfirmationText.cancel;
    }, [hideConfirmationText, showConfirmationText]);

    return (
        <div
            className={
                `usda-share-icon usa-share-icon-508 
                ${!isEnabled ? 'disabled' : ''} ${classNames}`
            }
            key={key}>
            <input
                aria-label="Share Input Link"
                type="text"
                className="share-icon-link"
                value={url}
                readOnly />
            <Picker
                dropdownDirection={dropdownDirection}
                options={socialShareOptions}
                selectedOption="copy"
                backgroundColor="#112F4E"
                notEnabled={!isEnabled}
                sortFn={() => 1}>
                <FontAwesomeIcon className="share-icon" icon="share-alt" />
            </Picker>
            <span className="usda-share-icon__share-text">Share</span>
            {showConfirmationText && (
                <div className="copy-confirmation" >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {' '}
                    Copied!
                </div>
            )}
        </div>
    );
};

ShareIcon508.propTypes = propTypes;
ShareIcon508.displayName = 'Share Icon';
export default ShareIcon508;
