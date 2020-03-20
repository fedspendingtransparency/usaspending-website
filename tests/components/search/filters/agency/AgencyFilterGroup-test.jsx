/**
 * AgencyFilterGroup-test.js
 * Created by Kirk Barden 3/17/20
 **/

import React from 'react';
import { shallow } from 'enzyme';
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
        const wrapper = shallow(<AgencyFilterGroup filter={filter} />);
        const tags = wrapper.instance().generateTags();
        expect(tags[0].title).toEqual('Subtier Agency (SA) | Sub-Agency of TA');
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
        const wrapper = shallow(<AgencyFilterGroup filter={filter} />);
        const tags = wrapper.instance().generateTags();
        expect(tags[0].title).toEqual('Subtier Agency (SA) | Sub-Agency of Toptier Agency');
    });
});
