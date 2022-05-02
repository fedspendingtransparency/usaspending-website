/**
 * AccountTopFilterGroupGenerator.jsx
 * Created by Kevin Li 3/23/17
 */

import React from 'react';

import TimePeriodFYFilterGroup from './TimePeriodFYFilterGroup';
import TimePeriodDRFilterGroup from './TimePeriodDRFilterGroup';
import ObjectClassFilterGroup from './ObjectClassFilterGroup';
import ProgramActivityFilterGroup from './ProgramActivityFilterGroup';

export const topFilterGroupGenerator = (config = {
    filter: {
        code: ''
    },
    data: null
}) => {
    const groupKey = `top-filter-group-${config.filter.code}`;

    switch (config.filter.code) {
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup key={groupKey} {...config} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup key={groupKey} {...config} />;
        case 'objectClass':
            return <ObjectClassFilterGroup key={groupKey} {...config} />;
        case 'programActivity':
            return <ProgramActivityFilterGroup key={groupKey} {...config} />;
        default:
            return null;
    }
};
