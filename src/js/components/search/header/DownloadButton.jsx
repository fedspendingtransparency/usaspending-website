/**
  * DownloadButton.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    downloadAvailable: PropTypes.bool
};

export default class DownloadButton extends React.Component {
    render() {
        return (
            <div className="download-wrap">
                <button
                    className="download-button"
                    title="Download your data"
                    aria-label="Download your data"
                    onClick={this.props.onClick}
                    disabled={!this.props.downloadAvailable}>
                    Download
                </button>
            </div>
        );
    }
}

DownloadButton.propTypes = propTypes;
