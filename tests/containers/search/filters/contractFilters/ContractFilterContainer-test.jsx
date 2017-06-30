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
                expect(args).toEqual('B');
            });

            // Set up container with mocked Pricing Type action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    updatePricingType={mockReduxAction} />);

            // Add Select Pricing to redux
            contractFilterContainer.instance().selectPricingType('B');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
    describe('Handle adding and removing set aside items', () => {
        it('should add a predefined set aside that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('8AN');
            });

            // Set up container with mocked Set Aside action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    updateSetAside={mockReduxAction} />);

            // Add Select Pricing to redux
            contractFilterContainer.instance().selectSetAside('8AN');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
    describe('Handle adding and removing extent competed items', () => {
        it('should add a predefined extent competed that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('F');
            });

            // Set up container with mocked Extent Competed action
            const contractFilterContainer = shallow(
                <ContractFilterContainer
                    updateExtentCompeted={mockReduxAction} />);

            // Add Select Pricing to redux
            contractFilterContainer.instance().selectExtentCompeted('F');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
});
