/**
 * Analytics.js
 * Created by Kevin Li 2/2/18
 */

import kGlobalConstants from 'GlobalConstants';
import doParamsContainInitialApplicationLoadForDAPGoogleAnalytics from './doParamsContainInitialApplicationLoadForDAPGoogleAnalytics';

const Analytics = {
    _prefix: 'USAspending - ',
    _execute(...args) {
        if (this.isDAP && !kGlobalConstants.QAT) {
            /**
             * This conditional prevents this code base from sending DAP GA pageview on application load.
             * DAP's GA scripts will send their own pageview when the app loads.
             */
            if (!doParamsContainInitialApplicationLoadForDAPGoogleAnalytics(args)) window.gas(...args);
        }
        if (this.isGA) {
            window.ga(...args);
        }
        return null;
    },
    get isDAP() {
        return Boolean(window.gas && typeof window.gas === 'function');
    },
    get isGA() {
        return Boolean(window.ga && typeof window.ga === 'function');
    },
    event(args) {
        if (!args.category || !args.action) {
            return;
        }
        if (kGlobalConstants.QAT) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'event',
                eventProps: {
                    category: `${this._prefix}${args.category}`,
                    action: args.action,
                    label: args.label || undefined,
                    value: args.value || undefined,
                    nonInteraction: args.nonInteraction || undefined
                }
            });
        }
        else {
            this._execute(
                'send',
                'event',
                `${this._prefix}${args.category}`,
                args.action,
                args.label || undefined,
                args.value || undefined,
                args.nonInteraction || undefined
            );
        }
    },
    pageview(pathname, pagename, isInitialApplicationLoadForDAPGoogleAnalytics) {
        if (kGlobalConstants.QAT) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    url: pathname,
                    title: pagename
                }
            });
        }
        else {
            this._execute(
                'set',
                { title: pagename }
            );
            this._execute(
                'send',
                'pageview',
                pathname,
                isInitialApplicationLoadForDAPGoogleAnalytics
            );
        }
    }
};

// no hack approaches allowed
Object.freeze(Analytics);

export default Analytics;
