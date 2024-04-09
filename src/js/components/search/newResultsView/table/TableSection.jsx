/**
 * table.jsx
 */


import React from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmContent,
    TempPlaceholderComponent
} from "../TempPlaceholderComponents";
import AwardTable from "./AwardTable";

const TableSection = ({ awardTableHasLoaded }) => {
    const dummyWrapperProps = {
        sectionTitle: 'Prime Award Results',
        dsmContent: <DsmContent
            heading={"Prime Award Results:  What's included in this view of the data?"}
            description="Use the map below to break down spending by state, county, or congressional district." />
    };

    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}>
            <div id="search-page-component" className="award">
                {!awardTableHasLoaded ?
                    <TempPlaceholderComponent />
                    :
                    <AwardTable />
                }
            </div>
        </SearchSectionWrapper>
    );
};

export default TableSection;
