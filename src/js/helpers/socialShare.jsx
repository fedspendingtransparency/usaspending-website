import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faLinkedin,
    faTwitter,
    faRedditSquare
} from "@fortawesome/free-brands-svg-icons";
import Analytics from 'helpers/analytics/Analytics';

export const socialUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=`,
    twitter: `https://twitter.com/intent/tweet?url=`,
    reddit: `http://www.reddit.com/submit?url=`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=`
};

const openShareWindow = (url) => {
    window.open(url, '_blank', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
};

const handleShareClickFacebook = (url) => {
    const finalUrl = `${socialUrls.facebook}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
    Analytics.event({ category: `${url}`, action: 'share link click', label: 'facebook' });
};

const handleShareClickTwitter = (url) => {
    const finalUrl = `${socialUrls.twitter}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
    Analytics.event({ category: `${url}`, action: 'share link click', label: 'twitter' });
};

const handleShareClickLinkedin = (url) => {
    const finalUrl = `${socialUrls.linkedin}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
    Analytics.event({ category: `${url}`, action: 'share link click', label: 'linkedIn' });
};

const handleShareClickReddit = (url) => {
    const finalUrl = `${socialUrls.reddit}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
    Analytics.event({ category: `${url}`, action: 'share link click', label: 'reddit' });
};

const handleShareClickEmail = (subject, body) => {
    const finalUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = finalUrl;
    Analytics.event({ category: `${subject}`, action: 'share link click', label: 'email' });
};

export const getBaseUrl = (slug) => `https://www.usaspending.gov/${slug}`;

const handlersBySocialMedium = {
    twitter: (url) => handleShareClickTwitter(url),
    facebook: (url) => handleShareClickFacebook(url),
    reddit: (url) => handleShareClickReddit(url),
    email: ({ subject, body = '' }) => {
        handleShareClickEmail(subject, body);
    },
    linkedin: (url) => handleShareClickLinkedin(url),
    copy: (slug) => Analytics.event({ category: slug, action: 'copy link', label: `${getBaseUrl(slug)}` })
};

export const getSocialShareFn = (socialMedium, url) => {
    if (socialMedium === 'copy' && url.includes('about-the-data')) {
        return () => url;
    }
    const fn = handlersBySocialMedium[socialMedium];
    if (socialMedium !== 'email' && url?.includes('about-the-data')) {
        return () => fn(url);
    }
    if (socialMedium === 'email') {
        return (args) => fn(args);
    }
    return (slg) => fn(getBaseUrl(slg));
};

export const handleShareOptionClick = (name, url, emailArgs) => {
    const fn = getSocialShareFn(name, url);
    if (name === 'email') {
        fn(emailArgs);
    }
    else if (name !== 'copy') {
        fn(url);
    } else {
        fn();
    }
};

const GlossaryDropdownOption = ({ icon, title }) => (
    <>
        <FontAwesomeIcon icon={icon} color="#555" size="sm" />
        <span>{title}</span>
    </>
);

export const socialShareOptions = [
    { component: <GlossaryDropdownOption icon="link" title="Copy link" />, name: `copy` },
    { component: <GlossaryDropdownOption icon="envelope" title="Email" />, name: 'email' },
    { component: <GlossaryDropdownOption icon={faTwitter} title="Twitter" />, name: 'twitter' },
    { component: <GlossaryDropdownOption icon={faFacebookSquare} title="Facebook" />, name: 'facebook' },
    { component: <GlossaryDropdownOption icon={faLinkedin} title="LinkedIn" />, name: 'linkedin' },
    { component: <GlossaryDropdownOption icon={faRedditSquare} title="Reddit" />, name: 'reddit' }
];
