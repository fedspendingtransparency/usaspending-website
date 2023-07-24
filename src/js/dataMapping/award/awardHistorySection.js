import { getToolTipBySectionAndAwardType } from './tooltips';

export const tabs = (awardType) => [
    {
        label: "Transaction History",
        internal: "transaction",
        enabled: true,
        tooltip: getToolTipBySectionAndAwardType('transactionHistory', awardType),
        tooltipProps: { wide: true }
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        enabled: true,
        tooltip: getToolTipBySectionAndAwardType('subAwards', awardType),
        tooltipProps: { wide: true }
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        enabled: true,
        tooltip: getToolTipBySectionAndAwardType('federalAccountFunding', awardType),
        tooltipProps: { wide: true }
    }
];

export const awardTypesWithSubawards = ['grant', 'contract'];
