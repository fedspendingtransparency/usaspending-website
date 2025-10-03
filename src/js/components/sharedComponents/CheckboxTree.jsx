/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/
/**
 * This component uses react-checkbox-tree and that version MUST be 1.5.1.
 * Upgrading it causes bugs in the checkbox trees.
 */

import React, { cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { difference } from 'lodash-es';
import replaceString from 'helpers/replaceString';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    isSearch: PropTypes.bool,
    searchString: PropTypes.string,
    modifyLabelTextClassname: PropTypes.string,
    labelComponent: PropTypes.element,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    onCollapse: PropTypes.func,
    expanded: PropTypes.array,
    checked: PropTypes.array,
    noResults: PropTypes.bool,
    countLabel: PropTypes.string
};

const CheckboxTree = ({
    data,
    className,
    isLoading,
    isError,
    isDisabled = false,
    errorMessage,
    isSearch,
    searchString,
    modifyLabelTextClassname,
    labelComponent,
    onExpand: onExpandProp,
    onCheck: onCheckProp,
    onUncheck,
    onCollapse,
    expanded,
    checked,
    noResults,
    countLabel = ''
}) => {
    const checkboxTreeClass = className ? ` ${className}` : '';

    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in
     */
    const collapseNode = (newExpandedArray) => {
        onCollapse(newExpandedArray);
    };

    /**
     * expandNodeAndFetchChildren
     * updates state with the new expanded array and updates the newly expanded children
     * with a loading object if we have no child data for that node.
     * @param {array} newExpandedArray - array with the newly expanded value
     * @param {object} selectedNode - the checked node
     */
    const expandNodeAndFetchChildren = async (newExpandedArray, selectedNode) => {
        // newly expanded node.code
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

        return onExpandProp(expandedValue, newExpandedArray, shouldFetchChildren, selectedNode);
    };

    /**
     * onExpand
     * (react-checkbox-tree calls this function when a user expands a node)
     * Decides whether we are expanding or collapsing the node.
     */
    const onExpand = (newExpandedArray, node) => {
    // collapsing node
        if (newExpandedArray.length < expanded.length) {
            return collapseNode(newExpandedArray);
        }
        // expanding node
        return expandNodeAndFetchChildren(newExpandedArray, node);
    };

    /**
     * checkedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checkedLocal - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const checkedNode = (checkedLocal, node) => {
        onCheckProp(checkedLocal, node);
    };

    /**
     * unCheckedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checkedLocal - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const unCheckedNode = (checkedLocal, node) => {
        // update checked nodes to remove the previously checked nodes
        onUncheck(checkedLocal, node);
    };

    /**
     * onCheck
     * - (react-checkbox-tree calls this function when a user selects a node)
     * @param {*[]} checkedLocal - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    const onCheck = (checkedLocal, node) => {
        if (!isLoading) {
            if (checked.length < checkedLocal.length) {
                checkedNode(checkedLocal, node);
            }
            else {
                unCheckedNode(checkedLocal, node);
            }
        }
    };

    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @returns {Array.<object>} - new array of nodes
     */
    const setChildrenToLoading = () => (
        <div className="children-are-loading">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="children-are-loading__text">Loading your data...</div>
        </div>
    );

    // TODO - implement this
    // sets specific icons to custom icons passed in props
    // const updateIcons = () => {
    //     const { icons } = props;
    //     if (icons) {
    //         Object.keys(icons).forEach((key) => {
    //             treeIcons[key] = icons[key];
    //         });
    //     }
    //     return treeIcons;
    // };

    /**
     * highlightText
     * adds a <span> tag with a highlight class around matching text
     * @param {string} text - text to match
     * @returns {element|string} - returns a span element with a highlight class
     * or string if no match is found.
     */
    const highlightText = (text) => replaceString(
        text, searchString, modifyLabelTextClassname || 'highlight'
    );

    /**
      ** createLabels
      * maps data labels from strings to html
      * @param {Array.<object>} nodes - an array of objects
      * @returns {Array.<object>} An array of objects
    **/
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
            label: labelComponent
                ? cloneElement(
                    labelComponent,
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
                        countLabel={countLabel} />
                ),
            children: node.children
                ? createLabels(node.children)
                : null
        };
    });

    const labeledNodes = createLabels(data);

    if (isLoading) {
        return (
            <div className="checkbox-tree-filter-message-container">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="checkbox-tree-filter-message-container__text">
                    Loading your data...
                </div>
            </div>
        );
    }
    else if (isError && errorMessage) {
        return (
            <div className="checkbox-tree-filter-message-container">
                <div className="checkbox-tree-filter-message-container__text">
                    {errorMessage}
                </div>
            </div>
        );
    }
    else if (noResults) {
        return (
            <div className="checkbox-tree-filter-message-container">
                <FontAwesomeIcon icon="ban" />
                <div className="checkbox-tree-filter-message-container__text">
                    No Results
                </div>
            </div>
        );
    }
    else if (!data.length) return null;

    return (
        <div className={`checkbox-tree${checkboxTreeClass}`}>
            <CheckBoxTree
                nodes={labeledNodes}
                disabled={isDisabled}
                checked={checked}
                expanded={expanded}
                onCheck={onCheck}
                onExpand={onExpand}
                icons={treeIcons} />
        </div>
    );
};

CheckboxTree.propTypes = propTypes;
export default CheckboxTree;
