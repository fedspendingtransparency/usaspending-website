/**
 * covidHelper.js
 * Created By Jonathan Hill 06/02/20
 */

import { useState } from 'react';
import { snakeCase } from 'lodash';
import moment from 'moment';
import { min, max } from 'lodash';
import { scalePow } from 'd3-scale';

import { defCodes } from 'dataMapping/covid19/covid19';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import { scrollToY } from 'helpers/scrollToHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue, calculateUnits } from 'helpers/moneyFormatter';


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
    activeSection,
    setActiveSection
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

    // if the scrollY position is above the covid-19 sticky header
    // use scrollY or window.pageYOffset for IE11
    if ((window.scrollY || window.pageYOffset <= 161) && activeSection === 'overview') {
        scrollToY(sectionDom.offsetTop - 150, 700);
    } else {
        scrollToY(sectionDom.offsetTop - 86, 700);
    }

    if (setActiveSection) setActiveSection(matchedSection);
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
