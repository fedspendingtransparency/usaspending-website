/**
 * @jest-environment jsdom
 * 
 * sidebarReducer-test.js
 * Created by Trey Morgan 8/13/2026
 */

import sidebarReducer, {initialState} from "../../../../src/js/redux/reducers/sidebar/sidebarReducer";
import { SET_SIDEBAR_CONTENT, SET_IS_SEARCH_ACTIVE } from "../../../../src/js/redux/actions/sidebar/sidebarActions";
import { NATURAL_LANGUAGE, FILTERS } from "../../../../src/js/components/search/collapsibleSidebar/SidebarConstants";

describe('sidebarReducer', () => {
    let state;
    beforeEach(() => {
        state = sidebarReducer(initialState, {});
    })
    describe('SET_SIDEBAR_CONTENT', () => {
        it('should set the sidebar content to the provided value', () => {
            expect(state.sidebarContent).toEqual(FILTERS);

            const action = {
                type: SET_SIDEBAR_CONTENT,
                sidebarContent: NATURAL_LANGUAGE  
            };

            state = sidebarReducer(state, action);
            expect(state.sidebarContent).toEqual(NATURAL_LANGUAGE);
        });
    });
    describe('SET_IS_SEARCH_ACTIVE', () => {
        it('should set isSearchActive to true', () => {
            const action = {
                type: SET_IS_SEARCH_ACTIVE,
                isSearchActive: true
            };

            state = sidebarReducer(state, action);
            expect(state.isSearchActive).toBe(true);
        })
    });
});