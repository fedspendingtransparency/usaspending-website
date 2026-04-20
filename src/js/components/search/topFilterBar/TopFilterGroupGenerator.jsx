/**
 * TopFilterGroupGenerator.jsx
 * Created by Kevin Li 1/24/17
 */

import React, { memo } from 'react';
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
import TASFilterGroup from './filterGroups/TASFilterGroup';
import DefCodesFilterGroup from "./filterGroups/DefCodesFilterGroup";

const propTypes = { code: PropTypes.string, name: PropTypes.string, resultsView: PropTypes.bool };

// eslint-disable-next-line prefer-arrow-callback
const TopFilterGroupGenerator = memo(function TopFilterGroupGenerator({
    code = '', name, resultsView
}) {
    const groupKey = `top-filter-group-${code}`;

    switch (code) {
        case 'keyword':
            return <KeywordFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'awardType':
            return <AwardTypeFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'selectedLocations':
            return (
                <LocationFilterGroup
                    resultsView={resultsView}
                    name={name}
                    code={code}
                    key={groupKey} />
            );
        case 'selectedFundingAgencies':
            return (
                <AgencyFilterGroup
                    resultsView={resultsView}
                    name={name}
                    code={code}
                    key={groupKey} />);
        case 'selectedAwardingAgencies':
            return (
                <AgencyFilterGroup
                    resultsView={resultsView}
                    name={name}
                    code={code}
                    key={groupKey} />
            );
        case 'selectedRecipients':
            return <RecipientFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'selectedRecipientLocations':
            return (
                <LocationFilterGroup
                    resultsView={resultsView}
                    name={name}
                    code={code}
                    key={groupKey} />
            );
        case 'treasuryAccounts':
            return <TASFilterGroup resultsView={resultsView} name={name} key={groupKey} />;
        case 'recipientType':
            return (
                <RecipientTypeFilterGroup
                    resultsView={resultsView}
                    name={name}
                    key={groupKey} />
            );
        case 'selectedAwardIDs':
            return (<AwardIDFilterGroup resultsView={resultsView} name={name} key={groupKey} />

            );
        case 'awardAmounts':
            return (
                <AwardAmountFilterGroup
                    resultsView={resultsView}
                    name={name}
                    key={groupKey} />
            );
        case 'selectedCFDA':
            return (<CFDAFilterGroup resultsView={resultsView} name={name} key={groupKey} />);
        case 'selectedNAICS':
            return (<NAICSFilterGroup resultsView={resultsView} name={name} key={groupKey} />);
        case 'selectedPSC':
            return (<PSCFilterGroup resultsView={resultsView} name={name} key={groupKey} />);
        case 'pricingType':
            return (
                <PricingTypeFilterGroup
                    resultsView={resultsView}
                    name={name}
                    key={groupKey} />);
        case 'setAside':
            return (<SetAsideFilterGroup resultsView={resultsView} name={name} key={groupKey} />

            );
        case 'extentCompeted':
            return (
                <ExtentCompetedFilterGroup
                    resultsView={resultsView}
                    name={name}
                    key={groupKey} />);
        case 'defCodes':
            return (<DefCodesFilterGroup resultsView={resultsView} name={name} key={groupKey} />);
        default:
            return null;
    }
});

TopFilterGroupGenerator.propTypes = propTypes;
export default TopFilterGroupGenerator;
