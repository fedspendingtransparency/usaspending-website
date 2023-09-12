/**
 * navTest/AboutContent.jsx
 * Created by Andrea Blackwell 8/22/2023
 **/

import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import Mission from '../Mission';
import Background from '../Background';
import MoreInfo from '../MoreInfo';
import Contact from '../Contact';
import Development from '../Development';
import Licensing from '../Licensing';

const AboutContent = ({ activeSection }) => {
    const history = useHistory();

    // useEffect(() => {
    //     // find the section in dom
    //     const sectionDom = document.querySelector(`#about-${activeSection}`);
    //     console.log(sectionDom);
    //     if (!sectionDom) return;
    //
    //     // add section to url
    //     history.replace(`/temp-nav?section=${activeSection}`);
    //
    //     // add offsets
    //     const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
    //     const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);
    //     scrollToY(sectionTop + 15, 700);
    // }, [activeSection]);

    return (
        <div className="about-content-wrapper">
            <div className="about-content">
                <div className="about-padded-content">
                    <Mission />
                    <Background />
                    <Development />
                    <Licensing />
                    <MoreInfo />
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
