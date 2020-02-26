/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    debounce,
    get,
    cloneDeep,
    clone,
    uniq,
    isEqual,
    difference,
    set
} from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateNaics } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SelectedNaic from 'components/search/filters/naics/SelectNaic';
import { pathToNode, buildNodePath, createCheckboxTreeDataStrucure } from 'helpers/checkboxTreeHelper';

const propTypes = {
    updateNaics: PropTypes.func,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    setChecked: PropTypes.func,
    removeNAICS: PropTypes.func,
    nodes: PropTypes.object,
    expanded: PropTypes.object,
    checked: PropTypes.object
};

const nodeKeys = {
    value: 'naics',
    label: 'naics_description'
};

export class NAICSContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            naics: [],
            expanded: [],
            checked: [],
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            searchString: '',
            requestType: 'initial',
            selectedNaicsData: []
        };
    }

    componentDidMount() {
        const { nodes, expanded, checked } = this.props;
        if (nodes.size > 0) {
            return this.setStateFromRedux(nodes, expanded, checked);
        }
        // show staged filters
        this.selectNaicsData();
        return this.fetchNAICS();
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(this.props.checked.toJS(), prevProps.checked.toJS())
            || !isEqual(this.props.nodes.toJS(), prevProps.nodes.toJS())
        ) {
            // show stage filters
            this.selectNaicsData();
        }
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        const { nodes, expanded, checked } = this.props;
        if (this.request) this.request.cancel();
        this.setState({
            isSearch: false,
            searchString: '',
            naics: nodes.toJS(),
            expanded: expanded.toJS(),
            checked: checked.toJS(),
            isLoading: false,
            requestType: ''
        });
    }

    onExpand = (value, expanded, fetch) => {
        if (fetch) this.fetchNAICS(value);
        this.props.setExpanded(expanded);
    };

    onCollapse = (expanded) => {
        this.props.setExpanded(expanded);
    };
    /**
     * onCheck
     * - updates redux checked and updates naics search filters in redux
     * @param {string[]} checked - and array of checked values
     * @returns {null}
     */
    onCheck = async (checked) => {
        const currentlyCheck = this.props.checked.toJS();
        const newCheckedValues = difference(checked, this.props.checked.toJS());
        if (newCheckedValues.length && this.state.isSearch) this.addNodeFromSearch(newCheckedValues);
        // sets checked in naics redux
        await this.props.setChecked(checked);
        // sets staged filters in search redux
        await this.props.updateNaics(checked);
    }

    setRedux = (naics) => this.props.setNaics(naics);

    setStateFromRedux = (naics, expanded, checked) => {
        this.setState({
            naics: naics.toJS(),
            expanded: expanded.toJS(),
            checked: checked.toJS(),
            requestType: ''
        });
    }

    addNodeFromSearch = (values) => {
        console.log(' Values : ', values);
        const nodes = cloneDeep(this.props.nodes.toJS());
        const nodesDataObject = { data: nodes };
        // remove fake search children
        const filteredValues = values.filter((value) => !value.includes('placeholderForSearch'));
        filteredValues.forEach((value) => {
            // we are checking if the node exists in Redux
            const { path: pathToNodeRedux } = pathToNode(nodes, value);
            // this is the current path from the the search state
            const { path: pathToNodeState } = pathToNode(this.state.naics, value);

            if (!pathToNodeRedux) {
                // find where to add node by stepping through node path
                /**
                 * Here we walk through the node path backwards, which allows to traverse
                 * the tree data structure upwards, to find the first node we do not have in redux
                 * and then replace that node with the search nodes and children
                 * e.g. Given a sample node path of [0, 7, 1] we will look to see if we have
                 * node [0, 7] and if we do we will put that now in its place in Redux store,
                 * and if not we will try [0], which we should always have top tier data.
                 */
                let foundIt = null;
                let theOldObjectFromState = null;
                let theOldPathToRedux = [];
                pathToNodeState.forEach((path, index, array) => {
                    /**
                     * step through node path e.g. the original node path will be [0, 7, 1]
                     * then the first iteration will be [0, 7]
                     */
                    if (foundIt) return;
                    const pathArrayStateSubset = pathToNodeState.slice(0, array.length - (array.length - (index + 1)));
                    const pathStringStateSubset = buildNodePath(pathArrayStateSubset);
                    const theNodeToAddFromState = get({ data: this.state.naics }, pathStringStateSubset);
                    console.log(' Original Path Array : ', pathToNodeState);
                    console.log(' Path Array State Subset : ', pathArrayStateSubset);
                    console.log(' The Node to Add From State Value : ', theNodeToAddFromState.value);
                    // See if the node exists in redux
                    const { path: newPathToNodeRedux } = pathToNode(nodes, theNodeToAddFromState.value);
                    console.log(' Path To the Node In Redux : ', newPathToNodeRedux);
                    if (!newPathToNodeRedux) {
                        foundIt = true;
                        console.log(' Found It : ', foundIt);
                        console.log(' Found It Current Old Path : ', theOldPathToRedux);
                        console.log(' Found It Last Old Object : ', theOldObjectFromState);
                        // get the node in redux that we will be replacing for the path property
                        const valueOfNodeInRedux = theOldObjectFromState.value;
                        console.log(' Need this VAl : ', valueOfNodeInRedux);
                        const { path: pathInRedux } = pathToNode(nodes, valueOfNodeInRedux);
                        console.log(' The path : ', pathInRedux)
                        const pathString = buildNodePath(pathInRedux);
                        const currentPath = get(nodesDataObject, pathString).path;
                        theOldObjectFromState.path = currentPath;
                        console.log(' Found It new stuff : ', theOldObjectFromState);
                        // we need to go back one and set that object
                        const oldPathStringToRedux = buildNodePath(theOldPathToRedux);
                        set(nodesDataObject, oldPathStringToRedux, theOldObjectFromState);
                    }
                    else {
                        theOldObjectFromState = theNodeToAddFromState;
                        theOldPathToRedux = newPathToNodeRedux;
                    }
                    // const newPathString = buildNodePath(newPathArray);
                    // const node = get({ data: nodes }, newPathString);
                    // if (!node || node.value.includes('childPlaceholder')) {
                    //     const newNode = get({ data: this.state.naics }, newPathString);
                    //     set({ data: nodes }, newPathString, newNode);
                    // }
                });
                this.props.setNaics(nodes);
                // this.selectNaicsData();
            }
        });
    }
    /**
     * cleanCheckedValues
     * - removes and values that have childPlaceholder
     * @param {string[]} checked - array of strings
     * @returns {string[]} - an array of strings
     */
    cleanCheckedValues = (checked) => {
        const placeholder = 'childPlaceholder';
        const searchPlaceholder = 'placeholderForSearch';
        return uniq(checked.map((value) => {
            if (value.includes(placeholder)) {
                return value.replace(placeholder, '');
            }
            else if (value.includes(searchPlaceholder)) {
                const indexOf = value.indexOf('p');
                return value.slice(0, indexOf);
            }
            return value;
        }));
    };
    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true }, this.onSearchChange);
    };

    request = null

    fetchNAICS = async (param) => {
        if (this.request) this.request.cancel();
        const {
            requestType,
            isSearch,
            searchString
        } = this.state;
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            this.setState({ isLoading: true });
        }

        this.request = naicsRequest(param || searchParam);
        try {
            const { data } = await this.request.promise;
            // create the new node
            const updatedNodes = isSearch ? createCheckboxTreeDataStrucure(
                3,
                nodeKeys,
                data.results,
                null,
                null,
                true
            ) : data.results;

            this.setState({
                naics: updatedNodes,
                isLoading: false,
                isError: false,
                errorMessage: '',
                requestType: ''
            });
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            if (!isCancel(e)) {
                this.setState({
                    isError: true,
                    errorMessage: e.message,
                    naics: this.props.nodes.toJS(),
                    isLoading: false,
                    requestType: ''
                });
            }
        }
    };

    loadingDiv = () => {
        if (!this.state.isLoading) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="naics-filter-message-container__text">Loading your data...</div>
            </div>
        );
    }

    errorDiv = () => {
        const { isError, errorMessage } = this.state;
        if (!isError) return null;
        return (
            <div className="naics-filter-message-container">
                <div className="naics-filter-message-container__text">
                    {errorMessage}
                </div>
            </div>
        );
    }

    noResultsDiv = () => {
        const { isError, isLoading, naics } = this.state;
        if (isError || isLoading || naics.length > 0) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="ban" />
                <div className="naics-filter-message-container__text">
                    No Results
                </div>
            </div>
        );
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            isSearch,
            naics,
            expanded,
            searchString
        } = this.state;
        const { checked } = this.props;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                limit={3}
                data={naics}
                expanded={expanded}
                checked={checked.toJS()}
                nodeKeys={nodeKeys}
                isSearch={isSearch}
                searchText={searchString}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onCheck={this.onCheck}
                setRedux={this.setRedux}
                updateRedux={this.setRedux} />
        );
    }

    selectNaicsData = () => {
        const nodes = cloneDeep(this.props.nodes.toJS());
        const checkedData = clone(this.cleanCheckedValues(this.props.checked.toJS()));
        // const checkedData = clone(this.props.checked.toJS());
        console.log(' Checked Data : ', checkedData);
        console.log(' Nodes : ', nodes);
        const selectedNaicsData = checkedData.reduce((acc, value) => {
            console.log(' Reduce Value : ', value);
            console.log(' Nodes : ', cloneDeep(this.props.nodes.toJS()));
            // const cleanValue = this.cleanCheckedValues([value]);
            const { path: nodePath } = pathToNode(nodes, value);
            console.log(' Node Path : ', nodePath);
            if (!nodePath) return acc;
            const parentNodePath = [nodePath[0]];
            // accessing the tier 0 parent node
            const parentNodePathString = buildNodePath(parentNodePath);
            const parentNode = get({ data: nodes }, parentNodePathString);
            // accessing the child node
            const nodePathString = buildNodePath(nodePath);
            const node = get({ data: nodes }, nodePathString);

            const valueIsAChildPlaceholder = value.includes('childPlaceholder');
            const valueIsASearchPlaceholder = value.includes('placeholderForSearch');

            /**
             * Handle mismatch data from search. Some search node's children can have
             * placeholder values mixed with actual nodes dependent on what the user
             * selects and shape of the search results. If a node's children includes
             * search placeholder data, we will ignore any real child nodes.
             */
            let middleParentPath = cloneDeep(parentNode).path;
            if (nodePath.length > 2) middleParentPath = nodePath.slice(0, nodePath.length - 1);
            console.log(' Middle Parent Path : ', middleParentPath);
            const middleParentPathString = buildNodePath(middleParentPath);
            const middleParent = get({ data: nodes }, middleParentPathString);
            console.log(' Middle Parent : ', middleParent);
            const middleParentChildValues = middleParent.children.map((child) => child.value);
            const middleParentParentHasSearchPlaceholders = middleParentChildValues.some((child) => child.includes('placeholderForSearch'));
            const middleParentHasRegularChildren = middleParentChildValues.some((child) => !child.includes('placeholderForSearch'));
            const middleParentHasMixedData = middleParentParentHasSearchPlaceholders && middleParentHasRegularChildren;
            console.log(' Parent Has Mixed Data : ', middleParentHasMixedData);
            if (middleParentHasMixedData) return acc;
            console.log(' ACC : ', acc);
            console.log(' Node : ', node);
            console.log(' Parent Node : ', parentNode);
            // find parent node in accumulator
            const foundParentNodeIndex = acc.findIndex((data) => data.value === parentNode.value);
            if (isNaN(node.count)) return acc;
            // when a parent node already exists update count
            if (foundParentNodeIndex !== -1) {
                // adds the count of the child object to the parent node
                // when we are at the last level the count will be 0, so add 1
                if (node.count === 0) {
                    acc[foundParentNodeIndex].count++;
                }
                else {
                    acc[foundParentNodeIndex].count += node.count;
                }
            }
            else { // no parent node exists in accumulator, add parent to accumulator
                // this is the last possible child for this parent, add 1
                if (node.count === 0) {
                    parentNode.count = 1;
                }
                else {
                    parentNode.count = node.count;
                }
                acc.push(parentNode);
            }

            return acc;
        }, []);
        console.log(' Selected Naics Data : ', selectedNaicsData);
        // this.setState({ selectedNaicsData });
        return { selectedNaicsData };
    }

    selectedNaics = () => {
        if (!this.props.checked.size === 0) return null;
        // const { selectedNaicsData } = this.state;
        const { selectedNaicsData } = this.selectNaicsData();
        return (<SelectedNaic
            selectedNAICS={selectedNaicsData}
            removeNAICS={this.props.removeNAICS} />);
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const noResultsDiv = this.noResultsDiv();
        const errorDiv = this.errorDiv();
        const { searchString } = this.state;
        return (
            <div>
                <div className="naics-search-container">
                    <EntityDropdownAutocomplete
                        placeholder="Type to find codes"
                        searchString={searchString}
                        enabled
                        openDropdown={this.onSearchClick}
                        toggleDropdown={this.toggleDropdown}
                        handleTextInputChange={this.handleTextInputChange}
                        context={{}}
                        loading={false}
                        handleOnKeyDown={this.handleOnKeyDown}
                        isClearable
                        onClear={this.onClear} />
                    {loadingDiv}
                    {noResultsDiv}
                    {errorDiv}
                    {this.checkboxDiv()}
                    {this.selectedNaics()}
                </div>
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        nodes: state.naics.naics,
        expanded: state.naics.expanded,
        checked: state.naics.checked
    }),
    (dispatch) => ({
        updateNaics: (checked) => dispatch(updateNaics(checked)),
        setNaics: (naics) => dispatch(setNaics(naics)),
        setExpanded: (expanded) => dispatch(setExpanded(expanded)),
        setChecked: (checked) => dispatch(setChecked(checked))
    }))(NAICSContainer);
