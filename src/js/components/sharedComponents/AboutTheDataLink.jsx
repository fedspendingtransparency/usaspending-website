/**
 * AboutTheDataLink.jsx
 * Created by Andrea Blackwell 04/17/2023
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import schema from "dataMapping/aboutTheDataSchema";
import { useLocation } from "react-router";
import { getDrilldownEntrySectionAndId } from "helpers/aboutTheDataSidebarHelper";
import { showSlideout } from '../../helpers/slideoutHelper';
import { getNewUrlForGlossary } from "../../helpers/glossaryHelper";

const propTypes = {
    slug: PropTypes.string,
    children: PropTypes.string
};

const AboutTheDataLink = ({ slug, children }) => {
    const [urlSearchParam, setUrlSearchParam] = useState(null);
    const { pathname, search } = useLocation();

    let newUrl;
    const item = getDrilldownEntrySectionAndId(schema, slug);
    const entry = item.section.fields[item?.entryId];

    useEffect(() => {
        setUrlSearchParam(search.includes('about-the-data') ? '' : search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // there is already a search query
    if (search && !search.includes('about-the-data')) {
        // url with original search &about-the-data={term}
        newUrl = `${pathname}${search}&about-the-data=${entry.slug}`;
    }
    else {
        // url with search term as query
        newUrl = getNewUrlForGlossary(
            pathname, `?about-the-data=${entry.slug}`, urlSearchParam
        );
    }

    const openAboutTheDataSidebar = (e) => {
        window.history.replaceState(null, '', newUrl);
        showSlideout('atd', { term: entry });
        e.stopPropagation();
    };

    return (
        <span
            className="usda-atd-link"
            aria-label="Open the About the Data"
            onClick={openAboutTheDataSidebar}>
            {children}
        </span>
    );
};

AboutTheDataLink.propTypes = propTypes;
export default AboutTheDataLink;
