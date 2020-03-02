/**
 * AwardingAgencyContainer-test.js
 * Created by Kirk Barden 2/27/20
 **/

import React from 'react';
import { shallow } from 'enzyme';
import AwardingAgency from '../../../../src/js/components/award/shared/overview/AwardingAgency';

describe('AwardingAgency', () => {
    it('Should wrap agency name in a link', () => {
        const awardingAgency = { id: 1, hasAgencyPage: true, formattedToptier: "Agency Name" };
        const wrapper = shallow(<AwardingAgency awardingAgency={awardingAgency} />);
        expect(wrapper.find('a').exists()).toBeTruthy();
    });
    it('Should not wrap agency name in a link', () => {
        const awardingAgency = { id: 1, hasAgencyPage: false, formattedToptier: "Agency Name" };
        const wrapper = shallow(<AwardingAgency awardingAgency={awardingAgency} />);
        expect(wrapper.find('a').exists()).toBeFalsy();
    });
});
