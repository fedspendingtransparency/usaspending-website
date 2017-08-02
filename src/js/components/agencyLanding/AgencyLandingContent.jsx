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
            <div className="agency-landing-container">
                <div className="agency-landing-section">
                    <div className="agency-landing-search">
                        <AgencyLandingSearchBarContainer
                            setAgencySearchString={this.props.setAgencySearchString}
                            setNoResults={this.props.setNoResults} />
                    </div>
                </div>
                <div className="agency-landing-section results-count">
                    {this.props.resultsText}
                </div>
                <div className="agency-landing-section">
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
