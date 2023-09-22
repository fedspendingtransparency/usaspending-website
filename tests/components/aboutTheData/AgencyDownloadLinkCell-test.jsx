/**
 * @jest-environment jsdom
 * 
 * AgencyDownloadLinkCell-test.jsx
 * Created by Lizzie Salita 1/14/21
 */

import React from 'react';
import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import { render, screen } from '@test-utils';

describe('AgencyDownloadLinkCell', () => {
    it('should render the download link when a file is provided', () => {
        render(<AgencyDownloadLinkCell file="mockURL" />);
        expect(screen.queryByText('Download')).toBeTruthy();
    });
    it('should not render the download link when the file prop is falsy', () => {
        render(<AgencyDownloadLinkCell />);
        expect(screen.queryByText('--')).toBeTruthy();
    });
});
