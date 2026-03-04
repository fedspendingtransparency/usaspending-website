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
    colors: PropTypes.object,
    isEnabled: PropTypes.bool,
    key: PropTypes.string
};

const ShareIcon508 = ({
    url = '',
    onShareOptionClick = () => {},
    classNames = '',
    colors = {
        color: "#FACE00",
        backgroundColor: "#112F4E",
        confirmationBackgroundColor: "#f1f1f1"
    },
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
            className={`share-icon${!isEnabled ? ' disabled' : ''} ${classNames}`}
            key={key}>
            <input
                aria-label="Share Input Link"
                type="text"
                className="js-dtui-url-for-share-icon text"
                style={{ position: 'absolute', right: '9999px', opacity: 0 }}
                value={url}
                readOnly />
            <Picker
                dropdownDirection={dropdownDirection}
                options={socialShareOptions}
                selectedOption="copy"
                backgroundColor={colors.backgroundColor}
                notEnabled={!isEnabled}
                sortFn={() => 1}>
                <FontAwesomeIcon icon="share-alt" size="lg" color={colors.color} />
            </Picker>
            <span className="usda-share-icon__share-text">Share</span>
            {showConfirmationText && (
                <div
                    className="copy-confirmation"
                    style={{ backgroundColor: colors.confirmationBackgroundColor }} >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {' '}
                    Copied!
                </div>
            )}
        </div>
    );
};

ShareIcon508.propTypes = propTypes;
export default ShareIcon508;
