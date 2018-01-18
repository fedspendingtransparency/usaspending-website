/**
 * CFDASearchContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { CFDASearchContainer } from 'containers/search/filters/cfda/CFDASearchContainer';

const initialFilters = {
    selectedCFDA: new OrderedMap(),
    appliedCFDA: new OrderedMap()
};

const cfda = {
    program_number: "10.555",
    program_title: "National School Lunch Program"
};

describe('CFDASearchContainer', () => {
    describe('Handling adding and removing CFDAs', () => {
        it('should add a CFDA that has been selected to Redux', () => {
            const mockReduxActionCFDA = jest.fn((args) => {
                expect(args).toEqual({
                    cfda: {
                        program_number: "10.555",
                        program_title: "National School Lunch Program"
                    }
                });
            });

            // Set up container with mocked cfda action
            const cfdaContainer = shallow(
                <CFDASearchContainer
                    {...initialFilters}
                    updateSelectedCFDA={mockReduxActionCFDA} />);

            const selectCFDASpy = sinon.spy(cfdaContainer.instance(),
                'selectCFDA');

            // Add CFDA to redux
            cfdaContainer.instance().selectCFDA(cfda, true);

            // everything should be updated now
            expect(selectCFDASpy.callCount).toEqual(1);
            expect(mockReduxActionCFDA).toHaveBeenCalled();

            // reset the spies
            selectCFDASpy.reset();
        });

        it('should remove a CFDA that has been deselected from Redux', () => {
            const mockReduxActionCFDA = jest.fn((args) => {
                expect(args).toEqual({
                    cfda: {
                        program_number: "10.555",
                        program_title: "National School Lunch Program"
                    }
                });
            });

            // Set up container with mocked cfda action
            const cfdaContainer = shallow(
                <CFDASearchContainer
                    {...initialFilters}
                    updateSelectedCFDA={mockReduxActionCFDA} />);

            const selectCFDASpy = sinon.spy(cfdaContainer.instance(),
                'selectCFDA');

            const removeCFDASpy = sinon.spy(cfdaContainer.instance(),
                'removeCFDA');

            // Add CFDA to redux
            cfdaContainer.instance().selectCFDA(cfda, true);

            // Remove CFDA from Redux
            cfdaContainer.instance().removeCFDA(cfda);

            // everything should be updated now
            expect(selectCFDASpy.callCount).toEqual(1);
            expect(removeCFDASpy.callCount).toEqual(1);
            expect(mockReduxActionCFDA).toHaveBeenCalledTimes(2);

            // reset the spy
            selectCFDASpy.reset();
            removeCFDASpy.reset();
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <CFDASearchContainer
                    {...initialFilters}
                    updateSelectedCFDA={jest.fn()} />
            );

            container.setProps({
                selectedCFDA: new OrderedMap({ a: 'a' })
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <CFDASearchContainer
                    {...initialFilters}
                    updateSelectedCFDA={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
