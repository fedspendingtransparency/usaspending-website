/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/
/**
 * This component uses react-checkbox-tree and that version MUST be 1.5.1.
 * Upgrading it causes bugs in the checkbox trees.
 */

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { difference } from 'lodash';
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
    icons: PropTypes.object,
    isSearch: PropTypes.bool,
    searchText: PropTypes.string,
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

const defaultProps = {
    countLabel: '',
    isDisabled: false
};

export default class CheckboxTree extends Component {
    /**
     * onExpand
     * (react-checkbox-tree calls this function when a user expands a node)
     * Decides whether we are expanding or collapsing the node.
     */
    onExpand = (newExpandedArray, node) => {
    // collapsing node
        if (newExpandedArray.length < this.props.expanded.length) {
            return this.collapseNode(newExpandedArray);
        }
        // expanding node
        return this.expandNodeAndFetchChildren(newExpandedArray, node);
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
    };
    /**
     * setChildrenToLoading
     * update a node's children property to a loading div.
     * @param {number} path - the path of the node to update
     * @returns {Array.<object>} - new array of nodes
     */
    setChildrenToLoading = () => (
        <div className="children-are-loading">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="children-are-loading__text">Loading your data...</div>
        </div>
    );
    /**
     * checkedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    checkedNode = (checked, node) => {
        this.props.onCheck(checked, node);
    };
    /**
     * unCheckedNode
     * - updates state and calls prop onCheck
     * @param {*[]} checked - array of checked values
     * @param {object} node - the checked node
     * @returns {null}
     */
    unCheckedNode = (checked, node) => {
    // update checked nodes to remove the previously checked nodes
        this.props.onUncheck(checked, node);
    };

    /**
     * expandNodeAndFetchChildren
     * updates state with the new expanded array and updates the newly expanded children
     * with a loading object if we have no child data for that node.
     * @param {array} newExpandedArray - array with the newly expanded value
     */
    expandNodeAndFetchChildren = async (newExpandedArray, selectedNode) => {
    // newly expanded node.code
        const { expanded, isSearch } = this.props;
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

        return this.props.onExpand(expandedValue, newExpandedArray, shouldFetchChildren, selectedNode);
    };
    /**
     * collapseNode
     * updates state with the new expanded array and calls onCollapse if passed in props.
     */
    collapseNode = (newExpandedArray) => {
        this.props.onCollapse(newExpandedArray);
    };

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
    };
    /**
     * highlightText
     * adds a <span> tag with a highlight class around matching text
     * @param {string} text - text to match
     * @returns {element|string} - returns a span element with a highlight class
     * or string if no match is found.
     */
    highlightText = (text) => replaceString(text, this.props.searchText, this.props.modifyLabelTextClassname || 'highlight');
    /**
      ** createLabels
      * maps data labels from strings to html
      * @param {Array.<object>} nodes - an array of objects
      * @returns {Array.<object>} An array of objects
    **/
    createLabels = (nodes) => nodes.map((node) => {
    // if label is a string, do nothing
        if (typeof node.label !== 'string') return node;
        if (node.isPlaceHolder && node.className !== 'hide') {
            return {
                value: node.value,
                showCheckbox: false,
                label: this.setChildrenToLoading(node)
            };
        }

        const displayId = Object.keys(node).includes('displayId')
            ? node.displayId
            : true;
        return {
            ...node,
            label: this.props.labelComponent
                ? cloneElement(
                    this.props.labelComponent,
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
                            : this.highlightText(node.value)}
                        label={node?.isSearchable === false
                            ? node.label
                            : this.highlightText(node.label)}
                        countLabel={this.props.countLabel} />
                ),
            children: node.children
                ? this.createLabels(node.children)
                : null
        };
    });

    render() {
        const {
            data,
            checked,
            expanded,
            isLoading,
            isError,
            errorMessage,
            noResults,
            className,
            isDisabled
        } = this.props;
        const labeledNodes = this.createLabels(data);
        if (isLoading) {
            return (
                <div className="checkbox-tree-filter-message-container">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="checkbox-tree-filter-message-container__text">Loading your data...</div>
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
        const checkboxTreeClass = className ? ` ${className}` : '';
        return (
            <div className={`checkbox-tree${checkboxTreeClass}`}>
                <CheckBoxTree
                    nodes={labeledNodes}
                    disabled={isDisabled}
                    checked={checked}
                    expanded={expanded}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    icons={treeIcons} />
            </div>
        );
    }
}

CheckboxTree.defaultProps = defaultProps;
CheckboxTree.propTypes = propTypes;
