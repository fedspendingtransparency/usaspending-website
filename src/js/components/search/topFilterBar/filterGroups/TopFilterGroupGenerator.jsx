/**
 * TopFilterGroupGenerator.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';

import TimePeriodFYFilterGroup from './TimePeriodFYFilterGroup';
import TimePeriodDRFilterGroup from './TimePeriodDRFilterGroup';
import AwardTypeFilterGroup from './AwardTypeFilterGroup';
import LocationFilterGroup from './LocationFilterGroup';
import AgencyFilterGroup from './AgencyFilterGroup';
import RecipientFilterGroup from './RecipientFilterGroup';
import RecipientTypeFilterGroup from './RecipientTypeFilterGroup';
import KeywordFilterGroup from './KeywordFilterGroup';
import AwardIDFilterGroup from './AwardIDFilterGroup';
import AwardAmountFilterGroup from './AwardAmountFilterGroup';
import CFDAFilterGroup from './CFDAFilterGroup';
import NAICSFilterGroup from './NAICSFilterGroup';
import PSCFilterGroup from './PSCFilterGroup';
import PricingTypeFilterGroup from './PricingTypeFilterGroup';
import SetAsideFilterGroup from './SetAsideFilterGroup';
import ExtentCompetedFilterGroup from './ExtentCompetedFilterGroup';
import ProgramSourceFilterGroup from './ProgramSourceFilterGroup';
import DefCodesFilterGroup from "./DefCodesFilterGroup";

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
