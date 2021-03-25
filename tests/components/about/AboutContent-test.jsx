/**
 * AboutContent-test.jsx
 * Created by Lizzie Salita 3/9/21
 */

import React from 'react';
import { Route } from 'react-router-dom';
import AboutContent from 'components/about/AboutContent';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@test-utils';

describe('About Page content', () => {
    it('should set the active section based if a section is provided via a query param', () => {
        render((
            <Route location={{
                search: '?section=careers'
            }}>
                <AboutContent />
            </Route >
        ));
        const sidebarLink = screen.queryAllByText('Careers')[0];
        expect(sidebarLink).toHaveClass('active');
    });
});
