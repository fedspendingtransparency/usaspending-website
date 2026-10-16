/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDrilldownEntry } from 'helpers/aboutTheDataSidebarHelper';
import Analytics from 'helpers/analytics/Analytics';
import {
    setAboutTheDataTerm,
    setAboutTheDataTermFromUrl
} from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import schema from "../../../config/aboutTheData/aboutTheDataSchema";
import AboutTheData from "../../components/aboutTheDataSidebar/AboutTheData";

require('components/aboutTheDataSidebar/aboutTheData.scss');

export const AboutTheDataContainer = () => {
    const dispatch = useDispatch();
    const { termFromUrl, term, display } = useSelector((state) => state.aboutTheDataSidebar);

    useEffect(() => {
        if (termFromUrl) {
            const drilldownEntry = getDrilldownEntry(schema, termFromUrl);
            if (drilldownEntry) {
                dispatch(setAboutTheDataTerm(drilldownEntry));
                dispatch(setAboutTheDataTermFromUrl(''));
            }
        }
        if (display) {
            // only fire analytics if sidebar is open.
            if (term.name && term.slug) {
                // only fire once name and slug are set.
                Analytics.event({
                    event: "dap_event",
                    category: "About the Data Side Panel",
                    action: "Side Panel Open",
                    label: term.name
                });
            }
        }
    }, [dispatch, display, term.name, term.slug, termFromUrl]);

    return (
        <div className="usa-atd-animations">
            <AboutTheData />
        </div>
    );
};

export default AboutTheDataContainer;
