import { recipientTypeGroups } from 'dataMapping/search/recipientType';
import { awardTypeGroups } from "../../dataMapping/search/awardType";

export const awardTypesData = [
    {
        id: 'award-contracts',
        name: 'Contracts',
        filters: awardTypeGroups.contracts
    },
    {
        id: 'indefinite-delivery-vehicle',
        name: 'Contract IDVs',
        filters: awardTypeGroups.idvs
    },
    {
        id: 'award-grants',
        name: 'Grants',
        filters: awardTypeGroups.grants
    },
    {
        id: 'award-direct-payments',
        name: 'Direct Payments',
        filters: awardTypeGroups.direct_payments
    },
    {
        id: 'award-loans',
        name: 'Loans',
        filters: awardTypeGroups.loans
    },
    {
        id: 'award-other',
        name: 'Other',
        filters: awardTypeGroups.other
    }
];

export const recipientTypeMapping = [
    {
        id: 'recipient-business',
        name: 'General Business',
        filters: recipientTypeGroups.category_business
    },
    {
        id: 'recipient-minority-owned-business',
        name: 'Minority Owned Business',
        filters: recipientTypeGroups.category_minority_owned_business
    },
    {
        id: 'recipient-women-owned-business',
        name: 'Women Owned Business',
        filters: recipientTypeGroups.category_woman_owned_business
    },
    {
        id: 'recipient-veteran-owned-business',
        name: 'Veteran Owned Business',
        filters: recipientTypeGroups.category_veteran_owned_business
    },
    {
        id: 'recipient-special-designations',
        name: 'Special Designations',
        filters: recipientTypeGroups.category_special_designations
    },
    {
        id: 'recipient-nonprofit',
        name: 'Nonprofit',
        filters: recipientTypeGroups.category_nonprofit
    },
    {
        id: 'recipient-higher-education',
        name: 'Higher Education',
        filters: recipientTypeGroups.category_higher_education
    },
    {
        id: 'recipient-government',
        name: 'Government',
        filters: recipientTypeGroups.category_government
    },
    {
        id: 'recipient-individuals',
        name: 'Individuals',
        filters: recipientTypeGroups.category_individuals
    }
];

export const generateCount = (data) => {
    let count = 0;

    data.get('counts').forEach((item) => {
        count += item.count;
    });

    return count;
};

// sub-filters hidden from the user, but  passed to the API when the parent filter is selected
export const excludeIDVB = (awardTypes) => {
    if (awardTypes.has("IDV_B")) {
        return awardTypes.size - 1;
    }

    return awardTypes.size;
};

export const characteristicsCount = ({
    selectedAwardIDs,
    awardAmounts,
    contractAwardType,
    financialAssistanceAwardType,
    naicsCodes,
    pscCodes,
    pricingType,
    setAside,
    extentCompeted,
    selectedCFDA,
    awardDescription
}) => selectedAwardIDs.size +
    awardAmounts.size +
    excludeIDVB(contractAwardType) +
    financialAssistanceAwardType.size +
    generateCount(naicsCodes) +
    generateCount(pscCodes) +
    pricingType.size +
    setAside.size +
    extentCompeted.size +
    selectedCFDA.size +
    (awardDescription ? 1 : 0);

export const sourcesCount = ({
    selectedAwardingAgencies,
    selectedFundingAgencies,
    tasCodes,
    defCode
}) => selectedAwardingAgencies.size +
    selectedFundingAgencies.size +
    generateCount(tasCodes) +
    defCode.size;

export const getFilterCount = (filters) => ({
    Location: filters.selectedLocations.size +
        (filters.locationDomesticForeign === 'foreign' ? 1 : 0) +
        filters.selectedRecipientLocations.size +
        (filters.recipientDomesticForeign === 'foreign' ? 1 : 0),
    'Time Period':
        filters.timePeriodType === 'dr' ? filters.time_period.size : filters.timePeriodFY.size,
    'Award Description': filters.awardDescription ? 1 : 0,
    'Award ID': filters.selectedAwardIDs.size,
    'Spending Amount': filters.awardAmounts.size,
    'Award Type': excludeIDVB(filters.awardType),
    'North American Industry Classification System (NAICS)': generateCount(filters.naicsCodes),
    'Product and Service Code (PSC)': generateCount(filters.pscCodes),
    'Type of Contract Pricing': filters.pricingType.size,
    'Type of Set Aside': filters.setAside.size,
    'Extent Competed': filters.extentCompeted.size,
    'Assistance Listing': filters.selectedCFDA.size,
    Recipient: filters.selectedRecipients.size,
    'Recipient Type': filters.recipientType.size,
    Agency: filters.selectedAwardingAgencies.size + filters.selectedFundingAgencies.size,
    'Treasury Account Symbol (TAS)': generateCount(filters.tasCodes),
    'Disaster Emergency Fund Code (DEFC)': filters.defCode.size
});
