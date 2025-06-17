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
    covidDefCode,
    infraDefCode
}) => selectedAwardingAgencies.size +
    selectedFundingAgencies.size +
    generateCount(tasCodes) +
    covidDefCode.size +
    infraDefCode.size;
