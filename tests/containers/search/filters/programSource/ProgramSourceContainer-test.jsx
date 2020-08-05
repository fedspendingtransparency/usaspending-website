/**
 * ProgramSourceContainer-test.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { ProgramSourceContainer } from 'containers/search/filters/programSource/ProgramSourceContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/filters/programSource/ProgramSourceSection', () =>
    jest.fn(() => null));

const mockRedux = {
    checkboxTreeSelections: [],
    selectedTreasuryComponents: new OrderedMap(),
    appliedCheckboxTreeSelections: [],
    appliedTreasuryComponents: new OrderedMap()
};

describe('ProgramSourceContainer', () => {
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(<ProgramSourceContainer
                {...mockRedux} />);

            container.setProps({
                selectedTreasuryComponents: new OrderedMap({ main: 'test' })
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(<ProgramSourceContainer
                {...mockRedux} />);

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
