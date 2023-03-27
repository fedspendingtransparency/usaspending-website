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
                        <p>Dive into federal agency spending with our Agency Profiles. Find details on agencies' total obligations and outlays to understand how each agency spends its funding.</p>
                        <p>P.L. 117-40 requires the posting of a list of all Executive Branch agencies that have submitted Congressional Justifications which include: the date that those materials were submitted to Congress, the date those materials were posted on a public website, and the website address (URL) of those materials. <a href="/data/cj_list.csv" download="cj_list.csv">Click here</a> to download a machine-readable version of this list. Note that this list contains agencies that do not currently submit data to USAspending.gov and therefore do not appear elsewhere on the website.</p>
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
