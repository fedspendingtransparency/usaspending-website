/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test-utils';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import * as actions from 'redux/actions/googleAnalytics/googleAnalytics';
import { defaultState } from '../../testResources/defaultReduxFilters';

const defaultProps = {
    og_url: 'https://usaspending.gov',
    og_title: 'Ninja Turtles',
    og_description: 'USAspending.gov is the new official source of accessible, searchable and reliable spending data for the U.S. Government.',
    og_site_name: 'USAspending.gov',
    og_image: 'https://usaspending.gov/img/FacebookOG.png'
};

const spy = jest.spyOn(actions, 'setInitialAppLoadForDAP');

test('should call setInitialAppLoadForDAP given there is a valid title', () => {
    render(<MetaTags {...defaultProps} />);
    expect(spy).toHaveBeenCalledTimes(1);
});

test('should not call given pageview has already be called one and there is a valid title', () => {
    spy.mockClear();
    render(<MetaTags {...defaultProps} />, { initialState: { ...defaultState, googleAnalytics: { isInitialApplicationLoadForDAPGoogleAnalytics: false } } });
    expect(spy).toHaveBeenCalledTimes(0);
});
