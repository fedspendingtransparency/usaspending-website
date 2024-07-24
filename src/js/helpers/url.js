const isRedirectNeeded = (item) => item.externalLink && !item.url.includes('.gov');
export default isRedirectNeeded;
