/**
 * covidHelper.js
 * Created By Jonathan Hill 06/02/20
 */
import Cookies from 'js-cookie';
import { useState } from 'react';
import { snakeCase } from 'lodash';
import moment from 'moment';

import {
    defCodes,
    dataDisclaimerHeight,
    stickyHeaderHeight,
    globalBannerHeight,
    siteHeaderHeight
} from 'dataMapping/covid19/covid19';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import { scrollToY } from 'helpers/scrollToHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';

const getVerticalOffset = () => {
    const isGlobalBannerHidden = Cookies.get('usaspending_covid_release') === 'hide';
    const isCovidBannerHidden = Cookies.get('usaspending_data_disclaimer') === 'hide';
    const isHeaderSticky = window.scrollY || window.pageYOffset >= 161;
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
    verticalOffset = getVerticalOffset()
) => {
    // we've been provided a section to jump to
    // check if it's a valid section
    const matchedSection = Object.keys(componentByCovid19Section()).find((key) => key === section);

    if (!matchedSection) {
        // no matching section
        return;
    }

    // scroll to the correct section
    const sectionDom = document.querySelector(`#covid19-${snakeCase(section)}`);

    if (!sectionDom) {
        return;
    }

    scrollToY(sectionDom.offsetTop - verticalOffset, 700);
};

export const getCovidFromFileC = (codes) => codes
    .filter((code) => defCodes.includes(code));

export const latestSubmissionDateFormatted = (availablePeriods) => availablePeriods
    .filter((s) => !s.is_quarter)
    .map((s) => moment.utc(s.submission_reveal_date))
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
