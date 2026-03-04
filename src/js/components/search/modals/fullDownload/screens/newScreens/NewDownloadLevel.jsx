/**
 * NewDownloadLevel.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const propTypes = {
    goToStep: PropTypes.func,
    setDownloadType: PropTypes.func
};

const NewDownloadLevel = (props) => {
    const clickedAward = () => {
        props.setDownloadType('awards');
        props.goToStep(2, true);
    };

    const clickedTransaction = () => {
        props.setDownloadType('transactions');
        props.goToStep(2, true);
    };

    const clickedSubawards = () => {
        props.setDownloadType('subawards');
        props.goToStep(2, true);
    };

    return (
        <div className="download-level-screen">
            <div className="main-title">
                <h2>Select one or more of the options below; each option needs to be under 500,000 records.</h2>
            </div>

            <div className="level-options-container">
                <div className="level-option">
                    <button
                        className="level-button"
                        aria-label="Award"
                        title="Award"
                        onClick={clickedAward}>
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
                        onClick={clickedTransaction}>
                        Transaction
                    </button>
                    <div className="level-description">
                        Includes all details of each award (known as modifications or amendments).
                    </div>
                </div>

                <div className="level-option">
                    <button
                        className="level-button"
                        aria-label="Sub-awards"
                        title="Sub-awards"
                        onClick={clickedSubawards}>
                        Sub-awards
                    </button>
                    <div className="level-description">
                        Includes all details of each sub-award (known as modifications or amendments).
                    </div>
                </div>
            </div>

            <div className="level-options-note">
                <span className="level-options-bold">Note:</span> The <Link target="_blank" rel="noopener noreferrer" to="https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/transactions.md">Transaction</Link> and <Link target="_blank" rel="noopener noreferrer" to="https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/awards.md">Award</Link> downloads endpoints both support the columns attribute which allow API users to select columns to include in their download package.
            </div>

            <div className="download-button-container">

            </div>
        </div>
    );
};

NewDownloadLevel.propTypes = propTypes;
export default NewDownloadLevel;
