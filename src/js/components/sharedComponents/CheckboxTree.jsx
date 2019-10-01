/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component } from 'react';

import CheckBoxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from 'prop-types';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    nodes: PropTypes.array,
    icons: PropTypes.object
};

// All possible Icons
// check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
// uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['far', 'square']} />,
// halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
// expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
// expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
// expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
// collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
// parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
// parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
// leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            nodes: props.nodes
        };
    }

    getNodes = () => this.state.nodes;

    getIcons = () => this.icons;

    getChecked = (checked) => this.state.checked;

    getExpanded = (expanded) => this.state.expanded;

    setExpanded = (expanded) => this.setState({ expanded });

    setChecked = (checked) => this.setState({ checked });

    icons = {
        check: (<FontAwesomeIcon
            className="rct-icon rct-icon-check"
            size="lg"
            icon="check-square" />),
        uncheck: (<FontAwesomeIcon
            className="rct-icon rct-icon-uncheck"
            size="lg"
            icon="square" />),
        halfCheck: (<FontAwesomeIcon
            className="rct-icon rct-icon-half-check"
            size="lg"
            icon="minus-square" />),
        expandClose: (<FontAwesomeIcon
            className="rct-icon rct-icon-expand-close"
            size="lg"
            icon="angle-right" />),
        expandOpen: (<FontAwesomeIcon
            className="rct-icon rct-icon-expand-open"
            size="lg"
            icon="angle-down" />),
        expandAll: null,
        collapseAll: null,
        parentClose: null,
        parentOpen: null,
        leaf: null
    }
    // sets specific icons to icons passed in props
    updateIcons = () => {
        const { icons } = this.props;
        if (icons) {
            Object.keys(icons).forEach((key) => {
                this.icons[key] = icons[key];
            });
        }
        return this.icons;
    }

    updateNodes = (nodes) => {
        const dirtyNodes = this.props.nodes;
        const currentNodes = this.state.nodes;
        this.setState({ nodes: dirtyNodes });
    }

    updateExpanded = () => {
        const currentExpanded = this.state.expanded;
        const expanded = [];
        this.setExpanded(expanded);
    }

    updateChecked = () => {
        const currentChecked = this.state.checked;
        const checked = [];
        this.setChecked(checked);
    }

    render() {
        const { nodes } = this.state;
        return (
            <div className="checkbox-tree">
                <CheckBoxTree
                    nodes={nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={this.setChecked}
                    onExpand={this.setExpanded}
                    icons={this.icons} />
            </div>
        );
    }
}

CheckboxTree.propTypes = propTypes;
