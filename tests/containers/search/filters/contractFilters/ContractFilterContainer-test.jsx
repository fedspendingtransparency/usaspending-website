/**
 * ContractFilterContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ContractFilterContainer }
    from 'containers/search/filters/ContractFilterContainer';

describe('ContractFilterContainer', () => {
    describe('Handle adding and removing pricing type items', () => {
        it('should add a predefined pricing type that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    value: 'B'
                });
            });

            // Set up container with mocked Pricing Type action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    selectPricingType={mockReduxAction}
                    updatePricingType={mockReduxAction} />);

            const selectPricingTypeSpy = sinon.spy(contractFilterContainer.instance(),
                'selectPricingType');

            // Add Select Pricing 3to redux
            contractFilterContainer.instance().selectPricingType('B');

            // everything should be updated now
            expect(selectPricingTypeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            selectPricingTypeSpy.reset();
        });
    });
    describe('Handle adding and removing set aside items', () => {
        it('should add a predefined set aside that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    value: '8AN'
                });
            });

            // Set up container with mocked Set Aside action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    selectSetAside={mockReduxAction}
                    updateSetAside={mockReduxAction} />);

            const setAsideSpy = sinon.spy(contractFilterContainer.instance(),
                'selectSetAside');

            // Add Set Aside to redux
            contractFilterContainer.instance().selectSetAside('8AN');

            // everything should be updated now
            expect(setAsideSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            setAsideSpy.reset();
        });
    });
    describe('Handle adding and removing extent competed items', () => {
        it('should add a predefined extent competed that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    value: 'F'
                });
            });

            // Set up container with mocked Set Aside action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    selectExtentCompeted={mockReduxAction}
                    updateExtentCompeted={mockReduxAction} />);

            const extentCompetedSpy = sinon.spy(contractFilterContainer.instance(),
                'selectExtentCompeted');

            // Add Extent Competed to redux
            contractFilterContainer.instance().selectExtentCompeted('F');

            // everything should be updated now
            expect(extentCompetedSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            extentCompetedSpy.reset();
        });
    });
});
