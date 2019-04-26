/**
 * RecipientContainer-test.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';

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

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

jest.mock('helpers/agencyHelper', () => require('../agencyHelper'));

describe('RecipientContainer', () => {
    it('should make an API call for the selected account on mount', async () => {
        const container = mount(<RecipientContainer
            {...inboundProps} />);

        await container.instance().request.promise;

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();
    });

    it('should make a new API call when the inbound agency ID prop changes', async () => {
        const container = mount(<RecipientContainer
            {...inboundProps} />);

        await container.instance().request.promise;

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        expect(loadDataMock).toHaveBeenCalledTimes(1);
        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY, 1);
        loadDataSpy.reset();
    });

    describe('changePage', () => {
        it('should update the page number in state', () => {
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
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            expect(container.state().scope).toEqual('all');

            container.instance().changeScope('contract');
            expect(container.state().scope).toEqual('contract');
        });

        it('should trigger an API call', () => {
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            const loadDataMock = jest.fn();
            container.instance().loadData = loadDataMock;

            container.instance().changeScope('contracts');
            expect(container.state().scope).toEqual('contracts');
            expect(loadDataMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('loadData', () => {
        it('should not include a scope when the scope state is "all"', async () => {
            const apiSpy = sinon.spy(require('helpers/agencyHelper'), 'fetchAwardRecipients');
            const container = mount(<RecipientContainer
                {...inboundProps} />);

            await container.instance().request.promise;
            expect(apiSpy.callCount).toEqual(1);

            container.setState({
                scope: 'all'
            });

            container.instance().loadData(123, 2017, 1);

            await container.instance().request.promise;
            expect(apiSpy.callCount).toEqual(2);

            const spyCalls = apiSpy.getCalls();
            const args = spyCalls[1].args[0];
            expect(args.award_category).toBeUndefined();

            apiSpy.restore();
        });

        it('should include a scope when the scope state is not "all"', async () => {
            const apiSpy = sinon.spy(require('helpers/agencyHelper'), 'fetchAwardRecipients');
            const container = mount(<RecipientContainer
                {...inboundProps} />);

            await container.instance().request.promise;
            expect(apiSpy.callCount).toEqual(1);

            container.setState({
                scope: 'contract'
            });

            container.instance().loadData(123, 2017, 1)
;
            await container.instance().request.promise;
            expect(apiSpy.callCount).toEqual(2);

            const spyCalls = apiSpy.getCalls();
            const args = spyCalls[1].args[0];
            expect(args.award_category).toEqual('contract');

            apiSpy.restore();
        });
    });

    describe('parseData', () => {
        it('should parse the returned API response', () => {
            const container = shallow(<RecipientContainer
                {...inboundProps} />);

            container.instance().parseData(mockRecipient.results);

            expect(container.state().dataSeries).toEqual(parsedSeries.dataSeries);
            expect(container.state().labelSeries).toEqual(parsedSeries.labelSeries);
        });
    });
});
