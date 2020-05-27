/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

import { cleanNaicsData } from "helpers/naicsHelper";
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

const treeName = 'NAICS';

export const setNaicsNodes = (key, nodes) => setNodes(key, nodes, treeName, cleanNaicsData);
export const showNaicsTree = () => showTree(treeName);
export const setExpandedNaics = (expanded, type = 'SET_EXPANDED') => setExpanded(expanded, type, treeName);
export const addCheckedNaics = (nodeValue) => addChecked(nodeValue, treeName);
export const setCheckedNaics = (nodes) => setChecked(nodes, treeName);
export const setUncheckedNaics = (nodes) => setUnchecked(nodes, treeName);
export const setSearchedNaics = (nodes) => setSearchedNodes(nodes, treeName, cleanNaicsData);
export const setNaicsCounts = (newCounts) => setCounts(newCounts, treeName);

