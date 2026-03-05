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
    checkboxId: PropTypes.string
};

const DownloadOption = (props) => {
    const isEnabled = parseInt(props.count.replace(/,/g, ''), 10) <= 500000;
    console.debug(props, isEnabled);

    return (
        <div className={`download-item ${!isEnabled ? "disabled" : ''}`}>
            <div className={`download-item-top ${!isEnabled ? "disabled" : ''}`}>
                <label htmlFor={props.checkboxId} className={`download-item-title ${!isEnabled ? "disabled" : ''}`}><input type="checkbox" id={props.checkboxId} disabled={!isEnabled} />{props.title}</label>
                {props.count === "1" && <div className={`download-record-count ${!isEnabled ? "disabled" : ''}`}>{props.count} record</div>}
                {props.count !== "1" && <div className={`download-record-count ${!isEnabled ? "disabled" : ''}`}>{props.count} records</div>}
            </div>
            <div className={`download-item-body ${!isEnabled ? "disabled" : ''}`}>
                {props.copy}
            </div>
        </div>
    );
};


DownloadOption.propTypes = propTypes;
export default DownloadOption;
