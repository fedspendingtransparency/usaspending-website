import Analytics from 'helpers/analytics/Analytics';

export const socialUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=`,
    twitter: `https://twitter.com/intent/tweet?url=`,
    reddit: `http://www.reddit.com/submit?url=`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=`
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
