/**
 * CountTabContainer.jsx
 * Created by Lizzie Salita 5/11/20
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'data-transparency-ui';
import { fetchSpendingCount } from 'apis/agencyV2';

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
    const fetchCount = (type) => {
        // setIsLoading(true);
        const countRequest = fetchSpendingCount(props.agencyId, props.fy, type);
        countRequest.promise
            .then((res) => {
                console.log(type, res.data[props.tabs.find((tab) => tab.internal === type).countField]);
                // setIsLoading(false);
            })
            .catch((e) => {
                console.error('Error fetching count', e);
                // setIsLoading(false);
            });
    };
    useEffect(() => {
        if (props.fy) {
            // TODO - Reset any existing results
            props.tabs.forEach((type) => fetchCount(type.internal));
        }
    }, [props.fy, props.agencyId]);
    return (
        <Tabs
            types={props.tabs}
            switchTab={props.setActiveTab}
            active={props.activeTab} />
    );
};

CountTabContainer.propTypes = propTypes;
export default CountTabContainer;
