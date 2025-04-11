import { Set } from 'immutable';
import { recipientTypeGroups } from 'dataMapping/search/recipientType';
import { awardTypeGroups } from "../../dataMapping/search/awardType";

export const awardingAgencyResponseParse = ({ results }) => {
    // filter down to only top tier codes
    const onlyTopTierCodes = results.map((res) => ({
        id: res.toptier_agency.toptier_code,
        name: res.toptier_agency.name,
        filters: []
    }));
    const setTiers = new Set(onlyTopTierCodes.map(JSON.stringify));
    const uniqueTopTiers = Array.from(setTiers).map(JSON.parse);

    // organize each sub tier into their top tier
    results.forEach((res) => {
        const category = uniqueTopTiers.find(
            (topTier) => topTier.id === res.toptier_agency.toptier_code
        );

        category.filters.push(res.id);
    });

    return uniqueTopTiers;
};

export const awardingAgencyCodes = (({ results }) => {
    const codesObj = {};


    /* eslint-disable camelcase */
    results.forEach(({ id, subtier_agency }) => {
        codesObj[id] = subtier_agency.name;
    });
    /* eslint-enable camelcase */

    return codesObj;
});

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

export const awardingAgencyData = {
    results: [
        {
            id: 1068,
            toptier_flag: true,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'ED',
                name: 'Department of Education'
            }
        },
        {
            id: 1545,
            toptier_flag: true,
            toptier_agency: {
                toptier_code: '519',
                abbreviation: 'VEF',
                name: 'Vietnam Education Foundation'
            },
            subtier_agency: {
                abbreviation: 'VEF',
                name: 'Vietnam Education Foundation'
            }
        },
        {
            id: 1228,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '097',
                abbreviation: 'DOD',
                name: 'Department of Defense'
            },
            subtier_agency: {
                abbreviation: 'DODEA',
                name: 'Department of Defense Education Activity'
            }
        },
        {
            id: 1099,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: null,
                name: 'Compensatory Education Programs'
            }
        },
        {
            id: 1088,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'FIPSE',
                name: 'Fund for the Improvement of Postsecondary Education'
            }
        },
        {
            id: 1104,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: null,
                name: 'Indian Education Programs'
            }
        },
        {
            id: 1101,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'MEP',
                name: 'Migrant Education Programs'
            }
        },
        {
            id: 1082,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OBEMLA',
                name: 'Office of Bilingual Education and Minority Languages Affairs'
            }
        },
        {
            id: 1081,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OCTAE',
                name: 'Office of Career, Technical, and Adult Education'
            }
        },
        {
            id: 1098,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OERI',
                name: 'Office of Educational Research and Improvement'
            }
        },
        {
            id: 1105,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OESE',
                name: 'Office of Elementary and Secondary Education'
            }
        },
        {
            id: 1092,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'HEP',
                name: 'Office of Higher Education Programs'
            }
        },
        {
            id: 1093,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OPE',
                name: 'Office of Postsecondary Education'
            }
        },
        {
            id: 1083,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OSERS',
                name: 'Office of Special Education and Rehabilitative Services'
            }
        },
        {
            id: 1086,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: 'OSEP',
                name: 'Office of Special Education Programs'
            }
        },
        {
            id: 1103,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '091',
                abbreviation: 'ED',
                name: 'Department of Education'
            },
            subtier_agency: {
                abbreviation: null,
                name: 'State and Local Education Programs'
            }
        },
        {
            id: 240,
            toptier_flag: false,
            toptier_agency: {
                toptier_code: '014',
                abbreviation: 'DOI',
                name: 'Department of the Interior'
            },
            subtier_agency: {
                abbreviation: null,
                name: 'Bureau of Indian Affairs and Bureau of Indian Education'
            }
        }
    ],
    messages: [
        'This endpoint is DEPRECATED. Please refer to the api contracts.'
    ]
};

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
    if (awardTypes.includes("IDV_B")) {
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
