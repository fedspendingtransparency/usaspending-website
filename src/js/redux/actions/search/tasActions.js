import { cleanTasData } from "helpers/tasHelper";
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

const treeName = 'TAS';

export const setTasNodes = (key, nodes) => setNodes(key, nodes, treeName, cleanTasData);
export const showTasTree = () => showTree(treeName);
export const setExpandedTas = (expanded, type = 'SET_EXPANDED') => setExpanded(expanded, type, treeName);
export const addCheckedTas = (nodeValue) => addChecked(nodeValue, treeName);
export const setCheckedTas = (nodes) => setChecked(nodes, treeName);
export const setUncheckedTas = (nodes) => setUnchecked(nodes, treeName);
export const setSearchedTas = (nodes) => setSearchedNodes(nodes, treeName, cleanTasData);
export const setTasCounts = (newCounts) => setCounts(newCounts, treeName);
