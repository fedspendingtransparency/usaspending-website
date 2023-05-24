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
                        The download/transactions and download/awards endpoints both support the columns attribute which allow API users to select columns to include in their download package.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadScope.propTypes = propTypes;
