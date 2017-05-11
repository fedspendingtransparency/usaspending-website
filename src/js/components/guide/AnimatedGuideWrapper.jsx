/**
 * AnimatedGuideWrapper.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Guide from './Guide';

const propTypes = {
    guide: React.PropTypes.object
};

export default class AnimatedGuideWrapper extends React.Component {
    render() {
        let content = (<Guide {...this.props} />);

        if (!this.props.guide.display) {
            content = null;
        }

        return (
            <div className="usa-da-guide-animations">
                <CSSTransitionGroup
                    transitionName="guide-slide"
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeave>
                    {content}
                </CSSTransitionGroup>
            </div>
        );
    }
}

AnimatedGuideWrapper.propTypes = propTypes;
