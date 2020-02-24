import { startCase } from "lodash";

const openShareWindow = (url) => {
    window.open(url, '_blank', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
};

const handleShareClickFacebook = (url) => {
    const finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openShareWindow(finalUrl);
};

const handleShareClickTwitter = (url) => {
    const finalUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickLinkedin = (url) => {
    const finalUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickReddit = (url) => {
    const finalUrl = `http://www.reddit.com/submit?url=${encodeURIComponent(url)}`;
    openShareWindow(finalUrl);
};

const handleShareClickEmail = (url) => {
    const subject = `USAspending.gov Glossary Term: ${startCase(url.split("=")[1])}`;
    const body = `View the definition of this federal spending term on USAspending.gov: ${url}`;

    const finalUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = finalUrl;
};

const handlersBySocialMedium = {
    twitter: (url) => handleShareClickTwitter(url),
    facebook: (url) => handleShareClickFacebook(url),
    reddit: (url) => handleShareClickReddit(url),
    email: (url) => handleShareClickEmail(url),
    linkedin: (url) => handleShareClickLinkedin(url)
};

const baseUrl = (slug) => `https://www.usaspending.gov/#/?glossary=${slug}`;

export const getSocialShareFn = (slug, socialMedium) => (
    () => handlersBySocialMedium[socialMedium](baseUrl(slug))
);
