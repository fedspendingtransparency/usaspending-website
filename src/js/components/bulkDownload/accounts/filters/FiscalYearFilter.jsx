/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import { handlePotentialStrings } from 'containers/explorer/detail/helpers/explorerQuarters';
import QuarterPickerWithFY from 'components/sharedComponents/QuarterPickerWithFY';

/* eslint-disable max-len */
const noteOne = 'The data included in the Custom Account Download was first collected in the second quarter of fiscal year 2017, per the Digital Accountability and Transparency Act of 2014 (DATA Act). Financial data will not be available prior to that timeframe.';
const noteTwo = 'Account Balances and Account Breakdown by Program Activity & Object Class files contain cumulative financial balances at the account and agency levels, as of the end of the quarter selected. The Account Breakdown by Award file contains every transaction reported at the account and agency levels, for the fiscal year through the end of the quarter selected.';
/* eslint-enable max-len */

const propTypes = { updateFilter: PropTypes.func };

const FiscalYearFilter = ({ updateFilter }) => {
    const fy = useSelector((state) => state.bulkDownload.accounts.fy);
    const period = useSelector((state) => state.bulkDownload.accounts.period);
    const quarter = useSelector((state) => state.bulkDownload.accounts.quarter);

    const latestSelectedTimeInterval = period || quarter;
    const valid = fy && latestSelectedTimeInterval;

    const quarterPickerSelection = useCallback((selectedOption) => {
        if (parseInt(fy, 10) >= 2020) {
            updateFilter('period', `${selectedOption}`);
            updateFilter('quarter', null);
        }
        else {
            updateFilter('quarter', `${selectedOption}`);
            updateFilter('period', null);
        }
    }, [fy, updateFilter]);

    const pickedYear = useCallback((year, period = null) => {
        updateFilter('fy', `${year}`);

        if (handlePotentialStrings(year) >= 2020) {
            updateFilter('period', period);
            updateFilter('quarter', null);
        }
        else {
            updateFilter('quarter', `4`);
            updateFilter('period', null);
        }
    }, [updateFilter]);

    let icon = <div className="icon valid"><CheckCircle /></div>;

    if (!valid) icon = <div className="icon invalid"><ExclamationCircle /></div>;

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select a
                <span className="download-filter__title_em"> fiscal year </span>
                and <span className="download-filter__title_em">quarter</span>.
            </h3>
            <div className="download-filter__content new">
                <p className={"download-filter__content-description"}>
                    The government
                    <span> Fiscal Year (FY) </span>
                    from October 1 through September 30 of the following year.
                    <span> Period </span>
                    refers to an individual month within the FY,
                    as agencies have a monthly reporting requirement.
                </p>
                <QuarterPickerWithFY
                    selectedFy={fy}
                    handlePickedYear={pickedYear}
                    handleQuarterPickerSelection={quarterPickerSelection}
                    latestSelectedTimeInterval={latestSelectedTimeInterval}
                    updateFilter={updateFilter} />
                <p className="download-filter__content-note">
                    <span className="download-filter__content-note_bold">Note: </span>
                    {noteOne}
                </p>
                <p className="download-filter__content-note">
                    {noteTwo}
                </p>
            </div>
        </div>
    );
}

FiscalYearFilter.propTypes = propTypes;
export default FiscalYearFilter;
