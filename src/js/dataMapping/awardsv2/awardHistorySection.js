import { getToolTipBySectionAndAwardType } from './tooltips';

export const tabs = (awardType) => [
    {
        label: "Transaction History",
        internal: "transaction",
        enabled: true,
        tooltipContent: getToolTipBySectionAndAwardType('transactionHistory', awardType),
        tooltipProps: { wide: true }
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        enabled: true,
        tooltipContent: getToolTipBySectionAndAwardType('subAwards', awardType),
        tooltipProps: { wide: true }
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        enabled: true,
        tooltipContent: getToolTipBySectionAndAwardType('federalAccountFunding', awardType),
        tooltipProps: { wide: true }
    }
];

export const awardTypesWithSubawards = ['grant', 'contract'];
