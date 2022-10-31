import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AboutTheData from './AboutTheData';

const propTypes = {
    aboutTheData: PropTypes.object
};

const AnimatedAboutTheDataWrapper = (props) => (
    <div className="usa-atd-animations">
        <TransitionGroup>
            <CSSTransition
                classNames="atd-slide"
                timeout={500}
                exit>
                <AboutTheData {...props} />
            </CSSTransition>
        </TransitionGroup>
    </div>
);

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
