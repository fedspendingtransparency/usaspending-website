/**
 * SidebarFooter.jsx
 * Created by James Lee 7/17/20
 */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDynamicStickyClass } from '../sharedComponents/stickyHeader/StickyHeader';

const propTypes = {
    isGoingToBeSticky: PropTypes.bool,
    pageName: PropTypes.string,
    fixedStickyBreakpoint: PropTypes.number,
    verticalOffset: PropTypes.number
};

function SidebarFooter({
    isGoingToBeSticky,
    pageName,
    fixedStickyBreakpoint,
    verticalOffset
}) {
    const referenceDiv = useRef(null);
    const div = useRef(null);
    const [isSidebarSticky, , , handleScroll] = useDynamicStickyClass(referenceDiv, fixedStickyBreakpoint);
    const [sidebarFooterWidth, setSidebarFooterWidth] = useState("auto");
    const [sidebarFooterTop, setSidebarFooterTop] = useState("auto");

    useEffect(() => {
        const updateSidebarFooterWidthAndTop = throttle(() => {
            const sidebarDomElement = document.getElementsByClassName(`${pageName}-sidebar-content`);
            if (isGoingToBeSticky && sidebarFooterWidth !== `${referenceDiv.current.offsetWidth}px`) {
                setSidebarFooterWidth(`auto`);
                setSidebarFooterTop(`auto`);

                if (isSidebarSticky) {
                    setSidebarFooterWidth(`${referenceDiv.current.offsetWidth}px`);
                    setSidebarFooterTop(`${(sidebarDomElement[0].offsetHeight + verticalOffset)}px`);
                }
            }
            else if (isSidebarSticky && sidebarFooterWidth !== `${referenceDiv.current.offsetWidth}px`) {
                setSidebarFooterWidth(`${referenceDiv.current.offsetWidth}px`);
                setSidebarFooterTop(`${(sidebarDomElement[0].offsetHeight + verticalOffset)}px`);
            }
            else if (!isSidebarSticky && sidebarFooterWidth !== `${div.current.offsetWidth}px`) {
                setSidebarFooterWidth(`auto`);
                setSidebarFooterTop(`auto`);
            }
        }, 100);
        updateSidebarFooterWidthAndTop();
        window.addEventListener('resize', updateSidebarFooterWidthAndTop);

        return () => {
            window.removeEventListener('resize', updateSidebarFooterWidthAndTop);
        };
    }, [sidebarFooterWidth, setSidebarFooterWidth, isSidebarSticky]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const floatSidebarFooter = isSidebarSticky
        ? 'float-sidebar-footer'
        : '';

    return (
        <div>
            <div className={`${pageName}-sidebar-footer-reference ${floatSidebarFooter}`} ref={referenceDiv}>
                &nbsp;
            </div>
            <div ref={div} className={`${pageName}-sidebar-footer ${floatSidebarFooter}`} style={{ width: sidebarFooterWidth, top: sidebarFooterTop }}>
                <div className={`${pageName}-sidebar-footer__header`}>Learn more about <b>The Federal Response to COVID-19</b> at Data Lab!</div>
                <div className={`${pageName}-sidebar-footer__content`}>
                    Visit our sister site,&nbsp;
                    <a href="https://datalab.usaspending.gov/federal-covid-funding/" target="_blank" rel="noopener noreferrer">
                        <b>Data Lab &nbsp;
                            <FontAwesomeIcon size="sm" icon="external-link-alt" />
                        </b>
                    </a>, to see more ways the government is providing financial relief and explore how funding makes its way from Congress to the economy.

                </div>
            </div>
        </div>
    );
}

export default SidebarFooter;
SidebarFooter.propTypes = propTypes;
