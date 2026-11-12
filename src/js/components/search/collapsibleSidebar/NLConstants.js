export const NL_INPUT_MAX_CHARS = 500;

export const RESPONSE_TYPE = {
    SEARCH_START: 'search_start',
    SEARCH_COMPLETE: 'search_complete',
    SEARCH_ERROR: 'search_error',
    TOOL_START: 'tool_start',
    TOOL_COMPLETE: 'tool_complete',
    TOOL_ERROR: 'tool_error'
};

export const QUERY_ASSISTANT_VERDICT = {
    ANSWERABLE: 'answerable',
    REPHRASE: 'answerable_after_rephrase',
    OUT_OF_SCOPE: 'out_of_scope'
};

// status of the query assistant step that runs before the filter search
export const QUERY_ASSISTANT_STATUS = {
    IDLE: 'idle',
    CHECKING: 'checking',
    DONE: 'done',
    APPROVED: 'approved'
};

export const OPERATION = {
    SEARCH: 'search',
    TOOL: 'tool'
};

export const VARIANT = {
    INIT: 'initialize',
    START: 'start',
    COMPLETE: 'complete',
    ERROR: 'error'
};

const { SEARCH, TOOL } = OPERATION;
const { START, COMPLETE, ERROR, INIT } = VARIANT;

export const responseLookup = {
    [RESPONSE_TYPE.SEARCH_START]: {
        operation: SEARCH,
        variant: INIT,
        icon: ['far', 'circle-check']
    },

    [RESPONSE_TYPE.SEARCH_COMPLETE]: {
        operation: SEARCH,
        variant: COMPLETE
    },

    [RESPONSE_TYPE.SEARCH_ERROR]: {
        operation: SEARCH,
        variant: ERROR,
        icon: ['far', 'circle-xmark']
    },

    [RESPONSE_TYPE.TOOL_START]: {
        operation: TOOL,
        variant: START,
        icon: 'sparkles'
    },

    [RESPONSE_TYPE.TOOL_COMPLETE]: {
        operation: TOOL,
        variant: COMPLETE,
        icon: ['far', 'circle-check']
    },

    [RESPONSE_TYPE.TOOL_ERROR]: {
        operation: TOOL,
        variant: ERROR,
        icon: ['far', 'circle-xmark']
    }
};
