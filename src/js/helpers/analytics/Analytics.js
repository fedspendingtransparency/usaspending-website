/**
 * Analytics.js
 * Created by Kevin Li 2/2/18
 */

import kGlobalConstants from 'GlobalConstants';
import isInitialApplicationLoad from './isInitialApplicationLoad';

const Analytics = {
    _prefix: 'USAspending - ',
    _execute(...args) {
        if (this.isDAP && !kGlobalConstants.QAT) {
            if (!this._isInitialApplicationLoad(...args)) window.gas(...args);
        }
        if (this.isGA) {
            window.ga(...args);
        }
        return null;
    },
    _isInitialApplicationLoad(args) {
        return isInitialApplicationLoad(args);
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
    pageview(pathname, pagename, initialApplicationLoad) {
        console.log(' Sample Response : ', this._isInitialApplicationLoad([pathname, pagename, initialApplicationLoad]));
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
                initialApplicationLoad
            );
        }
    }
};

// no hack approaches allowed
Object.freeze(Analytics);

export default Analytics;
