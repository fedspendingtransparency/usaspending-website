/**
 * BreakdownDropdown.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleDown, Building } from 'components/sharedComponents/icons/Icons';

import { dropdownScopes } from 'dataMapping/explorer/dropdownScopes';

import DropdownItem from './DropdownItem';

const propTypes = {
    active: PropTypes.object,
    root: PropTypes.string
};

export default class BreakdownDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            options: []
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.pickItem = this.pickItem.bind(this);
    }

    componentWillMount() {
        this.prepareOptions(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.props.active) {
            this.prepareOptions(nextProps);
        }
        else if (nextProps.root !== this.props.root) {
            this.prepareOptions(nextProps);
        }
    }

    prepareOptions(props) {
        let options = [];
        if (props.active.type === 'root') {
            // we're at the root level, so populate the full list
            options = dropdownScopes[props.root];
        }
        else {
            // we're not at the root, so we need to determine our current position in the tree
            const optionTree = dropdownScopes[props.root];
            const currentIndex = optionTree.indexOf(props.active.type);
            const remainingTree = optionTree.slice(currentIndex);

            options = remainingTree;
        }

        this.setState({
            options
        });
    }

    toggleMenu() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    pickItem(item) {
        this.setState({
            expanded: false
        }, () => {
            console.log(item);
        });
    }

    render() {
        let dropdown = null;
        if (this.state.expanded) {
            const items = this.state.options.map((option) => (
                <DropdownItem
                    key={option}
                    value={option}
                    pickItem={this.pickItem} />
            ));
            dropdown = (
                <ul className="dropdown-menu">
                    {items}
                </ul>);
        }

        return (
            <div className="breakdown-menu">
                <div className="breakdown-label">
                    See the breakdown by:
                </div>
                <div className="breakdown-dropdown">
                    <button
                        className="dropdown-selector"
                        onClick={this.toggleMenu}>
                        <div className="item-icon">
                            <Building />
                        </div>
                        <div className="item-label">
                            Agency
                        </div>
                        <div className="arrow">
                            <AngleDown />
                        </div>
                    </button>

                    {dropdown}
                </div>
            </div>
        );
    }
}

BreakdownDropdown.propTypes = propTypes;
