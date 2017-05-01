/**
 * guideReducer.js
 * Created by Kevin Li 4/28/17
 */

import { Record } from 'immutable';

export const Definition = Record({
    value: '',
    plain: '',
    official: '',
    resources: []
});

export const initialState = {
    display: true,
    term: new Definition(),
    search: {
        input: '',
        results: [
            {
                value: 'Recipient Location'
            },
            {
                value: 'Recipient',
                plain: 'The name of the __awardee__ or *recipient* that relates to a unique identifier. For U.S. based companies, this name is what the business ordinarily files in formation documents with individual states (when required).\n\nSee [Award ID](?guide=award+id)',
                official: 'Something official\n\n**official!**',
                resources: [
                {
                    label: 'Something',
                    url: "http://www.google.com"
                }, {
                    label: 'Something else',
                    url: '?guide=award+id'
                }]
            },
            {
                value: 'Recipient Name'
            },
            {
                value: 'Recipient Type'
            },
            {
                value: 'Award ID',
                plain: 'Award ID is the **ID** of an award or something'
            },
            {
                value: 'Appropriation Account'
            },
            {
                value: 'my super long term that I hope will wrap correctly'
            }
        ]
    }
};

const guideReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_GUIDE': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_GUIDE': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'TOGGLE_GUIDE': {
            return Object.assign({}, state, {
                display: !state.display
            });
        }
        case 'SET_GUIDE_SEARCH_VALUE': {
            const search = Object.assign({}, state.search, {
                input: action.value
            });
            return Object.assign({}, state, {
                search,
                term: new Definition()
            });
        }
        case 'SET_GUIDE_TERM': {
            return Object.assign({}, state, {
                term: new Definition(action.term)
            });
        }
        case 'CLEAR_GUIDE_TERM': {
            return Object.assign({}, state, {
                term: new Definition()
            });
        }
        default:
            return state;
    }
};

export default guideReducer;
