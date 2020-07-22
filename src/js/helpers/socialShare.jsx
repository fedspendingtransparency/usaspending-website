import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faLinkedin,
    faTwitter,
    faRedditSquare
} from "@fortawesome/free-brands-svg-icons";

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
};

const handleShareClickTwitter = (url) => {
    const finalUrl = `${socialUrls.twitter}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickLinkedin = (url) => {
    const finalUrl = `${socialUrls.linkedin}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickReddit = (url) => {
    const finalUrl = `${socialUrls.reddit}${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickEmail = (subject, body) => {
    const finalUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = finalUrl;
};

const handlersBySocialMedium = {
    twitter: (url) => handleShareClickTwitter(url),
    facebook: (url) => handleShareClickFacebook(url),
    reddit: (url) => handleShareClickReddit(url),
    email: ({ subject, body }) => {
        handleShareClickEmail(subject, body);
    },
    linkedin: (url) => handleShareClickLinkedin(url)
};

export const getBaseUrl = (slug) => `https://www.usaspending.gov/#/${slug}`;

// Currently only used on the COVID profile, since we have a special redirect set
// up for usaspending.gov/covid-19 --> usaspending.gov/#/disaster/covid-19
export const getBaseUrlNoHash = (slug) => `https://www.usaspending.gov/${slug}`;

export const getSocialShareFn = (socialMedium, noHash = false) => {
    const fn = handlersBySocialMedium[socialMedium];
    if (socialMedium === 'email') {
        return (args) => fn(args);
    }
    if (noHash) {
        return (slg) => fn(getBaseUrlNoHash(slg));
    }
    return (slg) => fn(getBaseUrl(slg));
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
