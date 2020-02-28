/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

const getChildren = (node) => {
    if (!node.children && node.naics.length <= 4) {
        return {
            children: [{
                isPlaceHolder: true,
                label: 'Placeholder Child',
                value: `children_of_${node.naics}`
            }]
        };
    }
    else if (node.children) {
        return {
            children: node.children.map((child) => {
                return {
                    ...child,
                    label: child.naics_description,
                    value: child.naics,
                    ...getChildren(child)
                };
            })
        };
    }
    return {};
};

const cleanNaicsData = (nodes) => nodes.map((node) => ({
    ...node,
    label: node.naics_description,
    value: node.naics,
    ...getChildren(node)
}));

export const setNaics = (key, nodes) => ({
    type: 'SET_NAICS',
    key,
    payload: cleanNaicsData(nodes)
});

export const setExpanded = (expanded, type = 'SET_EXPANDED') => ({
    type,
    payload: expanded
});

export const addChecked = (nodeValue) => ({
    type: 'ADD_CHECKED',
    payload: nodeValue
});

export const setChecked = (nodes) => ({
    type: 'SET_CHECKED',
    payload: nodes
});

export const setSearchedNaics = (nodes) => ({
    type: 'SET_SEARCHED_NAICS',
    payload: cleanNaicsData(nodes)
});
