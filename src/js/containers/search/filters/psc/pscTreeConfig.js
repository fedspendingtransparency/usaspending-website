/**
 * pscTreeConfig.js
 * Created by JD House 11/05/2026
*/

import {
    cleanPscData,
    incrementPscCountAndUpdateUnchecked,
    decrementPscCountAndUpdateUnchecked,
    autoCheckPscAfterExpand,
    expandPscNodeAndAllDescendantParents,
    getPscNodeFromTree,
    getPscAncestryPathForChecked
} from 'helpers/pscHelper';
import { fetchPsc } from 'helpers/searchHelper';
import { updatePSC } from 'redux/actions/search/searchFilterActions';
import {
    setCheckedPsc,
    setExpandedPsc,
    setPscCounts,
    setPscNodes,
    setSearchedPsc,
    setUncheckedPsc,
    showPscTree
} from 'redux/actions/search/pscActions';

export const pscTreeConfig = {
    stateKey: 'psc',
    filterKey: 'pscCodes',
    label: 'PSC',
    fetchFn: fetchPsc,
    cleanFn: cleanPscData,
    buildSearchQuery: (searchString) => `?depth=-1&filter=${searchString}`,
    minSearchLength: 2,
    updateFilter: updatePSC,
    actions: {
        setNodes: setPscNodes,
        showTree: showPscTree,
        setExpanded: setExpandedPsc,
        setChecked: setCheckedPsc,
        setUnchecked: setUncheckedPsc,
        setSearched: setSearchedPsc,
        setCounts: setPscCounts
    },
    helpers: {
        getNodeFromTree: getPscNodeFromTree,
        incrementCount: incrementPscCountAndUpdateUnchecked,
        decrementCount: decrementPscCountAndUpdateUnchecked,
        autoCheckAfterExpand: autoCheckPscAfterExpand,
        expandParents: expandPscNodeAndAllDescendantParents,
        getAncestryPath: getPscAncestryPathForChecked
    }
};

export default pscTreeConfig;
