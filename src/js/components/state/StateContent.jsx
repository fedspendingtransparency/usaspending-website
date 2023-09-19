/**
 * StateContent.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { find, throttle } from 'lodash';
import { useQueryParams } from 'helpers/queryParams';
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
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'overview');

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(stateSections, {
            section
        });

        // no matching section
        if (!matchedSection) {
            return;
        }

        // find the section in dom
        const sectionDom = document.querySelector(`#state-${section}`);
        if (!sectionDom) {
            return;
        }

        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            history.replace(`${history.location.pathname}?section=${section}`);
        }

        // update the state
        setActiveSection(section);

        // add offsets
        const sectionTop = sectionDom.offsetTop - 10 - stickyHeaderHeight;
        scrollToY(sectionTop, 700);
    };

    useEffect(throttle(() => {
        // this allows the page to jump to a section on page load, when
        // using a link to open the page
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

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
