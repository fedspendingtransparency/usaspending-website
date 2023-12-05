/**
 * @jest-environment jsdom
 *
 * AboutPage-test.jsx
 * Created by Lizzie Salita 3/9/21
 */

import React from 'react';
import { Route } from 'react-router-dom';
import AboutPage from 'components/about/AboutPage';
import { expect } from '@jest/globals';
import { render, screen } from '../../testResources/test-utils';

describe('About Page content', () => {
    it('should set the active section based if a section is provided via a query param', () => {
        render((
            <Route location={{
                search: '?section=licensing'
            }}>
                <AboutPage />
            </Route >
        ));

        const navBarLink = screen.queryAllByText('Licensing')[0];

        expect(navBarLink.parentElement).toHaveClass('active');
    });
});
