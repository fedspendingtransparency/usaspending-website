/**
 * ScrollManager.js
 * Created by Kevin Li 12/9/17
 */

import { uniqueId } from 'lodash';

const ScrollManager = () => {
    let _state = {
        x: 0,
        y: 0
    };

    const _listeners = {};

    const update = (scroll) => {
        if (scroll.x === _state.x && scroll.y === _state.y) {
            // this is a duplicate scroll event, ignore it
            return;
        }

        _state = Object.assign({}, scroll);
        Object.keys(_listeners).forEach((listenerId) => {
            const listener = _listeners[listenerId];
            listener.call(null, _state);
        });
    };

    const subscribe = (listener) => {
        const listenerId = uniqueId();
        _listeners[listenerId] = listener;
        return listenerId;
    };

    const unsubscribe = (listenerId) => {
        if (_listeners[listenerId]) {
            delete _listeners[listenerId];
        }
    };

    return {
        update,
        subscribe,
        unsubscribe
    };
};

const instance = ScrollManager();
export default instance;
