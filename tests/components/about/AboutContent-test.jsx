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
    it('should set Careers as the active section based on the router location', () => {
        render((
            <Route location={{
                state: { fromCareersLink: true }
            }}>
                <AboutContent />
            </Route >
        ));
        const sidebarLink = screen.queryAllByText('Careers')[0];
        expect(sidebarLink).toHaveClass('active');
    });
});
