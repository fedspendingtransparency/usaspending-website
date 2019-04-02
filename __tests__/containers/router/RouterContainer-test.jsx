/**
 * RouterContainer-test.jsx
 * Created by Kevin Li 9/14/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import RouterContainer from 'containers/router/RouterContainer';

jest.mock('containers/router/Router', () => require('./mockRouter'));

describe('RouterContainer', () => {
    describe('handleRouteChange', () => {
        it('should set the state to the inbound path and parent URL components', () => {
            const container = shallow(<RouterContainer />);
            container.instance().handleRouteChange();

            expect(container.state().lastPath).toEqual('/path');
            expect(container.state().lastParent).toEqual('/parent');
        });
    });

    describe('navigateToComponent', () => {
        it('should load the inbound component type to state', () => {
            const mockHandler = jest.fn();
            const container = shallow(<RouterContainer />);
            container.instance().handleRouteChange = mockHandler;

            container.instance().navigateToComponent('fake component', {
                path: '/blerg',
                parent: '/'
            });

            expect(container.state().route).toEqual({
                path: '/blerg',
                parent: '/'
            });
            expect(container.state().content).toEqual('fake component');
            expect(container.state().showSpinner).toBeFalsy();
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });

    describe('showSpinner', () => {
        it('should set the showSpinner state to true', () => {
            const container = shallow(<RouterContainer />);
            container.instance().showSpinner();
            expect(container.state().showSpinner).toBeTruthy();
        });
    });
});
