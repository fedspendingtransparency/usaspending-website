/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { difference, get, set } from 'lodash';
import reactStringReplace from 'react-string-replace';
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import {
    pathToNode,
    buildNodePath
} from 'helpers/checkboxTreeHelper';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    icons: PropTypes.object,
    isSearch: PropTypes.bool,
    searchText: PropTypes.string,
    modifyLabelTextClassname: PropTypes.string,
    labelComponent: PropTypes.element,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onCollapse: PropTypes.func,
    limit: PropTypes.number,
    expanded: PropTypes.array,
    checked: PropTypes.array
};


export default class CheckboxTree extends Component {
    /**
     * onExpand
     * (react-checkbox-tree calls this function when a user expands a node)
     * Decides whether we are expanding or collapsing the node.
     */
    onExpand = (newExpandedArray) => {
        // collapsing node
        if (newExpandedArray.length < this.props.expanded.length) {
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
            if (this.props.checked.length < checked.length) {
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
        const nodePath = path;
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
        const newNodes = { data: this.props.data };

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
     * expandNode
     * updates state with the new expanded array and updates the newly expanded children
     * with a loading object if we have no child data for that node.
     * @param {array} newExpandedArray - array with the newly expanded value
     */
    expandNode = async (newExpandedArray) => {
        const { expanded, data, isSearch } = this.props;
        const expandedValue = difference(newExpandedArray, expanded)[0];
        const { path } = pathToNode(data, expandedValue);
        const nodePathString = buildNodePath(path);
        // get the node
        const node = get({ data: this.props.data }, nodePathString);
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
            // mutating props...
            await this.setChildrenToLoading(nodePathString, node);
            return this.props.onExpand(expandedValue, newExpandedArray, true);
        }
        return this.props.onExpand(expandedValue, newExpandedArray, false);
    };
    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in props.
     */
    collapseNode = (newExpandedArray) => {
        this.props.onCollapse(newExpandedArray);
    }

    isCleanData = (data) => data.every((node) => {
        const keys = Object.keys(node);
        if (!keys.includes('value')) return false;
        if (!keys.includes('label')) return false;
        if (!keys.includes('path')) return false;
        return true;
    });

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
        return {
            ...node,
            label: this.props.labelComponent
                ? cloneElement(
                    this.props.labelComponent,
                    { value: node.vaule, label: node.label }
                )
                : (
                    <CheckboxTreeLabel
                        value={this.highlightText(node.value)}
                        label={this.highlightText(node.label)}
                        count={node.count} />
                ),
            children: node.children
                ? this.createLabels(node.children)
                : null
        };
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
