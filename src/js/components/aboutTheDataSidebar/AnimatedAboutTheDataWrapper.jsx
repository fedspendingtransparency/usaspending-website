/**
 * AnimatedAboutTheDataWrapper.jsx
 * Created by Nick Torres 11/2/22
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AboutTheData from "./AboutTheData";

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object
};

const AnimatedAboutTheDataWrapper = (props) => {
    return (
        <div className="usa-atd-animations">
                {props?.aboutTheDataSidebar?.display && (
                    <div
                        classNames="atd-slide">
                        <AboutTheData {...props} />
                    </div>
                )}
        </div>
    );
};

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
