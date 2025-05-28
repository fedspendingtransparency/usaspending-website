/**
 * @jest-environment jsdom
 *
 * AboutPage-test.jsx
 * Created by Lizzie Salita 3/9/21
 */

import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import AboutPage from 'components/about/AboutPage';
import { expect } from '@jest/globals';
import { renderWithoutRouter, screen } from '../../testResources/test-utils';

describe('About Page content', () => {
    it('should set the active section based if a section is provided via a query param', () => {
        renderWithoutRouter((
            <MemoryRouter initialEntries={['/about/?section=licensing']}>
                <Routes>
                    <Route path="/about"
                           element={<AboutPage />} />
                </Routes>
            </MemoryRouter>
        ));

        const navBarLink = screen.queryAllByText('Licensing')[0];

        expect(navBarLink.parentElement).toHaveClass('active');
    });
});
