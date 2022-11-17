/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import schema from 'dataMapping/aboutTheDataSchema';
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import AboutTheDataByPage from "./AboutTheDataByPage";
import DownloadButton from "./DownloadButton";

require('components/aboutTheDataSidebar/aboutTheData.scss');

const propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState();
    const [drilldown, setDrilldown] = useState();
    const [pageUrl, setPageUrl] = useState();

    useEffect(() => {
        const wrapper = document.getElementById('usa-atd-wrapper');
        const sidebarHeight = wrapper.getBoundingClientRect().height;

        setDrilldown(false);
        setHeight(sidebarHeight);
        console.log('window.location.href.toString()', window.location.href.toString());
        setPageUrl(window.location.href.toString());
    }, []);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    return (
        <div id="usa-atd-wrapper" className="usa-atd-wrapper">
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                <AboutTheDataHeader closeAboutTheData={props.onClose} />

                <Scrollbars
                    style={{ height }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}>
                    {drilldown ?
                        <div className="atd__body">
                            <AboutTheDataDrilldown />
                        </div>
                        :
                        <>
                            <AboutTheDataByPage section={schema["by-page"]} url={pageUrl} />
                            <div className="atd__body">
                                <DownloadButton />
                                <AboutTheDataListView section={schema.descriptions} />
                                <AboutTheDataListView section={schema.disclosures} />
                                <AboutTheDataListView section={schema["award-disclosures"]} />
                                <AboutTheDataListView section={schema["covid-disclosures"]} />
                            </div>
                        </>}
                </Scrollbars>
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
