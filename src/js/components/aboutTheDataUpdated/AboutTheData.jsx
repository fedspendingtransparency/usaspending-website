import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import AboutTheDataHeader from "./AboutTheDataHeader";

const propTypes = {
    children: PropTypes.element
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState();

    useEffect(() => {
        const wrapper = document.getElementById('usa-atd-wrapper');
        const sidebarHeight = wrapper.getBoundingClientRect().height;

        setHeight(sidebarHeight);
    }, []);

    const track = () => <div className="glossary-scrollbar-track" />;
    const thumb = () => <div className="glossary-scrollbar-thumb" />;

    return (
        <div id="usa-atd-wrapper" className="usa-atd-wrapper">
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                <Scrollbars
                    style={{ height }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}>
                    <AboutTheDataHeader />
                </Scrollbars>
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
