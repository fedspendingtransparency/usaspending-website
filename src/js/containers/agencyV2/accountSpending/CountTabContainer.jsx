/**
 * CountTabContainer.jsx
 * Created by Lizzie Salita 5/11/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchSpendingCount } from 'apis/agencyV2';
import CountTab from 'components/agencyV2/CountTab';

const propTypes = {
    fy: PropTypes.string.isRequired,
    agencyId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    countField: PropTypes.string,
    subCountField: PropTypes.string
};

const CountTabContainer = (props) => {
    const [count, setCount] = useState(null);
    const [subCount, setSubCount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Reset any existing results
        if (props.fy) {
            setCount(null);
            setIsLoading(true);
            setSubCount(null);
            const countRequest = fetchSpendingCount(props.agencyId, props.fy, props.type);
            countRequest.promise
                .then((res) => {
                    setCount(res.data[props.countField]);
                    setIsLoading(false);
                    if (props.subCountField) {
                        setSubCount(res.data[props.subCountField]);
                    }
                })
                .catch((e) => {
                    console.error('Error fetching count', e);
                    setIsLoading(false);
                });
        }
    }, [props.type, props.fy, props.agencyId, props.countField, props.subCountField]);
    return (
        <CountTab
            isLoading={isLoading}
            count={count}
            subCount={subCount}
            label={props.label}
            subHeading={props.subHeading}
            setActiveTab={props.setActiveTab}
            active={props.active}
            disabled={count === 0}
            type={props.type} />
    );
};

CountTabContainer.propTypes = propTypes;
export default CountTabContainer;
