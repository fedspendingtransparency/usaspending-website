/**
 * covidHelper.js
 * Created By Jonathan Hill 06/02/20
 */
import Cookies from 'js-cookie';
import { useState } from 'react';
import { snakeCase } from 'lodash';
import { apiRequest } from 'helpers/apiRequest';
import {
    dataDisclaimerHeight,
    globalBannerHeight,
    siteHeaderHeight,
    globalCovidBannerCookie,
    dataDisclaimerBannerCookie
} from 'dataMapping/covid19/covid19';

import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import { scrollToY } from 'helpers/scrollToHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';

export const fetchOpportunityTotals = (code) => apiRequest({
    url: code ? `v2/references/cfda/totals/${code}/` : `v2/references/cfda/totals/`
});

export const getStickyBreakPointForCovidBanner = () => {
    const isGlobalBannerHidden = Cookies.get(globalCovidBannerCookie) === 'hide';
    if (isGlobalBannerHidden) {
        return 97;
    }
    return 97 + globalBannerHeight;
};

export const getVerticalOffset = () => {
    const isGlobalBannerHidden = Cookies.get(globalCovidBannerCookie) === 'hide';
    const isCovidBannerHidden = Cookies.get(dataDisclaimerBannerCookie) === 'hide';
    const stickyHeaderThreshold = isGlobalBannerHidden ? 97 : 97 + globalBannerHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;
    const isHeaderSticky = scrollPosition >= stickyHeaderThreshold;
    const defaultVerticalOffset = stickyHeaderHeight + 20;
    if (isHeaderSticky) {
        if (isGlobalBannerHidden && isCovidBannerHidden) {
            // both banners are hidden
            return defaultVerticalOffset;
        }
        if (isCovidBannerHidden) {
            // only covid banner is hidden
            return defaultVerticalOffset;
        }
        if (isGlobalBannerHidden) {
            // only global banner is hidden
            return defaultVerticalOffset + dataDisclaimerHeight;
        }
        // neither banner is hidden
        return defaultVerticalOffset + dataDisclaimerHeight;
    }

    // ...header is NOT yet sticky...
    if (isGlobalBannerHidden && isCovidBannerHidden) {
    // both banners are hidden --> minimal offsets!
        return siteHeaderHeight;
    }
    else if (isGlobalBannerHidden) {
    // only global banner is hidden --> some offsets!
        return siteHeaderHeight + dataDisclaimerHeight + defaultVerticalOffset;
    }
    else if (isCovidBannerHidden) {
    // only covid banner only is hidden --> some offsets!
        return siteHeaderHeight + globalBannerHeight;
    }

    // neither banner is hidden --> lots of offsets
    return siteHeaderHeight + globalBannerHeight + dataDisclaimerHeight;
};

export const jumpToSection = (
    section = '',
    verticalOffset = getVerticalOffset(),
    idPrefix = 'covid19',
    sections = componentByCovid19Section()
) => {
    // we've been provided a section to jump to
    // check if it's a valid section
    const matchedSection = Object.keys(sections).find((key) => key === section);

    if (!matchedSection) {
    // no matching section
        return;
    }
    const selector = `#${idPrefix}-${snakeCase(section)}`;
    // scroll to the correct section
    const sectionDom = document.querySelector(selector);

    if (!sectionDom) {
        return;
    }

    scrollToY(sectionDom.offsetTop - verticalOffset, 700);
};

export const createJumpToSectionForSidebar = (prefix, domSections) => (
    section,
    offset = getVerticalOffset()
) => jumpToSection(section, offset, prefix, domSections);

export const useInFlightList = (initialState) => {
    const [inFlightList, updateInFlightList] = useState(initialState);
    return [
        inFlightList,
        // add
        (loadingCategory) => {
            updateInFlightList([...new Set(inFlightList.concat([loadingCategory]))]);
        },
        // remove
        (loadedCategory) => {
            const newState = inFlightList.filter((item) => item !== loadedCategory);
            updateInFlightList(newState);
        },
        // reset
        () => updateInFlightList(initialState)
    ];
};

export const getTotalSpendingAbbreviated = (totalSpending) => {
    const unit = calculateUnitForSingleValue(totalSpending);
    const abbreviatedValue = formatMoneyWithPrecision(totalSpending / unit.unit, 2);
    return `${abbreviatedValue} ${unit.longLabel}`;
};

export const areCountsDefined = (counts) => {
    const countTabs = Object.keys(counts);
    if (countTabs.length === 0) {
        return false;
    }
    return countTabs.reduce((acc, tab) => acc && counts[tab] !== null, true);
};

export const handleSort = (a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (b.sortOrder < a.sortOrder) return 1;
    return 0;
};

const calculateDifferenceSafely = (x, y) => {
    // These should never be zero, and if either is undefined, we ignore the calculation altogther.
    if (!x || !y) return null;
    return x - y;
};

/* eslint-disable camelcase */
export const calculateUnlinkedTotals = (overviewTotal, aggregatedTotal) => {
    const unlinkedObligation = calculateDifferenceSafely(overviewTotal?.obligation, aggregatedTotal?.obligation);
    const unlinkedOutlay = calculateDifferenceSafely(overviewTotal?.outlay, aggregatedTotal?.outlay);
    const unlinkedAwardCount = calculateDifferenceSafely(overviewTotal?.awardCount, aggregatedTotal?.award_count);
    const unlinkedFaceValueOfLoans = calculateDifferenceSafely(overviewTotal?.faceValueOfLoan, aggregatedTotal?.face_value_of_loan);
    const unlinkedBudgetaryResources = calculateDifferenceSafely(overviewTotal?.totalBudgetaryResources, aggregatedTotal?.total_budgetary_resources);

    return {
        obligation: unlinkedObligation,
        outlay: unlinkedOutlay,
        award_count: unlinkedAwardCount,
        face_value_of_loan: unlinkedFaceValueOfLoans,
        total_budgetary_resources: unlinkedBudgetaryResources
    };
};
