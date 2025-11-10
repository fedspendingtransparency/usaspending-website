/**
 * sessionCookieHelper.js
 * Created by JD House 11/07/2025
 */

import Cookies from 'js-cookie';


export const getSessionId = () => Cookies.get("session_id");

export const generateCookieSessionId = () => Math.random().toString().replace("0.", "");

export const setSessionCookie = (cookieName, type, expiresIn) => {
    let value = type;

    if (type === 'timestamp') {
        value = new Date().getTime();
    }

    if (!getSessionId()) {
        Cookies.set("session_id", generateCookieSessionId(), { expires: expiresIn });
    }
    else {
        Cookies.set("session_id", getSessionId(), { expires: expiresIn });
        if (Cookies.get(cookieName)) {
            // Cleanup
            Cookies.remove(cookieName);
        }
    }

    if (!Cookies.get(cookieName)) {
        Cookies.set(cookieName, value, { expires: expiresIn });
    }
};
