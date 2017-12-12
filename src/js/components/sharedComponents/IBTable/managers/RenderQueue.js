/**
 * RenderQueue.js
 * Created by Kevin Li 12/8/17
 */

const RenderQueue = () => {
    let _readQueue = [];
    let _writeQueue = [];

    let _triggered = null;

    const _executeQueue = (queue) => {
        const seenTypes = {};

        for (let i = queue.length - 1; i >= 0; i--) {
            const op = queue[i];
            if (op.isSingle && seenTypes[op.type]) {
                // this is an operation type that should only be executed once and
                // a later operation has already executed it
                // (we are iterating in reverse, so later operations (pushed to the end) will
                // come up first)
                continue;
            }
            else if (op.isSingle) {
                seenTypes[op.type] = op.type;
            }

            op.operation.call(null, ...op.args);
        }
    };

    const _render = () => {
        _executeQueue(_readQueue);
        _executeQueue(_writeQueue);

        _readQueue = [];
        _writeQueue = [];

        _triggered = null;
    };

    const _add = (op, type) => {
        if (type === 'read') {
            _readQueue.push(op);
        }
        else {
            _writeQueue.push(op);
        }

        if (!_triggered) {
            // we have operations now, so render through the queue on the next frame
            _triggered = window.requestAnimationFrame(_render);
        }
    };

    return {
        addRead: (op) => {
            _add(op, 'read');
        },
        addWrite: (op) => {
            _add(op, 'write');
        }
    };
};

const instance = RenderQueue();

export default instance;
