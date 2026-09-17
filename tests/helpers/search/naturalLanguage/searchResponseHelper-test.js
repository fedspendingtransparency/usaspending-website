/**
 * 
 * @jest-environment jsdom
 */

import { RESPONSE_TYPE,OPERATION, VARIANT } from '../../../mockData';

import { buildResponseState  
} from '../../../../src/js/helpers/search/naturalLanguage/searchResponseHelper';

const { SEARCH, TOOL } = OPERATION;
const { INIT, START, COMPLETE, ERROR } = VARIANT;

const mockData = [
    {
        search_id: '502',
        type: RESPONSE_TYPE.SEARCH_START,
        message: "Thinking..."
    },
    {   
        search_id: '502',
        tool_use_id: 1522,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting Anne Arundel, MD'
    },
    {
        search_id: '502',
        tool_use_id: 1522,
        type: RESPONSE_TYPE.TOOL_COMPLETE
    },
    {
        search_id: '502',
        tool_use_id: 1523,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting funding over $500,000'
    },
    {
        search_id: '502',
        tool_use_id: 1523,
        type: RESPONSE_TYPE.TOOL_ERROR  
    },
    {
        search_id: '502',
        tool_use_id: 1524,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting higher education and public schools'
    },
    {
        search_id: '502',
        tool_use_id: 1524,
        type: RESPONSE_TYPE.TOOL_COMPLETE
    },
    {
        search_id: '502',
        type: RESPONSE_TYPE.SEARCH_COMPLETE,
        message: 'Applying filters based on grants and loans that went to schools',
        result: '123abc456efg'
    }

];

describe('searchResponseHelper', () => {
    describe(`buildResponseState (WITH tool complete messages) - builds out response state from SEARCH_START -> SEARCH_COMPLETE`, () => {
        it('should return an object of array items which the icon`s value IS equal to "sparkles" at least once', () => {
            const testData = [
                ...mockData.slice(0,2),
                {...mockData[2], message: 'Success'},
                ...mockData.slice(3,4),
                {...mockData[4], message: 'Error'},
                ...mockData.slice(5,6),
                {...mockData[6], message: 'Success'},
                mockData[7]    
            ];

            const expectedResult = {
                items: [
                    {
                        searchId: '502',
                        operation: SEARCH,
                        variant: INIT,
                        label: 'Thinking...',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1522,
                        variant: START,
                        label: 'Selecting Anne Arundel, MD',
                        icon: 'sparkles'   
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1522,
                        variant: COMPLETE,
                        label: 'Success',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1523,
                        variant: START,
                        label: 'Selecting funding over $500,000',
                        icon: 'sparkles' 
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1523,
                        variant: ERROR,
                        label: 'Error',
                        icon: ['far', 'circle-xmark']  
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1524,
                        variant: START,
                        label: 'Selecting higher education and public schools',
                        icon: 'sparkles'  
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1524,
                        variant: COMPLETE,
                        label: 'Success',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: SEARCH,
                        variant: COMPLETE,
                        label: 'Applying filters based on grants and loans that went to schools',
                        result: '123abc456efg'
                    }
                ]
            };
            expect(buildResponseState(testData)).toStrictEqual(expectedResult);
        });
    });
    
    describe(`buildResponseState (WITHOUT tool complete messages) - builds out response state from SEARCH_START -> SEARCH_COMPLETE`, () => {
        it('should return an object of array items which the icon`s value IS NEVER equal to "sparkles" ', () => {
            const expectedResult = { 
                items: [
                    {
                        searchId: '502',
                        operation: SEARCH,
                        variant: INIT,
                        label: 'Thinking...',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1522,
                        variant: COMPLETE,
                        label: 'Selecting Anne Arundel, MD',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1523,
                        variant: ERROR,
                        label: 'Selecting funding over $500,000',
                        icon: ['far', 'circle-xmark']  
                    },
                    {
                        searchId: '502',
                        operation: TOOL,
                        toolId: 1524,
                        variant: COMPLETE,
                        label: 'Selecting higher education and public schools',
                        icon: ['far', 'circle-check']   
                    },
                    {
                        searchId: '502',
                        operation: SEARCH,
                        variant: COMPLETE,
                        label: 'Applying filters based on grants and loans that went to schools',
                        result: '123abc456efg'
                    }
                ]};

            expect(buildResponseState(mockData)).toStrictEqual(expectedResult);
        }); 
    })
});