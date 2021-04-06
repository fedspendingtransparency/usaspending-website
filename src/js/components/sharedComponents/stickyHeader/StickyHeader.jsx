/**
 * StickyHeader.jsx
 * Created by Mike Bray 02/02/2018
 **/

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDynamicStickyClass } from 'helpers/stickyHeaderHelper';

const propTypes = {
    children: PropTypes.node
};

// TODO: This code is in the component library. We can delete it once we use <PageHeader /> everywhere.
const StickyHeader = ({
    children
}) => {
    const stickyHeader = useRef(null);
    const [
        isSticky,
        ,
        ,
        handleScroll,
        measureScreen
    ] = useDynamicStickyClass(stickyHeader);

    useEffect(() => {
        measureScreen();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', measureScreen);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', measureScreen);
        };
    }, [handleScroll, measureScreen]);

    const stickyClass = isSticky ? 'sticky-header__container_sticky' : '';

    return (
        <div className="sticky-header" ref={stickyHeader}>
            <div className={`sticky-header__container ${stickyClass}`}>
                <div className="sticky-header__header" id="main-focus">
                    {children}
                </div>
            </div>
        </div>
    );
};

StickyHeader.propTypes = propTypes;

export default StickyHeader;
