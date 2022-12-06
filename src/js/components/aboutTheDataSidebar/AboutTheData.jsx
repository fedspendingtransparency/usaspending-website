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
import DownloadButton from "./DownloadButton";

require('components/aboutTheDataSidebar/aboutTheData.scss');

const propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState(0);
    const [drilldown, setDrilldown] = useState(null);
    const [drilldownItemId, setDrilldownItemId] = useState(null);
    const [drilldownSection, setDrilldownSection] = useState(null);
    const [drilldownComponent, setDrilldownComponent] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(schema);

    const performSearch = (term) => {
        console.log('AboutTheData search function engaged with term', term);
        const results = {};
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
                                    <span className="matched-highlight" style={{ color: 'red' }}>
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
        window.addEventListener('resize', measureAvailableHeight);
        return () => window.removeEventListener('resize', measureAvailableHeight);
    }, []);

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
    };

    useEffect(() => {
        if (drilldownItemId !== null && drilldownItemId >= 0 && drilldownSection) {
            scrollbar.scrollToTop();
            setDrilldown(true);

            // lazy load the md files
            const slug = drilldownSection.fields[drilldownItemId].slug;
            const Component = React.lazy(() => import(/* webpackPreload: true */ `../../../content/about-the-data/${slug}.md`).then((comp) => comp));
            setDrilldownComponent(<Component />);
        }
    }, [drilldownItemId, drilldownSection, scrollbar]);

    return (
        <div id="usa-atd-wrapper" className="usa-atd-wrapper">
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                <AboutTheDataHeader
                    closeAboutTheData={props.onClose}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    performSearch={performSearch} />
                {/* loading goes here */}
                <Scrollbars
                    style={{ height }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}
                    ref={(s) => setScrollbar(s)}>
                    {drilldown && drilldownComponent ?
                        <div className="atd__body">
                            <AboutTheDataDrilldown
                                section={drilldownSection.heading}
                                name={drilldownSection.fields[drilldownItemId].name}
                                clearDrilldown={clearDrilldown}
                                slug={drilldownSection.fields[drilldownItemId].slug}
                                entry={drilldownComponent} />
                        </div>
                        :
                        <>
                            <div className="atd__body">
                                <DownloadButton />
                                {Object.values(searchResults).filter((section) => section.heading !== undefined).map((section) => (
                                    <AboutTheDataListView
                                        section={section}
                                        selectItem={selectItem} />
                                ))}
                            </div>
                        </>}
                </Scrollbars>
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
