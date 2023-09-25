/**
 * AnimatedGlossaryWrapper.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Glossary from './Glossary';

const propTypes = {
    glossary: PropTypes.object
};

const AnimatedGlossaryWrapper = (props) => {
    const [zIndexClass, setZIndexClass] = useState(null);

    const { lastOpenedSlideout } = useSelector((state) => state.slideouts);

    useEffect(() => {
        setZIndexClass(lastOpenedSlideout === 'glossary' ? 'z-index-plus-one' : 'z-index');
    }, [lastOpenedSlideout]);

    return (
        <div className="usa-da-glossary-animations">
            <TransitionGroup>
                {props.glossary.display && (
                    <CSSTransition
                        classNames="glossary-slide"
                        timeout={{ enter: 500, exit: 500 }}
                        exit>
                        <Glossary {...props} zIndexClass={zIndexClass} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

AnimatedGlossaryWrapper.propTypes = propTypes;
export default AnimatedGlossaryWrapper;

