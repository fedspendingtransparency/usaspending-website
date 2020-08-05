/**
 * mockComponent.js
 * Created by Kevin Li 2/12/17
 */

const lifecycleFuncs = [
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'componentDidUpdate',
    'componentWillUnmount',
    'render'
];

export const mockComponent = (component) => {
    // override the component's lifecycle methods with mocked functions
    /* eslint-disable no-param-reassign */
    // we are intentionally reassigning the component parameters to mocked functions
    lifecycleFuncs.forEach((func) => {
        component.prototype[`__original__${func}`] = func;
        component.prototype[func] = jest.fn();
    });
    /* eslint-enable no-param-reassign */
};

export const unmockComponent = (component) => {
    // restore the component's lifecycle methods to the original functions
    /* eslint-disable no-param-reassign */
    // we are intentionally reassigning the component parameters to unmocked functions
    lifecycleFuncs.forEach((func) => {
        component.prototype[func] = component.prototype[`__original__${func}`];
    });
    /* eslint-enable no-param-reassign */
};

