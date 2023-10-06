/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test-utils';
import * as agencyReportingAPI from 'apis/agencyReporting';
import UnlinkedDataContainer from 'containers/aboutTheData/modals/UnlinkedDataContainer';

const defaultProps = {
    agencyData: {
        fiscalYear: 2020,
        fiscalPeriod: 8,
        agencyCode: '012'
    }
};

describe('Unlinked Data Container', () => {
    it('should call api one time on mount', () => {
        const unlinkedDataRequest = jest.spyOn(agencyReportingAPI, 'fetchUnlinkedData');
        render(<UnlinkedDataContainer {...defaultProps} />);
        expect(unlinkedDataRequest).toHaveBeenCalledTimes(1);
    });
});
