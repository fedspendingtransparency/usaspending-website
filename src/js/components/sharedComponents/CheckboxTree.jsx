/**
  * CheckboxTree.jsx
  * Created by Jonathan Hill 09/27/2019
  **/

import React, { Component } from 'react';

import CheckBoxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from 'prop-types';

const propTypes = {};
export default class CheckboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            nodes: [{
                value: 'mars',
                label: 'Mars',
                children: [
                    {
                        value: 'phobos',
                        label: 'Phobos',
                        expanded: true,
                        checked: true,
                        children: [
                            {
                                value: 'jim',
                                label: 'Jim'
                            },
                            {
                                value: 'bob',
                                label: 'Bob'
                            }
                        ]
                    },
                    { value: 'deimos', label: 'Deimos' }
                ]
            },
            {
                value: 'jupiter',
                label: 'Jupiter',
                children: [
                    { value: 'dontknow', label: 'DontKnow' },
                    { value: 'Who', label: 'Who' }
                ]
            }]
        };

        // this.selectNAICS = this.selectNAICS.bind(this);
        // this.removeNAICS = this.removeNAICS.bind(this);
        this.checked = this.checked.bind(this);
        this.expanded = this.expanded.bind(this);
    }
    nodes() {
        return this.state.nodes;
    }

    checked(checked) {
        console.log(' Checked : ', checked);
        this.setState({ checked });
    }

    expanded(expanded) {
        console.log(' Expanded : ', expanded);
        this.setState({ expanded });
    }

    icons() {
        return {
            check: (<FontAwesomeIcon
                className="rct-icon rct-icon-check"
                size="lg"
                icon="check-square" />),
            uncheck: (<FontAwesomeIcon
                className="rct-icon rct-icon-uncheck"
                size="lg"
                icon="square" />),
            halfCheck: (<FontAwesomeIcon
                className="rct-icon rct-icon-uncheck"
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
            expandAll: (<FontAwesomeIcon
                className="rct-icon rct-icon-expand-open"
                size="lg"
                icon="angle-down" />),
            collapseAll: (<FontAwesomeIcon
                className="rct-icon rct-icon-expand-open"
                size="lg"
                icon="angle-down" />),
            parentClose: null,
            parentOpen: null,
            leaf: null
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
        };
    }

    render() {
        return (
            <div>
                <CheckBoxTree
                    nodes={this.nodes()}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={this.checked}
                    onExpand={this.expanded}
                    icons={this.icons()} />
            </div>
        );
    }
}

CheckboxTree.propTypes = propTypes;
