/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Mousetrap from "mousetrap";

import { getDrilldownEntrySectionAndId } from 'helpers/aboutTheDataSidebarHelper';
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import DownloadButton from "./DownloadButton";
import { LoadingWrapper } from "../sharedComponents/Loading";

const propTypes = {
    children: PropTypes.element,
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object,
    clearAboutTheDataTerm: PropTypes.func,
    setAboutTheDataTerm: PropTypes.func
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState(0);
    const [drilldown, setDrilldown] = useState(null);
    const [drilldownItemId, setDrilldownItemId] = useState(null);
    const [drilldownSection, setDrilldownSection] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { schema } = props;

    const measureAvailableHeight = () => {
        const paddingBottom = 200;
        const wrapperHeight = document.getElementById('usa-atd-wrapper')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('usa-atd-header')?.getBoundingClientRect().height || 0;

        const sidebarHeight = wrapperHeight - headerHeight - paddingBottom;

        setHeight(sidebarHeight);
    };

    useEffect(() => {
        measureAvailableHeight();
        if (scrollbar) {
            scrollbar.scrollToTop();
        }
    }, [drilldown, scrollbar]);


    const closeAboutTheData = useCallback(() => {
        // close the glossary when the escape key is pressed for accessibility and general
        props.hideAboutTheData();

        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
    });

    useEffect(() => {
        if (props.aboutTheDataSidebar.term.slug && props.aboutTheDataSidebar.term.slug !== '') {
            const entry = getDrilldownEntrySectionAndId(schema, props.aboutTheDataSidebar.term.slug);
            setDrilldownItemId(entry.entryId);
            setDrilldownSection(entry.section);
        }

        setIsLoading(false);
        Mousetrap.bind('esc', closeAboutTheData);

        window.addEventListener('resize', measureAvailableHeight);
        return () => {
            window.removeEventListener('resize', measureAvailableHeight);
            Mousetrap.unbind('esc');
        };
    }, [props.aboutTheDataSidebar.term.slug]);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    const selectItem = (index, section) => {
        setDrilldownItemId(index);
        setDrilldownSection(section);
        props.setAboutTheDataTerm(section.fields[index]);
    };

    const clearDrilldown = () => {
        setDrilldownItemId(null);
        setDrilldownSection(null);
        setDrilldown(false);
        props.clearAboutTheDataTerm();
    };

    useEffect(() => {
        if (drilldownItemId !== null && drilldownItemId >= 0 && drilldownSection) {
            scrollbar?.scrollToTop();
            setDrilldown(true);
        }
    }, [drilldownItemId, drilldownSection, scrollbar]);

    return (
        <div id="usa-atd-wrapper" className="usa-atd-wrapper">
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                {isLoading ?
                    <><LoadingWrapper isLoading /></>
                    :
                    <>
                        <AboutTheDataHeader closeAboutTheData={closeAboutTheData} />
                        <Scrollbars
                            style={{ height }}
                            renderTrackVertical={track}
                            renderThumbVertical={thumb}
                            ref={(s) => setScrollbar(s)}>
                            {drilldown ?
                                <div className="atd__body">
                                    <AboutTheDataDrilldown
                                        section={drilldownSection.heading}
                                        name={drilldownSection.fields[drilldownItemId].name}
                                        clearDrilldown={clearDrilldown}
                                        slug={drilldownSection.fields[drilldownItemId].slug} />
                                </div>
                                :
                                <>
                                    <div className="atd__body">
                                        <DownloadButton />
                                        <AboutTheDataListView section={schema.descriptions} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema.disclosures} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema["award-disclosures"]} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema["covid-disclosures"]} selectItem={selectItem} />
                                    </div>
                                </>}
                        </Scrollbars>
                    </>
                }
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
