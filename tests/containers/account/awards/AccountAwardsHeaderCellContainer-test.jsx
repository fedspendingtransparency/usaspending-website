/**
 * AccountAwardsHeaderCellContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AccountAwardsHeaderCellContainer } from
    'containers/account/awards/AccountAwardsHeaderCellContainer';

import mockReduxAwards from '../mockAccount';

const searchOrderAPI = {
    direction: 'desc',
    field: 'award_id'
};

const setupShallow = (props) => shallow(<AccountAwardsHeaderCellContainer {...props} />);

describe('AccountAwardsHeaderCellContainer', () => {
    describe('setSearchOrder', () => {
        it('should set a search order to redux', () => {
            const container = setupShallow({
                order: mockReduxAwards,
                setAccountAwardOrder: jest.fn()
            });

            // mount the container
            container.instance().setSearchOrder('award_id', 'desc');
            expect(container.instance().props.setAccountAwardOrder).toBeCalled();
            expect(container.instance().props.setAccountAwardOrder).toBeCalledWith(searchOrderAPI);
        });
    });
});
