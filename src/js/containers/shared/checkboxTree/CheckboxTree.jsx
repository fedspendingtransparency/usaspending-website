/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { isEqual, difference, clone, get, set, compact } from 'lodash';
import reactStringReplace from 'react-string-replace';
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import {
    createCheckboxTreeDataStructure,
    pathToNode,
    buildNodePath,
    handleSearch,
    deepestChildValues
} from 'helpers/checkboxTreeHelper';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
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
            expanded: []
        };
    }

    componentDidMount() {
        this.createNodes();
    }

    componentDidUpdate(prevProps) {
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
        if (!this.props.isLoading) {
            if (this.state.checked.length < checked.length) {
                this.checkedNode(checked, node);
            }
            else {
                this.unCheckedNode(checked, node);
            }
        }
    }
    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @param {number} path - the path of the node to update
     * @returns {Array.<object>} - new array of nodes
     */
    setChildrenToLoading = async (path, node) => {
        let nodePath = path;
        /**
         * The path specifies the path to that distinct node. We are adding the
         * children property to that because we want to set the children property.
         */
        if (node.children[0].value.includes('childPlaceholder')) node.children.shift();
        node.children.push({
            label: (
                <div className="children-are-loading">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="children-are-loading__text">Loading your data...</div>
                </div>
            ),
            value: `${node.value}loading`,
            showCheckbox: false
        });
        // nodePath += '.children';
        const newNodes = this.createNodesObject();

        // set(newNodes, nodePath, [{
        //     label: (
        //         <div className="children-are-loading">
        //             <FontAwesomeIcon icon="spinner" spin />
        //             <div className="children-are-loading__text">Loading your data...</div>
        //         </div>
        //     ),
        //     value: `${node.value}loading`,
        //     showCheckbox: false
        // }]);
        set(newNodes, nodePath, node);
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
        this.props.onCheck(checked, node);
    }
    /**
     * unCheckedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    unCheckedNode = (checked, node) => {
        this.props.onCheck(checked, node);
    }
    /**
     * pathToNodeString
     * creates a path string to a found object in a tree data structure.
     * @param {*} value - value to match.
     * @returns {string} - An object path string.
     */
    pathToNodeString = (value) => {
        // a path array to the object in the tree structure
        const { path } = pathToNode(this.state.nodes, value);
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
        const { path } = pathToNode(this.state.nodes, expandedValue);
        const nodePathString = buildNodePath(path);
        // const nodePathString = this.pathToNodeString(expandedValue);
        // get the node
        const node = get(this.createNodesObject(), nodePathString);
        /**
         * When there are no children or there is an empty object in the children property (since we
         * do this to get the caret to show when there is a count)
         * we will set the child to a loading div
         */
        const nodeHasSearchChildren = node?.children.some((child) => child.value.includes('placeholderForSearch'));
        const nodeChildrenLengthIsIncorrect = node?.children.length !== node.count;
        if (
            (
                !node?.children
                || node?.children?.[0]?.isPlaceholder
                || nodeHasSearchChildren
                || nodeChildrenLengthIsIncorrect
            )
            && !isSearch
        ) {
            const newNodes = await this.setChildrenToLoading(nodePathString, node);
            this.setState({ expanded: newExpandedArray, nodes: newNodes });
            return this.props.onExpand(expandedValue, newExpandedArray, true);
        }
        // we already have data for the children
        this.setState({ expanded: newExpandedArray });
        return this.props.onExpand(expandedValue, newExpandedArray, false);
    };
    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in props.
     */
    collapseNode = (newExpandedArray) => {
        this.props.onCollapse(newExpandedArray);
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
            isSearch,
        } = this.props;
        if (isSearch) return this.handleSearch(data);
        const newNodes = createCheckboxTreeDataStructure(limit, nodeKeys, data);
        this.setState({ nodes: newNodes });
        return (setRedux && newNodes.length) ? setRedux(newNodes) : null;
    }

    isCleanData = (data) => data.every((node) => {
        const keys = Object.keys(node);
        if (!keys.includes('value')) return false;
        if (!keys.includes('label')) return false;
        if (!keys.includes('path')) return false;
        return true;
    });

    keepChildrenFromSearch = (originalNode, newNode) => {
        const updatedNode = [...newNode];
        const currentNodeChildValues = compact(originalNode?.children.map((child) => {
            return child?.value;
        }));
        /**
         * Compares current node's children to new data coming in.
         * If we currently have that child in the current node's children. We replace the new
         * data with that child.
         */
        currentNodeChildValues.forEach((childValue) => {
            if (!childValue) return;
            // Find the child in the old state object
            const oldChild = originalNode.children.find((child) => child.value === childValue);
            // find the index in the new node object
            const newIndex = newNode[0].children.findIndex((child) => child?.value === childValue);
            // update the new node object with the current object child
            if (oldChild) {
                // update the path position of the old child to reflect current order in state
                if (newIndex !== -1) oldChild.path = newNode[0].children[newIndex].path;
                updatedNode[0].children[newIndex] = oldChild;
            }
        });
        return updatedNode;
    }

    updateCheckedWithChildrenIfNoChildren = (newNode) => {
        /**
         * When the parent has been checked. We must check all children.
         * since we place fake children to get the caret to show, if a parent is checked
         * their childplaceholder value it added to the array so we must remove that placeholder
         * in the checked array and we must add all new child values to the checked array.
         */
        const currentlyChecked = clone(this.state.checked);
        const childPlaceholder = `${newNode[0].value}childPlaceholder`;
        if (currentlyChecked.includes(childPlaceholder)) {
            const index = currentlyChecked.findIndex((info) => info === childPlaceholder);
            // get all child values
            // const allTheChildValues = allChildValues(newNode[0].children);

            const childValues = deepestChildValues(newNode);

            // filters out any node values that have a child with childPlaceholder value
            // const childValues = allTheChildValues.filter((child) => {
            //     if (allTheChildValues.includes(`${child}childPlaceholder`)) return false;
            //     return true;
            // });

            // add child values to array
            currentlyChecked.splice(index, 1, ...childValues);
            /**
             * Since React Checkbox Tree decides if a node is checked based on its child properties
             * and we are update all the new children to checked. We must remove the parent that is checked.
             */
            const parentIndex = currentlyChecked.findIndex((info) => info === newNode[0].value);
            if (parentIndex !== -1) currentlyChecked.splice(parentIndex, 1);
        }
        return currentlyChecked;
    }

    updateCheckedBasedOnSearchPlaceholder = (currentlyChecked, newNode) => {
        let checkedArray = clone(currentlyChecked);
        /**
         * If we have search placholders then a user slected something from search
         * and we must remove all those search placeholders and add the new children to the array
         */
        const searchChildPlaceholder = `${newNode[0].value}placeholderForSearch`;
        const checkedValuesHaveSearchPlaceholders = currentlyChecked.some((val) => val.includes(searchChildPlaceholder));
        if (checkedValuesHaveSearchPlaceholders) {
            // remove current placeholder children from search
            checkedArray = currentlyChecked.filter((checked) => !checked.includes(searchChildPlaceholder));
            // add new children to checked array
            const childValues = deepestChildValues(newNode);
            console.log(' Child Values : ', childValues);
            childValues.forEach((child) => checkedArray.push(child));
        }
        return checkedArray;
    }
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
            onCheck
        } = this.props;
        if (this.isCleanData(data)) {
            return this.setState({
                nodes: data,
                expanded,
                checked
            });
        }
        // path to node
        const { path } = pathToNode(this.state.nodes, data[0][nodeKeys.value]);
        const nodePathString = buildNodePath(path);
        const nodesObject = this.createNodesObject();
        /**
         * We pass the node from state since that already has been updated with a path property
         * and the new nodes coming in from props will not.
         */
        const originalNode = get(nodesObject, nodePathString);
        // create the new node
        let newNode = createCheckboxTreeDataStructure(
            limit,
            nodeKeys,
            data,
            false,
            originalNode
        );
        // keep nodes we already have from search
        newNode = this.keepChildrenFromSearch(originalNode, newNode);
        // If a parent is checked we update the checked array with children
        let currentlyChecked = this.updateCheckedWithChildrenIfNoChildren(newNode);
        // If search placeholders exist in the checked array. We must update the
        // checked array with new children from props
        currentlyChecked = this.updateCheckedBasedOnSearchPlaceholder(currentlyChecked, newNode);
        // set the new node in the respective position
        set(nodesObject, nodePathString, newNode[0]);
        this.setState({ nodes: nodesObject.data, checked: currentlyChecked });
        if (updateRedux) updateRedux(nodesObject.data);
        return (onCheck) ? onCheck(currentlyChecked) : null;
    }
    /**
     * handleSearch
     * updates nodes with expanded properties
     */
    handleSearch = (nodes) => {
        const { limit, nodeKeys, checked } = this.props;
        // create the new node
        const { updatedNodes, expanded } = handleSearch(
            limit,
            nodeKeys,
            nodes
        );
        this.setState({ nodes: updatedNodes });
        this.setState({ expanded, checked });
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
        const { data, checked, expanded } = this.props;
        const labeledNodes = this.createLabels(data);
        if (!data.length) return null;
        return (
            <div className="checkbox-tree">
                <CheckBoxTree
                    nodes={labeledNodes}
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
