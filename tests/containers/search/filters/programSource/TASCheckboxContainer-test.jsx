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
        it('gets all nodes and adds child placeholders', async () => {
            await container.instance().componentDidMount();
            expect(container.state().nodes.length).toEqual(10);
            container.state().nodes
                .forEach((node) => {
                    expect(node.children.length).toEqual(1);
                    expect(node.children[0].isPlaceHolder).toEqual(true);
                });
        });
    });
});
