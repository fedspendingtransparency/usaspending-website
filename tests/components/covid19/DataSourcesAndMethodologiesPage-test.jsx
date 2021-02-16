/**
 * DataSourcesAndMethodologiesPage-test.jsx
 * Created by Lizzie Salita 2/11/21
 */

import React from 'react';
import DataSourcesAndMethodologiesPage from 'components/covid19/DataSourcesAndMethodologiesPage';
import { render, screen } from '@test-utils';

const nativeDate = Date.now;

afterAll(() => {
    // restore the native date function
    Date.now = nativeDate;
});

describe('COVID-19 Data Sources and Methodologies page', () => {
    describe('DEFC U message', () => {
        it('should display before Mar 3, 2021', () => {
            // mock date 3/2/21
            Date.now = () => new Date(2021, 2, 2);
            render(<DataSourcesAndMethodologiesPage />);
            expect(screen.queryByText('COVID-19 funding and spending data for Public Law 116-260 Consolidated Appropriations Act, 2021 will appear on USAspending.gov on March 3, 2020.')).toBeTruthy();
        });
        it('should not display on Mar 3, 2021', () => {
            // mock date 3/3/21
            Date.now = () => new Date(2021, 2, 3);
            render(<DataSourcesAndMethodologiesPage />);
            expect(screen.queryByText('COVID-19 funding and spending data for Public Law 116-260 Consolidated Appropriations Act, 2021 will appear on USAspending.gov on March 3, 2020.')).toBeFalsy();
        });
    });
});
