/* eslint-disable import/prefer-default-export */

export const getAwardHistoryCounts = (tab, id, isIdv) => {
    console.log('da real test right here boi');
    if (isIdv && tab === 'federal_account') {
        return {
            promise: new Promise((resolve) => {
                process.nextTick(() => {
                    resolve({
                        data: {
                            count: 4
                        }
                    });
                });
            }),
            cancel: jest.fn()
        };
    }
    return {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        [`${tab}s`]: 4
                    }
                });
            });
        }),
        cancel: jest.fn()
    };
};
