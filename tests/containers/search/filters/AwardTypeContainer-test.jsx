/**
 * AwardTypeContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AwardTypeContainer } from
    'containers/search/filters/AwardTypeContainer';

const setupShallow = (props) => shallow(<AwardTypeContainer {...props} />);

describe('AwardTypeContainer', () => {
    describe('toggleAwardType', () => {
        it('should set the toggle in redux', () => {
            const container = setupShallow({
                awardType: [],
                toggleAwardType: jest.fn(),
                bulkAwardTypeChange: jest.fn()
            });

            // mount the container
            container.instance().toggleAwardType(['02', '03', '04', '05']);
            expect(container.instance().props.toggleAwardType).toBeCalled();
            expect(container.instance().props.toggleAwardType).toBeCalledWith(['02', '03', '04', '05']);
        });
    });
});
