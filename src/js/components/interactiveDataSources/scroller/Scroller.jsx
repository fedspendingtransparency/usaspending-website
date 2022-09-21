import React from 'react';
import { Scrollama, Step } from 'react-scrollama';
import PropTypes from 'prop-types';

/**
 * The `Scroller` component uses the React implementation of Scrollama:
 * https://www.npmjs.com/package/react-scrollama.
 *
 * To use the `Scroller` component, add backdrop elements and `ScrollerOverlay`
 * components as the `Scroller` component's children. Backdrop elements must
 * contain a `name` prop with a unique identifier. `ScrollerOverlay` components must
 * contain a `content` prop that matches the `name` prop of a backdrop in the `Scroller`.
 * The `Scroller` will use these associations to dynamically swap in a backdrop element
 * whenever that element's corresponding `ScrollerOverlay` element scrolls into the threshold.
 *
 * Below is an example scroller that will change the background from `gold`
 * to `teal` when scrolling from the first overlay card into the second overlay card.
 *
        function ExampleScroller() {
            return (
                <div>
                    <Scroller>
                        <div
                            name="background-1"
                            style={{
                                background: `gold`
                            }}>
                        </div>
                        <div
                            name="background-2"
                            style={{
                                background: `teal`
                            }}>
                        </div>

                        <ScrollerOverlay content="background-1">
                            <p className="scroller-card">
                                Overlay card for animation 1
                            </p>
                        </ScrollerOverlay>
                        <ScrollerOverlay content="background-2">
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
class Scroller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdropList: [],
            overlayList: [],
            currentBackdrop: '',
            currentStepIndex: null
        };
        this.backdropRef = React.createRef();
    }

    componentDidMount() {
        const { backdropList } = this.state;

        if (backdropList.length === 0) this.setupLists();

        // set the first backdrop
        if (backdropList.length > 0) this.setBackdrop(backdropList[0]);
    }

    /**
     * This callback fires when a Step hits the offset threshold. It receives the
     * data prop of the step, which stores the index of the step.
     * It uses the step index to get the current overlay. For the current overlay,
     * it gets the accompanying backdrop by matching where the backdrop's "name" prop
     * equals the overlay's "content" prop.
     * @param {Object} stepCallback react scrollama callback response
     * @param {Object} stepCallback.element The DOM node of the step that was triggered
     * @param {Object} stepCallback.data The data supplied to the step
     * @param {Object} stepCallback.direction 'up' or 'down'
     * @param {Object} stepCallback.entry the original `IntersectionObserver` entry
     */
    onStepEnter = (stepCallback) => {
        const {
            element, data, direction, entry
        } = stepCallback;
        const { overlayList, backdropList } = this.state;
        const overlay = overlayList[data];

        if (overlay.props.onStepEnter) {
            overlay.props.onStepEnter({
                element, data, direction, entry
            });
        }

        let nextBackdrop;
        if (overlay) {
            // get the backdrop where the "name" prop matches the current overlay's "content" prop
            const backdropToSend =
                (backdropList.filter((el) =>
                    el.props.name === overlay.props.content) || backdropList[0])[0];

            nextBackdrop = backdropToSend;
            this.setBackdrop(nextBackdrop);
        }

        this.setCurrentStepIndex(data);
    };

    /**
     * Sets up the backdrop and overlay elements using the Scroller component's
     * children elements.
     * Updates the `backdropList` and `overlayList` properties in the state.
     */
    setupLists = () => {
        const { backdropList, overlayList } = this.state;
        // makes a clone of the children elements after dividing them into their respective groups
        React.Children.map(this.props.children, (element, index) => {
            // handles the background elements
            if (element.props.name &&
                element.props.name.length > 0) {
                backdropList.push(React.cloneElement(element, {
                    key: index
                }));
            }
            // handles the overlay elements
            else if (element.props.content &&
                element.props.content.length > 0) {
                // adds key to cloned object
                overlayList.push(React.cloneElement(element, {
                    key: index
                }));
            }
        });
        this.setState({ backdropList, overlayList });
    };

    /**
     * Updates the `currentBackdrop` property in the state with the provided element.
     * @param {*} element HTML element that serves as the backdrop for a scroller segment
     */
    setBackdrop = (newBackdrop) => {
        this.setState({ currentBackdrop: newBackdrop });
    };

    /**
     * Updates the `currentStepIndex` property in the state with a provided value.
     * @param {*} newStepIndex A value for current stepIndex from `onStepEnter`
     */
    setCurrentStepIndex = (newStepIndex) => {
        this.setState({ currentStepIndex: newStepIndex });
    };

    render() {
        const {
            currentBackdrop, overlayList, currentStepIndex, backdropList
        } = this.state;
        return (
            <div className="scroller-container">
                <div className="scroller-backdrop">
                    {backdropList.map((backdrop) => (
                        <div
                            key={backdrop.props.name}
                            style={{
                                ...backdrop.props.style,
                                display: backdrop === currentBackdrop ? "block" : "none"
                            }}>
                            {backdrop}
                        </div>
                    ))}
                </div>
                <div className="scroller-overlays">
                    <Scrollama offset={0.5} threshold={2} onStepEnter={this.onStepEnter}>
                        {overlayList.map((overlay, stepIndex) => (
                            <Step data={stepIndex} key={stepIndex}>
                                <div style={{ opacity: currentStepIndex === stepIndex ? 1 : 0.2 }}>
                                    {overlay}
                                </div>
                            </Step>
                        ))}
                    </Scrollama>
                </div>
            </div>
        );
    }
}

Scroller.propTypes = {
    backdropList: PropTypes.array,
    overlayList: PropTypes.array,
    currentBackdrop: PropTypes.string,
    currentStepIndex: PropTypes.number
};

export default Scroller;
