/**
 * ObligatedContainer-test.jsx
 * Created by Lizzie Salita 6/14/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { ObligatedContainer } from 'containers/agency/visualizations/ObligatedContainer';

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(ObligatedContainer.prototype, 'loadData');
const setCgacCodeSpy = sinon.spy(
    ObligatedContainer.prototype, 'setCgacCode');
const setFiscalQuarterSpy = sinon.spy(
    ObligatedContainer.prototype, 'setFiscalQuarter');

const inboundProps = {
    id: '246',
    activeFY: '2017'
};

jest.mock('helpers/agencyHelper', () => require('../../../containers/agency/agencyHelper'));

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
        setCgacCodeSpy.reset();
        setFiscalQuarterSpy.reset();
    });

    it('should make an API call for the selected agency CGAC codes after loading data', async () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        await container.instance().searchRequest.promise;

        expect(setCgacCodeSpy.callCount).toEqual(1);

        loadDataSpy.reset();
        setCgacCodeSpy.reset();
        setFiscalQuarterSpy.reset();
    });

    it('should make an API call for the selected agency fiscal quarters after loading CGAC data', async () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        await container.instance().searchRequest.promise;

        expect(setFiscalQuarterSpy.callCount).toEqual(1);

        loadDataSpy.reset();
        setCgacCodeSpy.reset();
        setFiscalQuarterSpy.reset();
    });

    it('should make a new API call for obligated amounts when the inbound agency ID prop' +
        ' changes', () => {
        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY);
        loadDataSpy.reset();
        setCgacCodeSpy.reset();
        setFiscalQuarterSpy.reset();
    });
});
