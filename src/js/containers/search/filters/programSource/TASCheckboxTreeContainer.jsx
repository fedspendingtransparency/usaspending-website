import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get, flattenDeep } from 'lodash';
import { connect } from 'react-redux';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    autoCheckTasAfterExpand,
    expandTasNodeAndAllDescendantParents,
    getTasNodeFromTree,
    getTasAncestryPathForChecked,
    shouldTasNodeHaveChildren
} from 'helpers/tasHelper';
import { fetchTas as fetchTasHelper } from 'helpers/searchHelper';
import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors,
    doesMeetMinimumCharsRequiredForSearch
} from 'helpers/checkboxTreeHelper';
import {
    setTasNodes,
    showTasTree,
    setExpandedTas,
    setCheckedTas,
    setUncheckedTas,
    setSearchedTas,
    setTasCounts
} from 'redux/actions/search/tasActions';
import { updateTAS } from 'redux/actions/search/searchFilterActions';

// import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import CheckboxTree from 'components/sharedComponents/checkbox/checkboxTree/CheckboxTree';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';
import { CSSOnlyTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';

const propTypes = {
    setTasNodes: PropTypes.func,
    setExpandedTas: PropTypes.func,
    setCheckedTas: PropTypes.func,
    setSearchedTas: PropTypes.func,
    setTasCounts: PropTypes.func,
    showTasTree: PropTypes.func,
    setUncheckedTas: PropTypes.func,
    stageTas: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    showInfo: PropTypes.bool,
    searchV2: PropTypes.bool
};

const SearchNote = () => (
    <div className="tas-checkbox-tt">
        <p>
            The following nested hierarchy shows Agency, Federal Accounts owned by that Agency, and Treasury Account Symbols (TAS) within each Federal Account.
        </p>
        <br />
        <p>Filter the options below by typing any of the following:</p>
        <ul>
            <li>Any part of an Agency name</li>
            <li>Any part of a Federal Account symbol or title</li>
            <li>Any part of a Treasury Account Symbol or title.</li>
        </ul>
    </div>
);

const TASCheckboxTree = ({
    showInfo = true, // eslint-disable-next-line no-shadow
    setTasNodes, // eslint-disable-next-line no-shadow
    setExpandedTas, // eslint-disable-next-line no-shadow
    setCheckedTas, // eslint-disable-next-line no-shadow
    setSearchedTas, // eslint-disable-next-line no-shadow
    setTasCounts, // eslint-disable-next-line no-shadow
    showTasTree, // eslint-disable-next-line no-shadow
    setUncheckedTas, 
    stageTas,
    expanded,
    checked,
    unchecked,
    checkedFromHash,
    uncheckedFromHash,
    nodes,
    searchExpanded,
    counts,
    searchV2,
    countsFromHash
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);
    const [isSearch, setIsSearch] = useState(false);


    let request = null;
    const hint = useRef();

    // const {
    //     nodes,
    //     expanded,
    //     searchExpanded,
    //     checked,
    //     unchecked,
    //     counts
    // } = useSelector((state) => state.tas);

    // const checkedFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.require);
    // const uncheckedFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.exclude);
    // const countsFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.counts);

    // const dispatch = useDispatch();

    // eslint-disable-next-line react/sort-comp
    const updateTasCountandStage = (count, stageArgs) => {
        setTasCounts(count);
        stageTas(...stageArgs);
    };

    const setCheckedStateFromUrlHash = (newChecked) => {
        if (nodes?.length > 0) {
            const uncheckedFromHashTmp = uncheckedFromHash.map((ancestryPath) => ancestryPath.pop());
            setUncheckedTas(uncheckedFromHash);
            const realCheckedWithPlaceholders = flattenDeep(newChecked
                .map((ch) => getAllDescendants(getTasNodeFromTree(nodes, ch), uncheckedFromHashTmp))
            );

            setCheckedTas(realCheckedWithPlaceholders);
            setIsLoading(false);
            setIsError(false);
        }
    };

    const autoCheckSearchResultDescendants = () => {
        const newChecked = expanded
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checked.includes(`children_of_${expandedNode}`)) return true;
                if (checked.includes(expandedNode)) return true;
                return false;
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                if (!expandedAndChecked) return acc;
                const node = getTasNodeFromTree(nodes, expandedAndChecked);
                if (shouldTasNodeHaveChildren(node)) {
                    return [...acc, ...node.children.map((tas) => tas.value)];
                }
                return acc;
            }, []);

        return new Set([...checked, ...newChecked]);
    };


    const fetchTas = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (request) request.cancel();
        if (id === '') {
            setIsLoading(true);
        }
        if (showNoResults) {
            setShowNoResults(false);
        }
        const queryParam = isSearch ? `?depth=2&filter=${searchStr}` : id;
        request = fetchTasHelper(queryParam);
        const isPartialTree = (id !== '' || isSearch);
        return request.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const tmpNodes = cleanTasData(data.results);
                console.log("data when tas fetched", tmpNodes);
                if (isPartialTree) {
                    // parsing the prepended agency (format in url is agencyId/federalAccountId when fetching federalAccount level data)
                    const key = id.includes('/')
                        ? id.split('/')[1]
                        : id;
                    if (resolveLoadingIndicator) {
                        setIsLoading(false);
                    }

                    // this fails because on check fails
                    const newChecked = checked.includes(`children_of_${key}`)
                        ? autoCheckTasAfterExpand(
                            { children: tmpNodes, value: key },
                            checked,
                            unchecked
                        )
                        : checked;
                    if (isSearch) {
                        setSearchedTas(tmpNodes);
                        const searchExpandedNodes = expandTasNodeAndAllDescendantParents(tmpNodes);
                        setExpandedTas(expandTasNodeAndAllDescendantParents(tmpNodes), 'SET_SEARCHED_EXPANDED');
                        const nodesCheckedByPlaceholderOrAncestor = autoCheckSearchResultDescendants(
                            checked,
                            searchExpandedNodes,
                            tmpNodes
                        );

                        setCheckedTas(nodesCheckedByPlaceholderOrAncestor);
                        if (tmpNodes?.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        setTasNodes(key, tmpNodes);
                        setCheckedTas(newChecked);
                    }
                }
                else {
                    // populating tree trunk
                    setTasNodes('', tmpNodes);
                    setIsLoading(false);
                }
                request = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage(get(e, 'message', 'Error fetching TAS.'));
                }
                request = null;
            });
    };

    const fetchTasItems = () => fetchTas('')
        .then(() => {
            if (checkedFromHash?.length > 0) {
                setTasCounts(countsFromHash);
                return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                    .reduce((prevPromise, param) => prevPromise
                        // fetch the all the ancestors of the checked nodes
                        .then(() => fetchTas(param, null, false)), Promise.resolve([])
                    )
                    .then(() => {
                        setCheckedStateFromUrlHash(checkedFromHash.map((ancestryPath) => ancestryPath.pop()));
                        setExpandedTas([
                            ...new Set(checkedFromHash.map((ancestryPath) => ancestryPath[0]))
                        ]);
                    })
                    .catch((e) => {
                        setIsLoading(false);
                        setIsError(true);
                        setErrorMessage(get(e, 'message', 'Error fetching TAS.'));
                    });
            }
            // just do this for consistent return.
            return null;
        });


    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        console.log("on expand", expandedValue, newExpandedArray, shouldFetchChildren, selectedNode);
        // let treeDepth = 0;
        //
        // if (selectedNode?.id?.includes("/") && selectedNode?.id?.includes("-")) {
        //     treeDepth = 2;
        // }
        //
        // if (selectedNode?.id?.includes("-")) {
        //     treeDepth = 1;
        // }

        if (shouldFetchChildren && !isSearch) {
            // commenting this out should be right
            // if (treeDepth === 1) {
            //     // const selectedAgency = nodes
            //     //     .find((agency) => agency.children.some((federalAccount) => federalAccount.value === expandedValue));
            //     // const agencyAndFederalAccountString = `${selectedAgency.value}/${expandedValue}`;
            //
            //     fetchTas(expandedValue);
            // }
            // else {
                fetchTas(expandedValue);
            // }
        }
        if (isSearch) {
            setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedTas(newExpandedArray);
        }
    };

    const onSearchChange = debounce(() => {
        if (!searchString) return this.onClear();
        return fetchTas('', searchString);
    }, 500);

    const onClear = () => {
        if (request) request.cancel();
        setExpandedTas([], 'SET_SEARCHED_EXPANDED');
        showTasTree();
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setIsError(false);
        setErrorMessage('');
        setShowNoResults(false);
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(
            uncheckedNode,
            unchecked,
            checked,
            counts,
            nodes
        );

        setCheckedTas(newChecked);
        updateTasCountandStage(newCounts, trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)),
            getTasAncestryPathForChecked(newUnchecked, nodes),
            newCounts);

        updateTasCountandStage(newCounts, getTasAncestryPathForChecked(newChecked, nodes),
            getTasAncestryPathForChecked(newUnchecked, nodes),
            newCounts);
    };

    const onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementTasCountAndUpdateUnchecked(
            newChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        console.log("onCheck values", newChecked,
            checked,
            unchecked,
            nodes,
            counts);

        console.log("here onchecked", newChecked, nodes);

        setCheckedTas(newChecked);
        setUncheckedTas(newUnchecked);
        console.log("trim checked to common ancestors 1", checked, nodes);
        console.log("trim checked getTasAncestryPathForChecked", getTasAncestryPathForChecked(newChecked, nodes));
        updateTasCountandStage(newCounts, trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)),
            getTasAncestryPathForChecked(newUnchecked, nodes),
            newCounts);

        if (hint) {
            hint.showHint();
        }
    };

    const onCollapse = (newExpandedArray) => {
        if (isSearch) {
            setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedTas(newExpandedArray);
        }
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            return onClear();
        }
        const shouldTriggerSearch = doesMeetMinimumCharsRequiredForSearch(text);
        if (shouldTriggerSearch) {
            setSearchString(text);
            setIsSearch(true);
            setIsLoading(true);
            onSearchChange();
            // return this.setState({
            //     searchString: text,
            //     isSearch: true,
            //     isLoading: true
            // }, this.onSearchChange);
        }
        return setSearchString(text);
    };


    useEffect(() => {
        console.log("trim checked to common ancestors", checked, nodes);
        if (nodes?.length !== 0 && checkedFromHash?.length) {
            setCheckedStateFromUrlHash(checkedFromHash?.map((ancestryPath) => ancestryPath.pop()));
            const stageTasArgs = [trimCheckedToCommonAncestors(getTasAncestryPathForChecked(checked, nodes)),
                getTasAncestryPathForChecked(unchecked, nodes),
                countsFromHash];
            updateTasCountandStage(countsFromHash, stageTasArgs);
        }
        else if (nodes?.length !== 0) {
            showTasTree();
        }

        fetchTasItems();

        return () => {
            // if (request) {
            //     request.cancel();
            // }
            // showTasTree();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="tas-checkbox">
            {showInfo &&
            <span className="checkbox-header">
                Search by Agency, Federal Account, or Treasury Account
                <CSSOnlyTooltip
                    definition={<SearchNote />}
                    heading="Find a Treasury Account" />
            </span>}
            <EntityDropdownAutocomplete
                placeholder="Type to filter results"
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                isClearable
                loading={false}
                onClear={onClear} />
            <CheckboxTree
                onUncheck={onUncheck}
                onCheck={onCheck}
                onExpand={onExpand}
                isError={isError}
                errorMessage={errorMessage}
                isLoading={isLoading}
                data={nodes?.sort((a, b) => a.label.localeCompare(b.label))}
                checked={checked}
                searchText={searchString}
                countLabel="TAS"
                noResults={showNoResults}
                expanded={isSearch ? searchExpanded : expanded}
                onCollapse={onCollapse} />
        </div>
    );
};

TASCheckboxTree.propTypes = propTypes;

const mapStateToProps = (state) => ({
    nodes: state.tas.tas.toJS(),
    expanded: state.tas.expanded.toJS(),
    searchExpanded: state.tas.searchExpanded.toJS(),
    checked: state.tas.checked.toJS(),
    unchecked: state.tas.unchecked.toJS(),
    counts: state.tas.counts.toJS(),
    checkedFromHash: state.appliedFilters.filters.tasCodes.require,
    uncheckedFromHash: state.appliedFilters.filters.tasCodes.exclude,
    countsFromHash: state.appliedFilters.filters.tasCodes.counts,
    filters: state.appliedFilters.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTasNodes: (key, nodes) => dispatch(setTasNodes(key, nodes)),
    showTasTree: () => dispatch(showTasTree()),
    setExpandedTas: (expanded, type) => dispatch(setExpandedTas(expanded, type)),
    setCheckedTas: (nodes) => dispatch(setCheckedTas(nodes)),
    setUncheckedTas: (nodes) => dispatch(setUncheckedTas(nodes)),
    setSearchedTas: (nodes) => dispatch(setSearchedTas(nodes)),
    setTasCounts: (newCounts) => dispatch(setTasCounts(newCounts)),
    stageTas: (require, exclude, counts) => dispatch(updateTAS(require, exclude, counts))
});

export default connect(mapStateToProps, mapDispatchToProps)(TASCheckboxTree);
