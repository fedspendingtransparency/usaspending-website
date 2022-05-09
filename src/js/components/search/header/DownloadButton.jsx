/**
  * DownloadButton.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import NoDownloadHover from './NoDownloadHover';

const propTypes = {
    onClick: PropTypes.func,
    downloadAvailable: PropTypes.bool,
    downloadInFlight: PropTypes.bool,
    disableHover: PropTypes.bool
};

export default class DownloadButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
        this.setState({
            showHover: true
        });
    }

    onMouseLeave() {
        this.setState({
            showHover: false
        });
    }

    onClick(e) {
        e.preventDefault();
        if (this.props.downloadAvailable && !this.props.downloadInFlight) {
            this.props.onClick();
        }
    }

    render() {
        let hover = null;
        if (this.state.showHover && !this.props.downloadAvailable
            && !this.props.disableHover && !this.props.downloadInFlight) {
            hover = (<NoDownloadHover />);
        }

        let disabled = '';
        if (!this.props.downloadAvailable || this.props.downloadInFlight) {
            disabled = 'disabled';
        }

        let buttonText = 'Download';
        if (this.props.downloadInFlight) {
            buttonText = 'Preparing Download...';
        }

        return (
            <div
                className="download-wrap"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onMouseEnter}
                onBlur={this.onMouseLeave}>
                {hover}
                <button
                    className={`download-button ${disabled}`}
                    title="Download your data"
                    aria-label="Download your data"
                    aria-disabled={!this.props.downloadAvailable}
                    onClick={this.onClick}>
                    <div className="label">{buttonText}</div>
                </button>
            </div>
        );
    }
}

DownloadButton.propTypes = propTypes;
