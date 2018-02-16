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
                    <h3>Find an Agency Profile.</h3>
                    <h6>Understand the current spending of agencies in our agency profiles.</h6>
                    <p>These include the 15 executive departments whose leaders sit on the
                        President&#39;s Cabinet, as well as small independent boards and
                        commissions. They range in size from $700 billion down to less than $200,000.
                    </p>
                </div>
                <AgencyLandingSearchBar
                    setAgencySearchString={this.props.setAgencySearchString} />
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
