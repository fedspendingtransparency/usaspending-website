/**
 * FederalAccountContainer-test.jsx
 * Created by Kevin Li 6/30/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import FederalAccountContainer from 'containers/agency/visualizations/FederalAccountContainer';

import { mockAccount, parsedSeries } from './mocks/mockFederalAccount';

jest.mock('helpers/agencyHelper', () => require('./../agencyHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(FederalAccountContainer.prototype, 'loadData');

const inboundProps = {
    id: '123',
    activeFY: '2017',
    obligatedAmount: 123456
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/federalAccount/FederalAccountVisualization', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));


describe('FederalAccountContainer', () => {
    it('should make an API call for the selected agency on mount', async () => {
        const container = mount(<FederalAccountContainer
            {...inboundProps} />);

        await container.instance().request.promise;

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();
    });

    it('should make a new API call when the inbound agency ID prop changes', async () => {
        const container = mount(<FederalAccountContainer
            {...inboundProps} />);

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        await container.instance().request.promise;

        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY, 1);
        loadDataSpy.reset();
    });

    describe('parseData', () => {
        it('should parse the returned API response', () => {
            const container = shallow(<FederalAccountContainer
                {...inboundProps} />);

            container.instance().parseData(mockAccount.results);

            expect(container.state().dataSeries).toEqual(parsedSeries.dataSeries);
            expect(container.state().labelSeries).toEqual(parsedSeries.labelSeries);
            expect(container.state().linkSeries).toEqual(parsedSeries.linkSeries);
        });
    });

    describe('changePage', () => {
        it('should update the page number in state', () => {
            const container = shallow(<FederalAccountContainer
                {...inboundProps} />);

            container.setState({
                isLastPage: false
            });

            expect(container.state().page).toEqual(1);

            container.instance().changePage(2);
            expect(container.state().page).toEqual(2);
        });
        it('should make an API call with the new page number', () => {
            const container = shallow(<FederalAccountContainer
                {...inboundProps} />);

            container.setState({
                isLastPage: false
            });

            const loadDataMock = jest.fn();
            container.instance().loadData = loadDataMock;

            container.instance().changePage(2);
            expect(loadDataMock).toHaveBeenCalledWith(inboundProps.id, inboundProps.activeFY, 2);
        });

        it('should not do anything if there are no more pages', () => {
            const container = shallow(<FederalAccountContainer
                {...inboundProps} />);

            container.setState({
                isLastPage: true
            });

            const loadDataMock = jest.fn();
            container.instance().loadData = loadDataMock;

            expect(container.state().page).toEqual(1);

            container.instance().changePage(2);
            expect(container.state().page).toEqual(1);
        });
    });
});
