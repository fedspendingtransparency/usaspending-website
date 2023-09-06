/**
 * LegalContent.jsx
 * Created by Kevin Li 2/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

const legalSections = [
    {
        section: 'accessibility',
        label: 'Accessibility',
        url: '/about/accessibility'
    },
    {
        section: 'privacy',
        label: 'Privacy Policy',
        url: '/about/privacy'
    },
    {
        section: 'foia',
        label: 'Freedom of Information Act',
        url: '/about/foia'
    }
];

const propTypes = {
    activePage: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
};

const LegalContent = (props) => (
    <div className="about-content-wrapper">
        <div className="about-sidebar">
            <Sidebar
                active={props.activePage}
                pageName="about"
                sections={legalSections}
                isGoingToBeSticky
                fixedStickyBreakpoint={getStickyBreakPointForSidebar()} />
        </div>
        <div className="about-content">
            <div className="about-padded-content">
                <div className="about-section-wrapper">
                    <h2 className="about-section-title">
                        {props.title}
                    </h2>

                    <div className="about-section-content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

LegalContent.propTypes = propTypes;
export default LegalContent;
