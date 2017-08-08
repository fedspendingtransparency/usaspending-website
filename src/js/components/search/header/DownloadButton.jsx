/**
  * DownloadButton.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func
};

export default class DownloadButton extends React.Component {
    render() {
        return (
            <button
                className="download-button"
                title="Download your data"
                aria-label="Download your data"
                onClick={this.props.onClick}>
                Download
            </button>
        );
    }
}

DownloadButton.propTypes = propTypes;
