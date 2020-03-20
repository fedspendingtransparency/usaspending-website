/**
 * SelectedAgencies-test.jsx
 * Created by Kirk Barden 3/17/20
 **/

import React from 'react';
import { mount } from 'enzyme';
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
        const wrapper = mount(<SelectedAgencies type="Awarding" selectedAgencies={selectedAgencies} toggleAgency={jest.fn()} />);
        const shownFilterButton = wrapper.find('.shown-filter-button');
        expect(shownFilterButton.text()).toEqual('Subtier Agency (SA) | Sub-Agency of TA');
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
        const wrapper = mount(<SelectedAgencies type="Awarding" selectedAgencies={selectedAgencies} toggleAgency={jest.fn()} />);
        const shownFilterButton = wrapper.find('.shown-filter-button');
        expect(shownFilterButton.text()).toEqual('Subtier Agency (SA) | Sub-Agency of Toptier Agency');
    });
});
