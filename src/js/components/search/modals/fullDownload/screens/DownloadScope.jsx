/**
 * DownloadScope.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    goToStep: PropTypes.func,
    setDownloadColumns: PropTypes.func,
    setDownloadPending: PropTypes.func
};

export default class DownloadScope extends React.Component {
    constructor(props) {
        super(props);

        this.clickedEverything = this.clickedEverything.bind(this);
    }

    clickedEverything() {
        this.props.setDownloadColumns([]);
        this.props.setDownloadPending(true);
        this.props.goToStep(3, true);
    }

    render() {
        return (
            <div className="download-level-screen">
                <div className="main-title">
                    <h2>Which data columns would you like to include?</h2>
                </div>

                <div className="level-options-container">
                    <div className="level-option">
                        <button
                            className="level-button"
                            aria-label="Everything"
                            title="Everything"
                            onClick={this.clickedEverything}>
                            Everything
                        </button>
                        <div className="level-description">
                            Includes all available data columns in your download.
                        </div>
                    </div>

                    <div className="level-option">
                        <button
                            className="level-button"
                            aria-label="Let me choose"
                            title="Let me choose"
                            disabled>
                            Let me choose<br />(coming soon)
                        </button>
                        <div className="level-description">
                            Select the specific columns to include in your download.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadScope.propTypes = propTypes;
