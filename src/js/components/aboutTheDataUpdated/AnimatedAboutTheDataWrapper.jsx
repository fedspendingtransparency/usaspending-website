/**
 * AboutTheDataWrapper.jsx
 * Created by Nick Torres 11/2/22
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                {props.aboutTheData}
            </CSSTransition>
        </TransitionGroup>
    </div>
);

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
