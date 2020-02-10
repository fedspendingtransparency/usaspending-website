/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';
import * as StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import RecipientTimeVisualizationSectionContainer from 'containers/recipient/RecipientTimeVisualizationSectionContainer';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import TopFiveSection from './topFive/TopFiveSection';

import RecipientOverview from './RecipientOverview';

const recipientSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'transactions-over-time',
        label: 'Transactions Over Time'
    },
    {
        section: 'top-five',
        label: 'Top 5'
    }
];

const propTypes = {
    recipient: PropTypes.object,
    pickedFy: PropTypes.func,
    showModal: PropTypes.func
};

const RecipientContent = ({ recipient, pickedFy, showModal }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(recipientSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // update the state
        const sectionDom = document.querySelector(`#recipient-${section}`);
        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 10 - StickyHeader.stickyHeaderHeight;
        scrollToY(sectionTop, 700);
        setActiveSection(section);
    };

    return (
        <div className="recipient-content-wrapper">
            <div className="recipient-sidebar">
                <Sidebar
                    pageName="recipient"
                    active={activeSection}
                    sections={recipientSections}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={StickyHeader.stickyHeaderHeight}
                    detectActiveSection={setActiveSection}
                    selectedFy={recipient.fy}
                    fyPicker
                    pickedYear={pickedFy} />
            </div>
            <div className="recipient-content">
                <RecipientOverview
                    showModal={showModal}
                    recipient={recipient} />
                <RecipientTimeVisualizationSectionContainer
                    recipient={recipient} />
                <TopFiveSection />
            </div>
        </div>
    );
};

RecipientContent.propTypes = propTypes;

export default RecipientContent;
