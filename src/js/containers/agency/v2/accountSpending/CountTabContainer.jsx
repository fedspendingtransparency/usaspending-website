/**
 * CountTabContainer.jsx
 * Created by Lizzie Salita 5/11/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchSpendingCount } from 'helpers/agencyV2Helper';
import CountTab from 'components/agency/v2/CountTab';

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

    useEffect(() => {
        // Reset any existing results
        setCount(null);
        setSubCount(null);
        const countRequest = fetchSpendingCount(props.agencyId, props.fy, props.type);
        countRequest.promise
            .then((res) => {
                setCount(res.data[props.countField]);
                if (props.subCountField) {
                    setSubCount(res.data[props.subCountField]);
                }
            });
    }, [props.type, props.fy, props.agencyId, props.countField, props.subCountField]);
    return (
        <CountTab
            count={count}
            subCount={subCount}
            label={props.label}
            subHeading={props.subHeading}
            setActiveTab={props.setActiveTab}
            active={props.active}
            type={props.type} />
    );
};

CountTabContainer.propTypes = propTypes;
export default CountTabContainer;
