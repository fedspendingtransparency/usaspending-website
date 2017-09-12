/**
 * DownloadLevel.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    goToStep: PropTypes.func,
    setDownloadType: PropTypes.func
};

export default class DownloadLevel extends React.Component {
    constructor(props) {
        super(props);

        this.clickedAward = this.clickedAward.bind(this);
        this.clickedTransaction = this.clickedTransaction.bind(this);
    }

    clickedAward() {
        this.props.setDownloadType('awards');
        this.props.goToStep(2, true);
    }

    clickedTransaction() {
        this.props.setDownloadType('transactions');
        this.props.goToStep(2, true);
    }

    render() {
        return (
            <div className="download-level-screen">
                <div className="main-title">
                    <h2>Which level of data do you need?</h2>
                </div>

                <div className="level-options-container">
                    <div className="level-option">
                        <button
                            className="level-button"
                            aria-label="Award"
                            title="Award"
                            onClick={this.clickedAward}>
                            Award
                        </button>
                        <div className="level-description">
                            Collects and combines all transactions into high-level summaries of each award.
                        </div>
                    </div>

                    <div className="level-option">
                        <button
                            className="level-button"
                            aria-label="Transaction"
                            title="Transaction"
                            onClick={this.clickedTransaction}>
                            Transaction
                        </button>
                        <div className="level-description">
                            Includes all details of each award (known as modifications or amendments).
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadLevel.propTypes = propTypes;
