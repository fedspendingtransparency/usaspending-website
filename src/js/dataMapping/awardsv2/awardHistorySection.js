import {
    awardHistoryIdv,
    awardHistoryContract,
    awardHistoryFinancialAssistanceLoan,
    awardHistoryFinancialAssistanceGeneric,
    federalAccountFundingInfoIDV,
    federalAccountFundingInfoGeneric,
    transactionHistoryInfoGeneric,
    transactionHistoryInfoContract,
    transactionHistoryInfoFinancialAssistance,
    subAwardsTabContract,
    subAwardsTabGrant
} from 'components/awardv2/shared/InfoTooltipContent';

const tooltipMapping = {
    idv: awardHistoryIdv,
    contract: awardHistoryContract,
    grant: awardHistoryContract,
    loan: awardHistoryFinancialAssistanceLoan,
    'direct payment': awardHistoryFinancialAssistanceGeneric,
    insurance: awardHistoryFinancialAssistanceGeneric,
    other: awardHistoryFinancialAssistanceGeneric,
    transactionHistory: {
        idv: transactionHistoryInfoGeneric,
        contract: transactionHistoryInfoContract,
        grant: transactionHistoryInfoFinancialAssistance,
        loan: transactionHistoryInfoFinancialAssistance,
        'direct payment': transactionHistoryInfoFinancialAssistance,
        insurance: transactionHistoryInfoFinancialAssistance,
        other: transactionHistoryInfoFinancialAssistance
    },
    subAwards: {
        contract: subAwardsTabContract,
        grant: subAwardsTabGrant
    },
    federalAccountFunding: {
        idv: federalAccountFundingInfoIDV,
        contract: federalAccountFundingInfoGeneric,
        grant: federalAccountFundingInfoGeneric,
        loan: federalAccountFundingInfoGeneric,
        'direct payment': federalAccountFundingInfoGeneric,
        insurance: federalAccountFundingInfoGeneric,
        other: federalAccountFundingInfoGeneric
    }
};

export const awardHistorySectionTooltip = (awardType) => tooltipMapping[awardType];

export const tabs = (awardType) => [
    {
        label: "Transaction History",
        internal: "transaction",
        enabled: true,
        tooltipContent: tooltipMapping.transactionHistory[awardType],
        tooltipProps: { wide: true }
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        enabled: true,
        tooltipContent: tooltipMapping.subAwards[awardType],
        tooltipProps: { wide: true }
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        enabled: true,
        tooltipContent: tooltipMapping.federalAccountFunding[awardType],
        tooltipProps: { wide: true }
    }
];

export const awardTypesWithSubawards = ['grant', 'contract'];
