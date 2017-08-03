/**
 * AgencyLandingContent.jsx
 * Created by Lizzie Salita 8/02/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import AgencyLandingSearchBarContainer from 'containers/agencyLanding/AgencyLandingSearchBarContainer';
import AgencyLandingResultsSection from './AgencyLandingResultsSection';

const propTypes = {
    resultsText: PropTypes.string,
    results: PropTypes.array,
    searchHash: PropTypes.number,
    agencySearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    columns: PropTypes.array,
    setAgencySearchString: PropTypes.func,
    setNoResults: PropTypes.func,
    agencies: PropTypes.instanceOf(Immutable.OrderedSet),
    agenciesOrder: PropTypes.object,
    setAgencies: PropTypes.func,
    meta: PropTypes.object,
    autocompleteAgencies: PropTypes.array
};

export default class AgencyLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page-content">
                <div className="landing-page-overview">
                    <h3>Find an Agency Profile.</h3>
                    <h6>Understand the current spending of agencies in our agency profiles.</h6>
                    <p>These include the 15 executive departments whose leaders sit on the
                        President&#39;s Cabinet, as well as small independent boards and
                        commissions. They range in size from $700 billion down to less than $200,000.</p>
                </div>
                <div className="landing-page-section">
                    <AgencyLandingSearchBarContainer
                        setAgencySearchString={this.props.setAgencySearchString}
                        setNoResults={this.props.setNoResults} />
                </div>
                <div className="landing-page-section results-count">
                    {this.props.resultsText}
                </div>
                <div className="landing-page-section">
                    <AgencyLandingResultsSection
                        batch={this.props.meta.batch}
                        searchHash={this.props.searchHash}
                        columns={this.props.columns}
                        results={this.props.results}
                        inFlight={this.props.inFlight}
                        agencySearchString={this.props.agencySearchString} />
                </div>
            </div>
        );
    }
}

AgencyLandingContent.propTypes = propTypes;
