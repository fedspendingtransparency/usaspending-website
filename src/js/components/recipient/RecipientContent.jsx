/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
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
    showChildRecipientModal: PropTypes.func,
    showAlternateNamesRecipientModal: PropTypes.func
};

const RecipientContent = ({
    recipient,
    showChildRecipientModal,
    showAlternateNamesRecipientModal
}) => {
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

        const sectionTop = sectionDom.offsetTop - 10 - stickyHeaderHeight;
        scrollToY(sectionTop, 700);
        setActiveSection(section);
    };

    return (
        <div className="recipient-content-wrapper">
            <div className="recipient-sidebar">
                <Sidebar
                    isGoingToBeSticky
                    pageName="recipient"
                    active={activeSection}
                    sections={recipientSections}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={getStickyBreakPointForSidebar()}
                    detectActiveSection={setActiveSection} />
            </div>
            <div className="recipient-content">
                <RecipientOverview
                    showChildRecipientModal={showChildRecipientModal}
                    showAlternateNamesRecipientModal={showAlternateNamesRecipientModal}
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
