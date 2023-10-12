/**
 * @jest-environment jsdom
 * 
 * MapLegendToggleReducer-test.js
 * Created by Jonathan Hill 04/15/20
 */


import mapLegendToggleReducer from 'redux/reducers/search/mapLegendToggleReducer';

describe('Map Legend Toggle Reducer', () => {
    it('should return default', () => {
        expect(mapLegendToggleReducer('totalSpending', { type: 'HI_YOU', value: 'totalSpending' }))
            .toEqual('totalSpending');
    });
    it('should return update value', () => {
        expect(mapLegendToggleReducer('totalSpending', { type: 'UPDATE_MAP_LEGEND_TOGGLE', value: 'perCapita' }))
            .toEqual('perCapita');
    });
    it('should return reset value', () => {
        expect(mapLegendToggleReducer('perCapita', { type: 'RESET_MAP_LEGEND_TOGGLE', value: 'totalSpending' }))
            .toEqual('totalSpending');
    });
});
