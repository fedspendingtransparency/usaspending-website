import {RESPONSE_TYPE, OPERATION, responseLookup } from "../../../components/search/collapsibleSidebar/NLConstants";

// eslint-disable-next-line import/prefer-default-export
export const buildResponseState = (data = []) => {
    const state = {
        items: []
    };
    
    data.forEach((event) => {
        const {
            search_id, 
            tool_use_id, 
            type, 
            message, 
            result
        } = event ?? {};
           
        const response = responseLookup[type];
        console.log( "checking message ====> ", message);
    
        if (!response) {
            return;
        }
    
        const item = {
            searchId: search_id,
            ...(tool_use_id && {
                toolId: tool_use_id
            }),
            ...response,
            ...(message && {
                label: message
            }),
            ...(result && {
                result
            })
        };
    
        // Search messages are always new display items
        if (response.operation === OPERATION.SEARCH) {
            state.items.push(item);
            return; 
        }
    
        const toolId = tool_use_id;
    
        if (!toolId) {
            return;
        }
    
        // Tool start creates a new display item
        if (type === RESPONSE_TYPE.TOOL_START) {
            state.items.push(item);
            return;
        }
    
        // Tool complete/error updates the existing item
        const itemIndex = state.items.findIndex(
            (existingItem) => existingItem.toolId === toolId
        );
    
        if (itemIndex !== -1) {
            state.items[itemIndex] = {
                ...state.items[itemIndex],
                ...item
            };
        }
    });
    
    return state;
}