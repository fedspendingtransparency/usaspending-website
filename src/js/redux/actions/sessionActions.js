export const setApiMeta = (state) => ({
    type: 'SET_API_META',
    time: state.time
});

// placeholder second function to suppress a linting error
export const setSecondValue = (state) => ({
    type: 'SET_SECOND_VALUE',
    time: state.value
});
