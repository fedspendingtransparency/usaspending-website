/**
 * mapLegendToggleReducer.js
 * Created by Jonathan Hill 04/13/20
 */

const mapLegendToggleReducer = (state = 'totalSpending', action) => {
    switch (action.type) {
        case 'RESET_MAP_LEGEND_TOGGLE': {
            return 'totalSpending';
        }
        case 'UPDATE_MAP_LEGEND_TOGGLE': {
            return action.value;
        }
        default:
            return state;
    }
};

export default mapLegendToggleReducer;
