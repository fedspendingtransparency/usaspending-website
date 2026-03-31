import * as tooltips from '../../components/award/shared/InfoTooltipContent';
import { isAwardFinancialAssistance } from '../../helpers/awardSummaryHelper';

const tooltipsBySectionByAwardType = {
    description: {
        asst: tooltips.descriptionInfoAsst,
        contract: tooltips.descriptionInfoContract,
        idv: tooltips.descriptionInfoContract,
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
        idv: null,
        contract: null,
        asst: null
    },
    subAwards: {
        contract: null,
        grant: null
    },
    federalAccountFunding: {
        idv: null,
        default: null
    },
    awardAmounts: {
        contract: tooltips.ContractAwardAmountsInfo,
        loan: tooltips.LoanAwardAmountsInfo,
        asst: tooltips.AsstAwardAmountsInfo
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


export const headerTooltipsByType = {
    idv: {
        modificationNumber: tooltips.modificationNumber,
        actionDate: tooltips.actionDate,
        amount: tooltips.amount,
        actionType: tooltips.actionType,
        transactionDescription: tooltips.transactionDescription
    },
    contract: {
        modificationNumber: tooltips.modificationNumber,
        actionDate: tooltips.actionDate,
        amount: tooltips.amount,
        actionType: tooltips.actionType,
        transactionDescription: tooltips.transactionDescription
    },
    assistance: {
        modificationNumber: tooltips.modificationNumber,
        actionDate: tooltips.actionDate,
        amount: tooltips.amount,
        actionType: tooltips.actionTypeFA,
        transactionDescription: tooltips.transactionDescription
    },
    loan: {
        modificationNumber: tooltips.modificationNumber,
        actionDate: tooltips.actionDate,
        amount: tooltips.amount,
        actionType: tooltips.actionTypeFA,
        transactionDescription: tooltips.transactionDescription,
        loanFaceValue: tooltips.loanFaceValue,
        loanSubsidyCost: tooltips.loanSubsidyCost
    },
    default: {
        modificationNumber: tooltips.modificationNumber,
        actionDate: tooltips.actionDate,
        amount: tooltips.amount,
        actionType: tooltips.actionType,
        transactionDescription: tooltips.transactionDescription
    }
};
// eslint-disable-next-line import/prefer-default-export
export const getHeaderTooltipsByTypeAndCol = (type, col) => {
    const arrayOfSections = Object.keys(headerTooltipsByType);
    const arrayOfAwardTypesForSection = Object.keys(headerTooltipsByType[type]);

    if (arrayOfSections.includes(type) && arrayOfAwardTypesForSection.includes(col)) {
        return headerTooltipsByType[type][col];
    }
    else if (isAwardFinancialAssistance(type) && arrayOfAwardTypesForSection.includes('asst')) {
        return headerTooltipsByType[type].asst;
    }
    return headerTooltipsByType[type].default;
};
