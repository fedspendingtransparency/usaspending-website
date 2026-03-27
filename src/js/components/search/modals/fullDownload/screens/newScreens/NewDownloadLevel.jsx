/* eslint-disable max-len */
/**
 * NewDownloadLevel.jsx
 * Created by Nick Torres 3/4/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from 'data-transparency-ui';
import DownloadOption from './DownloadOption';
import DownloadWarning from './DownloadWarning';

const propTypes = {
    goToStep: PropTypes.func,
    toggleDownloadType: PropTypes.func,
    hideModal: PropTypes.func
};
const ITEM_MAX = 500000;
const NewDownloadLevel = ({
    goToStep,
    toggleDownloadType,
    hideModal
}) => {
    // may need for follow up ticket
    const clickedAward = () => {
        toggleDownloadType('awards');
    };
    const clickedTransaction = () => {
        toggleDownloadType('transactions');
    };
    const clickedSubawards = () => {
        toggleDownloadType('subawards');
    };
    // these counts are faked until we get a proper api call in place
    const awardCount = "1";
    const transactionCount = "500,001";
    const subawardCount = "1";
    let message = null;
    if (parseInt(awardCount.replace(/,/g, ''), 10) > ITEM_MAX || parseInt(transactionCount.replace(/,/g, ''), 10) > ITEM_MAX || parseInt(subawardCount.replace(/,/g, ''), 10) > ITEM_MAX) {
        message = <span className="download-warning-text">One or more options is not available for download because it exceeds the 500,000 record download limit. Please return to your search results and narrow them down by selecting additional filters; or try downloading the data by selecting new options from our <Link target="_blank" rel="noopener noreferrer" to="/download_center/custom_award_data">Custom Award Data</Link> page.</span>;
    }
    return (
        <div className="download-level-screen">
            <div className="main-title">
                <h3>Select one or more of the options below; each option needs to be under 500,000 records.</h3>
            </div>
            {message && <DownloadWarning message={message} />}
            <div className="level-options-container">
                <DownloadOption
                    title="Awards"
                    copy="An award is money the federal government has promised to pay a recipient. This data provides summary-level information about the current status of an award in a single point in time."
                    count={awardCount}
                    toggleOption={clickedAward} />
                <DownloadOption
                    title="Transactions"
                    copy="A transaction can be the initial contract, grant, loan, or insurance award or any amendment or modification to that award. This data provides a time-based analysis that captures all monetary exchanges."
                    count={transactionCount}
                    toggleOption={clickedTransaction} />
                <DownloadOption
                    title="Sub-awards"
                    copy="A subaward refers to records of an agreement that a prime recipient makes with another entity to perform a portion of their award. This data provides a view of how money is exchanged between entities. "
                    count={subawardCount}
                    toggleOption={clickedSubawards} />
            </div>

            <div className="level-options-note">
                <span className="level-options-bold">Note:</span> The <Link target="_blank" rel="noopener noreferrer" to="https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/transactions.md">Transaction</Link> and <Link target="_blank" rel="noopener noreferrer" to="https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/awards.md">Award</Link> downloads endpoints both support the columns attribute which allow API users to select columns to include in their download package.
            </div>

            <div className="download-button-container">
                <Button
                    className="button-option"
                    backgroundColor="light"
                    buttonSize="sm"
                    buttonTitle="Cancel"
                    onClick={hideModal}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            hideModal();
                        }
                    }}
                    buttonType="text"
                    copy="Cancel" />
                <Button
                    backgroundColor="light"
                    buttonSize="sm"
                    buttonTitle="Next"
                    buttonType="primary"
                    copy="Next"
                    onClick={() => goToStep(2, true)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            goToStep(2, true);
                        }
                    }} />
            </div>
        </div>
    );
};

NewDownloadLevel.propTypes = propTypes;
export default NewDownloadLevel;
