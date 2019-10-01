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
export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            nodes: props.nodes
        };
    }

    onExpand = (expanded) => this.setState({ expanded });

    onCheck = (checked) => this.setState({ checked });
    // default icons
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

    render() {
        const { nodes } = this.state;
        return (
            <div className="checkbox-tree">
                <CheckBoxTree
                    nodes={nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    icons={this.icons} />
            </div>
        );
    }
}

CheckboxTree.propTypes = propTypes;
