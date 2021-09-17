/**
 * AgencyLandingContent.jsx
 * Created by Lizzie Salita 8/02/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import LandingSearchBar from 'components/sharedComponents/LandingSearchBar';
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
                    <div className="landing-page__description">
                        Featuring information on each agency&rsquo;s total obligations, along with obligation breakdowns by Object Class and Federal Accounts, our Agency Profiles help you understand how each agency spends its funding.
                    </div>
                </div>
                <LandingSearchBar
                    onSubmit={this.props.setAgencySearchString}
                    placeholder="Search by Agency Name or Abbreviation"
                    buttonAltText="Search Agencies" />
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
