import React from 'react';
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

const SidebarContentFilterAccordion = ({
    title, component, open, setOpen, count
}) => {
    const onToggle = () => {
        Analytics.event({
            event: "dap_event",
            category: "Advanced Search - Filter",
            action: open[title] ? "Filter Close" : "Filter Open",
            label: title.concat(" ", open[title] ? "close" : "open")
        });

        setOpen({ ...open, [title]: !open[title] });
    };

    return (
        <div className="search-filters-list">
            <Accordion
                key={title}
                title={title}
                setOpen={onToggle}
                openObject={open[title]}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                contentClassName={open[title] ? '' : 'hidden'}
                selectedChipCount={count}>
                { open[title] && component }
            </Accordion>
        </div>
    );
};
SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
