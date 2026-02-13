/**
 * TopFilterGroupGenerator.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from "prop-types";

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

const propTypes = { code: PropTypes.string, name: PropTypes.string };

const topFilterGroupGenerator = ({ code = '', name }) => {
    const groupKey = `top-filter-group-${code}`;

    switch (code) {
        case 'keyword':
            return <KeywordFilterGroup name={name} key={groupKey} />;
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup name={name} key={groupKey} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup name={name} key={groupKey} />;
        case 'newAwardsOnly':
            return <NewAwardsOnlyFilterGroup name={name} key={groupKey} />;
        case 'awardType':
            return <AwardTypeFilterGroup name={name} key={groupKey} />;
        case 'selectedLocations':
            return (<LocationFilterGroup name={name} code={code} key={groupKey} />);
        case 'selectedFundingAgencies':
            return <AgencyFilterGroup name={name} code={code} key={groupKey} />;
        case 'selectedAwardingAgencies':
            return <AgencyFilterGroup name={name} code={code} key={groupKey} />;
        case 'selectedRecipients':
            return <RecipientFilterGroup name={name} key={groupKey} />;
        case 'selectedRecipientLocations':
            return (<LocationFilterGroup name={name} code={code} key={groupKey} />);
        case 'treasuryAccounts':
            return <ProgramSourceFilterGroup name={name} key={groupKey} />;
        case 'recipientType':
            return <RecipientTypeFilterGroup name={name} key={groupKey} />;
        case 'selectedAwardIDs':
            return (<AwardIDFilterGroup name={name} key={groupKey} />);
        case 'awardAmounts':
            return (<AwardAmountFilterGroup name={name} key={groupKey} />);
        case 'selectedCFDA':
            return (<CFDAFilterGroup name={name} key={groupKey} />);
        case 'selectedNAICS':
            return (<NAICSFilterGroup name={name} key={groupKey} />);
        case 'selectedPSC':
            return (<PSCFilterGroup name={name} key={groupKey} />);
        case 'pricingType':
            return (<PricingTypeFilterGroup name={name} key={groupKey} />);
        case 'setAside':
            return (<SetAsideFilterGroup name={name} key={groupKey} />);
        case 'extentCompeted':
            return (<ExtentCompetedFilterGroup name={name} key={groupKey} />);
        case 'defCodes':
            return (<DefCodesFilterGroup name={name} key={groupKey} />);
        default:
            return null;
    }
};

topFilterGroupGenerator.propTypes = propTypes;
export default topFilterGroupGenerator;
