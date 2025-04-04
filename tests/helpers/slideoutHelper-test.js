/**
 * @jest-environment jsdom
 *
 * slideoutHelper-test.js
 */
import React from 'react';
import { combineReducers, createStore } from 'redux';
import * as redux from 'react-redux';
import { beforeEach, expect } from '@jest/globals';
import { render, waitFor } from '../testResources/test-utils';
import { showSlideout } from "../../src/js/helpers/slideoutHelper";
import glossaryReducer from "../../src/js/redux/reducers/glossary/glossaryReducer";
import atdReducer from "../../src/js/redux/reducers/aboutTheDataSidebar/aboutTheDataReducer";
import slideoutReducer from "../../src/js/redux/reducers/slideouts/slideoutReducer";
// import * as atdActions from "../../src/js/redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import * as glossaryActions from "../../src/js/redux/actions/glossary/glossaryActions";
import * as slideoutActions from "../../src/js/redux/actions/slideouts/slideoutActions";


describe('showSlideout', () => {
    const mockAPPReducer = combineReducers({
        glossary: glossaryReducer,
        aboutTheDataSidebar: atdReducer,
        slideouts: slideoutReducer
    });

    const mockStore = createStore(mockAPPReducer, {});
    const mockActions = {
        showGlossary: jest.fn(),
        setLastOpenedSlideout: jest.fn()
    };
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
        jest.mock("redux/storeSingleton", () => ({
            store: jest.fn(() => mockStore)
        }));
        mockStore.getState = jest.fn(() => ({}));
    });


    it('should dispatch showGlossary and setLastOpenedSlideout when showSlideout helper function is called with no options', async () => {
        render(<></>, { initialState: mockAPPReducer, store: mockStore });
        const mockGlossaryAction = jest.spyOn(glossaryActions, 'showGlossary').mockClear();
        const mocksetLastAction = jest.spyOn(slideoutActions, 'setLastOpenedSlideout').mockClear();

        showSlideout('glossary');

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(2);
            expect(mockGlossaryAction).toHaveBeenCalledWith(mockActions.showGlossary);
            expect(mocksetLastAction).toHaveBeenCalledWith(mockActions.setLastOpenedSlideout);
        });
    });
});
