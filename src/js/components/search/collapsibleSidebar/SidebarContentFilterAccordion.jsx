import React from 'react';
import PropTypes from "prop-types";
import Accordion from "../../sharedComponents/accordion/Accordion";

const propTypes = {
    title: PropTypes.string,
    component: PropTypes.element,
    isMobile: PropTypes.bool,
    open: PropTypes.object,
    setOpen: PropTypes.func,
    count: PropTypes.number
};

const SidebarContentFilterAccordion = ({
    title, component, isMobile, open, setOpen, count
}) => (
    <div className="search-filters-list">
        <Accordion
            title={title}
            setOpen={() => setOpen({ ...open, [title]: !open[title] })}
            openObject={open[title]}
            closedIcon="chevron-down"
            openIcon="chevron-up"
            contentClassName={open[title] ? '' : 'hidden'}
            selectedChipCount={count}>
            {!isMobile && open[title] && component}
        </Accordion>
    </div>
);

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
