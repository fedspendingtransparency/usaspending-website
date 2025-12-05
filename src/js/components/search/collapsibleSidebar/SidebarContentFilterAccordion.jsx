import React, { useCallback, memo } from 'react';
import PropTypes from "prop-types";
import Accordion from "components/sharedComponents/accordion/Accordion";

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
    const setOpenCallback = useCallback(() =>
        setOpen({
            ...open,
            [title]: !open[title]
        }), [open, setOpen, title]);

    return (
        <div className="search-filters-list">
            <Accordion
                title={title}
                setOpen={setOpenCallback}
                openObject={open[title]}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                contentClassName={open[title] ? '' : 'hidden'}
                selectedChipCount={count}>
                {open[title] && component}
            </Accordion>
        </div>
    );
});

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
