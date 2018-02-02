
const Analytics = {
    _lib(...args) {
        if (window.gas && typeof window.gas === 'function') {
            return window.gas(...args);
        }
        else if (window.ga && typeof window.gas === 'function') {
            return window.ga(...args);
        }
        return null;
    },
    event(args) {
        if (!args.category || !args.action) {
            return;
        }
        this._lib(
            'send',
            'event',
            args.category,
            args.action,
            args.label || undefined,
            args.value || undefined,
            args.noninteraction || undefined
        );
    },
    pageview(args) {
        let path = args;
        let title;
        if (typeof args === 'object') {
            ({ path, title } = args);
        }
        this._lib(
            'send',
            'pageview',
            path,
            title
        );
    }
};

export default Analytics;
