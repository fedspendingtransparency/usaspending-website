/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor } from 'test-utils';
import { act } from '@testing-library/react';
import LottieAnimation from 'components/interactiveDataSources/lottieAnimation/LottieAnimation';

describe('Lottie Animation', () => {
    it('should render LottieAnimation component', () => {
        const renderComponent = () =>
            render(<LottieAnimation
                autoplay
                loop
                src="/animations/animation.json" />);
        const { getByTestId } = renderComponent();
        expect(getByTestId).toBeTruthy();
    });
    it('should update the `lottieAnimation` playSpeed and totalFrames when a start, stop, and speed is provided during `playAnimation()`', () => {
        const ref = React.createRef();
        render(<LottieAnimation ref={ref} />);
        ref.current.playAnimation(100, 500, 3);
        expect(ref.current.lottieAnimation.playSpeed).toBe(3);
        expect(ref.current.lottieAnimation.totalFrames).toBe((500 - 100));
    });
    it('should update the `direction` state during `changeDirection()`', () => {
        const ref = React.createRef();
        render(<LottieAnimation ref={ref} />);
        act(() => {
            ref.current.changeDirection('up');
        });
        expect(ref.current.state.direction).toBe('up');
    });
    it('should update the `oldScrollY` state on scroll when `isScrollerBackdrop` prop is true', () => {
        const ref = React.createRef();
        render(<LottieAnimation ref={ref} isScrollerBackdrop />);
        fireEvent.scroll(window, { target: { scrollY: 200 } });
        return waitFor(() => {
            expect(ref.current.state.oldScrollY).toBe(200);
        });
    });
    it('should set the segment order during `setSegmentOrder()`', () => {
        const ref = React.createRef();
        render(<LottieAnimation ref={ref} />);
        expect(ref.current.setSegmentOrder(500, 0, 1000, 'down')).toStrictEqual([500, 1000]);
        expect(ref.current.setSegmentOrder(500, 0, 1000, 'up')).toStrictEqual([1000, 500]);
        expect(ref.current.setSegmentOrder(0, 500, 1000, 'down')).toStrictEqual([0, 500]);
        expect(ref.current.setSegmentOrder(0, 500, 1000, 'up')).toStrictEqual([500, 0]);
        expect(ref.current.setSegmentOrder(100, 500, 1000, 'down')).toStrictEqual([100, 500]);
        expect(ref.current.setSegmentOrder(100, 500, 1000, 'up')).toStrictEqual([500, 100]);
        expect(ref.current.setSegmentOrder(-500, -500, 1000, 'up')).toBeFalsy();
    });
    it('should convert a value for a play segment into a numeric value for the animation frame', () => {
        const ref = React.createRef();
        render(<LottieAnimation ref={ref} />);
        expect(ref.current.convertSegmentValue(1, 60, true)).toBe(60);
        expect(typeof ref.current.convertSegmentValue('400', 60, false)).toBe('number');
    });
});
