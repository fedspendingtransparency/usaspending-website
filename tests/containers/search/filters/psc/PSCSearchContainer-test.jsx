/**
 * PSCSearchContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { PSCSearchContainer } from 'containers/search/filters/psc/PSCSearchContainer';

const initialFilters = {
    selectedPSC: new OrderedMap(),
    appliedPSC: new OrderedMap()
};

const psc = {
    product_or_service_code: "561110"
};

describe('pscSearchContainer', () => {
    describe('Handling adding and removing PSCs', () => {
        it('should add a PSC that has been selected to Redux', () => {
            const mockReduxActionPSC = jest.fn((args) => {
                expect(args).toEqual({
                    psc: {
                        product_or_service_code: "561110"
                    }
                });
            });

            // Set up container with mocked psc action
            const pscContainer = shallow(
                <PSCSearchContainer
                    {...initialFilters}
                    updateSelectedPSC={mockReduxActionPSC} />);

            const selectPSCSpy = sinon.spy(pscContainer.instance(),
                'selectPSC');

            // Add PSC to redux
            pscContainer.instance().selectPSC(psc, true);

            // everything should be updated now
            expect(selectPSCSpy.callCount).toEqual(1);
            expect(mockReduxActionPSC).toHaveBeenCalled();

            // reset the spies
            selectPSCSpy.reset();
        });

        it('should remove a PSC that has been deselected from Redux', () => {
            const mockReduxActionPSC = jest.fn((args) => {
                expect(args).toEqual({
                    psc: {
                        product_or_service_code: "561110"
                    }
                });
            });

            // Set up container with mocked psc action
            const pscContainer = shallow(
                <PSCSearchContainer
                    {...initialFilters}
                    updateSelectedPSC={mockReduxActionPSC} />);

            const selectPSCSpy = sinon.spy(pscContainer.instance(),
                'selectPSC');

            const removePSCSpy = sinon.spy(pscContainer.instance(),
                'removePSC');

            // Add PSC to redux
            pscContainer.instance().selectPSC(psc, true);

            // Remove PSC from Redux
            pscContainer.instance().removePSC(psc);

            // everything should be updated now
            expect(selectPSCSpy.callCount).toEqual(1);
            expect(removePSCSpy.callCount).toEqual(1);
            expect(mockReduxActionPSC).toHaveBeenCalledTimes(2);

            // reset the spy
            selectPSCSpy.reset();
            removePSCSpy.reset();
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <PSCSearchContainer
                    {...initialFilters}
                    updateSelectedPSC={jest.fn()} />
            );

            container.setProps({
                selectedPSC: new OrderedMap({ a: 'a' })
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <PSCSearchContainer
                    {...initialFilters}
                    updateSelectedPSC={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
