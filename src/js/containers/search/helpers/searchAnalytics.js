/**
 * searchAnalytics.js
 * Created by Kevin Li 2/2/18
 */

import { Set } from 'immutable';
import { awardTypeCodes } from 'dataMapping/search/awardType';
import { recipientTypes, groupLabels } from 'dataMapping/search/recipientType';
import {
    pricingTypeDefinitions,
    setAsideDefinitions,
    extentCompetedDefinitions
} from 'dataMapping/search/contractFields';

import Analytics from 'helpers/analytics/Analytics';

const eventCategory = 'Applied Search Filter';

const convertDateRange = (range) => {
    if (range.length !== 2) {
        // this must be an array of length 2
        return null;
    }
    else if (!range[0] && !range[1]) {
        // no start or end dates are set
        return null;
    }

    const startDate = range[0] || '...';
    const endDate = range[1] || 'present';

    return [{
        action: 'Time Period - Date Range',
        label: `${startDate} to ${endDate}`
    }];
};

const parseAgency = (agency) => {
    const toptier = agency.toptier_agency;
    const subtier = agency.subtier_agency;
    const office = agency.office_agency;
    if (agency.agencyType === 'toptier') {
        if (toptier.abbreviation) {
            return `${toptier.name} (${toptier.abbreviation})/${toptier.cgac_code}`;
        }
        return `${toptier.name}/${toptier.cgac_code}`;
    }
    else if (agency.agencyType === 'subtier') {
        if (subtier.abbreviation) {
            return `${subtier.name} (${subtier.abbreviation})/${subtier.subtier_code} - ${toptier.name}/${toptier.cgac_code}`;
        }
        return `${subtier.name}/${subtier.subtier_code} - ${toptier.name}/${toptier.cgac_code}`;
    }
    else if (agency.agencyType === 'office') {
        return `${office.name}/${office.aac_code} - ${toptier.name}/${toptier.cgac_code}`;
    }
    return null;
};


const convertReducibleValue = (value, type, parser) => (
    value.reduce((events, item) => {
        events.push({
            action: type,
            label: (parser && parser(item)) || item
        });
        return events;
    }, [])
);

const convertTimePeriod = (value) => {
    if (Set.isSet(value)) {
        return convertReducibleValue(
            value,
            'Time Period - Fiscal Year'
        );
    }
    else if (Array.isArray(value)) {
        return convertDateRange(value);
    }
    return null;
};

const convertAgency = (agencies, type) => (
    convertReducibleValue(
        agencies,
        type,
        parseAgency
    )
);


const convertLocation = (locations, type) => (
    convertReducibleValue(
        locations,
        type,
        (location) => `${location.display.entity} - ${location.display.standalone}`
    )
);

const convertFilter = (type, value) => {
    switch (type) {
        case 'timePeriod':
            return convertTimePeriod(value);
        case 'awardType':
            return convertReducibleValue(
                value,
                'Award Type',
                (item) => awardTypeCodes[item] || item
            );
        case 'selectedAwardingAgencies':
            return convertAgency(value, 'Awarding Agency');
        case 'selectedFundingAgencies':
            return convertAgency(value, 'Funding Agency');
        case 'selectedLocations':
            return convertLocation(value, 'Place of Performance');
        case 'selectedRecipientLocations':
            return convertLocation(value, 'Recipient Location');
        case 'selectedRecipients':
            return convertReducibleValue(value, 'Recipient');
        case 'recipientType':
            return convertReducibleValue(
                value,
                'Recipient Type',
                (item) => recipientTypes[item] || groupLabels[item] || item
            );
        case 'awardAmounts':
            return convertReducibleValue(
                value,
                'Award Amount',
                (amount) => `${amount[0]} - ${amount[1]}`
            );
        case 'selectedAwardIDs':
            return convertReducibleValue(value, 'Award ID');
        case 'selectedCFDA':
            return convertReducibleValue(
                value,
                'CFDA Program',
                (cfda) => `${cfda.program_number} - ${cfda.program_title}`
            );
        case 'selectedNAICS':
            return convertReducibleValue(
                value,
                'NAICS Code',
                (naics) => `${naics.naics} - ${naics.naics_description}`
            );
        case 'selectedPSC':
            return convertReducibleValue(
                value,
                'Product/Service Code (PSC)',
                (psc) => `${psc.product_or_service_code} - ${psc.psc_description}`
            );
        case 'pricingType':
            return convertReducibleValue(
                value,
                'Type of Contract Pricing',
                (pricing) => pricingTypeDefinitions[pricing]
            );
        case 'setAside':
            return convertReducibleValue(
                value,
                'Type of Set Aside',
                (sa) => setAsideDefinitions[sa]
            );
        case 'extentCompeted':
            return convertReducibleValue(
                value,
                'Extent Competed',
                (extent) => extentCompetedDefinitions[extent]
            );
        default:
            return null;
    }
};

const unifyDateFields = (redux) => {
    // clone the filter reducer so we don't accidentally modify it
    const clonedRedux = Object.assign({}, redux);
    // unify the data fields into a single field
    if (clonedRedux.timePeriodType === 'fy') {
        clonedRedux.timePeriod = clonedRedux.timePeriodFY;
    }
    else {
        clonedRedux.timePeriod = [clonedRedux.timePeriodStart, clonedRedux.timePeriodEnd];
    }
    return clonedRedux;
};

export const convertFiltersToAnalyticEvents = (redux) => {
    const filters = unifyDateFields(redux);
    return Object.keys(filters).reduce((converted, type) => {
        const value = filters[type];
        const analyticEvent = convertFilter(type, value);
        if (analyticEvent) {
            return converted.concat(analyticEvent);
        }
        return converted;
    }, []);
};

export const sendAnalyticEvents = (events) => {
    console.time('analytic');
    events.forEach((event) => {
        Analytics.event(Object.assign({}, event, {
            category: eventCategory
        }));
    });
    console.timeEnd('analytic');
};

