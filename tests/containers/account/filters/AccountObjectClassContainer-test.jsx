/**
 * AccountObjectClassContainer-test.jsx
 * Created by Kevin Li 3/31/17
 */


import React from 'react';
import { shallow } from 'enzyme';
import { OrderedSet } from 'immutable';

import { AccountObjectClassContainer } from
    'containers/account/filters/AccountObjectClassContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/filters/objectClass/ObjectClassFilter', () =>
    jest.fn(() => null));

const defaultFilters = {
    selectedCodes: new OrderedSet()
};

describe('AccountObjectClassContainer', () => {
    describe('updateFilter', () => {
        it('should trigger a Redux action with the new filter values', (done) => {
            const expected = '10';

            const reduxAction = jest.fn((args) => {
                expect(args).toEqual(expected);
                done();
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                toggleObjectClass={reduxAction} />);

            container.instance().updateFilter('10');
            expect(reduxAction).toHaveBeenCalled();
        });
    });
});
