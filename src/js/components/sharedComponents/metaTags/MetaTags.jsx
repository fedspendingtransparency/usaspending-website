/**
 * MetaTags.jsx
 * Created by michaelbray on 5/25/17.
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setInitialAppLoadForDAP } from 'redux/actions/googleAnalytics/googleAnalytics';
import Analytics from 'helpers/analytics/Analytics';
import { Helmet } from 'react-helmet';
import {
    isCustomPageTitleDefined,
    getCanonicalUrl
} from 'helpers/metaTagHelper';

const propTypes = {
    og_url: PropTypes.string,
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    og_site_name: PropTypes.string,
    og_image: PropTypes.string
};

const defaultProps = {
    og_url: 'https://usaspending.gov',
    og_title: 'USAspending.gov',
    og_description: 'USAspending.gov is the new official source of accessible, searchable and reliable spending data for the U.S. Government.',
    og_site_name: 'USAspending.gov',
    og_image: 'https://usaspending.gov/img/FacebookOG.png'
};

const MetaTags = ({
    og_url: url,
    og_title: title,
    og_description: description,
    og_site_name: siteName,
    og_image: image
}) => {
    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { isInitialApplicationLoadForDAPGoogleAnalytics } = useSelector((state) => state.googleAnalytics);

    const [tags, setTags] = useState([]);

    const generateTags = useCallback(() => {
        const newTags = [];

        if (url !== '') {
            newTags.push(<meta
                property="og:url"
                content={url}
                key="og_url" />
            );
        }
        if (title !== '') {
            newTags.push(<meta
                property="og:title"
                content={title}
                key="og_title" />
            );
            newTags.push(<meta
                content={title}
                key="twitter-title"
                name="twitter:title" />
            );
            newTags.push(<title key="title">{title}</title>);
        }
        if (description !== '') {
            newTags.push(<meta
                name="description"
                property="og:description"
                content={description}
                key="og_description" />
            );
            newTags.push(<meta
                content={description}
                key="twitter-description"
                name="twitter:description" />
            );
        }
        if (image !== '') {
            newTags.push(<meta
                property="og:image"
                content={image}
                key="og_image" />
            );
            newTags.push(<meta
                name="twitter:image"
                key="twitter:image"
                content={image} />
            );
        }

        setTags(
            newTags
                .concat([
                    <link key="canonical-url" rel="canonical" href={getCanonicalUrl(pathname)} />
                ])
        );
    });

    useEffect(() => {
        generateTags();
        if (isCustomPageTitleDefined(title)) {
            if (isInitialApplicationLoadForDAPGoogleAnalytics) dispatch(setInitialAppLoadForDAP());
            // sendDAPPageviewEvent will be valid only once, and only the first time we hit this code
            const sendDAPPageviewEvent = isInitialApplicationLoadForDAPGoogleAnalytics ? 'isInitialApplicationLoadForDAPGoogleAnalytics' : undefined;
            Analytics.pageview(pathname, title, sendDAPPageviewEvent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);

    useEffect(() => {
        generateTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        url,
        title,
        description,
        siteName,
        image
    ]);

    return (
        <Helmet>
            {tags}
        </Helmet>
    );
};

MetaTags.propTypes = propTypes;
MetaTags.defaultProps = defaultProps;

export default MetaTags;
