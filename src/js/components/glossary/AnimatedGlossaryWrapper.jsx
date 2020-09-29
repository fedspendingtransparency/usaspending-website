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
        return (
            <div className="usa-da-glossary-animations">
                <TransitionGroup>
                    {this.props.glossary.display && (
                        <CSSTransition
                            classNames="glossary-slide"
                            timeout={500}
                            exit>
                            <Glossary {...this.props} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }
}

AnimatedGlossaryWrapper.propTypes = propTypes;
