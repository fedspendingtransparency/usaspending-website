/**
 * AnimatedAboutTheDataWrapper.jsx
 * Created by Nick Torres 11/2/22
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AboutTheData from "../aboutTheDataUpdated/AboutTheData";

const propTypes = {
    onClose: PropTypes.func
};

const AnimatedAboutTheDataWrapper = (props) => (
    <div className="usa-atd-animations">
        <TransitionGroup component={null}>
            <CSSTransition
                className="atd-slide"
                classNames="atd-slide"
                timeout={500}
                in
                exit>
                <>
                    <AboutTheData onClose={props.onClose}/>
                </>
            </CSSTransition>
        </TransitionGroup>
    </div>
);

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
