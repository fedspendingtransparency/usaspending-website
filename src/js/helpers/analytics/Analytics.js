/**
 * Analytics.js
 * Created by Kevin Li 2/2/18
 */

import kGlobalConstants from 'GlobalConstants';

const Analytics = {
    _prefix: 'USAspending - ',
    _execute(...args) {
        if (this.isDAP && !kGlobalConstants.DEV) {
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
        // Use the test tracker for non-prod environments
        const tracker = kGlobalConstants.DEV ? 'testTracker.send' : 'send';
        this._execute(
            tracker,
            'event',
            `${this._prefix}${args.category}`,
            args.action,
            args.label || undefined,
            args.value || undefined,
            args.nonInteraction || undefined
        );
    },
    pageview(args) {
        let path = args;
        let title;
        // Use the test tracker for non-prod environments
        const tracker = kGlobalConstants.DEV ? 'testTracker.send' : 'send';
        if (typeof args === 'object') {
            ({ path, title } = args);
        }
        this._execute(
            tracker,
            'pageview',
            path,
            title
        );
    }
};

// no hack approaches allowed
Object.freeze(Analytics);

export default Analytics;
