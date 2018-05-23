/**
 * AgencyLandingContent.jsx
 * Created by Lizzie Salita 8/02/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import AgencyLandingSearchBar from './AgencyLandingSearchBar';
import AgencyLandingResultsSection from './AgencyLandingResultsSection';

const propTypes = {
    resultsText: PropTypes.string,
    results: PropTypes.array,
    agencySearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    columns: PropTypes.array,
    setAgencySearchString: PropTypes.func
};

export default class AgencyLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2
                        className="landing-page__title">
                        Find an Agency Profile.
                    </h2>
                    <h3
                        className="landing-page__subtitle">
                        Understand the current spending of agencies in our agency profiles.
                    </h3>
                    <p>
                        Featuring information on each agency&apos;s total obligations, along with obligation breakdowns by Object Class and Federal Accounts, our Agency Profiles help you understand how each agency spends its funding.
                    </p>
                </div>
                <AgencyLandingSearchBar
                    setSearchString={this.props.setAgencySearchString}
                    placeholder="Start typing to find an agency..."
                    button="Search Agencies" />
                <div className="results-count">
                    {this.props.resultsText}
                </div>
                <AgencyLandingResultsSection
                    columns={this.props.columns}
                    results={this.props.results}
                    inFlight={this.props.inFlight}
                    agencySearchString={this.props.agencySearchString} />
            </div>
        );
    }
}

AgencyLandingContent.propTypes = propTypes;
