/**
 * AwardTypeContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable'

import { AwardTypeContainer } from
    'containers/search/filters/AwardTypeContainer';

const setupShallow = (props) => shallow(<AwardTypeContainer {...props} />);

describe('AwardTypeContainer', () => {
    describe('toggleAwardType', () => {
        it('should set the toggle in redux', () => {
            const container = setupShallow({
                awardType: new Set([]),
                appliedTypes: new Set([]),
                toggleAwardType: jest.fn(),
                bulkAwardTypeChange: jest.fn()
            });

            // mount the container
            container.instance().toggleAwardType(['02', '03', '04', '05']);
            expect(container.instance().props.toggleAwardType).toBeCalled();
            expect(container.instance().props.toggleAwardType).toBeCalledWith(['02', '03', '04', '05']);
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = setupShallow({
                awardType: new Set(['a']),
                appliedTypes: new Set([]),
                toggleAwardType: jest.fn(),
                bulkAwardTypeChange: jest.fn()
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = setupShallow({
                awardType: new Set([]),
                appliedTypes: new Set([]),
                toggleAwardType: jest.fn(),
                bulkAwardTypeChange: jest.fn()
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
