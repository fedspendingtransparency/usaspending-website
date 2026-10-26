import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import Accordion from '../../sharedComponents/accordion/Accordion';

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

    const onToggle = useCallback((e) => {
        const isOpen = e.target.open;

        if (isOpen && !hasOpened) setHasOpened(true);

        Analytics.event({
            event: 'dap_event',
            category: 'Advanced Search - Filter',
            action: isOpen ? 'Filter Open' : 'Filter Close',
            label: title.concat(' ', isOpen ? 'open' : 'close')
        });
    }, [title, hasOpened]);

    return (
        <div className="search-filters-list">
            <Accordion
                title={title}
                onToggle={onToggle}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                selectedChipCount={count}
                defaultOpen={defaultOpen}
                key={title}>
                { hasOpened && component }
            </Accordion>
        </div>
    );
});

SidebarContentFilterAccordion.propTypes = propTypes;
export default SidebarContentFilterAccordion;
