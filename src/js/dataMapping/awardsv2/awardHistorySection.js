import {
    federalAccountFundingInfo,
    transactionHistoryInfo,
    subAwardsTab
} from 'components/awardv2/shared/InfoTooltipContent';

export const tabs = [
    {
        label: "Transaction History",
        internal: "transaction",
        enabled: true,
        tooltipContent: transactionHistoryInfo,
        tooltipProps: { wide: true }
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        enabled: true,
        tooltipContent: subAwardsTab,
        tooltipProps: { wide: true }
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        enabled: true,
        tooltipContent: federalAccountFundingInfo,
        tooltipProps: { wide: true }
    }
];

export const awardTypesWithSubawards = ['grant', 'contract'];
