/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

export const setNaics = (nodes) => ({
    type: 'SET_NAICS',
    payload: nodes
});

export const setExpanded = (expanded) => ({
    type: 'SET_EXPANDED',
    payload: expanded
});

export const setChecked = (checked) => ({
    type: 'SET_CHECKED',
    payload: checked
});
