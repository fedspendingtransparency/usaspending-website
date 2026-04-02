import React, { memo, useCallback } from 'react';
import PropTypes from "prop-types";
import Analytics from 'helpers/analytics/Analytics';
import Accordion from "../../sharedComponents/accordion/Accordion";
import { useSidebarObserver } from '../../../context/SidebarFilterContext';

const propTypes = {
    title: PropTypes.string,
    component: PropTypes.element,
    // open: PropTypes.object,
    // setOpen: PropTypes.func,
    count: PropTypes.number
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarContentFilterAccordion = memo(function SidebarContentFilterAccordion({
    title, component, count
    // title, component, open, setOpen, count
}) {
    const { open, dispatch } = useSidebarObserver();
    const isOpen = open[title];

    const onToggle = useCallback(() => {
        Analytics.event({
            event: "dap_event",
            category: "Advanced Search - Filter",
            action: isOpen ? "Filter Close" : "Filter Open",
            label: title.concat(" ", isOpen ? "close" : "open")
        });

        dispatch({
            type: "toggle",
            payload: title
        });
    }, [dispatch, isOpen, title]);

    return (
        <div className="search-filters-list">
            <Accordion
                key={title}
                title={title}
                setOpen={onToggle}
                openObject={isOpen}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                contentClassName={isOpen ? '' : 'hidden'}
                selectedChipCount={count}>
                { isOpen && component }
            </Accordion>
        </div>
    );
});

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
