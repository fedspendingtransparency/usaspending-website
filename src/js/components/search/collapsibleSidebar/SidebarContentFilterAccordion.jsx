import React, { memo, useCallback } from 'react';
import PropTypes from "prop-types";
import Analytics from 'helpers/analytics/Analytics';
import Accordion from "../../sharedComponents/accordion/Accordion";

const propTypes = {
    title: PropTypes.string,
    component: PropTypes.element,
    open: PropTypes.object,
    setOpen: PropTypes.func,
    count: PropTypes.number
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarContentFilterAccordion = memo(function SidebarContentFilterAccordion({
    title, component, open, setOpen, count
}) {
    const onToggle = useCallback(() => {
        Analytics.event({
            event: "dap_event",
            category: "Advanced Search - Filter",
            action: open ? "Filter Close" : "Filter Open",
            label: title.concat(" ", open ? "close" : "open")
        });

        setOpen((prevState) => ({ ...prevState, [title]: !prevState[title] }));
    }, [open, setOpen, title]);

    return (
        <div className="search-filters-list">
            <Accordion
                key={title}
                title={title}
                setOpen={onToggle}
                openObject={open}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                contentClassName={open ? '' : 'hidden'}
                selectedChipCount={count}>
                { open && component }
            </Accordion>
        </div>
    );
});

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
