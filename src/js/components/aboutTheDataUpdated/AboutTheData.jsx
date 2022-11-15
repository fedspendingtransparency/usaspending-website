/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import AboutTheDataHeader from "./AboutTheDataHeader";

// eslint-disable-next-line import/no-absolute-path
import Test from '/mdx/test.mdx';

const propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState();

    useEffect(() => {
        const wrapper = document.getElementById('usa-atd-wrapper');
        const sidebarHeight = wrapper.getBoundingClientRect().height;

        setHeight(sidebarHeight);
    }, []);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

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
                    <AboutTheDataHeader closeAboutTheData={props.onClose} />
                    <Test />
                </Scrollbars>
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
