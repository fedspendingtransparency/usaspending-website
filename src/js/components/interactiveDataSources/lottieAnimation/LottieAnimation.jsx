import React from 'react';
import lottie from "lottie-web";
import PropTypes from 'prop-types';

/**
 * `LottieAnimation` uses `lottie-web`.
 * https://www.npmjs.com/package/lottie-web.
 *
 * To add a "stand-alone" animation, provide the path to the animation JSON as the `src`
 * prop of the component. The `autoplay` and `loop` props can be added to trigger the
 * animation to play automatically and continuously.
 *
        <LottieAnimation
            autoplay
            loop
            src="/img/animations/animation.json" />
 *
 * This component can also be used as a backdrop in the `Scroller` component,
 * where backdrops will swap in with their corresponding `ScrollerOverlay` components.
 * With the `Scroller` component, animations can be triggered to play using the
 * `onStepEnter` callback.
 *
 * In the below example, the animation JSON is used as the backdrop for the
 * `ScrollerOverlay` component, which contains a card with text. When the first
 * `ScrollerOverlay` component scrolls into the offset threshold, `animation-1` will
 * play from `0` frames to `500` frames. When the second `ScrollerOverlay`
 * component scrolls into the offset threshold, `animation-2` will play from `200` to `700`
 * frames. Add the `isScrollerBackdrop` prop to have the scroll direction determine the play
 * direction: forward when scrolling down into the threshold and in reverse when
 * scrolling back up into the threshold.
 *
        function ExampleScroller() {
            const lottieRef1 = useRef();
            const lottieRef2 = useRef();
            return (
                <div>
                    <Scroller>
                        <LottieAnimation
                            isScrollerBackdrop
                            name="animation-1"
                            ref={lottieRef1}
                            src="/img/animations/animation1.json" />
                        <LottieAnimation
                            isScrollerBackdrop
                            name="animation-2"
                            ref={lottieRef2}
                            src="/img/animations/animation2.json" />

                        <ScrollerOverlay
                            content="animation-1"
                            onStepEnter={() =>
                                lottieRef1.current?.playAnimation(0, 500)
                            }>
                                <p className="scroller-card">
                                    Overlay card for animation 1
                                </p>
                        </ScrollerOverlay>
                        <ScrollerOverlay
                            content="animation-2"
                            onStepEnter={() =>
                                lottieRef2.current?.playAnimation(200, 700)
                            }>
                                <p className="scroller-card">
                                    Overlay card for animation 2
                                </p>
                        </ScrollerOverlay>
                    </Scroller>
                </div>
            )
        }
        export default ExampleScroller;
 *
 */
class LottieAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src || null, // string path to lottie animation json
            autoplay: this.props.autoplay || false,
            loop: this.props.loop || false,
            fps: this.props.fps || 60, // frames per second
            isScrollerBackdrop: this.props.isScrollerBackdrop || false, // if used as `Scroller` backdrop
            direction: 'down',
            oldScrollY: 0,
            role: this.props.role || ""
        };
        this.lottieRef = React.createRef();
    }

    componentDidMount() {
        const { isScrollerBackdrop } = this.state;
        if (isScrollerBackdrop) {
            window.addEventListener("scroll", this.setDirectionState);
        }
        // load the animation
        this.loadLottieAnimation();
    }

    componentWillUnmount() {
        const { isScrollerBackdrop } = this.state;
        if (isScrollerBackdrop) {
            window.removeEventListener("scroll", this.setDirectionState);
        }
        lottie.destroy();
        this.lottieAnimation = null;
    }

    /**
     * Detects scroll direction (up or down).
     * Updates `direction` state property based on scroll direction.
     */
    setDirectionState = () => {
        const { oldScrollY } = this.state;
        if (window.scrollY > oldScrollY) {
            this.changeDirection("down");
        }
        else {
            this.changeDirection("up");
        }
        this.setState({ oldScrollY: window.scrollY });
    };

    /**
     * Sets the animation segment order
     * @param {*} startFrame Frame to start the animation
     * @param {*} stopFrame Frame to stop the animation
     * @param {*} duration Total duration of the animation
     * @param {*} direction Play direction
     * @returns an array of the new segment order (start frame to stop frame)
     */
    setSegmentOrder = (startFrame, stopFrame, duration, direction) => {
        // Use direction to determine segment order (play forward or reverse)
        if (startFrame && (!stopFrame || stopFrame === 0)) {
            // go to start frame and play until end
            return (direction === "down") ?
                [startFrame, duration] : [duration, startFrame];
        }
        else if (stopFrame && (!startFrame || startFrame === 0)) {
            // play from beginning until stop frame
            return (direction === "down") ?
                [0, stopFrame] : [stopFrame, 0];
        }
        else if (startFrame > 0 && stopFrame > 0) {
            // play the segment
            return (direction === "down") ?
                [startFrame, stopFrame] : [stopFrame, startFrame];
        }
        return null;
    };

    /**
     * Updates the state `direction` property when the scroll direction changes
     * @param {*} newDirection Scroll direction, "up" or "down"
     */
    changeDirection = (newDirection) => {
        const { direction } = this.state;
        if (direction !== newDirection) {
            this.setState({ direction: newDirection });
        }
    };

    /**
     * Loads the lottie animation.
     */
    loadLottieAnimation = () => {
        this.lottieAnimation = lottie.loadAnimation({
            container: this.lottieRef.current, // the dom element on which to render the animation
            renderer: 'svg',
            loop: this.state.loop,
            autoplay: this.state.autoplay,
            path: this.state.src, // the relative path to the animation object
            rendererSettings: {
                progressiveLoad: true
            }
        });
    };

    /**
     * Converts provided value (seconds or frames) for a play segment
     * into a numeric value for the animation frame.
     * @param {*} val Provided seconds or frames
     * @param {*} fps frames per second
     * @param {*} isTime if provided val is seconds
     * @returns numeric value for the animation frame
     */
    convertSegmentValue = (val, fps, isTime) => (isTime ? val * fps : parseInt(val, 10));

    /**
     * Plays the animation.
     * @param {number} start Frame or seconds to start the animation.
     * @param {number} stop Frame or seconds to stop the animation.
     * @param {number} speed Speed of the animation. Default is `1`.
     * @param {boolean} force If true, forces animation to play segment even if animation is already playing. Can result in restarting the animation.
     * @param {boolean} isTime If start/stop are seconds or frames. `true` if seconds. Default `false`.
     */
    playAnimation = (start = 0, stop = 0, speed = 1, force = true, isTime = false) => {
        if (!this.lottieAnimation) return;
        const { fps, direction } = this.state;
        const startFrame = this.convertSegmentValue(start, fps, isTime);
        const stopFrame = this.convertSegmentValue(stop, fps, isTime);
        const duration = this.lottieAnimation.getDuration(true);

        const segmentOrder = this.setSegmentOrder(startFrame, stopFrame, duration, direction);
        if (segmentOrder) {
            this.lottieAnimation.setSpeed(speed);
            if (force) {
                // if already playing, would restart segment
                this.lottieAnimation.playSegments(segmentOrder, true);
            }
            else if (this.lottieAnimation.isPaused) {
                // only play if animation is paused
                this.lottieAnimation.playSegments(segmentOrder, true);
            }
        }
    };

    render() {
        return (
            <div className="lottie-animation-container">
                <div ref={this.lottieRef} role={this.props.role} />
            </div>
        );
    }
}

LottieAnimation.propTypes = {
    src: PropTypes.string,
    autoplay: PropTypes.bool,
    loop: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    fps: PropTypes.number,
    isScrollerBackdrop: PropTypes.bool,
    direction: PropTypes.string,
    oldScrollY: PropTypes.number,
    role: PropTypes.string
};

export default LottieAnimation;
