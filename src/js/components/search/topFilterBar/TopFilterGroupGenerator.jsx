/**
 * TopFilterGroupGenerator.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';

import TimePeriodFYFilterGroup from './filterGroups/TimePeriodFYFilterGroup';
import TimePeriodDRFilterGroup from './filterGroups/TimePeriodDRFilterGroup';
import AwardTypeFilterGroup from './filterGroups/AwardTypeFilterGroup';
import LocationFilterGroup from './filterGroups/LocationFilterGroup';
import AgencyFilterGroup from './filterGroups/AgencyFilterGroup';
import RecipientFilterGroup from './filterGroups/RecipientFilterGroup';
import RecipientTypeFilterGroup from './filterGroups/RecipientTypeFilterGroup';
import KeywordFilterGroup from './filterGroups/KeywordFilterGroup';
import AwardIDFilterGroup from './filterGroups/AwardIDFilterGroup';
import AwardAmountFilterGroup from './filterGroups/AwardAmountFilterGroup';
import CFDAFilterGroup from './filterGroups/CFDAFilterGroup';
import NAICSFilterGroup from './filterGroups/NAICSFilterGroup';
import PSCFilterGroup from './filterGroups/PSCFilterGroup';
import PricingTypeFilterGroup from './filterGroups/PricingTypeFilterGroup';
import SetAsideFilterGroup from './filterGroups/SetAsideFilterGroup';
import ExtentCompetedFilterGroup from './filterGroups/ExtentCompetedFilterGroup';
import ProgramSourceFilterGroup from './filterGroups/ProgramSourceFilterGroup';
import DefCodesFilterGroup from "./filterGroups/DefCodesFilterGroup";
import NewAwardsOnlyFilterGroup from "./filterGroups/NewAwardsOnlyFilterGroup";

const topFilterGroupGenerator = (filter = { code: "" }) => {
    const groupKey = `top-filter-group-${filter.code}`;

    switch (filter.code) {
        case 'keyword':
            return <KeywordFilterGroup key={groupKey} filter={filter} />;
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup key={groupKey} filter={filter} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup key={groupKey} filter={filter} />;
        case 'newAwardsOnly':
            return <NewAwardsOnlyFilterGroup key={groupKey} filter={filter} />;
        case 'awardType':
            return <AwardTypeFilterGroup key={groupKey} filter={filter} />;
        case 'selectedLocations':
            return (<LocationFilterGroup filter={filter} key={groupKey} />);
        case 'selectedFundingAgencies':
            return <AgencyFilterGroup key={groupKey} filter={filter} />;
        case 'selectedAwardingAgencies':
            return <AgencyFilterGroup key={groupKey} filter={filter} />;
        case 'selectedRecipients':
            return <RecipientFilterGroup key={groupKey} filter={filter} />;
        case 'selectedRecipientLocations':
            return (<LocationFilterGroup filter={filter} key={groupKey} />);
        case 'treasuryAccounts':
            return <ProgramSourceFilterGroup key={groupKey} filter={filter} />;
        case 'recipientType':
            return <RecipientTypeFilterGroup key={groupKey} filter={filter} />;
        case 'selectedAwardIDs':
            return (<AwardIDFilterGroup key={groupKey} filter={filter} />);
        case 'awardAmounts':
            return (<AwardAmountFilterGroup key={groupKey} filter={filter} />);
        case 'selectedCFDA':
            return (<CFDAFilterGroup key={groupKey} filter={filter} />);
        case 'selectedNAICS':
            return (<NAICSFilterGroup key={groupKey} filter={filter} />);
        case 'selectedPSC':
            return (<PSCFilterGroup key={groupKey} filter={filter} />);
        case 'pricingType':
            return (<PricingTypeFilterGroup key={groupKey} filter={filter} />);
        case 'setAside':
            return (<SetAsideFilterGroup key={groupKey} filter={filter} />);
        case 'extentCompeted':
            return (<ExtentCompetedFilterGroup key={groupKey} filter={filter} />);
        case 'defCodes':
            return (<DefCodesFilterGroup key={groupKey} filter={filter} />);
        default:
            return null;
    }
};

export default topFilterGroupGenerator;
