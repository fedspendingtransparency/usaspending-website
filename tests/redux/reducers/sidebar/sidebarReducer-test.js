/**
 * @jest-environment jsdom
 * 
 * sidebarReducer-test.js
 * Created by Trey Morgan 8/13/2026
 */

import sidebarReducer, {initialState} from "../../../../src/js/redux/reducers/sidebar/sidebarReducer";
import { SET_SIDEBAR_CONTENT } from "../../../../src/js/redux/actions/sidebar/sidebarActions";
import { NATURAL_LANGUAGE, FILTERS } from "../../../../src/js/components/search/collapsibleSidebar/SidebarConstants";

describe('sidebarReducer', () => {
    describe('SET_SIDEBAR_CONTENT', () => {
        it('should set the sidebar content to the provided value', () => {
            let state = sidebarReducer(initialState, {});
            expect(state.sidebarContent).toEqual(FILTERS);

            const action = {
                type: SET_SIDEBAR_CONTENT,
                sidebarContent: NATURAL_LANGUAGE  
            };

            state = sidebarReducer(state, action);
            expect(state.sidebarContent).toEqual(NATURAL_LANGUAGE);
        });
    });
});