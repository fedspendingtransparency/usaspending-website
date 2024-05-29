/**
 * ReadMore.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string, PropTypes.object]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    limit: PropTypes.number,
    initiallyExpanded: PropTypes.bool,
    inline: PropTypes.bool,
    openIcon: PropTypes.string,
    closeIcon: PropTypes.string,
    openPrompt: PropTypes.string,
    closePrompt: PropTypes.string,
    iconColor: PropTypes.string,
    id: PropTypes.string,
    additionalFunctionality: PropTypes.func,
    showPreview: PropTypes.bool,
    previewLines: PropTypes.string
};

const ReadMore = ({
    children, // pre-determined content to be hidden/ shown by the buttons
    text, // a string to be truncated based on the limit
    limit = 300,
    initiallyExpanded = false,
    openIcon = "",
    closeIcon = "",
    openPrompt = "",
    closePrompt = "",
    additionalFunctionality = null,
    id = "",
    showPreview = false,
    previewLines = ""
}) => {
    const [expanded, setExpanded] = useState(!!initiallyExpanded);

    const readLess = () => {
        if (closeIcon && closePrompt) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(false);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}>{closePrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={closeIcon} /></span>
                </button>);
        }
        else if (closeIcon) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(false);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}>Read Less{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={closeIcon} /></span>
                </button>
            );
        }
        else if (closePrompt) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(false);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}>{closePrompt}
                </button>);
        }
        return (<button className="read-more-button" onClick={() => setExpanded(false)}>Read Less</button>);
    };
    const readMore = () => {
        if (openPrompt && openIcon) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(true);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}>{openPrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={openIcon} /></span>
                </button>);
        }
        else if (openPrompt) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(true);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}>{openPrompt}
                </button>);
        }
        else if (openIcon) {
            return (
                <button
                    className="readMoreUpdated__button"
                    onClick={() => {
                        setExpanded(true);
                        if (additionalFunctionality !== null) {
                            additionalFunctionality(expanded);
                        }
                    }}><span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={openIcon} /></span>
                </button>);
        }
        return (<button className="read-more-button" onClick={() => setExpanded(true)}>Read More</button>);
    };

    if (expanded && children) {
        if (showPreview === true) {
            return (
                <>
                    <p className="read-more__preview-lines">{previewLines}</p>
                    <div>
                        {children}
                    </div>
                    <div>{readLess()}</div>
                </>
            );
        }
        return (
            <>
                <div id={id}>
                    {children}
                </div>
                <div>{readLess()}</div>
            </>
        );
    }
    if (!expanded && children) {
        if (showPreview === true) {
            return (
                <>
                    <p className="read-more__preview-lines">{previewLines}</p>
                    <div>{readMore()}</div>
                </>
            );
        }
    }
    if (expanded && (text && text.length > limit)) {
        return (
            <>
                <p className="read-more__preview-lines">{text}</p>
                <div>{readLess()}</div>
            </>
        );
    }
    if (!expanded && text && text.length > limit) {
        return (
            <div>
                <p className="read-more__preview-lines">{`${text.substring(0, limit)}...`}{' '}{readMore()}</p>
            </div>
        );
    }
    if (text && text.length <= limit) {
        return (
            <div>
                <p className="read-more__preview-lines">{text}</p>
            </div>
        );
    }
    return (
        <div>
            {readMore()}
        </div>
    );
};

ReadMore.propTypes = propTypes;
export default ReadMore;
