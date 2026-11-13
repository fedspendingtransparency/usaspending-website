/**
 * @jest-environment jsdom
 *
 * TASCheckboxTreeContainer-test.jsx
 * Created by JD House 11/05/2026
*/

import React from 'react';
import { expect } from '@jest/globals';
import { waitFor } from '@testing-library/react';

import TASCheckboxTreeContainer from 'containers/search/filters/programSource/TASCheckboxTreeContainer';
import { fetchTas } from 'helpers/searchHelper';
import { render, screen, act, fireEvent } from '../../../../testResources/test-utils';

// jest hoists this above the imports, so tasTreeConfig captures the mock
jest.mock('helpers/searchHelper', () => ({
    ...jest.requireActual('helpers/searchHelper'),
    fetchTas: jest.fn()
}));

const initialMockResponse = {
    data: {
        results: [
            {
                id: '001', description: 'Library of Congress', ancestors: [], count: 4, children: null
            },
            {
                id: '012', description: 'Department of Agriculture', ancestors: [], count: 12, children: null
            }
        ]
    }
};

const agencyChildrenMockResponse = {
    data: {
        results: [
            {
                id: '012-1234',
                description: 'Federal Account of Agriculture',
                ancestors: ['012'],
                count: 3,
                children: null
            }
        ]
    }
};

const searchMockResponse = {
    data: {
        results: [
            {
                id: '001',
                description: 'Library of Congress',
                ancestors: [],
                count: 1,
                children: [
                    {
                        id: '001-0001',
                        description: 'Copyright Office Account',
                        ancestors: ['001'],
                        count: 1,
                        children: null
                    }
                ]
            }
        ]
    }
};

const placeholder = 'Type at least 3 letters...';

describe('TASCheckboxTreeContainer', () => {
    afterEach(() => {
        fetchTas.mockReset();
    });

    it('should populate the checkbox tree with all agencies', async () => {
        fetchTas.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<TASCheckboxTreeContainer />);

        await waitFor(() => {
            expect(screen.getByText('Library of Congress', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('Department of Agriculture', { exact: false })).toBeInTheDocument();
        });
    });

    it('should populate the checkbox tree search results and clear', async () => {
        fetchTas.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<TASCheckboxTreeContainer />);

        await waitFor(() => {
            expect(screen.getByText('Department of Agriculture', { exact: false })).toBeInTheDocument();
        });

        fetchTas.mockReturnValueOnce({ promise: Promise.resolve(searchMockResponse) });

        act(() => {
            const searchBar = screen.getByPlaceholderText(placeholder);
            fireEvent.change(searchBar, { target: { value: 'copy' } });
            expect(searchBar).toHaveValue('copy');
        });

        await waitFor(() => {
            // the matched term is wrapped in a highlight span, so match on the account code
            expect(screen.getByText('001-0001')).toBeInTheDocument();
        });

        act(() => {
            const searchBar = screen.getByPlaceholderText(placeholder);
            fireEvent.change(searchBar, { target: { value: '' } });
        });

        await waitFor(() => {
            expect(screen.queryByText('001-0001')).not.toBeInTheDocument();
        });
    });

    it('should open/close accordion', async () => {
        fetchTas.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<TASCheckboxTreeContainer />);

        await waitFor(() => {
            expect(screen.getByText('Department of Agriculture', { exact: false })).toBeInTheDocument();
        });

        fetchTas.mockReturnValueOnce({ promise: Promise.resolve(agencyChildrenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            expect(screen.getByText('Federal Account of Agriculture', { exact: false })).toBeInTheDocument();
        });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            expect(screen.queryByText('Federal Account of Agriculture', { exact: false })).not.toBeInTheDocument();
        });
    });
});
