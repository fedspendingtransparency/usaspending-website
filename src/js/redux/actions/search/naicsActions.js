/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

export const setNaics = (nodes) => ({
    type: 'SET_NAICS',
    nodes
});

export const setExpanded = (expanded) => ({
    type: 'SET_EXPANDED',
    expanded
});

export const setChecked = (checked) => ({
    type: 'SET_CHECKED',
    checked
});
