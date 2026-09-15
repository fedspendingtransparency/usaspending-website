/**
 * useFireQueryEvent.jsx
 * Created by Josue Aguilar, 9/10/2026
 */
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useLocation } from "react-router";
import { getObjFromQueryParams } from "../helpers/searchHelper";
import Analytics from "../helpers/analytics/Analytics";

const useFireQueryEvent = () => {
    const { hash: urlHash } = getObjFromQueryParams(useLocation().search);

    useEffect(() => {
        // ok to rewrite with each page reload
        // may need to check if timer already logged.
        Cookies.set('advanced_search_to_query_time', new Date().getTime(), { expires: 14 });
    }, []);

    return () => {
        if (!urlHash) {
            const now = new Date().getTime();
            if (
                Cookies.get("advanced_search_to_query_time") &&
                !Cookies.get('has_logged_query_timer')
            ) {
                const timer = now - Cookies.get("advanced_search_to_query_time");
                const timerInSeconds = Math.floor(timer / 1000);

                if (timerInSeconds < 3600) {
                    Analytics.event({
                        category: 'Advanced Search - Time to First Query',
                        action: 'query_submit',
                        label: `${timerInSeconds} seconds`,
                        time_to_query: timerInSeconds
                    });
                }

                // clean up
                Cookies.remove("advanced_search_to_query_time");
            }

            if (Cookies.get("homepage_to_query_time") && !Cookies.get('has_logged_query_timer')) {
                const timerHomePage = now - Cookies.get("homepage_to_query_time");
                const timerHomePageInSeconds = Math.floor(timerHomePage / 1000);

                if (timerHomePageInSeconds < 3600) {
                    Analytics.event({
                        category: 'Homepage - Time to First Query',
                        action: 'homepage_query_submit',
                        label: `${timerHomePageInSeconds} seconds`,
                        time_to_query: timerHomePageInSeconds
                    });
                }
                // Cleanup
                Cookies.remove("homepage_to_query_time");
            }
        }

        // Sanity check
        Cookies.set("has_logged_query_timer", true, { expires: 14 });
    };
}

export default useFireQueryEvent;
