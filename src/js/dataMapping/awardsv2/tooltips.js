import {
    descriptionInfo,
    descriptionInfoContract,
    descriptionInfoAsst
} from '../../components/awardv2/shared/InfoTooltipContent';
import { isAwardFinancialAssistance } from '../../helpers/awardSummaryHelper';

const tooltipsBySectionByAwardType = {
    description: {
        asst: descriptionInfoAsst,
        contract: descriptionInfoContract,
        default: descriptionInfo
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
