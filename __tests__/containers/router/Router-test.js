/**
 * Router-test.js
 * Created by Kevin Li 9/14/17
 */

import { RouterSingleton } from 'containers/router/Router';

jest.mock('containers/router/RouterRoutes', () => require('./mockRoutes'));

const history = {
    location: {
        pathname: '/first',
        search: '',
        hash: '',
        state: undefined
    }
};

jest.useFakeTimers();

describe('RouterSingleton', () => {
    describe('startRouter', () => {
        it('should call the parseRoute function', () => {
            const instance = new RouterSingleton();
            const mockParse = jest.fn();
            instance.parseRoute = mockParse;
            instance.history = history;

            instance.startRouter();
            expect(mockParse).toHaveBeenCalledTimes(1);
            expect(mockParse).toHaveBeenCalledWith(history.location);
        });
    });

    describe('hashChanged', () => {
        it('should call the parseRoute function', () => {
            const instance = new RouterSingleton();
            const mockParse = jest.fn();
            instance.parseRoute = mockParse;

            instance.hashChanged(history.location);
            expect(mockParse).toHaveBeenCalledTimes(1);
            expect(mockParse).toHaveBeenCalledWith(history.location);
        });
    });

    describe('parseRoute', () => {
        describe('route matching', () => {
            it('should iterate through the available routes and find a matching route', () => {
                const instance = new RouterSingleton();
                // mock load component for now, we'll test it separately
                instance.loadComponent = () => (
                    new Promise((resolve) => resolve(jest.fn()))
                );
                instance.parseRoute(history.location);

                expect(instance.state.path).toEqual('/first');
                expect(instance.state.parent).toEqual('/first');
                expect(instance.state.silentlyUpdate).toBeTruthy();
            });
            it('should show a spinner if it takes more than 1.5 seconds to load a component', () => {
                const instance = new RouterSingleton();
                // mock load component for now, we'll test it separately
                instance.loadComponent = () => (
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(jest.fn());
                        }, 2000);
                    })
                );

                const mockSpinner = jest.fn();
                instance.reactContainer = {
                    showSpinner: mockSpinner,
                    navigateToComponent: jest.fn()
                };

                instance.parseRoute(history.location);

                jest.useFakeTimers().runTimersToTime(2000);
                expect(mockSpinner).toHaveBeenCalledTimes(1);
            });

            it('should return a 404 page if no routes match', () => {
                const instance = new RouterSingleton();
                // mock load component for now, we'll test it separately
                const mockLoader = jest.fn();
                instance.loadComponent = (...args) => (
                    new Promise((resolve) => resolve(mockLoader(...args)))
                );

                instance.reactContainer = null;

                instance.parseRoute({
                    pathname: '/second',
                    search: '',
                    hash: '',
                    state: undefined
                });

                expect(mockLoader).toHaveBeenCalledTimes(1);
                expect(mockLoader).toHaveBeenCalledWith('404');
            });
        });
    });

    describe('matchRoute', () => {
        it('should break out query params into an object', () => {
            const location = {
                pathname: '/first',
                search: '?test=hello',
                hash: '',
                state: undefined
            };

            const instance = new RouterSingleton();
            const output = instance.matchRoute(location, '/first');
            expect(output).toEqual({
                path: '/first',
                params: {},
                query: {
                    test: 'hello'
                }
            });
        });
        it('should return null if the path argument doesn\'t match the location history path', () => {
            const location = {
                pathname: '/first',
                search: '?test=hello',
                hash: '',
                state: undefined
            };

            const instance = new RouterSingleton();
            const output = instance.matchRoute(location, '/second');
            expect(output).toBeNull();
        });
    });

    describe('loadComponent', () => {
        it('should async load a JS bundle with the entrypoint component for a given route', async () => {
            const instance = new RouterSingleton();
            const mockComponent = (callback) => {
                callback('hello');
            };

            const output = await instance.loadComponent(mockComponent);
            expect(output).toEqual('hello');
        });
    });
});
