/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other helpers

export const createOnKeyDownHandler = (cb, args = [], keyCodes = [13, 32]) => (e) => {
    // 13 enter; 32 space
    if (keyCodes.includes(e.keyCode)) {
        cb(...args);
    }
};
/* eslint-enable import/prefer-default-export */
