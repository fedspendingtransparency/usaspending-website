/**
  * CheckboxTree-test.js
  * Created by Jonathan Hill 10/03/2019
  **/

import React from 'react';
import { shallow } from 'enzyme';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import createCheckboxTreeDataStrucure from 'helpers/checkboxTreeHelper';
import { naicsMock2, naicsMockCleanDataInitialLoad } from '../../search/filters/naics/mockNAICS';

const emptyNodes = {
    nodes: [],
    nodeKeys: {
        value: 'naics',
        label: 'naics_description'
    }
};

const props = {
    nodes: naicsMock2,
    nodeKeys: {
        value: 'naics',
        label: 'naics_description'
    }
};

const formattedNodes = createCheckboxTreeDataStrucure(props.nodeKeys, props.nodes);

describe('CheckboxTree Component', () => {
    const createNodes = jest.fn();
    it('ComponentDidMount, should call createNodes method', async () => {
        const container = shallow(<CheckboxTree {...props} />);  
        container.instance().createNodes = createNodes;
        await container.instance().componentDidMount();
        expect(createNodes).toHaveBeenCalled();
    });
    it('ComponentDidUpdate, should call createNodes when new nodes are passed', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        container.instance().createNodes = createNodes;
        await container.instance().componentDidUpdate(emptyNodes);
        expect(createNodes).toHaveBeenCalled();
    });
    it('CreateNodes, should format API response to react-checkbox-tree nodes and set state', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        await container.instance().componentDidMount();
        expect(container.instance().state.nodes).toEqual(naicsMockCleanDataInitialLoad);
    });
    it('OnExpand, should update the expanded property in state', () => {
        const container = shallow(<CheckboxTree {...props} />);
        container.instance().onExpand(['11']);
        expect(container.instance().state.expanded).toEqual(['11']);
    });
    it('OnCheck, should update the checked property in state', () => {
        const container = shallow(<CheckboxTree {...props} />);
        container.instance().onExpand(['11']);
        expect(container.instance().state.expanded).toEqual(['11']);
    });
    describe('Highlight Text', () => {
        it('should highlight text', () => {
            const container = shallow(<CheckboxTree
                {...props}
                searchText="im" />);
            const highlighted = container.instance().highlightText('Jimbo');
            expect(highlighted).toHaveLength(3);
        });
        it('should not highlight text', () => {
            const container = shallow(<CheckboxTree
                {...props}
                searchText="im" />);
            const highlighted = container.instance().highlightText('Dolphin');
            expect(highlighted).toHaveLength(1);
        });
    });
    // TODO - write better tests to tests actually html
    it('CreateLabels, should create labels that are not strings', () => {
        const container = shallow(<CheckboxTree {...props} />);
        const nodes = container.instance().createLabels(formattedNodes);
        expect(typeof nodes[0].label).not.toBe('string');
    });
});
