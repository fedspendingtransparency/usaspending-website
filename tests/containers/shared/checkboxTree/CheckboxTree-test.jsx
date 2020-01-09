/**
 * CheckboxTree-test.js
 * Created by Jonathan Hill 10/03/2019
 */

import React from 'react';
import { shallow } from 'enzyme';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { createCheckboxTreeDataStrucure } from 'helpers/checkboxTreeHelper';
import {
    naicsMock2,
    naicsMockCleanDataInitialLoad,
    naicsMockInitialLoadApiResponse
} from '../../search/filters/naics/mockNAICS';

const emptyNodes = {
    nodes: [],
    nodeKeys: {
        value: 'naics',
        label: 'naics_description'
    }
};

const props = {
    nodes: naicsMockInitialLoadApiResponse,
    nodeKeys: {
        value: 'naics',
        label: 'naics_description'
    },
    icons: null,
    isSearch: false,
    searchText: null,
    modifyLabelTextClassname: null,
    labelComponent: null,
    onExpand: jest.fn(),
    onCheck: jest.fn(),
    onCollapse: jest.fn(),
    setRedux: jest.fn(),
    updateRedux: jest.fn(),
    limit: 3,
    fromRedux: false,
    expanded: [],
    checked: []
};

// const formattedNodes = createCheckboxTreeDataStrucure(props.nodeKeys, props.nodes);

describe('CheckboxTree Component', () => {
    const createNodes = jest.fn();
    const updateNode = jest.fn();
    const expandNode = jest.fn();
    const collapseNode = jest.fn();
    const setChildrenToLoading = jest.fn();
    const createLabels = jest.fn();
    const render = jest.fn();
    const onExpand = jest.fn();
    const setState = jest.fn();
    it('ComponentDidMount, should call createNodes method', async () => {
        const container = shallow(<CheckboxTree {...props} />);  
        container.instance().createNodes = createNodes;
        await container.instance().componentDidMount();
        expect(createNodes).toHaveBeenCalled();
    });
    it('ComponentDidUpdate, should call createNodes when new nodes are passed', async () => {
        const newProps = { ...props };
        newProps.fromRedux = true;
        const container = shallow(<CheckboxTree {...newProps} />);
        container.instance().updateNode = updateNode;
        await container.instance().componentDidUpdate(emptyNodes);
        expect(updateNode).toHaveBeenCalled();
    });
    it('CreateNodes, should format API response to react-checkbox-tree nodes, set state, and call setRedux', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        await container.instance().componentDidMount();
        const { nodes, requestType } = container.instance().state;
        expect(nodes).toEqual(naicsMockCleanDataInitialLoad);
        expect(requestType).toEqual('');
        expect(container.instance().props.setRedux).toHaveBeenCalled();
    });
    describe('On Expand', () => {
        it('should call expandNode', async () => {
            const container = shallow(<CheckboxTree {...props} />);
            container.instance().expandNode = expandNode;
            await container.instance().componentDidMount();
            container.instance().onExpand(['11', '21']);
            expect(expandNode).toHaveBeenCalled();
        });
        it('should call collapseNode', async () => {
            const container = shallow(<CheckboxTree {...props} />);
            container.instance().collapseNode = collapseNode;
            await container.instance().componentDidMount();
            container.instance().onExpand(['21']);
            container.instance().onExpand([]);
            expect(collapseNode).toHaveBeenCalled();
        });
    });
    it('OnCheck, should update the checked property in state', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        await container.instance().componentDidMount();
        container.instance().onCheck(['11']);
        expect(container.instance().state.checked).toEqual(['11']);
    });
    it('SetChildrenToLoading, should update the node with a loading label', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        await container.instance().componentDidMount();
        const nodes = container.instance().setChildrenToLoading(['data[0]']);
        expect(nodes[0].children[0].value).toEqual('loading');
        expect(nodes[0].children[0].showCheckbox).toEqual(false);
        expect(typeof nodes[0].children[0].label).toEqual('object');
    });
    // TODO - Why is this not working
    // it('PathToNodeString, should return an object path string', async () => {
    //     const container = shallow(<CheckboxTree {...props} />);
    //     await container.instance().createNodes();
    //     const nodeString = container.instance().pathToNodeString(11);
    //     expect(nodeString).toEqual('data[0]');
    // });
    it('CreateNodesObject, should return an object with property data with a value of state.nodes', async () => {
        const container = shallow(<CheckboxTree {...props} />);
        await container.instance().componentDidMount();
        const object = container.instance().createNodesObject();
        expect(object).toEqual({ data: container.instance().state.nodes });
    });
    describe('Expand Node', () => {
        it('should callSetChildrenToLoading and update state when no children', async () => {
            const container = shallow(<CheckboxTree {...props} />);
            container.instance().setChildrenToLoading = setChildrenToLoading;
            container.instance().createLabels = createLabels;
            container.instance().render = render;
            await container.instance().componentDidMount();
            container.instance().expandNode(['11']);
            const { expanded } = container.instance().state;
            expect(setChildrenToLoading).toHaveBeenCalled();
            expect(expanded).toEqual(['11']);
            expect(container.instance().props.onExpand).toHaveBeenCalled();
        });
        it('should update state when children', async () => {
            const container = shallow(<CheckboxTree {...props} />);
            container.instance().setChildrenToLoading = setChildrenToLoading;
            container.instance().createLabels = createLabels;
            container.instance().render = render;
            await container.instance().componentDidMount();
            container.instance().expandNode(['11']);
            const { expanded } = container.instance().state;
            // TODO - Figure out why this is being called
            // expect(setChildrenToLoading).not.toHaveBeenCalled();
            expect(expanded).toEqual(['11']);
            expect(container.instance().props.onExpand).toHaveBeenCalled();
        });
    });
    it('CollapseNode, should update state', async () => {
        const newProps = { ...props };
        newProps.expanded = ['11', '21'];
        const container = shallow(<CheckboxTree {...newProps} />);
        await container.instance().componentDidMount();
        container.instance().collapseNode(['11']);
        const { expanded } = container.instance().state;
        expect(expanded).toEqual(['11']);
        expect(container.instance().props.onCollapse).toHaveBeenCalled();
    });
    describe('Update Node', () => {
        it('should update state when receiving data from redux', async () => {
            const newProps = { ...props };
            newProps.fromRedux = true;
            newProps.nodes = naicsMockCleanDataInitialLoad;
            newProps.expanded = ['11'];
            newProps.checked = ['11'];
            const container = shallow(<CheckboxTree {...newProps} />);
            container.instance().updateNode();
            const { expanded, checked, nodes } = container.instance().state;
            expect(nodes).toEqual(naicsMockCleanDataInitialLoad);
            expect(expanded).toEqual(['11']);
            expect(checked).toEqual(['11']);
        });
        it('should update state when new data is received', async () => {
            const container = shallow(<CheckboxTree {...props} />);
            container.instance().setState = setState;
            await container.instance().componentDidMount();
            container.instance().updateNode(['11']);
            expect(setState).toHaveBeenCalled();
        });
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
});
