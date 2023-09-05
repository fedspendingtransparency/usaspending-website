import React, { useState } from "react";
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";

import SearchResults from './search/SearchResults';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';

require("pages/search/searchPage.scss");

const tempSearchPage = () => {
    const [filterCount, setFilterCount] = useState(2);
    const tempFilterObj =
        {
            keyword: {},
            timePeriodType: "fy",
            timePeriodFY: ["2023"],
            timePeriodStart: null,
            timePeriodEnd: null,
            newAwardsOnly: false,
            selectedLocations: {},
            locationDomesticForeign: "all",
            selectedFundingAgencies: {},
            selectedAwardingAgencies: {
                "95_toptier": {
                    id: 95,
                    toptier_flag: true,
                    toptier_agency: {
                        toptier_code: "012",
                        abbreviation: "USDA",
                        name: "Department of Agriculture"
                    },
                    subtier_agency: {
                        abbreviation: "USDA",
                        name: "Department of Agriculture"
                    },
                    agencyType: "toptier"
                }
            },
            selectedRecipients: [],
            recipientDomesticForeign: "all",
            recipientType: [],
            selectedRecipientLocations: {},
            awardType: [],
            selectedAwardIDs: {},
            awardAmounts: {},
            selectedCFDA: {},
            naicsCodes: {
                require: [],
                exclude: [],
                counts: []
            },
            pscCodes: {
                require: [],
                exclude: [],
                counts: []
            },
            defCodes: {
                require: [],
                exclude: [],
                counts: []
            },
            pricingType: [],
            setAside: [],
            extentCompeted: [],
            treasuryAccounts: {},
            tasCodes: {
                require: [],
                exclude: [],
                counts: []
            }
        };

    const updateFilterCount = (count) => {
        setFilterCount(count);
    };

    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    {/* <SearchResults */}
                    {/*     filters={tempFilterObj} */}
                    {/*     filterCount={filterCount} */}
                    {/*     updateFilterCount={updateFilterCount} */}
                    {/*     requestsComplete /> */}
                    <ResultsTableContainer />
                    <TimeVisualizationSectionContainer />
                    <GeoVisualizationSectionContainer className="award-search__geo-toggle" />
                    <TimeVisualizationSectionContainer />
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default tempSearchPage;
