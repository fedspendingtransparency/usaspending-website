/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';
import useFetchQuarters from "./useFetchAccountTimeVisualization";

const propTypes = {
    reduxFilters: PropTypes.object,
    account: PropTypes.object
};

const AccountTimeVisualizationSectionContainer = ({ reduxFilters, account }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('quarter');
    const [hasFilteredObligated, setHasFilteredObligated] = useState(false);

    const setUpdateStateAndFetch = () => {
        setHasFilteredObligated((
            (reduxFilters.objectClass.count() > 0) ||
            (reduxFilters.programActivity.count() > 0)
        ));
    };

    const changePeriod = (period) => {
        if (visualizationPeriod !== period) {
            setVisualizationPeriod(period);
        }
    };

    const { result: data, loading } = useFetchQuarters(
        account.id,
        reduxFilters,
        visualizationPeriod,
        hasFilteredObligated
    );

    console.log({ data, loading })

    useEffect(() => {
        setUpdateStateAndFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxFilters, account.id]);

    // useEffect(() => {
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [hasFilteredObligated, visualizationPeriod, reduxFilters]);

    return (
        <AccountTimeVisualizationSection
            data={data}
            loading={loading}
            visualizationPeriod={visualizationPeriod}
            changePeriod={changePeriod}
            hasFilteredObligated={hasFilteredObligated} />
    );
};

AccountTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimeVisualizationSectionContainer);
