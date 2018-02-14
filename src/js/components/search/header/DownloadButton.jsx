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
    filterCount: PropTypes.number
};

const defaultProps = {
    filterCount: 0
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
        if (!this.props.downloadAvailable) {
            e.preventDefault();
            return;
        }

        this.props.onClick();
    }

    render() {
        let hover = null;
        if (this.state.showHover && !this.props.downloadAvailable && this.props.filterCount > 0) {
            hover = (<NoDownloadHover />);
        }

        let disabled = '';
        if (!this.props.downloadAvailable) {
            disabled = 'disabled';
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
                    aria-describedby="no-download-hover"
                    aria-disabled={!this.props.downloadAvailable}
                    onClick={this.onClick}>
                    <div className="label">
                        Download
                    </div>
                </button>
            </div>
        );
    }
}

DownloadButton.propTypes = propTypes;
DownloadButton.defaultProps = defaultProps;
