/**
 * ObjectClassContainer-test.jsx
 * Created by michaelbray on 6/14/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';

jest.mock('helpers/agencyHelper', () => require('../../agency/agencyHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const fetchMajorObjectClassesSpy = sinon.spy(
    ObjectClassContainer.prototype, 'fetchMajorObjectClasses');
const fetchMinorObjectClassesSpy = sinon.spy(
    ObjectClassContainer.prototype, 'fetchMinorObjectClasses');

const inboundProps = {
    id: '246',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/objectClass/ObjectClassTreeMap', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

describe('ObjectClassContainer', () => {
    it('should make an API call for the selected agency object classes on mount', async () => {
        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        await container.instance().searchRequest.promise;

        expect(fetchMajorObjectClassesSpy.callCount).toEqual(1);
        fetchMajorObjectClassesSpy.reset();
    });

    it('should make a new API call for major object classes when the inbound agency ID prop' +
        ' changes', async () => {
        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        const fetchMajorObjectClassesMock = jest.fn();
        container.instance().fetchMajorObjectClasses = fetchMajorObjectClassesMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        await container.instance().searchRequest.promise;

        expect(fetchMajorObjectClassesMock).toHaveBeenCalledWith('555', inboundProps.activeFY);
        fetchMajorObjectClassesSpy.reset();
    });

    it('should make an API call for the minor object classes', async () => {
        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        container.instance().fetchMinorObjectClasses('00');

        await container.instance().searchRequest.promise;

        expect(fetchMinorObjectClassesSpy.callCount).toEqual(1);
        fetchMinorObjectClassesSpy.reset();
    });

    it('should correctly sum the total obligation for major and minor object classes', async () => {
        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        container.instance().fetchMinorObjectClasses('00');

        await container.instance().searchRequest.promise;

        expect(container.instance().state.totalObligation).toEqual(1520);
        expect(container.instance().state.totalMinorObligation).toEqual(300);
    });

    it('should set the state to reflect the presence of negative obligations', async () => {
        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        container.instance().fetchMinorObjectClasses('00');

        await container.instance().searchRequest.promise;

        expect(container.instance().state.hasNegatives).toEqual(true);
        expect(container.instance().state.minorHasNegatives).toEqual(false);
    });
});
