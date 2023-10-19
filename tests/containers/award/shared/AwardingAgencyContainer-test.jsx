/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AwardingAgency from '../../../../src/js/components/award/shared/overview/AwardingAgency';


describe('AwardingAgency', () => {
    it('Should wrap agency name in a link', () => {
        const awardingAgency = { id: 1, hasAgencyPage: true, formattedToptier: "Agency Name" };
        render(<BrowserRouter><AwardingAgency awardingAgency={awardingAgency} /></BrowserRouter>);
        expect(screen.getByText('Agency Name').closest('a')).toHaveAttribute('href', '/agency/undefined');
    });
    it('Should not wrap agency name in a link', () => {
        const awardingAgency = { id: 1, hasAgencyPage: false, formattedToptier: "Agency Name" };
        render(<AwardingAgency awardingAgency={awardingAgency} />);
        expect(screen.queryByText('Link')).toBeFalsy();
    });
});
