/**
 * TopFilterGroupGenerator.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';

import TimePeriodFYFilterGroup from './TimePeriodFYFilterGroup';
import TimePeriodDRFilterGroup from './TimePeriodDRFilterGroup';
import AwardTypeFilterGroup from './AwardTypeFilterGroup';
import LocationFilterGroup from './LocationFilterGroup';

export const topFilterGroupGenerator = (config = {
    filter: {
        code: ''
    },
    removeFilter: () => null,
    overwriteFilter: () => null,
    clearFilterGroup: () => null
}) => {
    const groupKey = `top-filter-group-${config.filter.code}`;

    switch (config.filter.code) {
        case 'timePeriodFY':
            return <TimePeriodFYFilterGroup key={groupKey} {...config} />;
        case 'timePeriodDR':
            return <TimePeriodDRFilterGroup key={groupKey} {...config} />;
        case 'awardType':
            return <AwardTypeFilterGroup key={groupKey} {...config} />;
        case 'selectedLocations':
            return <LocationFilterGroup key={groupKey} {...config} />;
        default:
            return null;
    }
};
