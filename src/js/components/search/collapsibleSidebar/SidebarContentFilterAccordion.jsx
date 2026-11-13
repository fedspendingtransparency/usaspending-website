import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import Accordion from 'components/sharedComponents/accordion/Accordion';
import { logToggleFilterAccordionEvent } from "containers/search/helpers/searchEvents";

const propTypes = {
    title: PropTypes.string,
    component: PropTypes.element,
    count: PropTypes.number,
    defaultOpen: PropTypes.bool
};

const SidebarContentFilterAccordion = memo(function SidebarContentFilterAccordion({
    title, component, count, defaultOpen
}) {
    const [hasOpened, setHasOpened] = useState(!!defaultOpen);
    // browsers fire a toggle event when <details> mounts with open set, skip events that don't change state
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);

    const wasOpen = useRef(!!defaultOpen);

    const onToggle = useCallback((e) => {
        const isOpen = e.currentTarget.open;

        if (isOpen === wasOpen.current) return;

        wasOpen.current = isOpen;

        if (isOpen && !hasOpened) setHasOpened(true);

        logToggleFilterAccordionEvent(isOpen, title, isSearchActive);
    }, [title, hasOpened, isSearchActive]);

    return (
        <div className="search-filters-list">
            <Accordion
                title={title}
                onToggle={onToggle}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                selectedChipCount={count}
                defaultOpen={defaultOpen}>
                { hasOpened && component }
            </Accordion>
        </div>
    );
});

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
