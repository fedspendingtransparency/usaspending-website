import React from 'react';
import { render, waitFor } from 'test-utils';
import * as aboutTheDataHelper from 'helpers/aboutTheDataHelper';
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
        const unlinkedDataRequest = jest.spyOn(aboutTheDataHelper, 'fetchMockUnlinkedData');
        render(<UnlinkedDataContainer {...defaultProps} />);
        expect(unlinkedDataRequest).toHaveBeenCalledTimes(1);
    });
});
