/**
 * AboutTheDataLink.jsx
 * Created by Andrea Blackwell 04/17/2023
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import schema from "dataMapping/aboutTheDataSchema";
import { Link, useLocation } from "react-router";
import { getDrilldownEntrySectionAndId } from "helpers/aboutTheDataSidebarHelper";
import { showSlideout } from '../../helpers/slideoutHelper';
import { getNewUrlForGlossary } from "../../helpers/glossaryHelper";

const propTypes = {
    slug: PropTypes.string,
    children: PropTypes.string
};

const AboutTheDataLink = ({ slug, children }) => {
    const [urlSearchParam, setUrlSearchParam] = useState(null);
    const [newUrl, setNewUrl] = useState(null);
    const { pathname, search } = useLocation();

    const item = getDrilldownEntrySectionAndId(schema, slug);
    const entry = item.section.fields[item?.entryId];

    useEffect(() => {
        setUrlSearchParam(search.includes('about-the-data') ? '' : search);

        // there is already a search query
        if (search && !search.includes('about-the-data')) {
            // url with original search &about-the-data={term}
            setNewUrl(`${pathname}${search}&about-the-data=${entry.slug}`);
        }
        else {
            // url with search term as query
            setNewUrl(
                getNewUrlForGlossary(pathname, `?about-the-data=${entry.slug}`, urlSearchParam)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const openAboutTheDataSidebar = (e) => {
        showSlideout('atd', { term: entry });
        e.stopPropagation();
    };

    return (
        <Link
            to={newUrl}
            className="usda-atd-link"
            aria-label="Open the About the Data"
            onClick={(e) => openAboutTheDataSidebar(e)}>
            {children}
        </Link>
    );
};

AboutTheDataLink.propTypes = propTypes;
export default AboutTheDataLink;
