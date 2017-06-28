/**
 * RecipientContainer-test.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockRecipient, parsedSeries } from './mocks/mockRecipient';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(RecipientContainer.prototype, 'loadData');

const inboundProps = {
    id: '123',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/recipient/RecipientVisualization', () =>
    jest.fn(() => null));

// mock the GuideButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/guide/GuideButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Guide container for the same reason
jest.mock('containers/guide/GuideContainer', () =>
    jest.fn(() => null));

const mockAgencyHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    AgencyHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockAgencyHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/accountHelper');
};

describe('RecipientContainer', () => {
    it('should make an API call for the selected account on mount', () => {
        mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);

        mount(<RecipientContainer
            {...inboundProps} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();

        unmockAgencyHelper();
    });

    it('should make a new API call when the inbound agency ID prop changes', () => {
        mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);

        const container = mount(<RecipientContainer
            {...inboundProps} />);

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        jest.runAllTicks();

        // expect(loadDataSpy.callCount).toEqual(1);
        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY, 1);
        loadDataSpy.reset();

        unmockAgencyHelper();
    });

    describe('changePage', () => {
        it('should update the page number in state', () => {
            mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            container.setState({
                isLastPage: false
            });

            expect(container.state().page).toEqual(1);

            container.instance().changePage(2);
            expect(container.state().page).toEqual(2);
        });
        it('should make an API call with the new page number', () => {
            mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);
            const container = shallow(<RecipientContainer
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
            mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);
            const container = shallow(<RecipientContainer
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

    describe('changeScope', () => {
        it('should update the state with the new scope', () => {
            mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            expect(container.state().scope).toEqual('all');

            container.instance().changeScope('contracts');
            expect(container.state().scope).toEqual('contracts');
        });
    });

    describe('parseData', () => {
        it('should parse the returned API response', () => {
            mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            container.instance().parseData(mockRecipient.results);

            expect(container.state().dataSeries).toEqual(parsedSeries.dataSeries);
            expect(container.state().labelSeries).toEqual(parsedSeries.labelSeries);
        });
    });
});
