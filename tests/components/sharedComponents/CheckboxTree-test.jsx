/**
 * CheckboxTree-test.js
 * Created by Jonathan Hill 10/03/2019
**/

import React from 'react';
import { mount, shallow } from 'enzyme';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import createCheckboxTreeDataStrucure from 'helpers/checkboxTreeHelper';
import { naicsMock2 } from '../../containers/search/filters/naics/mockNAICS';


// import { IdvActivityContainer } from 'containers/awardV2/idv/IdvActivityContainer';
// import BaseIdvActivityBar from 'models/v2/awardsV2/BaseIdvActivityBar';
// import { mockRedux, mockActions } from '../mockAward';
// import { mockIdvActivity } from '../../models/awardsV2/mockAwardApi';

// jest.mock('helpers/idvHelper', () => require('../awardV2Helper'));

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
        expect(container.instance().state.nodes).toEqual(formattedNodes);
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

    // const loadAwards = jest.fn();
    // const parseAwards = jest.fn();
    // it('should make an API call for the awards on mount', async () => {
    //     const container = mount(<IdvActivityContainer {...mockActions} {...mockRedux} />);

    //     container.instance().loadAwards = loadAwards;
    //     container.instance().parseAwards = parseAwards;
    //     await container.instance().componentDidMount();

    //     expect(loadAwards).toHaveBeenCalled();
    // });

    // it('should make an API call when the award ID props changes', async () => {
    //     const container = shallow(<IdvActivityContainer awardId="1234" />);

    //     container.instance().loadAwards = loadAwards;

    //     await container.instance().componentDidMount();

    //     container.setProps({ awardId: "456" });

    //     expect(loadAwards).toHaveBeenCalled();
    // });

    // it('should parse returned awards and set the state', () => {
    //     const container = shallow(<IdvActivityContainer awardId="1234" />);

    //     const awards = mockIdvActivity.results.map((award) => {
    //         const idvActivityBar = Object.create(BaseIdvActivityBar);
    //         idvActivityBar.populate(award);
    //         return idvActivityBar;
    //     });

    //     container.instance().parseAwards(mockIdvActivity.results);

    //     expect(container.state().awards).toEqual(awards);
    // });

    // it('should change the page and update state and call api', () => {
    //     const container = shallow(<IdvActivityContainer awardId="1234" />);
    //     container.instance().loadAwards = loadAwards;
    //     container.instance().changePage(2);

    //     expect(container.state().page).toEqual(2);
    //     expect(loadAwards).toHaveBeenCalled();
    // });
});
