/**
 * MapList-test.jsx
 * Created by Kevin Li 5/25/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import MapList from 'components/homepage/visualizations/geo/MapList';
import HomepageStateModel from 'models/homepage/HomepageStateModel';

import { mockMap, mockProps } from '../../mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/sharedComponents/IBTable/IBTable', () =>
    jest.fn(() => null));

const mockWidth = {
    clientWidth: 1025
};

const prepareTableSpy = sinon.spy(MapList.prototype, 'prepareTable');

describe('Homepage - MapList', () => {
    it('should prepare the data table on mount', () => {
        const component = shallow(<MapList data={mockProps.mapData.table} />);
        component.instance().tableWidthController = mockWidth;
        component.instance().componentDidMount();

        expect(prepareTableSpy.callCount).toEqual(1);
        prepareTableSpy.reset();
    });

    describe('prepareTable', () => {
        it('should sort the table data based on the state', () => {
            const component = shallow(<MapList data={mockProps.mapData.table} />);
            component.instance().tableWidthController = mockWidth;

            const expectedData = [
                new HomepageStateModel(mockMap.states.children[2]),
                new HomepageStateModel(mockMap.states.children[1]),
                new HomepageStateModel(mockMap.states.children[0])
            ];

            component.setState({
                sort: {
                    field: 'amount',
                    direction: 'asc'
                }
            });

            component.instance().prepareTable(mockProps.mapData.table);
            expect(component.state().sortedData).toEqual(expectedData);
        });
    });

    describe('changeSearchOrder', () => {
        it('should update the component state', () => {
            const component = shallow(<MapList data={mockProps.mapData.table} />);
            component.instance().tableWidthController = mockWidth;

            expect(component.state().sort.field).toEqual('state');
            expect(component.state().sort.direction).toEqual('asc');

            component.instance().changeSearchOrder('amount', 'desc');
            expect(component.state().sort.field).toEqual('amount');
            expect(component.state().sort.direction).toEqual('desc');
        });

        it('should prepare the data table again', () => {
            prepareTableSpy.reset();
            const component = shallow(<MapList data={mockProps.mapData.table} />);
            component.instance().tableWidthController = mockWidth;

            expect(prepareTableSpy.callCount).toEqual(0);

            component.instance().changeSearchOrder('amount', 'desc');
            expect(prepareTableSpy.callCount).toEqual(1);
            prepareTableSpy.reset();
        });
    });
});
