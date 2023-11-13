/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderedMap } from 'immutable';
import SelectedAgencies from '../../../../../src/js/components/search/filters/agency/SelectedAgencies';

describe('SelectedAgencies', () => {
    it('Should use toptier abbreviation in tag', () => {
        const selectedAgencies = OrderedMap({
            subtier_100: {
                id: 100,
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
        });
        render(<SelectedAgencies type="Awarding" selectedAgencies={selectedAgencies} toggleAgency={jest.fn()} />);
        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of TA')).toBeTruthy();
    });
    it('Should use toptier name in tag', () => {
        const selectedAgencies = OrderedMap({
            subtier_100: {
                id: 100,
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
        });
        render(<SelectedAgencies type="Awarding" selectedAgencies={selectedAgencies} toggleAgency={jest.fn()} />);
        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of Toptier Agency')).toBeTruthy();
    });
});
