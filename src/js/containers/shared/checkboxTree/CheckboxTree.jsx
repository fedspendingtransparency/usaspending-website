/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { isEqual, difference, isEmpty } from 'lodash';
import reactStringReplace from 'react-string-replace';
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import { createCheckboxTreeDataStrucure } from 'helpers/checkboxTreeHelper';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    nodes: PropTypes.array,
    icons: PropTypes.object,
    nodeKeys: PropTypes.object,
    isSearch: PropTypes.bool,
    searchText: PropTypes.string,
    modifyLabelTextClassname: PropTypes.string,
    labelComponent: PropTypes.element,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onCollapse: PropTypes.func,
    setRedux: PropTypes.func,
    updateRedux: PropTypes.func
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
        if (!isEqual(prevProps.nodes, this.props.nodes)) {
            this.updateNodes();
        }
    }
    /**
     * onExpand
     * Will call onCollapse
     */
    onExpand = (expandedArray) => {
        const { expanded } = this.state;
        // collapsing node
        if (expandedArray.length < expanded.length) {
            console.log(' Collapsing ');
            const collapsedValue = difference(expanded, expandedArray)[0];
            this.setState({ expanded: expandedArray });
            if (this.props.onCollapse) this.props.onCollapse(collapsedValue);
        }
        /**
         * React Checkbox Tree sends the entire array of expanded node values.
         * We must find the difference to isolate the newly expanded node value.
         */
        const expandedValue = difference(expandedArray, expanded)[0];
        const { nodeIndex, node } = this.findNode(expandedValue);
        // verify current children property is empty
        if (isEmpty(node.children[0])) {
            const newNodes = this.setChildrenToLoading(nodeIndex);
            this.setState({ expanded: expandedArray, nodes: newNodes });
            if (this.props.onExpand) this.props.onExpand(node);
        }
        else {
            this.setState({ expanded: expandedArray });
        }
    };

    onCheck = (checked) => this.setState({ checked });

    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @param {number} index - the index of the node to update
     * @returns {Array.<object>} - new array of nodes
     */
    setChildrenToLoading = (index) => {
        const newNodes = [...this.state.nodes];
        newNodes[index].children = [{
            label: (
                <div className="children-are-loading">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="children-are-loading__text">Loading your data...</div>
                </div>
            ),
            value: 'loading',
            showCheckbox: false
        }];
        return newNodes;
    }
    /**
      ** createNodes
      * maps raw data to checkbox tree data structure
      * e.g. [{ label: 'Max', value: Well, children: [] }]
      * Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
      * @returns {Array.<object>} Sets the nodes property in state to an
      * of objects with properties label, value, children to be used by react-checkbox-tree library
    **/
    createNodes = () => {
        const { nodeKeys, nodes } = this.props;
        const newNodes = createCheckboxTreeDataStrucure(
            nodeKeys,
            nodes,
            this.state.requestType
        );
        this.setState({ nodes: newNodes, requestType: '' });
        if (this.props.setRedux) this.props.setRedux(newNodes);
    }
    /**
     * updateNodes
     * This will add new data to the nodes array
     */
    updateNodes = () => {
        const { nodeKeys, nodes } = this.props;
        const newNode = createCheckboxTreeDataStrucure(
            nodeKeys,
            nodes,
            this.state.requestType
        );
        const value = newNode[0].value;
        const { nodeIndex } = this.findNode(value);
        const newNodes = [...this.state.nodes];
        newNodes.splice(nodeIndex, 1, newNode[0]);
        this.setState({ nodes: newNodes });
        if (this.props.updateRedux) this.props.updateRedux(newNodes);
    }
    /**
     * findNode
     * Given a value this will that node in the current node array
     * @param {string} - value of the node you are looking for
     * @returns {object} - A object with properties nodeIndex and node
     */
    findNode = (value) => {
        const { nodes } = this.state;
        const nodeIndex = nodes.findIndex((node) => node.value === value);
        const node = nodes[nodeIndex];
        return { nodeIndex, node };
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
     * @returns {element or string} - returns a span element with a highlight class
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
                    label={label} />
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
