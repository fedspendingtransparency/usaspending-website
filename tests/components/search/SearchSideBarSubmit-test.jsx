/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from 'test-utils';
import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';


it('should be disabled given no filters are staged', () => {
    render(<SearchSidebarSubmit
        stagedFiltersAreEmpty
        filtersChanged={false}
        requestsComplete={false}
        applyStagedFilters={() => {}}
        resetFilters={() => {}} />);
    expect(screen.getByText('Submit Search')).toHaveProperty('disabled', true);
});
