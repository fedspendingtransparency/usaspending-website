/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AgencyFilterGroup from '../../../../../src/js/components/search/topFilterBar/filterGroups/AgencyFilterGroup';

describe('AgencyFilterGroup', () => {
    it('Should use toptier abbreviation in tag', () => {
        const filter = {
            values: [
                {
                    agencyType: 'subtier',
                    toptier_flag: false,
                    toptier_agency: {
                        abbreviation: 'TA',
                        name: 'Toptier Agency'
                    },
                    subtier_agency: {
                        abbreviation: 'SA',
                        name: 'Subtier Agency'
                    }
                }
            ]
        };
        render(<AgencyFilterGroup filter={filter} />);
        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of TA')).toBeTruthy();
    });
    it('Should use toptier name in tag', () => {
        const filter = {
            values: [
                {
                    agencyType: 'subtier',
                    toptier_flag: false,
                    toptier_agency: {
                        abbreviation: null,
                        name: 'Toptier Agency'
                    },
                    subtier_agency: {
                        abbreviation: 'SA',
                        name: 'Subtier Agency'
                    }
                }
            ]
        };
        render(<AgencyFilterGroup filter={filter} />);
        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of Toptier Agency')).toBeTruthy();
    });
});
