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
    setDownloadType: PropTypes.func,
    hideModal: PropTypes.func,
    awardsCount: PropTypes.number,
    transactionsCount: PropTypes.number,
    subawardsCount: PropTypes.number
};
const ITEM_MAX = 500000;
const NewDownloadLevel = (props) => {
    // may need for follow up ticket
    // eslint-disable-next-line no-unused-vars
    const clickedAward = () => {
        props.setDownloadType('awards');
        props.goToStep(2, true);
    };
    // eslint-disable-next-line no-unused-vars
    const clickedTransaction = () => {
        props.setDownloadType('transactions');
        props.goToStep(2, true);
    };
    // eslint-disable-next-line no-unused-vars
    const clickedSubawards = () => {
        props.setDownloadType('subawards');
        props.goToStep(2, true);
    };

    let message = null;
    if (props.awardsCount > ITEM_MAX || props.transactionsCount > ITEM_MAX || props.subawardsCount > ITEM_MAX) {
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
                    copy="An award is money the federal government has promised to pay a recipient. This data provides summary-level information about the current status of an award in a single point in time."
                    count={props.awardsCount} />
                <DownloadOption
                    title="Transactions"
                    copy="A transaction can be the initial contract, grant, loan, or insurance award or any amendment or modification to that award. This data provides a time-based analysis that captures all monetary exchanges."
                    count={props.transactionsCount} />
                <DownloadOption
                    title="Sub-awards"
                    copy="A subaward refers to records of an agreement that a prime recipient makes with another entity to perform a portion of their award. This data provides a view of how money is exchanged between entities. "
                    count={props.subawardsCount} />
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
