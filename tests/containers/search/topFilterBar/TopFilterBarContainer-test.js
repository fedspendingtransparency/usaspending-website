/**
 * TopFilterBarContainer-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import { mount } from 'enzyme';
import { Set } from 'immutable';
import renderer from 'react-test-renderer';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import TopFilterBarEmpty from 'components/search/topFilterBar/TopFilterBarEmpty';
import { TopFilterBarContainer } from 'containers/search/topFilterBar/TopFilterBarContainer';

const defaultFilters = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new Set(),
    locationDomesticForeign: 'all'
};

const setup = (props) => {
    return mount(<TopFilterBarContainer {...props} />);
};

describe('TopFilterBarContainer', () => {
    it('should return a TopFilterBarEmpty child component when no filters are applied', () => {
        const filters = Object.assign({}, defaultFilters);
        const props = {
            reduxFilters: filters
        };
        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(1);
        expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
    });

    it('should return a TopFilterBar child component when there are active filters', () => {
        const filters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014'])
        });
        const props = {
            reduxFilters: filters
        };

        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(0);
        expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);
    });
});