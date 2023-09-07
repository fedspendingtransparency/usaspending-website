/**
 * AnimatedAboutTheDataWrapper.jsx
 * Created by Nick Torres 11/2/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AboutTheData from "./AboutTheData";

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object
};

const AnimatedAboutTheDataWrapper = (props) => (
    <div className="usa-atd-animations">
        <TransitionGroup>
            {props?.aboutTheDataSidebar?.display && (
                <CSSTransition
                    classNames="atd-slide"
                    timeout={{ enter: 500, exit: 500 }}
                    exit>
                    <AboutTheData {...props} />
                </CSSTransition>
            )}
        </TransitionGroup>
    </div>
);

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
