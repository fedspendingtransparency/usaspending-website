/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import NLSidebarContent from 'components/search/collapsibleSidebar/NLSidebarContent';

const renderContent = (text, startNLSearch = jest.fn(), onSelectSuggestion = jest.fn()) => {
    render(
        <NLSidebarContent
            text={text}
            setText={jest.fn()}
            startNLSearch={startNLSearch}
            data={[]}
            cancelQuery={jest.fn()}
            onSelectSuggestion={onSelectSuggestion} />
    );
    return startNLSearch;
};

describe('NLSidebarContent', () => {
    const textbox = () => screen.getByRole('textbox');

    it('submits the search when Enter is pressed', async () => {
        const startNLSearch = renderContent('grants to universities in Texas');
        await userEvent.type(textbox(), '{Enter}');
        expect(startNLSearch).toHaveBeenCalledTimes(1);
    });

    it('does not submit on Shift+Enter', async () => {
        const startNLSearch = renderContent('grants to universities in Texas');
        await userEvent.type(textbox(), '{Shift>}{Enter}{/Shift}');
        expect(startNLSearch).not.toHaveBeenCalled();
    });

    it('does not submit when the input is empty or only whitespace', async () => {
        const startNLSearch = renderContent('   ');
        await userEvent.type(textbox(), '{Enter}');
        expect(startNLSearch).not.toHaveBeenCalled();
    });

    it('runs an example prompt when it is clicked, instead of filling in the text area', async () => {
        const onSelectSuggestion = jest.fn();
        const startNLSearch = renderContent('', jest.fn(), onSelectSuggestion);
        await userEvent.click(screen.getByText('Grants to universities in Texas in fiscal year 2024'));
        expect(onSelectSuggestion).toHaveBeenCalledWith('Grants to universities in Texas in fiscal year 2024');
        expect(startNLSearch).not.toHaveBeenCalled();
        // the view switches to the search in progress, so the text area is gone instead of being filled in
        expect(screen.queryByRole('textbox')).toBeNull();
    });

    it('shows the text area and search button before the example prompts', () => {
        renderContent('');
        const box = textbox();
        const button = screen.getByText('Search');
        const example = screen.getByText('Grants to universities in Texas in fiscal year 2024');
        expect(box.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(button.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
});
