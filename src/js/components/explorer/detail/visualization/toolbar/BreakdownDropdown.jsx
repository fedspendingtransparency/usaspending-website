/**
 * BreakdownDropdown.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Router from 'containers/router/Router';

import { AngleDown } from 'components/sharedComponents/icons/Icons';

import { dropdownScopes, rootScopes, icons } from 'dataMapping/explorer/dropdownScopes';
import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';

import DropdownItem from './DropdownItem';

const propTypes = {
    isRoot: PropTypes.bool,
    active: PropTypes.object,
    root: PropTypes.string,
    jumpToLevel: PropTypes.func
};

export default class BreakdownDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            options: [],
            active: null
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
        else if (nextProps.isRoot !== this.props.isRoot) {
            this.prepareOptions(nextProps);
        }
    }

    prepareOptions(props) {
        let options = [];
        let active = props.root;
        if (props.isRoot) {
            // we're at the root level, so populate the full list
            options = rootScopes;
        }
        else {
            // we're not at the root, so we need to determine our current position in the tree using
            // the last filter that was applied
            const optionTree = dropdownScopes[props.root];
            const currentIndex = Math.min(optionTree.indexOf(props.lastFilter.type) + 1,
                optionTree.length - 1);
            const remainingTree = optionTree.slice(currentIndex);

            options = remainingTree;

            active = props.active.type;
        }

        this.setState({
            options,
            active
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
            if (this.props.isRoot && item !== this.props.root) {
                // redirect to the correct root URL
                Router.history.push(`/explorer/${item}`);
            }
            else if (!this.props.isRoot) {
                this.props.jumpToLevel(item);
            }
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

        let icon = null;
        const IconType = icons[this.state.active];
        if (IconType) {
            icon = <IconType />;
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
                            {icon}
                        </div>
                        <div className="item-label">
                            {sidebarTypes[this.state.active]}
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
