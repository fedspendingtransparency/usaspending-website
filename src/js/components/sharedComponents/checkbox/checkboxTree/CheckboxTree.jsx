/**
 * CheckboxTree.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { cloneElement } from 'react';
// import React, { useState, useEffect, cloneElement } from 'react';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { difference } from "lodash";
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';

import TreeNode from "./TreeNode";
import replaceString from "../../../../helpers/replaceString";
import CheckboxTreeLabel from "../../CheckboxTreeLabel";

const CheckboxTree = (props) => {
    // eslint-disable-next-line no-shadow

    const {
        onChecked, data
    } = props;
    const isDisabled = false;

    /**
     * expandNodeAndFetchChildren
     * updates state with the new expanded array and updates the newly expanded children
     * with a loading object if we have no child data for that node.
     * @param {array} newExpandedArray - array with the newly expanded value
     */
    const expandNodeAndFetchChildren = async (newExpandedArray, selectedNode) => {
        // newly expanded node.code
        const { expanded, isSearch } = props;
        const expandedValue = difference(newExpandedArray, expanded)[0];
        /**
         * When there are no children or there is an empty object in the children property (since we
         * do this to get the caret to show when there is a count)
         * we will set the child to a loading div
         */
        const shouldFetchChildren = (
            (
                !selectedNode?.children
                || selectedNode?.children?.some((child) => child.value.includes('children_of_'))
            )
            && !isSearch
        );

        return props.onExpand(expandedValue, newExpandedArray, shouldFetchChildren, selectedNode);
    };

    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in props.
     */
    const collapseNode = (newExpandedArray) => {
        props.onCollapse(newExpandedArray);
    };

    /**
     * onExpand
     * (react-checkbox-tree calls this function when a user expands a node)
     * Decides whether we are expanding or collapsing the node.
     */
    const onExpand = (newExpandedArray, node) => {
        // collapsing node
        if (newExpandedArray.length < props.expanded.length) {
            return collapseNode(newExpandedArray);
        }
        // expanding node
        return expandNodeAndFetchChildren(newExpandedArray, node);
    };

    /**
     * checkedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const checkedNode = (checked, node) => {
        props.onCheck(checked, node);
    };
    /**
     * unCheckedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const unCheckedNode = (checked, node) => {
        // update checked nodes to remove the previously checked nodes
        props.onUncheck(checked, node);
    };

    /**
     * onCheck
     * - (react-checkbox-tree calls this function when a user selects a node)
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const onCheck = (checked, node) => {
        if (!props.isLoading) {
            if (props.checked.length < checked.length) {
                checkedNode(checked, node);
            }
            else {
                unCheckedNode(checked, node);
            }
        }
    };
    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @param {number} path - the path of the node to update
     * @returns {Array.<object>} - new array of nodes
     */
    const setChildrenToLoading = () => (
        <div className="children-are-loading">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="children-are-loading__text">Loading your data...</div>
        </div>
    );

    /**
     * highlightText
     * adds a <span> tag with a highlight class around matching text
     * @param {string} text - text to match
     * @returns {element|string} - returns a span element with a highlight class
     * or string if no match is found.
     */
    const highlightText = (text) => replaceString(text, props.searchText, props.modifyLabelTextClassname || 'highlight');

    /**
     ** createLabels
     * maps data labels from strings to html
     * @param {Array.<object>} nodes - an array of objects
     * @returns {Array.<object>} An array of objects
     **/
    // eslint-disable-next-line no-shadow
    const createLabels = (nodes) => nodes.map((node) => {
        // if label is a string, do nothing
        if (typeof node.label !== 'string') return node;
        if (node.isPlaceHolder && node.className !== 'hide') {
            return {
                value: node.value,
                showCheckbox: false,
                label: setChildrenToLoading(node)
            };
        }

        const displayId = Object.keys(node).includes('displayId')
            ? node.displayId
            : true;
        return {
            ...node,
            label: props.labelComponent
                ? cloneElement(
                    props.labelComponent,
                    { ...node }
                )
                : (
                    <CheckboxTreeLabel
                        className={node?.labelClassName}
                        count={node.count}
                        displayId={displayId}
                        subLabel={node.subLabel}
                        value={node?.isSearchable === false
                            ? node.value
                            : highlightText(node.value)}
                        label={node?.isSearchable === false
                            ? node.label
                            : highlightText(node.label)}
                        countLabel={props.countLabel} />
                ),
            children: node.children
                ? createLabels(node.children)
                : null
        };
    });

    const labeledNodes = createLabels(data);

    const renderTreeNodes = () => data.map((node) => (
        <>
            <TreeNode
                key={node.label}
                label={node.label}
                node={node}
                onExpand={onExpand}
                onCollapse={collapseNode}
                nodes={labeledNodes}
                disabled={isDisabled}
                checked={props.checked}
                expanded={props.expanded}
                onCheck={onCheck}
                icons={treeIcons}
                isLoading={props.isLoading}
                countLabel={props.countLabel} />
        </>
    ));

    return (
        <div>{renderTreeNodes(data)}</div>
    );
};

export default CheckboxTree;
