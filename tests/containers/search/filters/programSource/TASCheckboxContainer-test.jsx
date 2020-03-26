/**
 * Created by Max Kendall
 * 03/25/2020
 */
import React from 'react';
import { shallow } from 'enzyme';

import TASCheckboxTreeContainer from "../../../../../src/js/containers/search/filters/programSource/TASCheckboxTreeContainer";

jest.mock('helpers/searchHelper', () => require('../searchHelper'));

describe('TASCheckboxContainer', () => {
    describe('initial fetch', () => {
        const container = shallow(<TASCheckboxTreeContainer />);
        it('calls something', async () => {
            await container.instance().componentDidMount()
            expect(container.state().nodes.length).toEqual('10');
        });
    });
});
