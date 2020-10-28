/**
 * Analytics.js
 * Created by Kevin Li 2/2/18
 */

import kGlobalConstants from 'GlobalConstants';

const Analytics = {
    _prefix: 'USAspending - ',
    _execute(...args) {
        if (this.isDAP && !kGlobalConstants.DEV && !kGlobalConstants.QAT) {
            window.gas(...args);
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
    },
    pageview(pathname) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'pageview',
            page: {
                url: pathname
            }
        });
    }
};

// no hack approaches allowed
Object.freeze(Analytics);

export default Analytics;
