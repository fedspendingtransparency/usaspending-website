/**
 * mapBroadcaster.js
 * Created by Kevin Li 11/2/17
 */

class MapBroadcaster {
    constructor() {
        this._events = {};
    }

    on(eventName, listener) {
        if (!this._events[eventName]) {
            // the event does not exist, create an array with the listener
            this._events[eventName] = [listener];
        }
        else {
            // the event exists, append the listener
            this._events[eventName].push(listener);
        }

        // subtract 1 to return the index position of the listener
        return {
            event: eventName,
            id: this._events[eventName].length - 1
        };
    }

    off(eventName, index) {
        if (!this._events[eventName]) {
            // no such event
            return;
        }

        this._events[eventName].splice(index, 1);
    }

    emit(eventName, ...args) {
        if (!this._events[eventName]) {
            // no such event
            return;
        }

        const listeners = this._events[eventName];
        listeners.forEach((listener) => {
            listener(...args);
        });
    }
}

const singleton = new MapBroadcaster();

export default singleton;
