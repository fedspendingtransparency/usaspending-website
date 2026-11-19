/**
 * lastActionMiddleware.js
 * Tracks the type of the most recently dispatched action so that state subscribers
 * can tell user-driven filter edits apart from programmatic ones.
 **/

let lastActionType = null;

export const getLastActionType = () => lastActionType;

const lastActionMiddleware = () => (next) => (action) => {
    lastActionType = action?.type ?? null;
    return next(action);
};

export default lastActionMiddleware;
