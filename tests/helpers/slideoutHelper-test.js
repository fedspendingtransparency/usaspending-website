/**
 * @jest-environment jsdom
 *
 * slideoutHelper-test.js
 */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { combineReducers, createStore } from 'redux';
import storeSingleton from 'redux/storeSingleton';
import { beforeEach, expect } from '@jest/globals';
import { render, waitFor } from '../testResources/test-utils';
import { showSlideout } from "../../src/js/helpers/slideoutHelper";
import * as glossaryReducer from "../../src/js/redux/reducers/glossary/glossaryReducer";
import * as atdReducer from "../../src/js/redux/reducers/aboutTheDataSidebar/aboutTheDataReducer";
import * as slideoutReducer from "../../src/js/redux/reducers/slideouts/slideoutReducer";
import * as atdActions from "../../src/js/redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import * as glossaryActions from "../../src/js/redux/actions/glossary/glossaryActions";
import * as slideoutActions from "../../src/js/redux/actions/slideouts/slideoutActions";

const mockAPPReducer = combineReducers({
    glossary: glossaryReducer.default,
    aboutTheDataSidebar: atdReducer.default,
    slideouts: slideoutReducer.default
});

const mockData = {
    glossary: glossaryReducer.initialState,
    aboutTheDataSidebar: atdReducer.initialState,
    slideouts: {
        lastOpenedSlideout: 'glossary'
    }
};

const store = createStore(mockAPPReducer, mockData);
storeSingleton.setStore(store);

const updateLastAction = (last) => {
    store.dispatch(slideoutActions.setLastOpenedSlideout(last));
};

describe('showSlideout', () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.spyOn(store, 'dispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    });


    it('should dispatch showGlossary and setLastOpenedSlideout when showSlideout helper function is called with no options', () => {
        render(<></>, { initialState: mockAPPReducer, store });
        // console.log('\n Test show Glossary starting');
        const mockShowGlossaryAction = jest.spyOn(glossaryActions, 'showGlossary').mockClear();
        const mockSetLastAction = jest.spyOn(slideoutActions, 'setLastOpenedSlideout').mockClear();

        showSlideout('glossary');

        waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(2);
            expect(mockShowGlossaryAction).toHaveBeenCalledTimes(1);
            expect(mockSetLastAction).toHaveBeenCalledTimes(1);
        });
    });

    it('should dispatch hideGlossary, showAboutTheData and setLastOpenedSlideout when showSlideout helper function is called with no options after glossary already opened.', () => {
        render(<></>, { initialState: mockAPPReducer, store });
        // console.log('\n Test hide Glossary and show atd starting');
        const mockHideGlossaryAction = jest.spyOn(glossaryActions, 'hideGlossary').mockClear();
        const mockShowATDAction = jest.spyOn(atdActions, 'showAboutTheData').mockClear();
        const mockSetLastAction = jest.spyOn(slideoutActions, 'setLastOpenedSlideout').mockClear();

        showSlideout('atd');

        waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(3);
            expect(mockHideGlossaryAction).toHaveBeenCalledTimes(1);
            expect(mockShowATDAction).toHaveBeenCalledTimes(1);
            expect(mockSetLastAction).toHaveBeenCalledTimes(1);
        });
    });

    it('should dispatch hideAboutThe Data, showGlossary, setTermFromUrl and setLastOpenedSlideout when showSlideout helper function is called with no options', () => {
        render(<></>, { initialState: mockAPPReducer, store });
        updateLastAction('atd');// mimic opening about the data first
        // console.log('\n Final: Test showing hide atd, show glossary, and set url starting');

        const mockHideATDAction = jest.spyOn(atdActions, 'hideAboutTheData').mockClear();
        const mockShowGlossaryAction = jest.spyOn(glossaryActions, 'showGlossary').mockClear();
        const mockSetURLTermGlossaryAction = jest.spyOn(glossaryActions, 'setTermFromUrl').mockClear();
        const mockSetLastAction = jest.spyOn(slideoutActions, 'setLastOpenedSlideout').mockClear();

        showSlideout('glossary', { url: 'test' });

        waitFor(() => {
            // expect(mockDispatch).toHaveBeenCalledTimes(4);
            expect(mockHideATDAction).toHaveBeenCalledTimes(1);
            expect(mockShowGlossaryAction).toHaveBeenCalledTimes(1);
            expect(mockSetURLTermGlossaryAction).toHaveBeenCalledTimes(1);
            expect(mockSetLastAction).toHaveBeenCalledTimes(1);
        });
    });
});
