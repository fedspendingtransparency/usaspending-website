/**
  * mapLegendActions.js
  * Created by Jonathan Hill 04/13/20
  **/

export const resetMapLegendToggle = () => ({
    type: 'RESET_MAP_LEGEND_TOGGLE'
});

export const updateMapLegendToggle = (value) => ({
    type: 'UPDATE_MAP_LEGEND_TOGGLE',
    value
});
