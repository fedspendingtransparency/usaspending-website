/**
 * AgencyFooterContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { AgencyFooterContainer } from
    'containers/agency/AgencyFooterContainer';
import Router from 'containers/router/Router';

import { mockCgacLoad } from './mockAgency';

jest.mock('helpers/agencyHelper', () => require('./agencyHelper'));
// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');


const routerPushSpy = sinon.spy(Router.history, 'push');

describe('AgencyFooterContainer', () => {
    describe('loadAgency', () => {
        it('should set the state of the loaded agency', async () => {
            const container = mount(<AgencyFooterContainer
                clearAllFilters={jest.fn()}
                updateSelectedAwardingAgencies={jest.fn()} />);
            const mockAgencyLoad = jest.fn();
            container.instance().fetchAgencyCgacCode = mockAgencyLoad;

            container.instance().loadAgency('123');

            await container.instance().request.promise;
            expect(container.instance().state.agency).toEqual(mockCgacLoad.agency);
            expect(container.instance().state.ready).toEqual(true);
        });
    });
    describe('clickedSearch', () => {
        it('should clear filters on click', () => {
            const container = shallow(<AgencyFooterContainer
                clearAllFilters={jest.fn()} />);
            container.instance().clickedSearch();
            expect(container.instance().props.clearAllFilters).toBeCalled();
        });
        it('should push search to router', () => {
            const container = shallow(<AgencyFooterContainer
                clearAllFilters={jest.fn()} />);
            container.instance().clickedSearch();
            expect(routerPushSpy.calledWith('/search')).toBeTruthy();

            routerPushSpy.reset();
        });
    });
});
