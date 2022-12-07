/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';
import { getDrilldownEntrySectionAndId } from 'helpers/aboutTheDataSidebarHelper';
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import DownloadButton from "./DownloadButton";
import { LoadingWrapper } from "../sharedComponents/Loading";
import {
    setAboutTheDataResults,
    setAboutTheDataSearchValue
} from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";

const propTypes = {
    setAboutTheDataSearchValue: PropTypes.func,
    setAboutTheDataResults: PropTypes.func,
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object,
    clearAboutTheDataTerm: PropTypes.func,
    hideAboutTheData: PropTypes.func
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState(0);
    const [drilldown, setDrilldown] = useState(null);
    const [drilldownItemId, setDrilldownItemId] = useState(null);
    const [drilldownSection, setDrilldownSection] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { schema } = props;
    const [searchResults, setSearchResults] = useState(schema);

    console.log('props', props);

    const performSearch = (term) => {
        console.log('AboutTheData search function engaged with term', term);
        const results = {};
        setAboutTheDataSearchValue(term);
        // look for search term in each 'fields.name' in each section
        Object.entries(searchResults).filter(([sectionKey, section]) => section.heading !== undefined).forEach(([sectionKey, section]) => {
            const matchingFields = section.fields.filter((field) => field.name.toLowerCase().includes(term.toLowerCase()));
            if (matchingFields.length) {
                const markupFields = [];
                matchingFields.forEach((field) => {
                    // add classname to the search term in the results
                    const regex = new RegExp(term, 'gi');
                    const markupName = field.name.replace(regex, '<match>$&<match>');
                    const parts = markupName.split('<match>');
                    const markup = <>
                        {parts.map((part) => (
                            <>
                                {part.toLowerCase() === term.toLowerCase() ? (
                                    <span className="matched-highlight">
                                        {part}
                                    </span>
                                )
                                    :
                                    <>
                                        { part }
                                    </>
                                }
                            </>
                        ))}
                    </>;

                    markupFields.push({
                        name: markup,
                        slug: field.slug
                    });
                });
                results[sectionKey] = {
                    fields: markupFields,
                    heading: section.heading
                };
            }
        });
        setSearchResults(results);
        setAboutTheDataResults(results);
    };

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

    useEffect(() => {
        if (props.aboutTheDataSidebar.term.slug && props.aboutTheDataSidebar.term.slug !== '') {
            const entry = getDrilldownEntrySectionAndId(schema, props.aboutTheDataSidebar.term.slug);
            setDrilldownItemId(entry.entryId);
            setDrilldownSection(entry.section);
        }

        setIsLoading(false);
        window.addEventListener('resize', measureAvailableHeight);
        return () => window.removeEventListener('resize', measureAvailableHeight);
    }, [props.aboutTheDataSidebar.term.slug, schema]);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    const selectItem = (index, section) => {
        setDrilldownItemId(index);
        setDrilldownSection(section);
    };

    const clearDrilldown = () => {
        setDrilldownItemId(null);
        setDrilldownSection(null);
        setDrilldown(false);
        props.clearAboutTheDataTerm();
    };

    const closeAboutTheData = () => {
        // close the about the data module when the escape key is pressed for accessibility and general
        props.hideAboutTheData();

        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
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
                        <AboutTheDataHeader
                            closeAboutTheData={closeAboutTheData}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            performSearch={performSearch} />
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
                                        {Object.values(searchResults)
                                            .filter((section) => section.heading !== undefined)
                                            .map((section) => (
                                                <AboutTheDataListView
                                                    section={section}
                                                    selectItem={selectItem} />
                                            ))}
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
