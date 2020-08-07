/**
 * covidHelper.js
 * Created By Jonathan Hill 06/02/20
 */
import Cookies from 'js-cookie';
import { useState } from 'react';
import { snakeCase, min, max } from 'lodash';
import moment from 'moment';
import { scalePow } from 'd3-scale';

import {
    defCodes,
    dataDisclaimerHeight,
    stickyHeaderHeight,
    globalBannerHeight,
    siteHeaderHeight,
    globalCovidBannerCookie,
    dataDisclaimerBannerCookie
} from 'dataMapping/covid19/covid19';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import { scrollToY } from 'helpers/scrollToHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue, calculateUnits } from 'helpers/moneyFormatter';

export const getStickyBreakPointForSidebar = () => {
    const isGlobalBannerHidden = Cookies.get(globalCovidBannerCookie) === 'hide';

    if (isGlobalBannerHidden) {
        return 97;
    }
    return 97 + globalBannerHeight;
};

export const getVerticalOffsetForSidebarFooter = () => {
    const isCovidBannerHidden = Cookies.get(dataDisclaimerBannerCookie) === 'hide';
    const padding = 20;
    if (isCovidBannerHidden) {
        return stickyHeaderHeight + padding;
    }

    return stickyHeaderHeight + dataDisclaimerHeight + padding;
};

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

export const getDEFOptions = (setSelectedDEF, defaultSortDEF) => defCodes.map((year) => {
    const onClickHandler = () => setSelectedDEF(year);
    return {
        name: `${year}`,
        value: year,
        onClick: onClickHandler
    };
}).sort((a, b) => defaultSortDEF(a.value, b.value));

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

export const getCovidFromFileC = (codes) => codes
    .filter((code) => defCodes.includes(code));

export const latestSubmissionDateFormatted = (availablePeriods) => availablePeriods
    .filter((s) => !s.is_quarter)
    .map((s) => moment.utc(s.period_end_date))
    .sort((a, b) => b.valueOf() - a.valueOf())
    .find((s) => Date.now() >= s.valueOf())
    .format('MMMM DD[,] YYYY');

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

export const areCountsDefined = (counts) => Object.keys(counts).reduce((acc, tab) => {
    if (acc === null) return acc;
    return counts[tab];
}, true);

export const handleSort = (a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (b.sortOrder < a.sortOrder) return 1;
    return 0;
};

export const calculateCovidMapRange = (data) => {
    let dataRange = data;
    // handle a condition where an empty array is provided
    if (data.length < 1) {
        dataRange = [0, 10000];
    }
    let minValue = min(dataRange);
    let maxValue = max(dataRange);

    // determine the best units to use
    const units = calculateUnits(dataRange);

    // round the minimum down to the cleanest unit point
    minValue = Math.floor(minValue / units.unit);
    maxValue = Math.ceil(maxValue / units.unit);

    // determine the current step values, round it to something divisible by
    const step = Math.ceil((maxValue - minValue) / 6);
    maxValue = minValue + (6 * step);

    const segments = [];
    const scale = scalePow().exponent(0.1).domain([minValue * units.unit, maxValue * units.unit]).range([0, 6]);
    for (let i = 1; i <= 6; i++) {
        segments.push(scale.invert(i));
    }

    return {
        scale,
        segments,
        units
    };
};
