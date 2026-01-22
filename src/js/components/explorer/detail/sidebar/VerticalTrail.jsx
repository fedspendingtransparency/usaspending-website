/**
 * VerticalTrail.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transitioning';

import TrailItem from './TrailItem';

const propTypes = {
    trail: PropTypes.array,
    rewindToFilter: PropTypes.func
};

const VerticalTrail = ({ trail, rewindToFilter }) => {
    const nodeRefs = useRef([]);

    useEffect(() => {
        nodeRefs.current = trail.map((item, i) => nodeRefs.current[i] ?? React.createRef());
    }, [trail]);

    const getTrailItem = () => (
        trail.map((item, index) => (
            <TrailItem
                {...item}
                isFirst={index === 0}
                isLast={index + 1 === trail.length}
                rewindToFilter={rewindToFilter}
                index={index}
                key={item.within}
                ref={nodeRefs.current[index]} />
        ))
    );

    return (
        <div className="vertical-trail-wrapper">
            <ul className="vertical-trail">
                <TransitionGroup>
                    <CSSTransition
                        classNames="explorer-item-animation"
                        timeout={{ exit: 750, enter: 200 }}
                        exit>
                        <li className="trail-item">
                            {getTrailItem()}
                        </li>
                    </CSSTransition>
                </TransitionGroup>
            </ul>
        </div>
    );
};

VerticalTrail.propTypes = propTypes;

export default VerticalTrail;
