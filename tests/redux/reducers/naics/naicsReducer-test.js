import { naicsReducer, initialState } from 'redux/reducers/search/naicsReducer/naicsReducer';
import { List } from 'immutable';

describe('Naics Reducer', () => {
    it('should set naics', () => {
        const nodes = new List([{
            value: '11',
            label: 'Maxwell',
            path: [0],
            children: [{}]
        }]);
        const action = { nodes: nodes.toJS(), type: 'SET_NAICS' };
        const updatedRedux = naicsReducer(initialState, action);
        expect(updatedRedux.naics).toEqual(nodes);
    });
    it('should set expanded', () => {
        const expanded = new List(['11']);
        const action = { expanded: expanded.toJS(), type: 'SET_EXPANDED' };
        const updatedRedux = naicsReducer(initialState, action);
        expect(updatedRedux.expanded).toEqual(expanded);
    });
    it('should set checked', () => {
        const checked = new List(['11']);
        const action = { checked: checked.toJS(), type: 'SET_CHECKED' };
        const updatedRedux = naicsReducer(initialState, action);
        expect(updatedRedux.checked).toEqual(checked);
    });
});
