import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get, flattenDeep } from 'lodash-es';
import { connect } from 'react-redux';

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
import {
    getAllDescendants,
    removePlaceholderString,
    getUniqueAncestorPaths,
    trimCheckedToCommonAncestors
} from 'helpers/checkboxTreeHelper';

import * as pscActions from 'redux/actions/search/pscActions';
import { updatePSC } from 'redux/actions/search/searchFilterActions';
import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';

import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';
import { bindActionCreators } from "redux";

const propTypes = {
    setPscNodes: PropTypes.func,
    setExpandedPsc: PropTypes.func,
    setCheckedPsc: PropTypes.func,
    setSearchedPsc: PropTypes.func,
    setPscCounts: PropTypes.func,
    updatePSC: PropTypes.func,
    showPscTree: PropTypes.func,
    setUncheckedPsc: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    countsFromHash: PropTypes.arrayOf(PropTypes.shape({})),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({}))
};

const PSCCheckboxTreeContainer = ({
    setPscNodes,
    setExpandedPsc,
    setCheckedPsc,
    setSearchedPsc,
    setPscCounts,
    updatePSC: stagePsc,
    showPscTree,
    setUncheckedPsc,
    expanded,
    checked,
    unchecked,
    checkedFromHash,
    uncheckedFromHash,
    countsFromHash,
    nodes,
    searchExpanded,
    counts
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);
    const [newCheck, setNewCheck] = useState([]);
    const [uncheckedFromHashLocal, setUncheckedFromHashLocal] = useState([]);

    const nodesRef = useRef(true);
    const request = useRef(null);

    const autoCheckSearchResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
        const newChecked = expandedLocal
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
                if (checkedLocal.includes(expandedNode)) return true;
                return false;
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                const node = getPscNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal, ...newChecked]);
    };


    const fetchPscLocal = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (request.current) {
            request.current.cancel();
        }

        if (showNoResults) {
            setShowNoResults(false);
        }

        const queryParam = (isSearch && searchStr.length > 0) ? `?depth=-1&filter=${searchStr}` : id;

        request.current = fetchPsc(queryParam);

        const isPartialTree = (
            id !== '' ||
            isSearch
        );

        return request.current.promise
            .then(({ data }) => {
                setIsLoading(true);

                // dynamically populating tree branches
                const pscNodes = cleanPscData(data.results);

                if (isPartialTree) {
                    // parsing the prepended agency (format in url is agencyId/federalAccountId when fetching federalAccount level data)
                    const key = id.includes('/') ? id.split('/').pop() : id;

                    if (isSearch) {
                        const searchExpandedNodes = expandPscNodeAndAllDescendantParents(pscNodes);
                        setSearchedPsc(pscNodes);

                        autoCheckSearchResultDescendants(
                            checked,
                            searchExpandedNodes,
                            nodes
                        );
                        setExpandedPsc(searchExpandedNodes, 'SET_SEARCHED_EXPANDED');


                        if (pscNodes.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        setPscNodes(key, pscNodes);
                    }

                    let modChecked = [];

                    if (checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        modChecked = [...filteredChecked, ...pscNodes.map((child) => child.value)];
                    }

                    const newChecked = modChecked?.length
                        ? autoCheckPscAfterExpand(
                            { children: pscNodes, value: key },
                            modChecked,
                            unchecked
                        )
                        : checked;

                    setCheckedPsc(newChecked);
                }
                else {
                    // populating tree trunk
                    setPscNodes('', pscNodes);
                }

                if (resolveLoadingIndicator) {
                    setIsLoading(false);
                }

                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log("error fetching PSC", e);

                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage(get(e, 'message', 'Error fetching PSC.'));
                }
                request.current = null;
            });
    };

    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        const treeDepth = selectedNode.ancestors?.length;

        if (shouldFetchChildren && !isSearch) {
            if (treeDepth >= 1) {
                if (treeDepth === 2) {
                    fetchPscLocal(`${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`);
                }
                else {
                    fetchPscLocal(`${selectedNode.ancestors[0]}/${expandedValue}`);
                }
            }
            else {
                fetchPscLocal(expandedValue);
            }
        }
        if (isSearch) {
            setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedPsc(newExpandedArray);
        }
    };

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1 ? newChecked.filter((id) => !id.includes("children_of_")) : newChecked;
        const [newCounts, newUnchecked] = incrementPscCountAndUpdateUnchecked(
            stateNewChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        setCheckedPsc(newChecked);
        setPscCounts(newCounts);
        setUncheckedPsc(newUnchecked);
        stagePsc(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)),
            getPscAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        );
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementPscCountAndUpdateUnchecked(
            uncheckedNode,
            unchecked,
            checked,
            counts,
            nodes
        );

        setCheckedPsc(newChecked);
        setPscCounts(newCounts);
        setUncheckedPsc(newUnchecked);
        stagePsc(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)),
            getPscAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        );
    };

    const onClear = () => {
        if (request.current) {
            request.current.cancel();
        }

        setExpandedPsc([], 'SET_SEARCHED_EXPANDED');
        showPscTree();

        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setIsError(false);
        setErrorMessage('');
        setShowNoResults(false);
    };

    const onSearchChange = debounce(() => {
        if (!searchString) {
            onClear();
        }

        fetchPscLocal('', searchString);
    }, 500);

    const onCollapse = (newExpandedArray) => {
        if (isSearch) {
            setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedPsc(newExpandedArray);
        }
    };

    const setCheckedStateFromUrlHash = (newChecked) => {
        setNewCheck(newChecked);
        setUncheckedFromHashLocal(uncheckedFromHash.map((ancestryPath) => ancestryPath.pop()));
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            onClear();
        }

        setSearchString(text);
        if (text.length >= 2) {
            setIsSearch(true);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (nodes.length !== 0 && checkedFromHash.length) {
            setCheckedStateFromUrlHash(
                checkedFromHash.map((ancestryPath) => ancestryPath[ancestryPath.length - 1])
            );
            setPscCounts(countsFromHash);
            stagePsc(
                trimCheckedToCommonAncestors(getPscAncestryPathForChecked(checked, nodes)),
                getPscAncestryPathForChecked(unchecked, nodes),
                counts
            );
        }
        else if (nodes.length !== 0) {
            showPscTree();
        }
        else {
            fetchPscLocal('', null, false)
                .then(() => {
                    if (checkedFromHash.length > 0) {
                        setPscCounts(countsFromHash);
                        return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                            .reduce((prevPromise, param) => prevPromise
                            // fetch the all the ancestors of the checked nodes
                                .then(() => fetchPscLocal(param, null, false)), Promise.resolve([])
                            )
                            .then(() => {
                                setCheckedStateFromUrlHash(
                                    checkedFromHash.map((ancestryPath) => ancestryPath[ancestryPath.length - 1])
                                );
                                setExpandedPsc([
                                    ...new Set(checkedFromHash.map((ancestryPath) => ancestryPath[0]))
                                ]);
                            })
                            .catch((e) => {
                                setIsLoading(false);
                                setIsError(true);
                                setErrorMessage(get(e, 'message', 'Error fetching PSC.'));
                            });
                    }
                    setIsLoading(false);

                    // just do this for consistent return.
                    return Promise.resolve();
                });
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
            showPscTree();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSearch && isLoading) {
            onSearchChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearch, searchString]);

    // for properly setting checked state from hash
    useEffect(() => {
        if (nodes.length > 0 && nodesRef.current) {
            const newCheckedWithPlaceholders = flattenDeep(newCheck
                .map((check) => getAllDescendants(
                    getPscNodeFromTree(nodes, check), uncheckedFromHashLocal)
                )
            );

            if (newCheckedWithPlaceholders.length > 0) {
                setCheckedPsc(newCheckedWithPlaceholders);
                setUncheckedPsc(uncheckedFromHashLocal);
                nodesRef.current = false;
            }

            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes]);

    return (
        <div className="psc-search-container">
            <EntityDropdownAutocomplete
                placeholder="Type at least 2 letters..."
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                isClearable
                loading={false}
                onClear={onClear}
                searchIcon />
            <CheckboxTree
                isError={isError}
                errorMessage={errorMessage}
                isLoading={isLoading}
                data={nodes}
                checked={checked}
                searchString={searchString}
                noResults={showNoResults}
                expanded={isSearch ? searchExpanded : expanded}
                isSearch={isSearch}
                onUncheck={onUncheck}
                onCheck={onCheck}
                onExpand={onExpand}
                onCollapse={onCollapse} />
        </div>
    );
};

PSCCheckboxTreeContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    nodes: state.psc.psc.toJS(),
    expanded: state.psc.expanded.toJS(),
    searchExpanded: state.psc.searchExpanded.toJS(),
    checked: state.psc.checked.toJS(),
    unchecked: state.psc.unchecked.toJS(),
    counts: state.psc.counts.toJS(),
    checkedFromHash: state.appliedFilters.filters.pscCodes.require,
    uncheckedFromHash: state.appliedFilters.filters.pscCodes.exclude,
    countsFromHash: state.appliedFilters.filters.pscCodes.counts
});

const combinedActions = Object.assign({},
    pscActions,
    { updatePSC }
);

export default connect(mapStateToProps,
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(PSCCheckboxTreeContainer);
