export const isRedirectNeeded = (item) => item.externalLink && !item.url.includes('.gov');

const commonAttackParams = new Set([
    "redirect",
    "redirect_url",
    "next",
    "url",
    "return",
    "returnUrl",
    "return_url",
    "goto",
    "destination",
    "dest",
    "forward",
    "user",
    "userName",
    "user_name",
    "password",
    "login"
]);

const isRealUrl = (rawURL) => {
    // must be non-empty string
    if (typeof rawURL !== "string" || rawURL.trim() === "") return null;

    // strip whitespace + invisible/zero-width unicode characters
    const stripped = rawURL
        .trim()
        .replace(/[\s\p{Cf}]/gu, '');

    let parsed;

    try {
        parsed = new URL(stripped);
    }
    catch {
        return null
        
    }

    return parsed;

};

const isBaseURL = (val) => {
    if (!isRealUrl(val)) return false;

    return val.startsWith('https://www.usaspending.gov/');
}

export const sanitizeUrl = (rawURL, blockRedirect = true) => {
    let parsed = isRealUrl(rawURL);

    // not a real url
    if (!parsed) return null;
    
    // https only
    if (parsed.protocol !== "https:") return null;
    
    // hostname must exist and not just whitespace
    if (!parsed.hostname || parsed.hostname.trim() === "") return null;

    if (blockRedirect) {
        const params = [...parsed.searchParams.entries()];
        
        // remove open-direct query params
        // allow valid urls.
        for( const [key, value] of params) {
            if (commonAttackParams.has(key.toLowerCase()) && !isBaseURL(value)){
                parsed.searchParams.delete(key);
            }
        }
    }

    return encodeURI(parsed.toString());
}


export const sanitizeMailUrl = (rawURL) => {
    let cleanMailto = rawURL;
    const [prefix, queryString] = rawURL.split('?');

    if (queryString) {
        cleanMailto = prefix;

        const params = new URLSearchParams(queryString);

        // remove any unwanted copy emails
        params.delete('cc');
        params.delete('bcc');


        if (params.toString() && params.toString() !== '' ) {
            // add wanted params back
            cleanMailto = `${prefix}?${params.toString()}`
        }
    }

    return cleanMailto;
}