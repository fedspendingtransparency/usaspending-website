/**
 * DataQuality-test.jsx
 * Created by Lizzie Salita 2/11/21
 */

import React from 'react';
import DataQuality from 'components/about/DataQuality';
import { render, screen } from '@test-utils';

const nativeDate = Date.now;
const onExternalLinkClick = jest.fn();
const mockProps = { onExternalLinkClick };

afterAll(() => {
    // restore the native date function
    Date.now = nativeDate;
});

describe('Data Quality section', () => {
    describe('DEFC U message', () => {
        it('should display before Mar 3, 2021', () => {
            // mock date 3/2/21
            Date.now = () => new Date(2021, 2, 2);
            render(<DataQuality {...mockProps} />);
            expect(screen.queryByText('A notice about COVID-19 funding and spending data for Public Law 116-260 Consolidated Appropriations Act, 2021:')).toBeTruthy();
        });
        it('should not display on Mar 3, 2021', () => {
            // mock date 3/3/21
            Date.now = () => new Date(2021, 2, 3);
            render(<DataQuality {...mockProps} />);
            expect(screen.queryByText('A notice about COVID-19 funding and spending data for Public Law 116-260 Consolidated Appropriations Act, 2021:')).toBeFalsy();
        });
    });
});
