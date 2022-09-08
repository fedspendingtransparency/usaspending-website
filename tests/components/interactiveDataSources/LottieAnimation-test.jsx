import React from 'react';
import { mount, shallow } from 'enzyme';
import { fireEvent } from 'test-utils';
import LottieAnimation from 'components/interactiveDataSources/lottieAnimation/LottieAnimation.jsx';

describe('Lottie Animation', () => {
    test('should create lottie animation with the correct state', () => {
        const test = mount(<LottieAnimation
            autoplay
            loop
            src="/animations/animation.json" />);
        expect(test.state().src).toBe('/animations/animation.json');
        expect(test.state().autoplay).toBe(true);
        expect(test.state().loop).toBe(true);
        expect(test.state().fps).toBe(60);
        expect(test.state().isScrollerBackdrop).toBe(false);
        expect(test.state().direction).toBe('down');
        expect(test.state().oldScrollY).toBe(0);
    });
    test('should initialize `lottieAnimation` with an `svg` animType during mount and then reset `lottieAnimation` during unmount', () => {
        const test = shallow(<LottieAnimation />);
        const instance = test.instance();
        const spy = jest.spyOn(instance, 'loadLottieAnimation');
        instance.componentDidMount();
        expect(spy).toHaveBeenCalledTimes(1);

        expect(instance.lottieAnimation).toBeTruthy();
        expect(instance.lottieAnimation.animationID).toBeTruthy();
        expect(instance.lottieAnimation.animType).toBe('svg');

        instance.componentWillUnmount();
        expect(instance.lottieAnimation).toBeFalsy();
    });
    test('should update the `lottieAnimation` playSpeed and totalFrames when a start, stop, and speed is provided during `playAnimation()`', () => {
        const test = shallow(<LottieAnimation />);
        const instance = test.instance();
        instance.componentDidMount();
        expect(instance.lottieAnimation.playSpeed).toBe(1); // default is 1

        const newStart = 100;
        const newStop = 500;
        const newSpeed = 3;
        const totalFrames = newStop - newStart;
        instance.playAnimation(newStart, newStop, newSpeed);
        expect(instance.lottieAnimation.playSpeed).toBe(newSpeed);
        expect(instance.lottieAnimation.totalFrames).toBe(totalFrames);
    });
    test('should update the `direction` state during `changeDirection()`', () => {
        const test = mount(<LottieAnimation />);
        expect(test.state().direction).toBe('down');
        const instance = test.instance();
        instance.componentDidMount();

        instance.changeDirection('up');
        expect(test.state().direction).toBe('up');
    });
    test('should update the `oldScrollY` state during `setDirectionState()`', () => {
        const test = mount(<LottieAnimation />);
        const instance = test.instance();
        instance.componentDidMount();
        expect(test.state().oldScrollY).toBe(0);

        fireEvent.scroll(window, { target: { scrollY: 200 } });
        instance.setDirectionState();
        expect(test.state().oldScrollY).toBe(200);

        fireEvent.scroll(window, { target: { scrollY: 0 } });
        instance.setDirectionState();
        expect(test.state().oldScrollY).toBe(0);
    });
    test('should set the segment order during `setSegmentOrder()`', () => {
        const test = shallow(<LottieAnimation />);
        const instance = test.instance();

        expect(instance.setSegmentOrder(500, 0, 1000, 'down')).toStrictEqual([500, 1000]);
        expect(instance.setSegmentOrder(500, 0, 1000, 'up')).toStrictEqual([1000, 500]);

        expect(instance.setSegmentOrder(0, 500, 1000, 'down')).toStrictEqual([0, 500]);
        expect(instance.setSegmentOrder(0, 500, 1000, 'up')).toStrictEqual([500, 0]);

        expect(instance.setSegmentOrder(100, 500, 1000, 'down')).toStrictEqual([100, 500]);
        expect(instance.setSegmentOrder(100, 500, 1000, 'up')).toStrictEqual([500, 100]);

        expect(instance.setSegmentOrder(-500, -500, 1000, 'up')).toBeFalsy();
    });
    test('should add a scroll event listener during mount and remove it during unmount when `isScrollerBackdrop` prop is true', () => {
        const test = shallow(<LottieAnimation isScrollerBackdrop />);
        const instance = test.instance();
        const spyAdd = jest.spyOn(window, 'addEventListener').mockImplementationOnce();
        instance.componentDidMount();
        expect(spyAdd).toBeCalledWith('scroll', expect.any(Function));

        const spyRemove = jest.spyOn(window, 'addEventListener').mockImplementationOnce();
        instance.componentWillUnmount();
        expect(spyRemove).toBeCalledWith('scroll', expect.any(Function));
    });
    test('should convert a value for a play segment into a numeric value for the animation frame', () => {
        const test = shallow(<LottieAnimation />);
        const instance = test.instance();
        expect(instance.convertSegmentValue(1, 60, true)).toBe(60);
        expect(typeof instance.convertSegmentValue('400', 60, false)).toBe('number');
    });
});
