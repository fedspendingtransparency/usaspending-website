/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { find, throttle } from 'lodash';
import { useHistory } from "react-router-dom";
import { useQueryParams } from 'helpers/queryParams';
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
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'overview');

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

        // find the section in dom
        const sectionDom = document.querySelector(`#recipient-${section}`);
        if (!sectionDom) {
            return;
        }

        // add section to url
        history.replace(`${history.location.pathname}?section=${section}`);

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
