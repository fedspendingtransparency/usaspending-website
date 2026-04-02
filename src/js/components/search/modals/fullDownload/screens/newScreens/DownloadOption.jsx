/**
 * DownloadOption.jsx
 * Created by Nick Torres 3/4/26
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    copy: PropTypes.string,
    count: PropTypes.string,
    checkboxId: PropTypes.string,
    toggleOption: PropTypes.func
};

const DownloadOption = ({
    title,
    copy,
    count,
    checkboxId,
    toggleOption
}) => {
    const isEnabled = count <= 500000;
    return (
        <div className={`download-item ${!isEnabled ? "disabled" : ''}`}>
            <div className={`download-item-top ${!isEnabled ? "disabled" : ''}`}>
                <label
                    htmlFor={checkboxId}
                    className={`download-item-title ${!isEnabled ? "disabled" : ''}`}>
                    <input
                        type="checkbox"
                        id={checkboxId}
                        disabled={!isEnabled}
                        onKeyDown={(e) => (e.key === "Enter" ? toggleOption() : "")}
                        onChange={() => toggleOption()} />
                    {title}
                </label>

                <div className={`download-record-count ${!isEnabled ? "disabled" : ''}`}>
                    {`${count} ${count === "1" ? "record" : "records"}`}
                </div>

            </div>
            <div className={`download-item-body ${!isEnabled ? "disabled" : ''}`}>
                {copy}
            </div>
        </div>
    );
};


DownloadOption.propTypes = propTypes;
export default DownloadOption;
