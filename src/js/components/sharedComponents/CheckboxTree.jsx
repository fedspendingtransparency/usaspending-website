/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component } from 'react';
import CheckBoxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import { createCheckboxTreeDataStrucure } from 'helpers/checkboxTreeHelper';


import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const propTypes = {
    nodes: PropTypes.array,
    icons: PropTypes.object,
    nodeKeys: PropTypes.object
};

// const defaultProps = {
//     nodeKeys: {
//         value: 'value',
//         label: 'label'
//     }
// };
export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            nodes: []
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
    // sets specific icons to custom icons passed in props
    updateIcons = () => {
        const { icons } = this.props;
        if (icons) {
            Object.keys(icons).forEach((key) => {
                this.icons[key] = icons[key];
            });
        }
        return this.icons;
    }

    createLabels = (value, label) => (
        <div className="checkbox-tree-label">
            <div className="checkbox-tree-label__value">{value}</div>
            <div className="checkbox-tree-label__label">{label}</div>
        </div>
    );

    createNodes = () => {
        const { nodeKeys, nodes } = this.props;
        const newNodes = createCheckboxTreeDataStrucure(
            nodeKeys,
            nodes
        );
        this.setState({ nodes: newNodes });
    }

    render() {
        const { nodes, checked, expanded } = this.state;
        console.log(' State : ', this.state);
        if (!nodes.length) return null;
        return (
            <div className="checkbox-tree">
                <CheckBoxTree
                    nodes={nodes}
                    checked={checked}
                    expanded={expanded}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    icons={this.icons} />
            </div>
        );
    }
}

CheckboxTree.propTypes = propTypes;
// CheckBoxTree.defaultProps = defaultProps;
