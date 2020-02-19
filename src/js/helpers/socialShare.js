const openShareWindow = (url) => {
    window.open(url, '_blank', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
};

const handleShareClickFacebook = (url) => {
    const finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openShareWindow(finalUrl);
};

const handleShareClickTwitter = (url) => {
    const twitterText = encodeURIComponent("Here is the definition for this neat term. Check it out on USASpending.gov!");
    const finalUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(url)}`;
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
    const subject = "USASpending.gov";
    const body = "Check it out!";

    const finalUrl = `mailto:?subject=${subject}&body=${body}%0D%0A%0D%0A}Check out this site ${url}`;
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

export const getSocialShareFn = (slug, socialMedium) => {
    return () => handlersBySocialMedium[socialMedium](baseUrl(slug));
};
