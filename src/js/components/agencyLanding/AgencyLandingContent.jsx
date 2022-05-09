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
                        <p>Featuring information on each agency&rsquo;s total obligations, along with obligation breakdowns by Object Class and Federal Accounts, our Agency Profiles help you understand how each agency spends its funding.</p>
                        <p>P.L. 117-103 requires the posting of a list of agencies that have submitted Congressional Justifications and the dates that those were submitted to Congress. <a href="/data/cj_list.csv" download="cj_list.csv">Click here</a> to download a machine-readable version of this list. Note that this list contains agencies that do not currently submit data to USAspending.gov and therefore do not appear elsewhere on the website.</p>
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
