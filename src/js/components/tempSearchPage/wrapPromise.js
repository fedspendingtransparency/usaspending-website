// wrapPromise.js
/**
 * Wraps a promise so it can be used with React Suspense
 * @param {Promise} promise The promise to process
 * @returns {Object} A response object compatible with Suspense
 */
function wrapPromise(promise) {
    let status = 'pending';
    let response;

    const suspender = promise.then(
        (res) => {
            status = 'success';
            response = res;
        },
        (err) => {
            status = 'error';
            response = err;
        }
    );

    const handler = {
        pending: () => {
            throw suspender;
        },
        error: () => {
            throw response;
        },
        default: () => response
    };

    const read = () => (handler[status] ? handler[status]() : handler.default());

    return { read };
}

export default wrapPromise;
