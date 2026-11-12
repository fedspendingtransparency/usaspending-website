/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import QueryAssistantResponse from 'components/search/naturalLanguage/QueryAssistantResponse';
import { QUERY_ASSISTANT_STATUS, QUERY_ASSISTANT_VERDICT } from 'components/search/collapsibleSidebar/NLConstants';

const rewrite = {
    verdict: QUERY_ASSISTANT_VERDICT.REPHRASE,
    message: 'Reworded your question as a search for matching awards.',
    rewritten_query: 'Awards to Arizona in 2025',
    suggestions: []
};

const outOfScope = {
    verdict: QUERY_ASSISTANT_VERDICT.OUT_OF_SCOPE,
    message: 'USAspending has no data on recipient wealth.',
    suggestions: ['Grants to universities in Texas in fiscal year 2024']
};

describe('QueryAssistantResponse', () => {
    it('shows a checking message while the query is being checked', () => {
        render(<QueryAssistantResponse status={QUERY_ASSISTANT_STATUS.CHECKING} />);
        expect(screen.getByText('Checking your question...')).toBeTruthy();
    });

    it('renders nothing for an answerable query', () => {
        const { container } = render(
            <QueryAssistantResponse
                status={QUERY_ASSISTANT_STATUS.DONE}
                result={{ verdict: QUERY_ASSISTANT_VERDICT.ANSWERABLE }} />
        );
        expect(container.querySelector('.query-assistant-response')).toBeNull();
    });

    it('shows the reworded query with approve and edit buttons', async () => {
        const onApprove = jest.fn();
        const onEdit = jest.fn();
        render(
            <QueryAssistantResponse
                status={QUERY_ASSISTANT_STATUS.DONE}
                result={rewrite}
                onApprove={onApprove}
                onEdit={onEdit} />
        );
        expect(screen.getByText(rewrite.rewritten_query)).toBeTruthy();
        // the reason for the rewording is shown as its own styled line
        expect(screen.getByText(rewrite.message).className).toContain('query-assistant-response__reason');

        await userEvent.click(screen.getByText('Approve'));
        expect(onApprove).toHaveBeenCalledWith(rewrite.rewritten_query);

        await userEvent.click(screen.getByText('Edit'));
        expect(onEdit).toHaveBeenCalledWith(rewrite.rewritten_query);
    });

    it('keeps showing the reworded query, without buttons, once approved', () => {
        render(<QueryAssistantResponse status={QUERY_ASSISTANT_STATUS.APPROVED} result={rewrite} />);
        expect(screen.getByText('Searching for')).toBeTruthy();
        expect(screen.getByText(rewrite.rewritten_query)).toBeTruthy();
        expect(screen.queryByText('Approve')).toBeNull();
    });

    it('shows the apology and reason in the same info style as a rewrite reason', () => {
        render(<QueryAssistantResponse status={QUERY_ASSISTANT_STATUS.DONE} result={outOfScope} />);
        expect(screen.getByText(outOfScope.message).className).toContain('query-assistant-response__reason');
        expect(screen.queryByText(/Note:/)).toBeNull();
    });

    it('shows the message and clickable suggestions when out of scope', async () => {
        const onSelectSuggestion = jest.fn();
        render(
            <QueryAssistantResponse
                status={QUERY_ASSISTANT_STATUS.DONE}
                result={outOfScope}
                onSelectSuggestion={onSelectSuggestion} />
        );
        expect(screen.getByText(outOfScope.message)).toBeTruthy();

        await userEvent.click(screen.getByText(outOfScope.suggestions[0]));
        expect(onSelectSuggestion).toHaveBeenCalledWith(outOfScope.suggestions[0]);
    });

    it('uses the heading from the backend above the suggestions', () => {
        render(
            <QueryAssistantResponse
                status={QUERY_ASSISTANT_STATUS.DONE}
                result={{ ...outOfScope, suggestions_heading: 'Search them one at a time:' }} />
        );
        expect(screen.getByText('Search them one at a time:')).toBeTruthy();
        expect(screen.queryByText('Examples of searches Smart Assist can run:')).toBeNull();
    });

    it('falls back to the default heading when the backend sends none', () => {
        render(<QueryAssistantResponse status={QUERY_ASSISTANT_STATUS.DONE} result={outOfScope} />);
        expect(screen.getByText('Examples of searches Smart Assist can run:')).toBeTruthy();
    });
});
