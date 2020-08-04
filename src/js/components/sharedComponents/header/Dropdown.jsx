/**
 * Dropdown.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

import DropdownItem from './DropdownItem';

const propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.clickedButton = this.clickedButton.bind(this);
        this.expandMenu = this.expandMenu.bind(this);
        this.collapseMenu = this.collapseMenu.bind(this);
    }

    clickedButton() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    expandMenu() {
        this.setState({
            expanded: true
        });
    }

    collapseMenu() {
        this.setState({
            expanded: false
        });
    }

    render() {
        let activeChildren = '';
        let activeParent = '';
        let iconAlt = 'Collapsed menu';
        if (this.state.expanded) {
            activeChildren = 'nav-children_active';
            activeParent = 'nav-dropdown__parent_active';
            iconAlt = 'Expanded menu';
        }

        const items = this.props.items.map((item, index) => (
            <DropdownItem
                {...item}
                key={item.url}
                isFirst={index === 0} />
        ));

        return (
            <div
                className="nav-dropdown"
                onMouseEnter={this.expandMenu}
                onMouseLeave={this.collapseMenu}>
                <button
                    className={`nav-dropdown__parent ${activeParent}`}
                    title={this.props.title}
                    onClick={this.clickedButton}
                    aria-expanded={this.state.expanded}>
                    <div className="nav-dropdown__parent-label">
                        {
                            this.props.label === "Profiles" &&
                            kGlobalConstants.CARES_ACT_RELEASED &&
                            <div className="new-badge-outer">
                                <div className="new-badge-middle">
                                    <div className="new-badge-inner" />
                                </div>
                            </div>
                        }
                        {this.props.label}
                    </div>
                    <div className="nav-dropdown__parent-icon">
                        <AngleDown alt={iconAlt} />
                    </div>
                </button>
                <div className={`nav-children ${activeChildren}`}>
                    <ul className="nav-children__list">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = propTypes;
