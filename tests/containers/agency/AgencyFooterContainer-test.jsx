/**
 * AgencyFooterContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AgencyFooterContainer } from
    'containers/agency/AgencyFooterContainer';

jest.mock('helpers/agencyHelper', () => require('./agencyHelper'));
// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');


describe('AgencyFooterContainer', () => {
    describe('clickedSearch', () => {
        it('should clear filters on click', () => {
            const container = shallow(<AgencyFooterContainer
                clearAllFilters={jest.fn()} />);
            container.instance().clickedSearch();
            expect(container.instance().props.clearAllFilters).toBeCalled();
        });
    });
});
