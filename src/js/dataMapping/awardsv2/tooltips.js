import * as tooltips from '../../components/awardv2/shared/InfoTooltipContent';
import { isAwardFinancialAssistance } from '../../helpers/awardSummaryHelper';

const tooltipsBySectionByAwardType = {
    description: {
        asst: tooltips.descriptionInfoAsst,
        contract: tooltips.descriptionInfoContract,
        default: tooltips.descriptionInfo
    },
    awardHistory: {
        idv: tooltips.awardHistoryIdv,
        contract: tooltips.awardHistoryContract,
        grant: tooltips.awardHistoryContract,
        loan: tooltips.awardHistoryFinancialAssistanceLoan,
        asst: tooltips.awardHistoryFinancialAssistanceGeneric
    },
    transactionHistory: {
        idv: tooltips.transactionHistoryInfoGeneric,
        contract: tooltips.transactionHistoryInfoContract,
        asst: tooltips.transactionHistoryInfoFinancialAssistance
    },
    subAwards: {
        contract: tooltips.subAwardsTabContract,
        grant: tooltips.subAwardsTabGrant
    },
    federalAccountFunding: {
        idv: tooltips.federalAccountFundingInfoIDV,
        default: tooltips.federalAccountFundingInfoGeneric
    },
    awardAmounts: {
        contract: tooltips.ContractAwardAmountsInfo,
        loan: tooltips.LoanAwardAmountsInfo,
        asst: tooltips.GrantAwardAmountsInfo
    },
    federalAccounts: {
        idv: tooltips.federalAccountsInfoIdv,
        default: tooltips.federalAccountsInfoContract
    },
    dates: {
        contract: tooltips.datesInfo,
        idv: tooltips.datesInfoIdv,
        asst: tooltips.datesInfoAsst
    }
};

// eslint-disable-next-line import/prefer-default-export
export const getToolTipBySectionAndAwardType = (section, type) => {
    const arrayOfSections = Object.keys(tooltipsBySectionByAwardType);
    const arrayOfAwardTypesForSection = Object.keys(tooltipsBySectionByAwardType[section]);

    if (arrayOfSections.includes(section) && arrayOfAwardTypesForSection.includes(type)) {
        return tooltipsBySectionByAwardType[section][type];
    }
    else if (isAwardFinancialAssistance(type) && arrayOfAwardTypesForSection.includes('asst')) {
        return tooltipsBySectionByAwardType[section].asst;
    }
    return tooltipsBySectionByAwardType[section].default;
};
