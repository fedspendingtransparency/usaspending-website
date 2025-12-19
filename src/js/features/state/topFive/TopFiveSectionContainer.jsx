import React from 'react';
import useAgencySlugs from "hooks/useAgencySlugs";
import TopFiveSection from "./TopFiveSection";

const TopFiveSectionContainer = () => {
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
    const agencyData = { agencySlugs, slugsLoading, slugsError };

    return (
        <TopFiveSection agencyData={agencyData} />
    );
};

export default TopFiveSectionContainer;
