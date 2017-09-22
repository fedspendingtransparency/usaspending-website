/**
 * ObligatedContainer-test.jsx
 * Created by Lizzie Salita 6/14/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { ObligatedContainer } from 'containers/agency/visualizations/ObligatedContainer';

import { mockObligatedAmounts } from './mocks/mockObligatedAmounts';

jest.mock('helpers/agencyHelper', () => require('../agencyHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(ObligatedContainer.prototype, 'loadData');

const inboundProps = {
    id: '246',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/obligated/ObligatedVisualization', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

describe('ObligatedContainer', () => {
    it('should make an API call for the selected agency obligated amounts on mount', async () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        await container.instance().searchRequest.promise;

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();
    });

    it('should make a new API call for obligated amounts when the inbound agency ID prop' +
        ' changes', async () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        await container.instance().searchRequest.promise;

        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY);
        loadDataSpy.reset();
    });

    it('should correctly set the state values', async () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        await container.instance().searchRequest.promise;

        expect(container.instance().state.obligatedAmount).toEqual(300);
        expect(container.instance().state.budgetAuthority).toEqual(400);
        expect(container.instance().state.outlay).toEqual(200);
    });
});
