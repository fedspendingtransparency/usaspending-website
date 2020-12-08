/**
 * TimeFilters.jsx
 * Created by Max Kendall 12/4/2020
 */

import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Picker } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { allFiscalYears } from "helpers/fiscalYearHelper";
import { getLatestPeriod } from "helpers/accountHelper";
import { useLatestAccountData } from "containers/account/WithLatestFy";
import {
    periodsPerQuarter,
    lastPeriods,
    cssOrderClassByPeriodId
} from './dataMapping/timeFilters';

// returns the correct string representing the title of the period; for example '1' or '2' === 'P01 - P02'
export const getPeriodWithTitleById = (urlPeriod, latestPeriod) => {
    if (parseInt(urlPeriod, 10) > 12) return getPeriodWithTitleById(`${latestPeriod.period}`);
    const period = periodsPerQuarter
        .find((arr) => arr.some(({ id }) => {
            if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
            return id === urlPeriod;
        }))
        .filter(({ id }) => {
            if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
            return id === urlPeriod;
        })[0];
    if (period) return period;
    return getPeriodWithTitleById(`${latestPeriod.period}`);
};

const getSelectedPeriodTitle = (str) => (
    str.includes('Q')
        ? `${str.split(' ')[0]} / ${str.split(' ')[1]}`
        : str
);

const PeriodComponent = ({
    title,
    classNames,
    isEnabled = true
}) => {
    const isLastPeriod = title.includes('Q');
    const classNamesWithState = isEnabled
        ? classNames.join(' ')
        : classNames.concat(['disabled']).join(' ');
    if (isLastPeriod) {
        const quarterAndTitle = title.split(' ');
        return (
            <div className={classNamesWithState}>
                <span>{quarterAndTitle[0]}</span>
                <span>{quarterAndTitle[1]}</span>
            </div>
        );
    }
    return (
        <div className={classNamesWithState}>
            <span>{title}</span>
        </div>
    );
};

PeriodComponent.propTypes = {
    title: PropTypes.string.isRequired,
    classNames: PropTypes.arrayOf(PropTypes.string),
    isEnabled: PropTypes.bool
};

// periods can be visible but not selectable
export const isPeriodVisible = (availablePeriodsInFy, periodId) => (
    availablePeriodsInFy
        .some((p) => (
            p.submission_fiscal_month >= parseInt(periodId, 10)
        ))
);

// periods are only selectable post 2020
export const isPeriodSelectable = (availablePeriodsInFy, periodId) => (
    availablePeriodsInFy
        .filter((p) => (
            parseInt(periodId, 10) === p.submission_fiscal_month
        ))
        .length > 0
);

// getting last period of quarter for period via index of this array. ✨✨ ✨  S/O to (3rd grade) Maths ✨ ✨ ✨
export const getLastPeriodWithinQuarterByPeriod = (periodId) => (
    lastPeriods[Math.ceil((parseInt(periodId, 10) / 3)) - 1] || "1"
);

const parsePeriods = (year, periods) => {
    const allPeriodsAvailableInFy = periods
        .filter((p) => p.submission_fiscal_year === parseInt(year, 10))
        .filter((p) => moment.utc(p.submission_reveal_date).isSameOrBefore(moment()));
    return periodsPerQuarter
        .reduce((acc, periodsInQuarter) => (
            acc.concat(
                periodsInQuarter
                    .map((period, i, src) => {
                        const isIndividuallySelectablePeriod = isPeriodSelectable(allPeriodsAvailableInFy, period.id);
                        const isPeriodVisibleViaQuarterSelection = isPeriodVisible(allPeriodsAvailableInFy, period.id);
                        const isEnabled = (
                            isPeriodVisibleViaQuarterSelection &&
                            (
                                lastPeriods.includes(period.id) || isIndividuallySelectablePeriod
                            )
                        );
                        const classNames = src.length - 1 === i
                            ? ['period', 'last', cssOrderClassByPeriodId[period.id]]
                            : ['period', cssOrderClassByPeriodId[period.id]];
                        if (!isIndividuallySelectablePeriod && isPeriodVisibleViaQuarterSelection) {
                            classNames.push(`not-individually-selectable-p${period.id}`);
                        }
                        else if (parseInt(year, 10) === 2020 && parseInt(period.id, 10) <= 6 && isEnabled) {
                            classNames.push(`quarter-selected-${period.id}`);
                        }
                        else if (parseInt(year, 10) < 2020 && isEnabled) {
                            classNames.push(`quarter-selected-${period.id}`);
                        }
                        return {
                            ...period,
                            type: classNames[classNames.length - 1],
                            classNames: classNames.join(' '),
                            isEnabled,
                            component: <PeriodComponent
                                isEnabled={isEnabled}
                                classNames={i === 0 ? classNames.concat(['first']) : classNames}
                                title={period.title} />
                        };
                    })
            )
        ), []);
};

const sortPeriods = ({ type: a }, { type: b }) => {
    if (!a || !b) return 0;
    if (a.includes('quarter-selected')) return -1;
    if (b.includes('quarter-selected')) return 1;
    return 0;
};

const TimePeriodFilters = ({
    activeTab,
    selectedPeriod,
    selectedFy,
    urlFy,
    urlPeriod,
    onTimeFilterSelection
}) => {
    const [dataAsOf, submissionPeriods] = useLatestAccountData();
    const latestPeriod = getLatestPeriod(submissionPeriods);

    const handleTimeChange = (fy, period, latestAvailable = latestPeriod) => {
        onTimeFilterSelection(fy, getPeriodWithTitleById(period, latestAvailable));
    };

    useEffect(() => {
        // when latest account data is ready or the url changes, set the active time periods
        if (dataAsOf) {
            const availablePeriodsInFy = submissionPeriods.filter(({ submission_fiscal_year: y }) => parseInt(urlFy, 10) === y);
            if (availablePeriodsInFy.length) {
                // fy selection is valid but what about the period? 🤔
                const validPeriod = isPeriodVisible(availablePeriodsInFy, urlPeriod)
                    ? urlPeriod
                    : `${latestPeriod.period}`;

                const selectablePeriod = isPeriodSelectable(availablePeriodsInFy, validPeriod)
                    ? validPeriod
                    : getLastPeriodWithinQuarterByPeriod(validPeriod);

                handleTimeChange(urlFy, selectablePeriod);
            }
            else {
                // invalid time selection, use the latest available fy/period 👌
                handleTimeChange(`${latestPeriod.year}`, `${latestPeriod.period}`);
            }
        }
    }, [dataAsOf, submissionPeriods, urlFy, urlPeriod]);

    const generatePeriodDropdown = (fy, periods) => (
        parsePeriods(fy, periods)
            .map((p) => ({
                ...p,
                component: p.component,
                value: `${p.id}`,
                isEnabled: p.isEnabled,
                onClick: p.isEnabled
                    ? (period) => handleTimeChange(selectedFy, period)
                    : () => console.log('dats gonna be a no from me dawg!!!')
            }))
    );

    return (
        <div className="table-controls__time-and-search">
            <div className="picker-container">
                <span className="fy-picker__title">FISCAL YEAR</span>
                <Picker
                    icon=""
                    isFixedWidth
                    className="fy-picker"
                    sortFn={sortPeriods}
                    selectedOption={selectedFy
                        ? <span>FY {selectedFy}</span>
                        : (
                            <div data-testid="fy-loading" className="fy-loading">
                                FY <FontAwesomeIcon icon="spinner" size="sm" alt="FY Loading ..." spin />
                            </div>
                        )}
                    options={dataAsOf
                        ? allFiscalYears(2017, dataAsOf.year()).map((year) => ({ name: `FY ${year}`, value: `${year}`, onClick: onTimeFilterSelection }))
                        : [{ name: 'Loading fiscal years...', value: null, onClick: () => { } }]
                    } />
            </div>
            {activeTab === 'details' && (
                <div className="picker-container">
                    <span className="period-picker__title">PERIOD</span>
                    <Picker
                        icon=""
                        className="period-picker"
                        sortFn={sortPeriods}
                        selectedOption={selectedPeriod
                            ? <span>FY {getSelectedPeriodTitle(selectedPeriod.title)}</span>
                            : (
                                <div className="period-loading">
                                    P <FontAwesomeIcon icon="spinner" size="sm" alt="Toggle menu" spin />
                                </div>
                            )}
                        options={generatePeriodDropdown(selectedFy, submissionPeriods)} />
                </div>
            )}
        </div>
    );
};

TimePeriodFilters.propTypes = {
    selectedPeriod: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        className: PropTypes.string
    }),
    selectedFy: PropTypes.string,
    urlFy: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    urlPeriod: PropTypes.string.isRequired,
    onTimeFilterSelection: PropTypes.func
};

export default TimePeriodFilters;
