/**
 * TimeFilters.jsx
 * Created by Max Kendall 12/4/2020
 */

import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Picker, SearchBar } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { allFiscalYears } from "helpers/fiscalYearHelper";
import { getLatestPeriod } from "helpers/accountHelper";
import {
    getPeriodWithTitleById,
    isPeriodVisible,
    isPeriodSelectable,
    getLastPeriodWithinQuarterByPeriod
} from "helpers/aboutTheDataHelper";
import {
    periodsPerQuarter,
    lastPeriods,
    cssOrderClassByPeriodId
} from 'components/aboutTheData/dataMapping/timeFilters';
import PeriodComponent from './PeriodComponent';

const sortPeriods = ({ type: a }, { type: b }) => {
    if (!a || !b) return 0;
    if (a.includes('quarter-selected')) return -1;
    if (b.includes('quarter-selected')) return 1;
    return 0;
};

// only used here and contains .jsx so not moving to a helper fn:
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

const TimePeriodFilters = ({
    activeTab,
    selectedPeriod,
    selectedFy,
    urlFy,
    urlPeriod,
    onTimeFilterSelection,
    submissionPeriods,
    dataAsOf
}) => {
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
    }, [dataAsOf, urlFy, urlPeriod]);

    const generatePeriodDropdown = (fy, periods) => (
        parsePeriods(fy, periods)
            .map((p) => ({
                ...p,
                component: p.component,
                value: `${p.id}`,
                isEnabled: p.isEnabled,
                onClick: p.isEnabled
                    ? (period) => handleTimeChange(selectedFy, period)
                    : () => null
            }))
    );

    return (
        <div className="table-controls__time-and-search">
            <div className="filter-container fy-picker">
                <span className="filter__title fy-picker__title">FISCAL YEAR</span>
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
            {activeTab === 'submissions' && (
                <div className="filter-container period-picker">
                    <span className="filter__title period-picker__title">PERIOD</span>
                    <Picker
                        icon=""
                        className="period-picker"
                        sortFn={sortPeriods}
                        selectedOption={selectedPeriod
                            ? <span>{selectedPeriod.title}</span>
                            : (
                                <div className="period-loading">
                                    P <FontAwesomeIcon icon="spinner" size="sm" alt="Toggle menu" spin />
                                </div>
                            )}
                        options={generatePeriodDropdown(selectedFy, submissionPeriods)} />
                </div>
            )}
            <div className="filter-container">
                <span className="filter__title search-bar">AGENCY NAME</span>
                <SearchBar minChars={2} />
            </div>
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
    urlPeriod: PropTypes.string,
    urlFy: PropTypes.string,
    activeTab: PropTypes.string.isRequired,
    onTimeFilterSelection: PropTypes.func,
    submissionPeriods: PropTypes.array,
    dataAsOf: PropTypes.object
};

export default TimePeriodFilters;
