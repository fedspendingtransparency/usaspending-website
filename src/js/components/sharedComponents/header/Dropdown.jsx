/**
 * Dropdown.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
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
        let active = '';
        let iconAlt = 'Collapsed menu';
        if (this.state.expanded) {
            active = 'active';
            iconAlt = 'Expanded menu';
        }

        const items = this.props.items.map((item) => (
            <DropdownItem
                {...item}
                key={item.url} />
        ));

        return (
            <div
                className="nav-dropdown-outer-wrap"
                onMouseEnter={this.expandMenu}
                onMouseLeave={this.collapseMenu}>
                <button
                    className={`usa-nav-dropdown-button ${active}`}
                    title={this.props.title}
                    onClick={this.clickedButton}
                    aria-expanded={this.state.expanded}>
                    <div className="dropdown-button-content">
                        <div className="dropdown-button-label">
                            {this.props.label}
                        </div>
                        <div className="dropdown-button-icon">
                            <AngleDown alt={iconAlt} />
                        </div>
                    </div>
                </button>
                <div className={`usa-nav-dropdown-list ${active}`}>
                    <div className="dropdown-list-wrapper">
                        <ul className="dropdown-list">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = propTypes;
