/**
 * CountTabContainer.jsx
 * Created by Lizzie Salita 5/11/20
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { camelCase } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'data-transparency-ui';
import { fetchSpendingCount } from 'apis/agencyV2';
import {
    setBudgetCategoryCount,
    resetBudgetCategoryCounts
} from 'redux/actions/agencyV2/agencyV2Actions';

const propTypes = {
    fy: PropTypes.string.isRequired,
    agencyId: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        internal: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        countField: PropTypes.string.isRequired,
        subHeading: PropTypes.string
    })),
    setActiveTab: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired
};

const CountTabContainer = (props) => {
    const dispatch = useDispatch();

    const fetchCount = (type) => {
        const countRequest = fetchSpendingCount(props.agencyId, props.fy, type);
        countRequest.promise
            .then((res) => {
                // Store the result in Redux
                dispatch(setBudgetCategoryCount(
                    camelCase(type),
                    res.data[props.tabs.find((tab) => tab.internal === type).countField]
                ));
            })
            .catch((e) => {
                console.error('Error fetching count', e);
            });
    };

    useEffect(() => {
        if (props.fy) {
            // Reset any existing results
            dispatch(resetBudgetCategoryCounts());
            // Make a count request for each tab
            props.tabs.forEach((type) => fetchCount(type.internal));
        }
    }, [props.fy, props.agencyId]);

    // Get the counts from Redux
    const counts = useSelector((state) => state.agencyV2.budgetCategoryCounts);
    // Add the count property to our array of tabs
    const tabsWithCounts = props.tabs.map((tab) => ({
        ...tab,
        count: counts[camelCase(tab.internal)]
    }));

    return (
        <Tabs
            types={tabsWithCounts}
            switchTab={props.setActiveTab}
            active={props.activeTab} />
    );
};

CountTabContainer.propTypes = propTypes;
export default CountTabContainer;
