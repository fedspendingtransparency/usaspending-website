/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { isEqual, difference, isEmpty, get, set } from 'lodash';
import reactStringReplace from 'react-string-replace';
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import {
    createCheckboxTreeDataStrucure,
    pathToNode,
    buildNodePath,
    expandedFromSearch,
    allChildValues
} from 'helpers/checkboxTreeHelper';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    data: PropTypes.array,
    icons: PropTypes.object,
    nodeKeys: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }),
    isSearch: PropTypes.bool,
    searchText: PropTypes.string,
    modifyLabelTextClassname: PropTypes.string,
    labelComponent: PropTypes.element,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onCollapse: PropTypes.func,
    setRedux: PropTypes.func,
    updateRedux: PropTypes.func,
    limit: PropTypes.number,
    expanded: PropTypes.array,
    checked: PropTypes.array
};


export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            checked: [],
            expanded: [],
            requestType: 'initial'
        };
    }

    componentDidMount() {
        this.createNodes();
    }

    componentDidUpdate(prevProps) {
        console.log(' This Props : ', this.props);
        if (!isEqual(prevProps.data, this.props.data)) {
            this.updateNode();
        }
    }
    /**
     * onExpand
     * (react-checkbox-tree calls this function when a user expands a node)
     * Decides whether we are expanding or collapsing the node.
     */
    onExpand = (newExpandedArray) => {
        // collapsing node
        if (newExpandedArray.length < this.state.expanded.length) {
            return this.collapseNode(newExpandedArray);
        }
        // expanding node
        return this.expandNode(newExpandedArray);
    };
    /**
     * onCheck
     * - (react-checkbox-tree calls this function when a user selects a node)
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    onCheck = (checked, node) => {
        if (this.state.checked.length < checked.length) {
            console.log(' Checking : ', checked);
            this.checkedNode(checked, node);
        }
        else { // unchecked
            this.unCheckedNode(checked, node);
        }
    }
    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @param {number} path - the path of the node to update
     * @returns {Array.<object>} - new array of nodes
     */
    setChildrenToLoading = async (path) => {
        let nodePath = path;
        /**
         * The path specifies the path to that distinct node. We are adding the
         * children property to that because we want to set the children property.
         */
        nodePath += '.children';
        const newNodes = this.createNodesObject();
        set(newNodes, nodePath, [{
            label: (
                <div className="children-are-loading">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="children-are-loading__text">Loading your data...</div>
                </div>
            ),
            value: 'loading',
            showCheckbox: false
        }]);
        return newNodes.data;
    }
    /**
     * checkedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    checkedNode = (checked, node) => {
        const { onCheck, isSearch } = this.props;
        this.setState({ checked });
        // if (onCheck && !isSearch) onCheck(checked);
        if (onCheck) onCheck(checked);
    }
    /**
     * unCheckedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    unCheckedNode = (checked, node) => {
        const { onCheck, isSearch } = this.props;
        console.log(' Un Checking : ', checked);
        this.setState({ checked });
        if (onCheck && !isSearch) onCheck(checked);
    }
    /**
     * pathToNodeString
     * creates a path string to a found object in a tree data structure.
     * @param {*} value - value to match.
     * @returns {string} - An object path string.
     */
    pathToNodeString = (value) => {
        // a path array to the object in the tree structure
        const path = pathToNode(this.state.nodes, value);
        if (!path) return null;
        // a string path to the object in the tree structure
        return buildNodePath(path);
    }
    /**
     * createNodesObject
     * Creates an object with a data property set to the value of nodes in state in
     * order to get and update the nodes property easily with a path string.
     * @returns {object} - An object with property data set to the
     * value of the state property ndoes.
     */
    createNodesObject = () => ({ data: [...this.state.nodes] });
    /**
     * expandNode
     * updates state with the new expanded array and updates the newly expanded children
     * with a loading object if we have no child data for that node.
     * @param {array} newExpandedArray - array with the newly expanded value
     */
    expandNode = async (newExpandedArray) => {
        const { expanded } = this.state;
        const { isSearch } = this.props;
        if (isSearch) return this.setState({ expanded: newExpandedArray });
        /**
         * react-checkbox-tree calls onExpand with the new expanded array containing
         * all expanded values. We must find the difference between the current expanded values
         * in state and the new values. react-checkbox-tree also does not push
         * to the end of the array. The array nodes will be in order and therefore
         * we use the difference method.
         */
        const expandedValue = difference(newExpandedArray, expanded)[0];
        const nodePathString = this.pathToNodeString(expandedValue);
        // get the node
        const node = get(this.createNodesObject(), nodePathString);
        /**
         * When there are no children or there is an empty object in the children property (since we
         * do this to get the caret to show when there is a count)
         * we will set the child to a loading div
         */
        if ((!node?.children || node?.children?.[0]?.isPlaceholder) && !isSearch) {
            const newNodes = await this.setChildrenToLoading(nodePathString);
            this.setState({ expanded: newExpandedArray, nodes: newNodes });
            return this.props.onExpand(node, newExpandedArray, true);
        }
        // we already have data for the children
        this.setState({ expanded: newExpandedArray });
        return this.props.onExpand(node, newExpandedArray, false);
    };
    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in props.
     */
    collapseNode = (newExpandedArray) => {
        this.setState({ expanded: newExpandedArray });
        if (this.props.onCollapse) this.props.onCollapse(newExpandedArray);
    }
    /**
      ** createNodes
      * maps data passed to react-checkbox-tree data structure and updates state with the new nodes.
      * Will also call setRedux if passes in props.
      * e.g. [{ label: 'Max', value: Well, children: [] }]
      * Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
    **/
    createNodes = () => {
        const {
            nodeKeys,
            data,
            limit,
            setRedux,
            isSearch
        } = this.props;
        if (isSearch) return this.handleSearch(data);
        const newNodes = createCheckboxTreeDataStrucure(limit, nodeKeys, data);
        console.log(' New Nodes : ', newNodes);
        this.setState({ nodes: newNodes, requestType: '' });
        return (setRedux && newNodes.length) ? setRedux(newNodes) : null;
    }

    isCleanData = (data) => data.every((node) => {
        const keys = Object.keys(node);
        if (!keys.includes('value')) return false;
        if (!keys.includes('label')) return false;
        if (!keys.includes('path')) return false;
        return true;
    });
    /**
     * updateNode
     * This will add new data to the nodes array and set the nodes
     * property in state with the new nodes. This will also call updateRedux
     * if passed in props.
     */
    updateNode = () => {
        const {
            nodeKeys,
            data,
            expanded,
            checked,
            limit,
            updateRedux,
            onCheck,
            isSearch
        } = this.props;
        const isCleanData = this.isCleanData(data);
        if (isCleanData) {
            return this.setState({
                nodes: data,
                expanded,
                checked,
                requestType: ''
            });
        }
        // path to node
        const nodePathString = this.pathToNodeString(data[0][nodeKeys.value]);
        const nodesObject = this.createNodesObject();
        /**
         * We pass the node from state since that already has been updated with a path property
         * and the new nodes coming in from props will not.
         */
        const originalNode = get(nodesObject, nodePathString);
        // create the new node
        const newNode = createCheckboxTreeDataStrucure(
            limit,
            nodeKeys,
            data,
            false,
            originalNode
        );
        /**
         * When the parent has been checked. We must check all children
         */
        const { checked: currentlyChecked } = this.state;
        const childPlaceholder = `${originalNode.value}childPlaceholder`;
        if (currentlyChecked.includes(childPlaceholder)) {
            const index = currentlyChecked.findIndex((info) => info === childPlaceholder);
            // get all child values
            const childValues = allChildValues(newNode[0].children);
            // add child values to array
            currentlyChecked.splice(index, 1, ...childValues);
        }
        // set the new node in the respective position
        set(nodesObject, nodePathString, newNode[0]);
        this.setState({ nodes: nodesObject.data, checked: currentlyChecked });
        if (updateRedux) updateRedux(nodesObject.data);
        return (onCheck && !isSearch) ? onCheck(currentlyChecked) : null;
    }
    /**
     * handleSearch
     * updates nodes with expanded properties
     */
    handleSearch = (nodes) => {
        const { limit, nodeKeys } = this.props;
        // create the new node
        const { updatedNodes, expanded } = expandedFromSearch(
            limit,
            nodeKeys,
            nodes
        );
        this.setState({ nodes: updatedNodes });
        this.setState({ expanded });
    }
    // TODO - implement this
    // sets specific icons to custom icons passed in props
    updateIcons = () => {
        const { icons } = this.props;
        if (icons) {
            Object.keys(icons).forEach((key) => {
                treeIcons[key] = icons[key];
            });
        }
        return treeIcons;
    }
    /**
     * highlightText
     * adds a <span> tag with a highlight class around matching text
     * @param {string} text - text to match
     * @returns {element|string} - returns a span element with a highlight class
     * or string if no match is found.
     */
    highlightText = (text) => reactStringReplace(text, this.props.searchText, (match, i) => (
        <span
            className={this.props.modifyLabelTextClassname || 'highlight'}
            key={match + i}>
            {match}
        </span>
    ));
    /**
      ** createLabels
      * maps data labels from strings to html
      * @param {Array.<object>} nodes - an array of objects
      * @returns {Array.<object>} An array of objects
    **/
    createLabels = (nodes) => nodes.map((node) => {
        // if label is a string, do nothing
        if (typeof node.label !== 'string') return node;
        const { labelComponent } = this.props;
        const newNode = { ...node };
        let label = newNode.label;
        let value = newNode.value;
        // will highlight the text if search prop is true
        if (this.props.isSearch) {
            label = this.highlightText(label);
            value = this.highlightText(value);
        }
        // creates a new component with props value and label
        if (labelComponent) {
            newNode.label = cloneElement(
                labelComponent,
                { value, label }
            );
        }
        else { // default checkbox tree label
            newNode.label = (
                <CheckboxTreeLabel
                    value={value}
                    label={label}
                    count={newNode.count} />
            );
        }
        // recursive - if there are children create new labels
        if (newNode.children) {
            newNode.children = this.createLabels(newNode.children);
        }
        return newNode;
    });

    render() {
        const { nodes, checked, expanded } = this.state;
        const labeledNodes = this.createLabels(nodes);
        if (!nodes.length) return null;
        return (
            <div className="checkbox-tree">
                <CheckBoxTree
                    nodes={labeledNodes}
                    // checkModel="all"
                    // // noCascade
                    // // optimisticToggle
                    checked={checked}
                    expanded={expanded}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    icons={treeIcons} />
            </div>
        );
    }
}

CheckboxTree.propTypes = propTypes;
