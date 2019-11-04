/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component, cloneElement } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import reactStringReplace from 'react-string-replace';
import CheckboxTreeLabel from 'components/sharedComponents/CheckboxTreeLabel';
import createCheckboxTreeDataStrucure from 'helpers/checkboxTreeHelper';
import { treeIcons } from 'dataMapping/shared/checkboxTree/checkboxTree';


import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    nodes: PropTypes.array,
    icons: PropTypes.object,
    nodeKeys: PropTypes.object,
    isSearch: PropTypes.bool,
    searchText: PropTypes.string,
    modifyLabelTextClassname: PropTypes.string,
    labelComponent: PropTypes.element
};


export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            nodes: [],
            requestType: 'initial'
        };
    }

    componentDidMount() {
        this.createNodes();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.nodes, this.props.nodes)) {
            this.createNodes();
        }
    }

    onExpand = (expanded) => this.setState({ expanded });

    onCheck = (checked) => this.setState({ checked });
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
        if (typeof node.label !== 'string') return node;
        const { labelComponent } = this.props;
        const newNode = { ...node };
        let label = newNode.label;
        let value = newNode.value;
        if (this.props.isSearch) {
            label = this.highlightText(label);
            value = this.highlightText(value);
        }
        if (labelComponent) {
            newNode.label = cloneElement(
                labelComponent,
                { value, label }
            );
        }
        else {
            newNode.label = (
                <CheckboxTreeLabel
                    value={value}
                    label={label} />
            );
        }
        if (newNode.children) {
            newNode.children = this.createLabels(newNode.children);
        }
        return newNode;
    });

    createNodes = () => {
        const { nodeKeys, nodes } = this.props;
        const newNodes = createCheckboxTreeDataStrucure(
            nodeKeys,
            nodes,
            this.state.requestType
        );
        this.setState({ nodes: newNodes });
    }

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
