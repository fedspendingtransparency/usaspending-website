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
