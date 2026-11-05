import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    autoCheckTasAfterExpand,
    expandTasNodeAndAllDescendantParents,
    getTasNodeFromTree,
    getTasAncestryPathForChecked
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';
import { updateTAS } from 'redux/actions/search/searchFilterActions';
import {
    setTasNodes,
    showTasTree,
    setExpandedTas,
    setCheckedTas,
    setUncheckedTas,
    setSearchedTas,
    setTasCounts
} from 'redux/actions/search/tasActions';

export const tasTreeConfig = {
    stateKey: 'tas',
    filterKey: 'tasCodes',
    label: 'TAS',
    fetchFn: fetchTas,
    cleanFn: cleanTasData,
    buildSearchQuery: (searchString) => `?depth=2&filter=${searchString}`,
    minSearchLength: 3,
    sortNodes: (a, b) => a.label.localeCompare(b.label),
    updateFilter: updateTAS,
    actions: {
        setNodes: setTasNodes,
        showTree: showTasTree,
        setExpanded: setExpandedTas,
        setChecked: setCheckedTas,
        setUnchecked: setUncheckedTas,
        setSearched: setSearchedTas,
        setCounts: setTasCounts
    },
    helpers: {
        getNodeFromTree: getTasNodeFromTree,
        incrementCount: incrementTasCountAndUpdateUnchecked,
        decrementCount: decrementTasCountAndUpdateUnchecked,
        autoCheckAfterExpand: autoCheckTasAfterExpand,
        expandParents: expandTasNodeAndAllDescendantParents,
        getAncestryPath: getTasAncestryPathForChecked
    }
};

export default tasTreeConfig;
