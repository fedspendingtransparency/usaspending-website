/**
 * LegalContents.jsx
 * Created by Kevin Li 2/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import { stickyHeaderHeight } from 'components/sharedComponents/stickyHeader/StickyHeader';

const legalSections = [
    {
        section: 'accessibility',
        label: 'Accessibility',
        url: '#/about/accessibility'
    },
    {
        section: 'privacy',
        label: 'Privacy Policy',
        url: '#/about/privacy'
    },
    {
        section: 'foia',
        label: 'Freedom of Information Act',
        url: '#/about/foia'
    }
];

const propTypes = {
    activePage: PropTypes.string
};

export default class LegalContents extends React.Component {
    render() {
        return (
            <div className="legal">
                <div className="about-sidebar">
                    <Sidebar
                        active={this.props.activePage}
                        pageName="about"
                        sections={legalSections}
                        stickyHeaderHeight={stickyHeaderHeight} />
                </div>
                <div className="about-content">
                    <div className="about-padded-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

LegalContents.propTypes = propTypes;
