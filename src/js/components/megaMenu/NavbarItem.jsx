import React, { Component } from "react";

export default class NavbarItem extends Component {
    onMouseEnter = () => {
        this.props.onMouseEnter(this.props.index);
    };

    render() {
        const { title, children } = this.props;
        return (
            <li className="navbar-item-el">
                <button className="navbar-item-title"
                    onMouseEnter={this.onMouseEnter}
                    onFocus={this.onMouseEnter}>
                    {title}
                </button>
                <div className="dropdown-slot">{children}</div>
            </li>
        );
    }
}
