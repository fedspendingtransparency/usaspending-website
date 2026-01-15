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

export const topFilterGroupGenerator = (config = {
    filter: {
        code: ''
    },
    data: null
}) => {
    const groupKey = `top-filter-group-${config.filter.code}`;

    switch (config.filter.code) {
        case 'keyword':
            return <KeywordFilterGroup key={groupKey} {...config} />;
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup key={groupKey} {...config} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup key={groupKey} {...config} />;
        case 'newAwardsOnly':
            return <NewAwardsOnlyFilterGroup key={groupKey} {...config} />;
        case 'awardType':
            return <AwardTypeFilterGroup key={groupKey} {...config} />;
        case 'selectedLocations':
            return (<LocationFilterGroup
                key={groupKey}
                {...config}
                toggle="locationDomesticForeign" />);
        case 'selectedFundingAgencies':
            return <AgencyFilterGroup key={groupKey} {...config} />;
        case 'selectedAwardingAgencies':
            return <AgencyFilterGroup key={groupKey} {...config} />;
        case 'selectedRecipients':
            return <RecipientFilterGroup key={groupKey} {...config} />;
        case 'selectedRecipientLocations':
            return (<LocationFilterGroup
                key={groupKey}
                {...config}
                toggle="recipientDomesticForeign" />);
        case 'treasuryAccounts':
            return <ProgramSourceFilterGroup key={groupKey} {...config} />;
        case 'recipientType':
            return <RecipientTypeFilterGroup key={groupKey} {...config} />;
        case 'selectedAwardIDs':
            return (<AwardIDFilterGroup key={groupKey} {...config} />);
        case 'awardAmounts':
            return (<AwardAmountFilterGroup key={groupKey} {...config} />);
        case 'selectedCFDA':
            return (<CFDAFilterGroup key={groupKey} {...config} />);
        case 'selectedNAICS':
            return (<NAICSFilterGroup key={groupKey} {...config} />);
        case 'selectedPSC':
            return (<PSCFilterGroup key={groupKey} {...config} />);
        case 'pricingType':
            return (<PricingTypeFilterGroup key={groupKey} {...config} />);
        case 'setAside':
            return (<SetAsideFilterGroup key={groupKey} {...config} />);
        case 'extentCompeted':
            return (<ExtentCompetedFilterGroup key={groupKey} {...config} />);
        case 'defCodes':
            return (<DefCodesFilterGroup key={groupKey} {...config} />);
        default:
            return null;
    }
};
