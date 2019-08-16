/**
  * FederalAccountsSummary.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TODO - Lizzie: import error and loading messages

const propTypes = {
    summary: PropTypes.object,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    category: PropTypes.string,
    jumpToFederalAccountsHistory: PropTypes.func
};

export default class FederalAccountsSummary extends React.Component {
    generateTable() {
        let table;
        if (this.props.inFlight) {
            table = (<div>Loading...</div>);
        }
        else if (this.props.error) {
            table = (<div>Error</div>);
        }
        else {
            const summary = this.props.summary;
            table = (
                <div className="award-funding-summary__table">
                    <div className="award-funding-summary__data">
                        <span>Total Funding Obligated</span>
                        <span>
                            {summary.obligatedAmount}
                        </span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Awarding Agencies</span>
                        <span>{summary.awardingAgencyCount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Funding Agencies</span>
                        <span>{summary.fundingAgencyCount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Federal Accounts</span>
                        <span>{summary.federalAccountCount}</span>
                    </div>
                </div>
            );
        }
        return table;
    }
    render() {
        const category = this.props.category === 'idv' ? 'IDV' : startCase(this.props.category);
        return (
            <div>
                <div className="federal-accounts-summary__section">
                    <h4>Summary of Federal Accounts used by this {category}</h4>
                    {this.generateTable()}
                </div>
                <button onClick={this.props.jumpToFederalAccountsHistory} className="award-viz__button">
                    <div className="award-viz__link-icon">
                        <FontAwesomeIcon icon="table" />
                    </div>
                    <div className="award-viz__link-text">View federal funding submissions</div>
                </button>
            </div>
        );
    }
}

FederalAccountsSummary.propTypes = propTypes;
