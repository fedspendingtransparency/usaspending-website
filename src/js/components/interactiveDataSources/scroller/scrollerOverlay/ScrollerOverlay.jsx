import React from 'react';
import PropTypes from 'prop-types';

class ScrollerOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onStepEnter: this.props.onStepEnter || null,
            onStepExit: this.props.onStepExit || null,
            onStepProgress: this.props.onStepProgress || null,
            content: this.props.content || null,
            position: this.props.position || 'center'
        };
    }

    render() {
        const { position } = this.state;
        return (
            <div className="scroller-overlay">
                <div className={`scroller-overlay-content ${position}-justified`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ScrollerOverlay.propTypes = {
    onStepEnter: PropTypes.func,
    onStepExit: PropTypes.func,
    onStepProgress: PropTypes.func,
    content: PropTypes.string,
    position: PropTypes.string
};

export default ScrollerOverlay;
