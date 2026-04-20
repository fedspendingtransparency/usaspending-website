/**
 * AgencyLandingContent.jsx
 * Created by Lizzie Salita 8/02/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';

import LandingSearchBar from 'components/sharedComponents/LandingSearchBar';
import AgencyLandingResultsSection from './AgencyLandingResultsSection';
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

const propTypes = {
    resultsText: PropTypes.string,
    results: PropTypes.array,
    agencySearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    columns: PropTypes.array,
    setAgencySearchString: PropTypes.func
};

const AgencyLandingContent = ({
    resultsText,
    results,
    agencySearchString,
    inFlight,
    columns,
    setAgencySearchString
}) => {
    /* eslint-disable max-len */
    const subtitle = (<>
        <p>Dive into federal agency spending with our Agency Profiles. Find details on agencies' total obligations and outlays to understand how each agency spends its funding.</p>
        <p>
            P.L. 117-40 requires the posting of a list of all Executive Branch agencies that have submitted Congressional Justifications which include: the date that those materials were submitted to Congress, the date those materials were posted on a public website, and the website address (URL) of those materials.
            <a className="usa-bold-link" href="/data/cj_list.csv" download="cj_list.csv"> Click here </a>
            to download a machine-readable version of this list. Note that this list contains agencies that do not currently submit data to USAspending.gov and therefore do not appear elsewhere on the website.
        </p>
    </>);
    /* eslint-enable max-len */

    return (
        <FlexGridRow className="content__row landing-page">
            <H2PageHeader title="Find an Agency Profile." subtitle={subtitle} />
            <FlexGridCol width={12} className="content__col" >
                <LandingSearchBar
                    onSubmit={setAgencySearchString}
                    placeholder="Search by Agency Name or Abbreviation"
                    buttonAltText="Search Agencies" />
                <div className="results-count">
                    {resultsText}
                </div>
                <AgencyLandingResultsSection
                    columns={columns}
                    results={results}
                    inFlight={inFlight}
                    agencySearchString={agencySearchString} />
            </FlexGridCol>
        </FlexGridRow>
    );
};

AgencyLandingContent.propTypes = propTypes;
export default AgencyLandingContent;
