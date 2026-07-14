import { cleanPscData } from "helpers/pscHelper";
import {
    setNodes,
    showTree,
    setExpanded,
    addChecked,
    setChecked,
    setUnchecked,
    setSearchedNodes,
    setCounts
} from "helpers/checkboxTreeHelper";

const treeName = 'PSC';

export const setPscNodes = (key, nodes) => setNodes(key, nodes, treeName, cleanPscData);
export const showPscTree = () => showTree(treeName);
export const setExpandedPsc = (expanded, type = 'SET_EXPANDED') => setExpanded(expanded, type, treeName);
export const addCheckedPsc = (nodeValue) => addChecked(nodeValue, treeName);
export const setCheckedPsc = (nodes) => setChecked(nodes, treeName);
export const setUncheckedPsc = (nodes) => setUnchecked(nodes, treeName);
export const setSearchedPsc = (nodes) => setSearchedNodes(nodes, treeName, cleanPscData);
export const setPscCounts = (newCounts) => setCounts(newCounts, treeName);
