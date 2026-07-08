export const isRedirectNeeded = (item) => item.externalLink && !item.url.includes('.gov');

const commonAttackParams = [
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
];

export const sanitizeUrl = (rawURL, blockRedirect = true) => {
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
    
    // https only
    if (parsed.protocol !== "https:") return null;
    
    // hostname must exist and not just whitespace
    if (!parsed.hostname || parsed.hostname.trim() === "") return null;

    if (blockRedirect) {
        // remove open-direct query params
        commonAttackParams.forEach((param) => parsed.searchParams.delete(param));
    }

    return encodeURI(parsed.toString());
}
