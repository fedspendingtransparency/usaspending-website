/**
  * TimePeriodContainer.jsx
  * Created by Kevin Li 11/21/16
  **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Set, is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import TimePeriod from 'components/search/filters/timePeriod/TimePeriod';

export const startYear = FiscalYearHelper.earliestFiscalYear;

const propTypes = {
    updateTimePeriodArray: PropTypes.func,
    setTimePeriodArray: PropTypes.func,
    filterTimePeriodType: PropTypes.string,
    filterTimePeriodFY: PropTypes.instanceOf(Set),
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    filterTime_Period: PropTypes.object,
    appliedFilters: PropTypes.object,
    newAwardsOnlySelected: PropTypes.bool,
    newAwardsOnlyActive: PropTypes.bool,
    naoActiveFromFyOrDateRange: PropTypes.bool,
    searchV2: PropTypes.bool
};

const TimePeriodContainer = (props) => {
    const [timePeriods, setTimePeriods] = useState([]);
    const [activeTab, setActiveTab] = useState('dr');

    const setUpdateState = (prop) => {
        setActiveTab(prop.filterTimePeriodType);
    };

    const generateTimePeriods = () => {
        const timePeriodArr = [];

        // determine the current fiscal year
        const currentFY = FiscalYearHelper.currentFiscalYear();

        for (let i = currentFY; i >= startYear; i--) {
            timePeriodArr.push(i.toString());
        }

        setTimePeriods(timePeriodArr);
    };

    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    const updateFilter = (params) => {
        const newFilters = Object.assign({}, params);

        if (activeTab === 'fy') {
            newFilters.dateType = 'fy';
            props.updateTimePeriod(newFilters);
        }
        else {
            // reset the fiscal year set
            // start and end dates and datetype are in params
            newFilters.fy = [];
            props.updateTimePeriodArray(newFilters);
        }
    };

    const dirtyFilters = () => {
        const appliedFields = [
            'timePeriodFY',
            'time_period'
        ];
        const activeFields = [
            'filterTimePeriodFY',
            'filterTime_Period'
        ];

        const noChanges = appliedFields.every((appliedField, index) => {
            const activeField = activeFields[index];
            const appliedValue = props.appliedFilters[appliedField];
            const activeValue = props[activeField];

            // do not set time filter to dirty when 1 checkbox is unchecked
            if ((activeValue && activeValue.size === 0) && (appliedValue && appliedValue.size >= 1)) {
                return true;
            }

            if (!is(appliedValue, activeValue)) {
                // field has changed
                return false;
            }
            return true;
        });

        if (!noChanges) {
            return Symbol('dirty time filter');
        }
        return null;
    };

    useEffect(() => {
        if (props.appliedFilters.timePeriodType === 'fy') {
            changeTab('fy');
        }
        else {
            changeTab('dr');
        }
        generateTimePeriods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setUpdateState(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filterTimePeriodType]);

    return (
        <TimePeriod
            {...props}
            dirtyFilters={dirtyFilters()}
            newAwardsOnlySelected={props.newAwardsOnlySelected}
            newAwardsOnlyActive={props.newAwardsOnlyActive}
            naoActiveFromFyOrDateRange={props.naoActiveFromFyOrDateRange}
            activeTab={activeTab}
            timePeriods={timePeriods}
            updateFilter={updateFilter}
            changeTab={changeTab}
            searchV2={props.searchV2} />
    );
};

TimePeriodContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filterTimePeriodType: state.filters.timePeriodType,
        filterTimePeriodFY: state.filters.timePeriodFY,
        filterTime_Period: state.filters.time_period,
        newAwardsOnlySelected: state.filters.filterNewAwardsOnlySelected,
        newAwardsOnlyActive: state.filters.filterNewAwardsOnlyActive,
        naoActiveFromFyOrDateRange: state.filters.filterNaoActiveFromFyOrDateRange,
        appliedFilters: state.appliedFilters.filters,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimePeriodContainer);
