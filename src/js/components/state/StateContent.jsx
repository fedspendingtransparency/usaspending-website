/**
 * StateContent.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StateTimeVisualizationSectionContainer from 'containers/state/StateTimeVisualizationSectionContainer';

import TopFiveSection from './topFive/TopFiveSection';

import StateOverview from './overview/StateOverview';

import StateFooter from './StateFooter';

const stateSections = [
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
    stateProfile: PropTypes.object
};

const StateContent = ({ stateProfile }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const jumpToSection = (section = '') => {
    // we've been provided a section to jump to
        const matchedSection = find(stateSections, {
            section
        });

        // no matching section
        if (!matchedSection) {
            return;
        }
        // scroll to the correct section
        const sectionDom = document.querySelector(`#state-${section}`);
        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 10 - stickyHeaderHeight;
        scrollToY(sectionTop, 700);
        setActiveSection(section);
    };

    return (
        <div className="state-content-wrapper">
            <div className="state-sidebar">
                <Sidebar
                    isGoingToBeSticky
                    active={activeSection}
                    pageName="state"
                    sections={stateSections}
                    jumpToSection={jumpToSection}
                    detectActiveSection={setActiveSection}
                    fixedStickyBreakpoint={getStickyBreakPointForSidebar()} />
            </div>
            <div className="state-content">
                <StateOverview
                    stateProfile={stateProfile.overview} />
                <StateTimeVisualizationSectionContainer
                    stateProfile={stateProfile.overview} />
                <TopFiveSection />
                <StateFooter />
            </div>
        </div>
    );
};

StateContent.propTypes = propTypes;

export default StateContent;
