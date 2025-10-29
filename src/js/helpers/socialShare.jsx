import React from 'react';
import Analytics from 'helpers/analytics/Analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faReddit,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const socialUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=`,
    twitter: `https://twitter.com/intent/tweet?url=`,
    reddit: `http://www.reddit.com/submit?url=`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=`,
    instagram: ``
};

const openShareWindowExternal = (url, handleShareDispatch) => {
    handleShareDispatch(url);
    // window.open(url, '_blank', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
};

const handleShareClickFacebook = (url, handleShareDispatch) => {
    const finalUrl = `${socialUrls.facebook}${encodeURIComponent(url)}`;
    openShareWindowExternal(finalUrl, handleShareDispatch);
    Analytics.event({
        event: 'Social Share Facebook', category: `${url}`, action: 'share link click', label: 'facebook'
    });
};

const handleShareClickInstagram = (url, handleShareDispatch) => {
    const finalUrl = `${socialUrls.instagram}${encodeURIComponent(url)}`;
    openShareWindowExternal(finalUrl, handleShareDispatch);
    Analytics.event({
        event: 'Social Share Instagram', category: `${url}`, action: 'share link click', label: 'Instagram'
    });
};

const handleShareClickTwitter = (url, handleShareDispatch) => {
    const finalUrl = `${socialUrls.twitter}${encodeURIComponent(url)}`;
    openShareWindowExternal(finalUrl, handleShareDispatch);
    Analytics.event({
        event: 'Social Share Twitter', category: `${url}`, action: 'share link click', label: 'twitter'
    });
};

const handleShareClickLinkedin = (url, handleShareDispatch) => {
    const finalUrl = `${socialUrls.linkedin}${encodeURIComponent(url)}`;
    openShareWindowExternal(finalUrl, handleShareDispatch);
    Analytics.event({
        event: 'Social Share LinkedIn', category: `${url}`, action: 'share link click', label: 'linkedIn'
    });
};

const handleShareClickReddit = (url, handleShareDispatch) => {
    const finalUrl = `${socialUrls.reddit}${encodeURIComponent(url)}`;
    openShareWindowExternal(finalUrl, handleShareDispatch);
    Analytics.event({
        event: 'Social Share Reddit', category: `${url}`, action: 'share link click', label: 'reddit'
    });
};

const handleShareClickEmail = (subject, body) => {
    const finalUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = finalUrl;
    Analytics.event({
        event: 'Social Share Email', category: `${subject}`, action: 'share link click', label: 'email'
    });
};

export const getBaseUrl = (slug) => `https://www.usaspending.gov/${slug}`;

const handlersBySocialMedium = {
    twitter: (url, handleShareDispatch) => handleShareClickTwitter(url, handleShareDispatch),
    facebook: (url, handleShareDispatch) => handleShareClickFacebook(url, handleShareDispatch),
    reddit: (url, handleShareDispatch) => handleShareClickReddit(url, handleShareDispatch),
    instagram: (url, handleShareDispatch) => handleShareClickInstagram(url, handleShareDispatch),
    email: ({ subject, body = '' }) => {
        handleShareClickEmail(subject, body);
    },
    linkedin: (url, handleShareDispatch) => handleShareClickLinkedin(url, handleShareDispatch),
    copy: (slug) => Analytics.event({
        event: 'Social Share Copy', category: slug, action: 'copy link', label: `${getBaseUrl(slug)}`
    })
};

export const getSocialShareFn = (socialMedium, url, handleShareDispatch) => {
    if (socialMedium === 'copy' && (url.includes('about-the-data'))) {
        return () => url;
    }
    const fn = handlersBySocialMedium[socialMedium];
    if (socialMedium === 'copy' && (url?.includes('youtube'))) {
        return () => fn(url);
    }
    if (socialMedium !== 'email' && (url?.includes('about-the-data') || url?.includes('youtube'))) {
        return () => fn(url, handleShareDispatch);
    }
    if (socialMedium === 'email') {
        return (args) => fn(args);
    }
    return (slg) => fn(getBaseUrl(slg), handleShareDispatch);
};

export const handleShareOptionClick = (name, url, emailArgs, handleShareDispatch) => {
    const fn = getSocialShareFn(name, url, handleShareDispatch);
    if (name === 'email') {
        fn(emailArgs);
    }
    else if (name !== 'copy') {
        fn(url, handleShareDispatch);
    }
    else {
        fn();
    }
};
const GlossaryDropdownOption = ({ icon, title, color }) => (
    <>
        <FontAwesomeIcon icon={icon} size="md" color={color} />
        <span>{title}</span>
    </>
);
const GlossaryDropdownOptionTwitter = ({ title }) => (
    <>
        <svg
            className="share-dropdown__twitter-logo"
            width="1200"
            height="1227"
            viewBox="0 0 1200 1227"
            fill="none"
            style={{ width: "16px", height: "16px" }}>
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="#5b616b" />
        </svg>
        <span>{title}</span>
    </>
);
export const newSocialShareOptions = [
    { component: <GlossaryDropdownOptionTwitter title="X (Twitter)" />, name: 'twitter' },
    { component: <GlossaryDropdownOption icon={faInstagram} title="Instagram" color="#000100" />, name: 'instagram' },
    { component: <GlossaryDropdownOption icon={faLinkedin} title="LinkedIn" color="#0A66C2" />, name: 'linkedin' },
    { component: <GlossaryDropdownOption icon={faFacebook} title="Facebook" color="#0866FF" />, name: 'facebook' },
    { component: <GlossaryDropdownOption icon={faReddit} title="Reddit" color="#ff4500" />, name: 'reddit' },
    { component: <GlossaryDropdownOption icon={faEnvelope} title="Email" color="#000" />, name: 'email' }
];
