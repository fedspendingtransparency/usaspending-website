/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

const getChildren = (node) => {
    if (!node.children && node.naics.length <= 4) {
        return {
            children: [{ isPlaceHolder: true, label: 'Placeholder Child', value: `${node.naics}childPlaceholder` }]
        };
    }
    else if (node.children) return { children: node.children };
    return {};
};

const cleanNaicsData = (nodes) => nodes.map((node) => ({
    ...node,
    label: node.naics_description || node.label,
    value: node.naics || node.value,
    ...getChildren(node)
}));

export const setNaics = (key, nodes) => ({
    type: 'SET_NAICS',
    key,
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
