/**
 * Analytics.js
 * Created by Kevin Li 2/2/18
 */


const Analytics = {
    _prefix: 'USAspending - ',
    _execute(...args) {
        if (this.isDAP) {
            return window.gas(...args);
        }
        else if (this.isGA) {
            return window.ga(...args);
        }
        // fall back if no library is loaded (most likely due to adblocking)
        return null;
    },
    get isDAP() {
        return Boolean(window.gas && typeof window.gas === 'function');
    },
    get isGA() {
        return Boolean(!this.isDAP && window.ga && typeof window.ga === 'function');
    },
    event(args) {
        if (!args.category || !args.action) {
            return;
        }
        this._execute(
            'send',
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
        if (typeof args === 'object') {
            ({ path, title } = args);
        }
        this._execute(
            'send',
            'pageview',
            path,
            title
        );
    }
};

// no hack approaches allowed
Object.freeze(Analytics);

export default Analytics;
