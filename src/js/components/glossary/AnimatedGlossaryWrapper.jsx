/**
 * AnimatedGlossaryWrapper.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Glossary from './Glossary';

const propTypes = {
    glossary: PropTypes.object
};

export default class AnimatedGlossaryWrapper extends React.Component {
    render() {
        let content = (<Glossary {...this.props} />);

        if (!this.props.glossary.display) {
            content = null;
        }

        return (
            <div className="usa-da-glossary-animations">
                <CSSTransitionGroup
                    transitionName="glossary-slide"
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeave>
                    {content}
                </CSSTransitionGroup>
            </div>
        );
    }
}

AnimatedGlossaryWrapper.propTypes = propTypes;
