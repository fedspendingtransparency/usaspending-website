/**
 * AgencySidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

import SidebarLink from './SidebarLink';

const propTypes = {
    active: React.PropTypes.string,
    sections: React.PropTypes.array,
    jumpToSection: React.PropTypes.func
};

export default class AgencySidebar extends React.Component {
    render() {
        const items = this.props.sections.map((section) => (
            <li key={section.section}>
                <SidebarLink
                    section={section.section}
                    label={section.label}
                    active={this.props.active}
                    onClick={this.props.jumpToSection} />
            </li>
        ));

        return (
            <div className="agency-sidebar-content">
                <ul>
                    { items }
                </ul>
            </div>
        );
    }
}

AgencySidebar.propTypes = propTypes;
