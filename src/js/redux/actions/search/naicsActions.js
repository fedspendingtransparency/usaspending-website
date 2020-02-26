/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

const cleanNaicsData = (nodes) => nodes.map((node) => ({
    ...node,
    label: node.naics_description,
    value: node.naics,
    children: node.children
        ? node.children
        : [{ isPlaceHolder: true, label: 'Placeholder Child', value: `${node.naics}childPlaceholder` }]
}));

export const setNaics = (nodes) => ({
    type: 'SET_NAICS',
    payload: cleanNaicsData(nodes)
});

export const setExpanded = (expanded) => ({
    type: 'SET_EXPANDED',
    payload: expanded
});

export const setChecked = (checked) => ({
    type: 'SET_CHECKED',
    payload: checked
});

export const setSearchedNaics = (nodes) => ({
    type: 'SET_SEARCHED_NAICS',
    payload: cleanNaicsData(nodes)
});
