/**
 * NewDownloadLevel.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from 'data-transparency-ui';
import DownloadOption from './DownloadOption';
import DownloadWarning from './DownloadWarning';

const propTypes = {
    goToStep: PropTypes.func,
    setDownloadType: PropTypes.func,
    hideModal: PropTypes.func
};
const ITEM_MAX = 500000;
const NewDownloadLevel = (props) => {
    // may need for follow up ticket
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
    // these counts are faked until we get a proper api call in place
    const awardCount = "1";
    const transactionCount = "500,001";
    const subawardCount = "1";
    let message = null;
    console.debug(parseInt(awardCount.replace(/,/g, ''), 10), parseInt(transactionCount.replace(/,/g, ''), 10), parseInt(subawardCount.replace(/,/g, ''), 10), ITEM_MAX);
    if (parseInt(awardCount.replace(/,/g, ''), 10) > ITEM_MAX || parseInt(transactionCount.replace(/,/g, ''), 10) > ITEM_MAX || parseInt(subawardCount.replace(/,/g, ''), 10) > ITEM_MAX) {
        console.debug("message set");
        message = <span className="download-warning-text">One or more options is not available for download because it exceeds the 500,000 record download limit. Please return to your search results and narrow them down by selecting additional filters; or try downloading the data by selecting new options from our <Link target="_blank" rel="noopener noreferrer" to="/download_center/custom_award_data">Custom Award Data</Link> page.</span>;
    }
    return (
        <div className="download-level-screen">
            <div className="main-title">
                <h2>Select one or more of the options below; each option needs to be under 500,000 records.</h2>
            </div>
            {message && <DownloadWarning message={message} />}
            <div className="level-options-container">
                <DownloadOption
                    title="Awards"
                    copy="Download award data. An award is money the federal government has promised to pay a recipient. This data provides summary-level information about the current status of an award in a single point in time."
                    count={awardCount} />
                <DownloadOption
                    title="Transactions"
                    copy="Download transaction data. A transaction can be the initial contract, grant, loan, or insurance award or any amendment or modification to that award. This data provides a time-based analysis that captures all monetary exchanges."
                    count={transactionCount} />
                <DownloadOption
                    title="Sub-awards"
                    copy="Download subaward data. A subaward refers to records of an agreement that a prime recipient makes with another entity to perform a portion of their award. This data provides a view of how money is exchanged between entities. "
                    count={subawardCount} />
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
                    onClick={props.hideModal}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            props.hideModal();
                        }
                    }}
                    buttonType="text"
                    copy="Cancel" />
                <Button
                    backgroundColor="light"
                    buttonSize="sm"
                    buttonTitle="Next"
                    buttonType="primary"
                    copy="Next" />
            </div>
        </div>
    );
};

NewDownloadLevel.propTypes = propTypes;
export default NewDownloadLevel;
