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
    const ref1 = useRef(null);
    return (
        <div className="usa-atd-animations">
            <TransitionGroup>
                {props?.aboutTheDataSidebar?.display && (
                    <CSSTransition
                        nodeRef={ref1}
                        classNames="atd-slide"
                        timeout={{ enter: 500, exit: 500 }}
                        exit>
                        <div ref={ref1}><AboutTheData {...props} /></div>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
