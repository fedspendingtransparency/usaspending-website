/**
 * AnimatedGlossaryWrapper.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Glossary from './Glossary';

const propTypes = {
    glossary: PropTypes.object
};

export default class AnimatedGlossaryWrapper extends React.Component {
    render() {
        let content = (<Glossary {...this.props} />);

        if (!this.props.glossary.display) {
            content = <div />;
        }

        return (
            <div className="usa-da-glossary-animations">
                <TransitionGroup>
                    <CSSTransition
                        classNames="glossary-slide"
                        transitionLeaveTimeout={500}
                        transitionEnterTimeout={500}
                        exit>
                        {content}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

AnimatedGlossaryWrapper.propTypes = propTypes;
