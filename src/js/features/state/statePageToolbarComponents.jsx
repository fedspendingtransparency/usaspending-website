import React from "react";
import { FiscalYearPicker, ShareIcon } from "data-transparency-ui";

import { getBaseUrl, handleShareOptionClick } from "helpers/socialShare";
import {
    currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll
} from "helpers/fiscalYearHelper";

const statePageToolbarComponents = (stateProfile, handleFyChange, handleShareDispatch) => {
    const backgroundColor = "#1a4480";

    const slug = `state/${stateProfile.id}/${stateProfile.fy}`;

    const emailArgs = {
        subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
        body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    return ([
        <FiscalYearPicker
            backgroundColor={backgroundColor}
            selectedFy={stateProfile?.fy}
            handleFyChange={handleFyChange}
            options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())}
            key="state-page__fy-picker" />,
        <ShareIcon
            onShareOptionClick={handleShare}
            url={getBaseUrl(slug)}
            key="state-page__share-icon" />
    ]);
};

export default statePageToolbarComponents;
